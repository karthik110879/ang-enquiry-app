export interface IEnquiry {
    enquiryId: number,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    message: string,
    categoryId: number, 
    statusId: number,
    enquiryType: string,
    isConverted: boolean,
    enquiryDate: string,
    followUpDate: string,
    feedback: string
}
 
export interface IEnquiryApiResponse<T> {
    error: [],
    result: boolean,
    data: T,
    message: string
}
 
export interface FIlterEnquiry {
    fromDate: string
    toDate: string
    categoryId: number
    statusId: number
    customerName: string
    contactNo: string
    sortBy: string
    sortDir: string
    page: number
    pageSize: number
}

export interface IStatus {
    statusId: number | string
    statusName: string
    isActive: boolean
  }


export type FilterEnquiryResponse = IEnquiryApiResponse<FIlterEnquiry>;
export type NewEnquiryResponse = IEnquiryApiResponse<IEnquiry>;
export type UpdateEnquiryResponse = IEnquiryApiResponse<IEnquiry>;
export type AllEnquiriesResponse = IEnquiryApiResponse<IEnquiry[]>;
export type EnquiryResponse = IEnquiryApiResponse<IEnquiry>; 
export type DeleteEnquiryResponse = IEnquiryApiResponse<null>; 
 
export type GetStatusResponse = IEnquiryApiResponse<IStatus[]>; 
export type CreateStatusResponse = IEnquiryApiResponse<IStatus>; 
export type UpdateStatusResponse = IEnquiryApiResponse<IStatus>; 
export type DeleteStatusResponse = IEnquiryApiResponse<null>; 

