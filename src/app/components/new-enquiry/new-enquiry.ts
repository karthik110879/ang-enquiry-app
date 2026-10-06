import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { email, form, required , FormField} from '@angular/forms/signals' 
import { Icategory } from '../../models/categories.model'; 
import { ApiService } from '../../services/api-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { IEnquiry, IStatus } from '../../models/new-enquiry';

type EnquiryFormValue = Omit<IEnquiry, 'categoryId' | 'statusId'> & {
  categoryId: string;
  statusId: string;
};

@Component({
  selector: 'app-new-enquiry',
  imports: [CommonModule, FormField, AsyncPipe],
  templateUrl: './new-enquiry.html',
  styleUrl: './new-enquiry.css',
})
export class NewEnquiry implements OnInit{

  private apiService = inject(ApiService); 

  categories$!:Observable<Icategory[]>;
  statuses$!:Observable<IStatus[]>;

  // Selects only accept strings. Ids stay strings here and are converted on submit.
  enquiryFormData = signal<EnquiryFormValue>({
    categoryId: '', 
    customerEmail: '',
    customerName: '',
    customerPhone:'',
    enquiryDate: new Date().toISOString().substring(0, 10),
    enquiryId:0,
    enquiryType:'',
    feedback:'',
    followUpDate:'',
    isConverted: false,
    message: '',
    statusId: ''
  })


  //using the signal build the form using the "form" from @angular/form/signels
  //set the require validators, at this point 
  enquiryForm = form(this.enquiryFormData, (schemaPath) => {
    required(schemaPath['customerName'], {message: 'Customer name is required'});
    email(schemaPath['customerEmail'], {message: 'Email is required'});
    required(schemaPath['customerPhone'], {message: 'Phone number is required'});
    required(schemaPath['enquiryDate'], {message:'Please select enquiry date'});
  })

  getCategories() {
    this.categories$ = this.apiService.getCategories().pipe(map(x => x.data));
  }

  getStatuses() {
    this.statuses$ = this.apiService.getStatuses().pipe(map(x => x.data));
  }

  ngOnInit(): void {
    this.getCategories();
    this.getStatuses();
  }


  onSubmit(e:Event) {
    e.preventDefault(); 
    if(this.enquiryForm().valid()) {

      console.log('Form Values',this.enquiryForm().value());
      const formValues = this.enquiryForm().value();
      const payload = {
        ...formValues,
        enquiryId: formValues['enquiryId'] ? Number(formValues['enquiryId']) : 0,
        categoryId: Number(formValues.categoryId) || 0,
        statusId: Number(formValues.statusId) || 0,
        enquiryDate: formValues['enquiryDate'] ? new Date(formValues['enquiryDate']).toISOString() : '',
        followUpDate: formValues['followUpDate'] ? new Date(formValues['followUpDate']).toISOString() : '',
      }
      this.apiService.createNewEnquiry(payload).subscribe({
        next: (res) => {
          console.log("new Enquiry Submitted!", res);
          alert("new Enquiry Submitted!");
        },
        error: (err) => {
          console.log(err); 
        }
      });

    } else {
      this.enquiryForm().markAsTouched();
    }
  }



}
