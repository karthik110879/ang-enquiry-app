import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs'; 
import { FIlterEnquiry, NewEnquiryResponse, AllEnquiriesResponse, EnquiryResponse, UpdateEnquiryResponse, DeleteEnquiryResponse, GetStatusResponse, UpdateStatusResponse, CreateStatusResponse, DeleteStatusResponse, IStatus } from '../models/new-enquiry';
import { AllCategoriesResponse, CreateCategoryResponse, DeleteCategoryResponse, ICategoriesApiResponse, UpdateCategoryResponse } from '../models/categories.model';
 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient
  ){}

  private appDomain = environment.apiUrl;

  //ENQURIES
  getAllEnquries(): Observable<AllEnquiriesResponse> {
    return this.http.get<AllEnquiriesResponse>(this.appDomain + '/Enquiry/get-enquiries');
  }

  getEnquriy(id:any): Observable<EnquiryResponse> {
    return this.http.get<EnquiryResponse>(this.appDomain + `/Enquiry/get-enquiry/${id}`);
  }
  
  createNewEnquiry(payload:any): Observable<NewEnquiryResponse> { 
    return this.http.post<NewEnquiryResponse>(this.appDomain + '/Enquiry/create-enquiry', payload);
  }

  filterEnquiry(payload:FIlterEnquiry): Observable<any> {
    return this.http.post<any>(this.appDomain + '/Enquiry/filter-enquiries', payload)
  }

  updateEnquiry(id:any, payload:FIlterEnquiry): Observable<UpdateEnquiryResponse> {
    return this.http.post<UpdateEnquiryResponse>(this.appDomain + `/Enquiry/update-enquiry/${id}`, payload)
  }

  deleteEnquiry(id:any): Observable<DeleteEnquiryResponse> {
    return this.http.delete<DeleteEnquiryResponse>(this.appDomain + `/Enquiry/update-enquiry/${id}`)
  }

  //STATUS
  createStatus(payload:IStatus): Observable<CreateStatusResponse> {
    return this.http.post<CreateStatusResponse>(this.appDomain + '/Enquiry/create-status', payload);
  }

  getStatuses(): Observable<GetStatusResponse> {
    return this.http.get<GetStatusResponse>(this.appDomain + '/Enquiry/get-statuses');
  }

  updateStatus(statusId:any): Observable<UpdateStatusResponse> {
    return this.http.get<UpdateStatusResponse>(this.appDomain + `/Enquiry/update-status/${statusId}`);
  }

  deleteStatus(statusId:any): Observable<DeleteStatusResponse> {
    return this.http.delete<DeleteStatusResponse>(this.appDomain + `/Enquiry/delete-status/${statusId}`);
  }

  //CATEGORIES
  getCategories(): Observable<AllCategoriesResponse> {
    return this.http.get<AllCategoriesResponse>(this.appDomain + '/Enquiry/get-categories');
  }

  createCategory(payload :any ): Observable<CreateCategoryResponse> {
    return this.http.post<CreateCategoryResponse>(this.appDomain + '/Enquiry/create-category',payload);
  }

  updateCategory(payload :any, categoryId:any ): Observable<UpdateCategoryResponse> {
    return this.http.post<UpdateCategoryResponse>(this.appDomain + `/Enquiry/update-category/${categoryId}`,payload);
  }

  deleteCategory(categoryId:any ): Observable<DeleteCategoryResponse> {
    return this.http.delete<DeleteCategoryResponse>(this.appDomain + `/Enquiry/delete-category/${categoryId}`);
  }


}
