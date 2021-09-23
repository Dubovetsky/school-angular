import { Injectable } from '@angular/core';

@Injectable()
export class ParamOfSize {
    private mobilemode_: boolean;
    private minimode_: boolean;
    constructor() {    
        this.mobilemode_ = this.resizing(930);
        this.minimode_ = this.resizing(1150);
        window.onresize = (e) =>
        {
              this.mobilemode_ = this.resizing(930);
              this.minimode_ = this.resizing(1150);
        }; 
    }
    public mobilemode() {
        return this.mobilemode_;
    }
    public minimode() {
        return this.minimode_;
    }
    private resizing(size: number){
      if(window.innerWidth < size){
        return true;
      }
      return false;
    }
}