import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-reservation',
  templateUrl: './popup-reservation.component.html',
  styleUrls: ['./popup-reservation.component.scss']
})
export class PopupReservationComponent {

  constructor(public dialogRef: MatDialogRef<PopupReservationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
