import { Component, Inject } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid'; // for dayGridMonth view
import timeGridPlugin from '@fullcalendar/timegrid'; // for timeGridWeek and timeGridDay views
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReservationService } from "../services/reservation.service";
import { reservationDTO } from "../models/reservationDTO";
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  isAdmin: boolean = false;
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    slotMinTime: '09:00:00', // start time of the day
    slotMaxTime: '21:00:00', // end time of the day
    allDaySlot: false, // remove all day slot
    height: 'auto', // adjust height automatically
    validRange: {
      start: new Date().toISOString().split('T')[0] // disable past dates
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    slotDuration: '01:00:00', // set slot duration to 1 hour
    selectConstraint: {
      start: '09:00:00', // only allow selections from 9:00 AM
      end: '21:00:00' // only allow selections until 9:00 PM
    },
    selectOverlap: false
  };

  currentEvents: EventApi[] = [];

  constructor(public dialog: MatDialog, public reservationService: ReservationService, public authService: AuthService,
  private router: Router) {}

  ngOnInit(): void {
    this.checkIfAdmin();
    this.loadReservations();
  }
  goToReservationList(): void {
    this.router.navigate(['/reservation-list']);
  }

  checkIfAdmin() {
    const userRole = this.authService.getUserRole();
    if (this.authService.isLoggedIn() && userRole === 'ADMIN') {
      console.log("ROLLLLLLLLLL: " + userRole);
      this.isAdmin = true;
    }
  }

    loadReservations() {
        let loggedInUserEmail = this.authService.getUserEmail()
      if(loggedInUserEmail==''){
        loggedInUserEmail = 'user@example.com';
      }

        this.reservationService.getAllReservations().subscribe((reservations: reservationDTO[]) => {
            const events = reservations.map(reservation => ({
                title: reservation.userEmail === loggedInUserEmail ? reservation.userEmail : 'Reserved',
                start: reservation.startDate,
                end: reservation.endDate,
                color: reservation.userEmail === loggedInUserEmail ? '' : 'red',
                extendedProps: {
                    email: reservation.userEmail,
                    price: 3, // assuming a fixed price
                    isPaid: reservation.isPaid,
                    id: reservation.id,
                    isEditable: reservation.userEmail === loggedInUserEmail
                }
            }));
            this.calendarOptions.events = events;
        }, (error: any) => {
            console.error('Error loading reservations:', error);
        });
    }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    // Ensure the end time is exactly one hour after the start time
    const endDate = new Date(selectInfo.start);
    endDate.setHours(endDate.getHours() + 1);

    let loggedInUserEmail = this.authService.getUserEmail()
    if(loggedInUserEmail==''){
      loggedInUserEmail = 'user@example.com';
    }
    const dialogRef = this.dialog.open(ReservationDialog, {
      width: '300px',
      data: {

        start: selectInfo.start,
        end: endDate,
        email: loggedInUserEmail,
        price: 3
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newReservation: reservationDTO = {
          id: 0,
          userEmail: result.email,
          startDate: selectInfo.startStr,
          endDate: selectInfo.endStr,

        };

        this.reservationService.registrarReserva(newReservation).subscribe(reservation => {
          calendarApi.addEvent({

            start: selectInfo.startStr,
            end: selectInfo.endStr,
            email: result.email,
            allDay: false,
            extendedProps: {
              price: result.price
            }
          });
          // Redirigir a la página de pago
          this.router.navigate(['/payment'], {
            queryParams: {

              userMail: result.email,
              start: selectInfo.startStr,
              end: selectInfo.endStr,
              price: result.price
            }
          });
        });

        calendarApi.unselect(); // clear date selection
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    let loggedInUserEmail = this.authService.getUserEmail()
    if(loggedInUserEmail==''){
      loggedInUserEmail = 'user@example.com';
    }
    if (clickInfo.event.extendedProps['email'] !== loggedInUserEmail) {
      // Prevent showing details or allowing deletion if not the owner
      return;
    }

    const dialogRef = this.dialog.open(ViewReservationDialog, {
      width: '300px',
      data: {
        id: clickInfo.event.extendedProps['id'],
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        email: clickInfo.event.extendedProps['email'],
        price: clickInfo.event.extendedProps['price']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        console.log("IDDDDDDDDDDDDDDDDD: "+clickInfo.event.extendedProps['id'])
        this.reservationService.borrarReserva(clickInfo.event.extendedProps['id']).subscribe(() => {
          clickInfo.event.remove();
        }, error => {
          console.error('Error deleting reservation:', error);
        });
      }
    });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}

let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}

// Componente de diálogo para crear una reserva
@Component({
  selector: 'reservation-dialog',
  template: `
    <h1 mat-dialog-title>{{ 'CREATE_RESERVATION' | translate }}</h1>
    <div mat-dialog-content>
      <p><strong>{{ 'START' | translate }}:</strong> {{data.start | date:'short'}}</p>
      <p><strong>{{ 'END' | translate }}:</strong> {{data.end | date:'short'}}</p>
      <p><strong>{{ 'EMAIL' | translate }}:</strong> {{data.email}}</p>
      <p><strong>{{ 'PRICE' | translate }}:</strong> {{data.price}} EUR</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">{{ 'CANCEL' | translate }}</button>
      <button mat-button [mat-dialog-close]="data">{{ 'CONFIRM' | translate }}</button>
    </div>
  `,
})
export class ReservationDialog {
  constructor(
    public dialogRef: MatDialogRef<ReservationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}

// Componente de diálogo para ver y borrar una reserva
@Component({
  selector: 'view-reservation-dialog',
  template: `
    <h1 mat-dialog-title>{{ 'RESERVATION_DETAILS' | translate }}</h1>
    <div mat-dialog-content>
      <p><strong>{{ 'START' | translate }}:</strong> {{data.start | date:'short'}}</p>
      <p><strong>{{ 'END' | translate }}:</strong> {{data.end | date:'short'}}</p>
      <p><strong>{{ 'EMAIL' | translate }}:</strong> {{data.email}}</p>
      <p><strong>{{ 'PRICE' | translate }}:</strong> {{data.price}} EUR</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">{{ 'CLOSE' | translate }}</button>
      <button mat-button color="warn" (click)="onDelete()">{{ 'DELETE' | translate }}</button>
    </div>
  `,
})
export class ViewReservationDialog {
  constructor(
    public dialogRef: MatDialogRef<ViewReservationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close('delete');
  }


}
