import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface JsoN {
  meta: string,
  data: Array<any>[]
}

let port: string = ":8850/";
if (environment.production) {
  port = ":8000/"
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url: string = window.location.protocol + "//" + window.location.hostname + port;

  constructor(private http: HttpClient) { }
  
  auth(crc: string, certificate: string){      
    return this.http.post(this.getUrl() + 'auth', {crc: crc, certificate: certificate});            
  }
  auth_check(coocke: string){      
    return this.http.post(this.getUrl() + 'authcheck', {cookie: coocke});            
  }
  lkData(coocke: string, a: any){//add key
    return this.http.post(this.getUrl() + 'lkdata', {cookie: coocke, data: a});            
  }
  getData(id_post: number) {
    var url = this.url + 'getblogcontent/post='+id_post.toString();
    return this.http.get(url);
  }
  getBackground() {
    var url = this.url + 'getbackground';
    return this.http.get(url);
  }
  getUrl() {
    return this.url;
  }
}
