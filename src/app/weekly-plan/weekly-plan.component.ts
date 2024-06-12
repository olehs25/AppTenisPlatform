import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PlanService } from '../services/plan.service';

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

  constructor(private authService: AuthService, private planService: PlanService) {}

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
}
