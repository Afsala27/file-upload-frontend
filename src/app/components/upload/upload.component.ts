import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Status } from 'src/app/models/status';
import { Upload } from 'src/app/models/upload';
//import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit{
  frm!: FormGroup
  imgFile?:File;
  status!:Status;
  comment!: string;
  caption!: string;
  Id!: string;
  //newuserid!: string;

  constructor(private uploadService:UploadService,
    private fb:FormBuilder, private toastr: ToastrService
    ){ }

    get f(){
      return this.frm.controls;
    }

    newuserid = localStorage.getItem('userid') as string;
    onPost(){

      if (!this.imgFile) {
        console.error('No file selected');
        this.toastr.warning('Please select the image');
        return;
      }

      //this.status={statusCode:0,message:"wait...."}

      console.log('caption:', this.frm.get('caption')?.value);
      console.log("comment:", this.frm.get('comment')?.value);
      console.log(this.newuserid);

      const formData: Upload = {
        ...this.frm.value,
        Id: this.newuserid,
        caption: this.frm.get('caption')?.value,
        comment: this.frm.get('comment')?.value,
        imgFile: this.imgFile
      };
      console.log(formData);
      // calling api service

      //let uploadSuccessful = false;

      this.uploadService.add(formData).subscribe({
        next:(res)=>{
          this.status=res;
          console.log(res)
          this.toastr.success('Upload successful');
          this.uploadService.reloadPage()
         //uploadSuccessful = true;
        },
        error:(err) =>{
          //this.status={statusCode:0, message:"error on server side"}
          console.log(err);
          this.toastr.error('Upload failed, Try again after sometime');
        }
      })
    }

    onChange(event:any){
      this.imgFile=event.target.files[0];
    }

  ngOnInit(): void {
    this.frm=  this.fb.group(
      {
        'ImgDataId':[0],
        //'ImageData':[''],
        //'VideoData':[''],
        'caption': ['',Validators.required],
        'comment':[''],
        //'DriveFileId':[''],
        'imgFile': [],
        //'userId':[2]
        //image api responce data
      }
    )
  }
}