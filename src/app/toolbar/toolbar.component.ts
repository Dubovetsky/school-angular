import { Component, OnInit } from '@angular/core';
 
import { Router } from '@angular/router';
import { ParamOfSize } from '../ParamOfSize';
import { g_data, CoursesComponent} from '../courses/courses.component'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
  
})

export class ToolbarComponent implements OnInit {
  data: object = g_data;
  menuActive: boolean = false;
  constructor(private route: Router, private params: ParamOfSize) { 
  }
  mobilemode() {
    return this.params.mobilemode();
  }
  minimode() {
    return this.params.minimode();
  }
  menu(){
    this.menuActive = !this.menuActive;
  }
  clicker(){
    document.getElementById("hamburger").click();
    if(this.menuActive)
      this.menu();
  }
  pos_button(param: string) {
    if(CoursesComponent.assss==param){
      CoursesComponent.pos(param);
    }
  }
  ngOnInit() {
    
  }
  showLogo(){
    if(this.route.url==='/'){
      return false;
    }
   return true;
  } 

}