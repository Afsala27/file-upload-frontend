import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Upload } from 'src/app/models/upload';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  imageUrls: string[] = [];
  upload!:Upload[];
  uploads!:Upload ;
  newUpload: Upload[] = [];
  userId!:string;



  imageBaseUrl=environment.baseUrl+'api/ImageFiles/getImage/';

  //newUrl = environment.baseUrl+'api/ImageFiles/'
  constructor(private uploadService:UploadService,
     private router: Router,
     private toastr: ToastrService
     ) { }
  getUploads(){
    const userId = localStorage.getItem('userid') as string;

    this.uploadService.getAll(userId).subscribe({
      next:(resp)=>{
        this.upload=resp;
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error("Something went wrong try again later");
      }
    })
  }

  fetchUploadDetails(): void {
    const fileId = this.uploads.fileId;
    this.uploadService.getImageById(fileId).subscribe({
      next: (uploadDetails: Upload) => {
       console.log(uploadDetails)
       this.deleteImageById(uploadDetails.imageFileId);
      },
      error: (err) => {
        console.error('Error fetching upload details:', err);
      }
    });
  }

  getImageUrl(fileId: string): string {
    return `http://localhost:5073/api/ImageFiles/getImage/${fileId}`;
  }

  getVideoUrl(fileId: string): string {
    return `http://localhost:5073/api/VideoFiles/getVideo/${fileId}`;
  }

  deleteImageById(Id: number): void {
    this.uploadService.deleteImageById(Id).subscribe({
      next: () => {
        //console.log('Image deleted successfully');
        //const fileId = this.uploads.fileId;
        //this.newUpload = this.newUpload.filter((newUpload: Upload) => newUpload.imageFileId!== Id);
        //this.fetchUploadDetails();
        this.toastr.success("Image deleted succesfully");
        this.uploadService.reloadPage()
      },
      error: (err) => {
        console.error('Error deleting image:', err);
        this.toastr.error("Something went wrong");
      }
    });
  }


  addComment(id: number){
    this.router.navigate(['/edit', id]);
  }


downloadFile(fileId: string): void {
  this.uploadService.downloadFileById(fileId).subscribe({
    next: (res: Blob) => {
      console.log(res);
      // Create a blob URL for the response blob
      const blobUrl = URL.createObjectURL(res);
      // Use FileSaver to save the blob as a file
      saveAs(blobUrl, "downloaded_file.png");
      //this.toastr.success('File downloaded succesfully')
    },
    error: (err) => {
      console.error('Error downloading image:', err);
      this.toastr.error("Something went wrong");
    }
  });
}

downloadVideoFile(fileId: string): void {
  this.uploadService.downloadVideoById(fileId).subscribe({
    next: (res: Blob) => {
      console.log(res);
      const blobUrl = URL.createObjectURL(res);
      saveAs(blobUrl, "downloaded_file.mp4");
      this.toastr.success('File downloaded succesfully')
    },
    error: (err) => {
      console.error('Error downloading video:', err);
      this.toastr.error("Something went wrong");
    }
  })
  //const newid  = localStorage.getItem('userid')
}


  ngOnInit(): void {
    this.getUploads();
    //this.getImages();
    this.fetchUploadDetails();
  }
}
