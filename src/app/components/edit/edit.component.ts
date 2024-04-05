import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Upload } from 'src/app/models/upload';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  uploadedData!: Upload;
  message!: string;
  frm!: FormGroup
  id!: number;

  constructor(private uploadService: UploadService,  
    private fb:FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) { }


  get f(){
    return this.frm.controls;
  }


  editUpload() {

    const newformData: Upload = {
      ...this.frm.value,
      //imgDataId: this.id,
      caption: this.frm.get('caption')?.value,
      comment: this.frm.get('comment')?.value,
    };

    newformData.imgDataId = this.id;

    console.log(newformData);

    this.uploadService.edit(newformData).subscribe({
      next:(res)=>{
        this.message = "Edit successful";
        console.log(res)
        this.toastr.success("Edited succesfull")
        this.uploadService.reloadPage();
      },
      error:(err) =>{
        this.message = "Error occurred during upload";
        console.log(err);
        this.toastr.error("Error while editing")
      }
    })
  }

  goBack(){
    this.router.navigate(['/display']);
  }
  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam !== null) {
        this.id = +idParam;
      } else {
            // handle error here
      }

    this.frm=  this.fb.group(
      {
        'imgDataId':[0],
        'caption': ['', Validators.required],
        'comment':[''],
        //image api responce data
      }
    )
  }
}
