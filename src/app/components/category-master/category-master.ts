import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { map, Observable } from 'rxjs';
import { CreateCategoryResponse, Icategory } from '../../models/categories.model';
import { form, FormField, required } from '@angular/forms/signals';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-master',
  imports: [CommonModule, AsyncPipe, FormField],
  templateUrl: './category-master.html',
  styleUrl: './category-master.css',
})
export class CategoryMaster implements OnInit {
   //services
   private apiService= inject(ApiService);
   private cd = inject(ChangeDetectorRef);
 
   allCategoriesObs$!: Observable<Icategory[]>;
   isEdited = signal<boolean>(false);
  
   categoriesList = signal<Icategory[]>([]);
   
 
   //form 
   addCategoryFormData = signal<Icategory>({
     categoryName:'' ,
     isActive: true,
     categoryId: 0
   })
 
 
   ngOnInit(): void {
     this.getAllCategories()
   }
 
   //create the form
   addCategoryForm = form(this.addCategoryFormData, (schemaPath) => {
     required(schemaPath['categoryName'], {message: "Need to enter a category name"})
   })
 
   getAllCategories() {
     this.allCategoriesObs$ = this.apiService.getCategories().pipe(map(x => x.data))
    //  this.categoriesList.set(this.allCategoriesObs$)
   }
 
   private updateCategoryList() {
     this.getAllCategories()
     this.cd.markForCheck()
   }
  
   onSaveCategory() {
     if(this.addCategoryForm().valid()) { 
       const formValues = this.addCategoryForm().value();
       console.log('formValues', formValues);
       this.apiService.createCategory(formValues).subscribe({
         next: (res:CreateCategoryResponse) => {
           console.log('Created ==> ', res);  
           if(res.result) { 
             this.updateCategoryList();
             this.onClear();
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
 
   onEditCategory(category:Icategory) {
     console.log('Edit category', category);
     this.addCategoryFormData.set({
      categoryName: category.categoryName,
      isActive: category.isActive,
      categoryId: category.categoryId,
    });
     this.isEdited.set(true);
       
   }
 
   onClear() {
     this.addCategoryFormData.set({
       categoryName: '',
       categoryId: 0,
       isActive: true
     })
     this.isEdited.set(false);
   }
 
 
   onDeleteCategory(category:Icategory) {
     console.log('Delete category', category);
     this.apiService.deleteCategory(category.categoryId).subscribe({
       next:(res) => {
         console.log(res.message); 
         this.updateCategoryList();
       },
       error: (err) => {
         console.log(err)
       }
     })
   }
}
