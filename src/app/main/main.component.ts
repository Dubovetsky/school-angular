import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainDialogComponent } from './main.dialog.component';
import { DataService, JsoN } from '../data.service';
import { ParamOfSize } from '../ParamOfSize';
export interface array {
  opacity: boolean;
  url: string;
}
let logotype: string = "/images/logotype.svg";
let list: Array<array> = [
      {opacity: true, url: "/images/backgroung_berlin.jpg"}
    ];
var run: boolean = false;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  slogon: string = "Учись, живи, совершенствуйся";
  nameButton: string = "Хочу с вами";

  images: HTMLCollectionOf<HTMLImageElement>;
  images_active: Element;
  id: number = 0;

  logotype_: string = logotype;
  list_: Array<array> = list;
  constructor(public dialog: MatDialog, private data_: DataService, private params: ParamOfSize) {
    window.scrollTo(0,0); 
  }
  mobilemode() {
    return this.params.mobilemode();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MainDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.warn(result);
    });
  }
  
  public getBackgroung(){
        this.data_.getBackground().subscribe(data => {
          let json = <JsoN>data;
          let images_ = json.data;
          let size = images_.length;
          for(var i = 0; i < size; i++){
            var a = this.data_.getUrl() + images_[i].toString();
            var add: boolean = true;
            for(var b = 0; b < list.length; b++){
              if(list[b].url == a){
                add = false;
              }
            }
            if(add){
              this.addList(a);
            }
          }
        });
  }
  addList(url_img: string) {
    var item: array = {opacity: false, url: url_img};
    list.push(item);
  }
  ngOnInit() {
    let time = 10000;
    var a = () => {
      var flag: boolean = true;
      var size = list.length;
      for(var i = 0; i < size; i++){
        if(list[i].opacity && flag){
          flag = false;
          list[i].opacity = false;
          if(i < size-1)
            list[++i].opacity = true;
          else
            list[0].opacity = true;
        } else {
          list[i].opacity = false;
        }
      }
      setTimeout(a, time);
    };
    var b = () => {
      this.getBackgroung();
      setTimeout(b, time*6);
    };
    if(!run){
      run =  !run;
      setTimeout(b, time/2);
      setTimeout(a, time);
    }
  }

}

