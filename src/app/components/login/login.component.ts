import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { Register } from 'src/app/models/register';
import { Upload } from 'src/app/models/upload';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  frm!: FormGroup;
  form!: FormGroup;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, 
    private uploadServices: UploadService, private fb:FormBuilder,
    ) { }


    get f(){
      return this.frm.controls;
    }

  // onLogin() {

  //   const data: Login = {
  //     ...this.form.value,
  //     email: this.form.get('email')?.value,
  //     password: this.form.get('password')?.value,
  //   };
  //   //debugger;
  //   this.uploadServices.log(data).subscribe((res: any) => {
  //     console.log(res);
  //       if (res.token) {
  //         this.toastr.success('Login successful');
  //         localStorage.setItem('userid', res.id);
  //         localStorage.setItem('logintoken', res.token);
  //         this.router.navigate(['/add-upload']);
  //       } else {
  //         this.toastr.error("Username not found and/or password incorrect.");
  //         //console.log();
  //       }
  //     })
  // }

  onLogin() {
    const data: Login = {
      ...this.form.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.uploadServices.log(data).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.token) {
          this.handleSuccessfulLogin(res);
        } else {
          this.handleFailedLogin();
        }
      },
      error: (error) => {
        console.error(error);
        this.handleFailedLogin();
      }
    });
  }

  private handleSuccessfulLogin(res: any) {
    this.toastr.success('Login successful');
    localStorage.setItem('userid', res.id);
    localStorage.setItem('logintoken', res.token);
    this.router.navigate(['/add-upload']);
  }

  private handleFailedLogin() {
    this.toastr.error("Username not found and/or password incorrect.");
  }


  onRegister(){

    const data: Register ={
      ...this.frm.value,
      name: this.frm.get('name')?.value,
      email: this.frm.get('email')?.value,
      password: this.frm.get('password')?.value,
    }

    this.uploadServices.register(data).subscribe({
      next: (res) => {
        console.log(res)
        this.toastr.success('Register successful, Now try login');
        this.uploadServices.reloadPage();
      },
      error: (error) => {
        console.log(error);
        if (error.error && Array.isArray(error.error)) {
          // If error is an array, parse each error object and display the description
          error.error.forEach((err: { code: string, description: string }) => {
            this.toastr.error(err.description);
          });
        } else {
          // If error is not an array, display a generic error message
          this.toastr.error('An error occurred. Please try again later.');
        }
      }
    });

  }
  ngOnInit(): void {
    this.frm=  this.fb.group(
      {
        'name':[''],
        'email': [''],
        'password': ['']
      }
    ),
    this.form = this.fb.group(
      {
        'email': [''],
        'password': ['']
      }
    )
  }
}
