import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
 
@Injectable({
 providedIn: 'root'
})
export class UploadService {
 
 constructor(
   private httpClient: HttpClient,
 ) { }
 
 public uploadfile(file: File,number:number,selectedOption:string) {
   let formParams = new FormData();
   formParams.append('file', file)
   formParams.append('number', JSON.stringify(number))
   formParams.append('period', JSON.stringify(selectedOption))   
   return this.httpClient.post('http://localhost:5000', formParams)
 }
}