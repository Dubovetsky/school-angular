import { Component, OnInit } from '@angular/core';
import { DataService, JsoN } from '../data.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  id_post: number = 0;
  download: boolean = true;
  jsondata: JsoN;
  jsondata_bool: string = "calc(100vh - 92px)";
  jsondata_: boolean = false;
  constructor(private data_: DataService) {
    window.scrollTo(0,0);
    window.onscroll = () => {
      var a = window.pageYOffset;
      var b = document.documentElement.scrollHeight - document.documentElement.clientHeight - 2;
      if(this.download){
        if (a>b){
          this.downloading(this.id_post + 1);
        }
      }
    }
  }
  downloading(i:number) {
    this.download = false;
    this.data_.getData(i).subscribe(data => {
        let json = <JsoN>data;
        console.log(json);
        if(this.jsondata != null){
          Array.prototype.push.apply(this.jsondata.data, json.data);
          this.jsondata.meta = json.meta;
        } else {
          this.jsondata = json;
        }
        this.jsondataRastr();
        this.download = true;
        if(json.data.length > 0)
          this.id_post = i;
      });
  }
  jsondataRastr(){
    if(this.jsondata.data.length > 0)
      this.jsondata_ = true;
    if(this.jsondata.data.length > 2)
      this.jsondata_bool = "10px";
    if(this.jsondata.data.length == 2)
      this.jsondata_bool = "calc(100vh - 672px)";
    if(this.jsondata.data.length == 1)
      this.jsondata_bool = "calc(100vh - 382px)";
  }
  ngOnInit() {
    this.downloading(this.id_post);
  }

}