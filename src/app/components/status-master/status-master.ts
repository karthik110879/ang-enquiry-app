import { ChangeDetectorRef, Component, inject, Inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { form, required, FormField } from '@angular/forms/signals';
import { CreateStatusResponse, IStatus } from '../../models/new-enquiry';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-status-master',
  imports: [CommonModule, FormField, AsyncPipe],
  templateUrl: './status-master.html',
  styleUrl: './status-master.css',
})
export class StatusMaster implements OnInit {

  //services
  private apiService= inject(ApiService);
  private cd = inject(ChangeDetectorRef);

  allStatusObs$!: Observable<IStatus[]>;
  isEdited = signal<boolean>(false);


  //form 
  private addStatusFormData = signal<IStatus>({
    statusName:'' ,
    isActive: true,
    statusId: 0
  })


  ngOnInit(): void {
    this.getAllStatus()
  }

  //create the form
  addStatusForm = form(this.addStatusFormData, (schemaPath) => {
    required(schemaPath['statusName'], {message: "Need to enter a status"})
  })

  getAllStatus() {
    this.allStatusObs$ = this.apiService.getStatuses().pipe(map(x => x.data))
  }

  private updateStatusList() {
    this.getAllStatus()
    this.cd.markForCheck()
  }
 
  onSaveStatus() {
    if(this.addStatusForm().valid()) { 
      const formValues = this.addStatusForm().value();
      console.log('formValues', formValues);
      this.apiService.createStatus(formValues).subscribe({
        next: (res:CreateStatusResponse) => {
          console.log('Created ==> ', res);  
          if(res.result) { 
            this.updateStatusList()
          }
        },
        error: (err:any) => {
          console.log(err);
        }
      })

    } else {
      console.log("Form is invalid")
    }


  }

  onEditStatus(status:IStatus) {
    console.log('Edit Status', status);
    this.addStatusFormData.set({
      statusName: status.statusName,
      isActive: status.isActive,
      statusId: status.statusId,
    });
    this.isEdited.set(true);
      
  }

  onClear() {
    this.addStatusFormData.set({
      statusName: '',
      statusId: 0,
      isActive: true
    })

    this.isEdited.set(false);
  }


  onDeleteStatus(status:IStatus) {
    console.log('Delete Status', status);
    this.apiService.deleteStatus(status.statusId).subscribe({
      next:(res) => {
        console.log(res.message); 
        this.updateStatusList();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
