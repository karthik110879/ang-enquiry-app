import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-enquiry-list',
  imports: [DatePipe],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css',
})
export class EnquiryList implements OnInit {
  private apiService = inject(ApiService);
  private cd = inject(ChangeDetectorRef)
  isLoading:boolean = true;
  allEnqurieList:any[] = [];


  ngOnInit(): void {
    this.getAllEnquries();
  }

  getAllEnquries() {
    this.apiService.getAllEnquries().subscribe({
      next: (res:any) => {
        if(res && res.data) { 
          console.log('getAllEnquries -->',res);
          this.allEnqurieList = res.data || [];
          this.cd.markForCheck()
        }
        this.isLoading = false;
      },
      error: (error:any) =>{
        console.log(error); 
        this.isLoading = false;
      },
      complete: () => { 
        console.log('Completed');
      }
    })
  }
}
