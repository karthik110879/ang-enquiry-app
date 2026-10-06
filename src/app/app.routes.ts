import { Routes } from '@angular/router';
import { NewEnquiry } from './components/new-enquiry/new-enquiry';
import { StatusMaster } from './components/status-master/status-master';
import { CategoryMaster } from './components/category-master/category-master';
import { EnquiryList } from './components/enquiry-list/enquiry-list';
import { Login } from './components/login/login';
import { AuthLayout } from './components/auth-layout/auth-layout';

export const routes: Routes = [


    {
        path: '',
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'new-enquiry', pathMatch: 'full' },
            { path: 'new-enquiry', component: NewEnquiry, },
            { path: 'status', component: StatusMaster },
            { path: 'category', component: CategoryMaster },
            { path: 'enquiry-list', component: EnquiryList },
        ]
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '**',
        redirectTo: 'new-enquiry'
    }
];
