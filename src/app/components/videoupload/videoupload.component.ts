import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/models/status';
import { Upload } from 'src/app/models/upload';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-videoupload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './videoupload.component.html',
  styleUrls: ['./videoupload.component.css']
})
export class VideouploadComponent implements OnInit {

  frm!: FormGroup
  status!: Status;
  videoFile?: File;
  Id!: string;



  constructor(private uploadService: UploadService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService
    ) { }

  get f(){
    return this.frm.controls;
  }

  newuserid = localStorage.getItem('userid') as string;

  onPost(){

    if (!this.videoFile) {
      console.error('No file selected');
      this.toastr.warning('Please select the video');
      return;
    }
    
    console.log(this.newuserid);

    const formData: Upload = {
      ...this.frm.value,
      Id: this.newuserid,
      caption: this.frm.get('caption')?.value,
      comment:this.frm.get('comment')?.value,
      videoFile: this.videoFile
    };

    console.log(formData);

    this.uploadService.addvideo(formData).subscribe({
      next:(res)=>{
        this.status=res;
        console.log(res)
        this.toastr.success("Upload succesful")
        this.uploadService.reloadPage()
      },
      error:(err) =>{
        this.status={statusCode:0, message:"error on server side"}
        console.log(err);
        this.toastr.error("Upload failed, Try again after sometime")
      }
    })
  }

  onChange(event: any){
  this.videoFile=event.target.files[0];
  }

  ngOnInit(): void {
    this.frm =  this.formBuilder.group(
      {
        'ImgDataId': [0],
        'caption': ['', Validators.required],
        'comment': [''],
        'videoFile': [],
      }
    );
  }
}
