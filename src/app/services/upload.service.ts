import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Upload } from '../models/upload';
import { environment } from '../../environments/environment';
import { Status } from '../models/status';
import { Observable, catchError } from 'rxjs';
import { Login } from '../models/login';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  imgFile?: File;
  private baseUrl = environment.baseUrl+'/api/ImageFiles/uploadimage';
  private apiUrl = environment.baseUrl+'/api/ImageFiles';
  private videoUrl = environment.baseUrl+'/api/VideoFiles';
  imgDataId!: number;

  add(data:Upload): Observable<any>{
    let formData = new FormData();
    formData.append("Id", data.Id);
    formData.append("caption", data.caption);
    formData.append("comment", data.comment);
    formData.append("imgFile", data.imgFile??"");

    const headers = new HttpHeaders();
   // headers.set('Content-Type', 'multipart/form-data');
    headers.delete('Content-Type'); // Clear existing Content-Type header
    headers.append('Content-Type', 'multipart/form-data');

    //console.log(formData);

    return this.http.post<any>(this.baseUrl, formData, { headers })
  }

  addvideo(data: Upload): Observable<any> {
    let formData = new FormData();
    formData.append("Id", data.Id);
    formData.append("caption", data.caption);
    formData.append("comment", data.comment);
    formData.append("videoFile", data.videoFile??"");

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post<any>('http://localhost:5073/api/VideoFiles/uploadvideo', formData, {headers})

  }

  edit(data:Upload): Observable<any> {
    let newformData = new FormData();
    //newformData.append("imgDataId", data.imgDataId);
    newformData.append("imgDataId", data.imgDataId.toString());
    newformData.append("caption", data.caption);
    newformData.append("comment", data.comment);
    //const headers = new HttpHeaders();
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.put<any>('http://localhost:5073/api/ImageFiles/edit', newformData, { headers});
  }
  // defining api calls here

  getAll(userid: string): Observable<any>{
    //const newid  = localStorage.getItem('userid');
    const url = `${this.apiUrl}/getallbyid/${userid}`;
    return this.http.get<Upload[]>(url)
  }

  getImageById(fileId: string): Observable<Upload> {
    const url = `${this.apiUrl}/getImage/${fileId}`;
    return this.http.get<Upload>(url);
  }

  getVideoById(fileId: string): Observable<Upload> {
    const url = `${this.videoUrl}/getVideo/${fileId}`;
    return this.http.get<Upload>(url);
  }

  deleteImageById(Id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5073/api/ImageFiles/delete/${Id}`);
  }


  downloadFileById(fileId:string): Observable<Blob> {
  //return this.http.get<Blob>(`http://localhost:5073/api/ImageFiles/downloadimage/${fileId}`);
  const url = `http://localhost:5073/api/ImageFiles/downloadimage/${fileId}`;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  downloadVideoById(fileId: string): Observable<Blob> {
    const url = `http://localhost:5073/api/VideoFiles/downloadvideo/${fileId}`;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }

  editImage(uploadData: Upload): Observable<any> {
    const url = 'http://localhost:5073/api/ImageFiles/edit';
    return this.http.put(url, uploadData);
  }

  reloadPage(){
    window.location.reload()
  }

  log(data: Login): Observable<any> {
    const url = 'http://localhost:5073/api/LoginApi/login';
    return this.http.post(url, data);
  }

  register(data: Register): Observable<any>{
    
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    //console.log(formData);

    return this.http.post<any>('http://localhost:5073/api/UserRegistration', formData, { headers })
  }


  constructor(private http:HttpClient) { }
}