export interface Icategory {
    categoryId : number | string;
    categoryName: string;
    isActive: boolean;
}


export interface ICategoriesApiResponse<T> {
    error: [],
    result: boolean,
    data: T,
    message: string
}

export type CreateCategoryResponse = ICategoriesApiResponse<Icategory>;
export type DeleteCategoryResponse = ICategoriesApiResponse<null>;
export type UpdateCategoryResponse = ICategoriesApiResponse<Icategory>;
export type AllCategoriesResponse = ICategoriesApiResponse<Icategory[]>;
