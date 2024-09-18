import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http:HttpClient) { }
getApi(startDate:any, endDate:any){
  return this.http.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=3IY2Wi7MpBM6E5MjC2HpJWWdL5UxXgC1VuWf2CMY`);
  
}

}
