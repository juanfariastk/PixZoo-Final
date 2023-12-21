import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../admin-services/admin-service.service';

@Component({
  selector: 'app-draw-dialog',
  templateUrl: './draw-dialog.component.html',
  styleUrls: ['./draw-dialog.component.scss']
})
export class DrawDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DrawDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService) { }

  definedAnimals = this.data.definedAnimals;
  allAnimals = this.data.allAnimals;
  selectedDefinedAnimal: string | null = null;
  selectedNewAnimal: string | null = null;

  onDefinedAnimalSelectionChange(event: any): void {
    this.selectedDefinedAnimal = event.value;
  }

  onNewAnimalSelectionChange(event: any): void {
    this.selectedNewAnimal = event.value;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  commitFraud(): void {
    if (this.selectedDefinedAnimal && this.selectedNewAnimal) {
      const fraudData = [{
        "oldAnimal": this.selectedDefinedAnimal,
        "newAnimal": this.selectedNewAnimal
      }];

      console.log(fraudData);

      this.adminService.putAnimalFraud(fraudData).subscribe(
        (response) => {
          console.log('Fraude registrada com sucesso:', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erro ao registrar a fraude:', error);
          this.dialogRef.close();
        }
      );
    } else {
      console.error('Ação não concluída.');
    }
  }
}
