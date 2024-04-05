import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadComponent } from './components/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//import { ToastrModule } from 'ngx-toastr';
import { provideToastr } from 'ngx-toastr'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UploadComponent,
    HttpClientModule, // http client calls
    ReactiveFormsModule, // reactive form
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'demo-app';
}
