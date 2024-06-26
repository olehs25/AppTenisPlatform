import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { reservationDTO } from '../models/reservationDTO';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit{

  reservations: reservationDTO[] = [];
  displayedColumns: string[] = ['id', 'userEmail', 'startDate', 'endDate', 'isPaid', 'edit'];

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      (data: reservationDTO[]) => {
        this.reservations = data;
      },
      (error: any) => {
        console.error('Error al cargar las reservas', error);
      }
    );
  }

  togglePaid(reservation: reservationDTO) {
    reservation.isPaid = 1;
    if (reservation.id != null) {
      this.reservationService.updateReservation(reservation.id, reservation).subscribe(
        (updatedReservation: reservationDTO) => {
          this.loadReservations();
        },
        (error) => {
          console.error('Error updating reservation:', error);
        }
      );
    }
  }

}
