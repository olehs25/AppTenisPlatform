import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlanService } from '../services/plan.service';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-weekly-plan',
  templateUrl: './weekly-plan.component.html',
  styleUrls: ['./weekly-plan.component.scss']
})
export class WeeklyPlanComponent implements OnInit {
  isEditMode = false;
  isAdmin = false;
  originalPlan: any; // Para almacenar el plan original y permitir la cancelación de cambios


  plan = {
    martes: [
      { time: '', activity: '' },

    ],
    jueves: [
      { time: '', activity: '' },

    ],
    descripcion: [
      { title: '', description: '' },

    ]
  };

  @ViewChild('planContent') planContent: any | undefined;


  constructor(private authService: AuthService, private planService: PlanService,
              public translate: TranslateService) {
    this.translate.use(window.navigator.language);
  }

  ngOnInit(): void {
    this.checkIfAdmin();
    this.loadPlan();

  }

  checkIfAdmin() {
    const userRole = this.authService.getUserRole();
    if (userRole == 'ADMIN'){
      this.isAdmin=true;
      this.isEditMode=true;
    }

  }

  loadPlan() {
    this.planService.getPlan().subscribe(
      (data) => {
        if (data && data.content) {
          try {
            this.plan = JSON.parse(data.content);
            console.log("PLANNN: "+this.plan)
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        } else {
          console.error('No plan data available');
        }
      },
      (error) => {
        console.error('Error loading plan:', error);
      }
    );
  }

  toggleEditMode() {
    if (!this.isEditMode) {
      this.originalPlan = JSON.parse(JSON.stringify(this.plan)); // Clonar el plan original
    }
    this.isEditMode = !this.isEditMode;
  }

  cancelEditMode() {
    this.originalPlan = this.plan
    this.plan = JSON.parse(JSON.stringify(this.originalPlan)); // Restaurar el plan original
    this.isEditMode = false;
  }


  savePlan() {
    this.planService.updatePlan(this.plan).subscribe(
      (response) => {
        console.log('Plan updated successfully:', response);
        this.isEditMode = false;
      },
      (error) => {
        console.error('Error updating plan:', error);
      }
    );
  }
  downloadPDF() {
    const DATA = this.planContent.nativeElement;
    const doc = new jsPDF('p', 'mm', 'a4');
    const options = {
      scale: 2,
      useCORS: true
    };

    html2canvas(DATA, options).then(canvas => {
      const imgWidth = 210; // Width of A4 in mm
      const pageHeight = 295; // Height of A4 in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Planificación_Semanal.pdf');
    });
  }

}
