import { Routes } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { DisplayComponent } from './components/display/display.component';
import { EditComponent } from './components/edit/edit.component';
import { VideouploadComponent } from './components/videoupload/videoupload.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [{
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
},
{
    path:'login',
    component: LoginComponent
},
{
    path:'',
    component:LayoutComponent,
    children: [
        {
            path: 'add-upload',
            component: UploadComponent
        },
        {
            path:'videoupload',
            component:VideouploadComponent

        },
        {
            path: 'display',
            component: DisplayComponent
        },
        {
            path: 'edit/:id',
            component: EditComponent
        }
    ]

}
];
