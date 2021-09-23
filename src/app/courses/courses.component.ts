import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Event, Scroll, NavigationEnd } from '@angular/router';
import { ParamOfSize } from '../ParamOfSize';
let g_a: boolean = true;
interface map {
  fragment: string,
  text: string
}
export let g_data: Array<map> =[
  {fragment:"a1",text:"A1"},
  {fragment:"a2",text:"A2"},
  {fragment:"b1",text:"B1"},
  {fragment:"b2",text:"B2"},
  {fragment:"c1",text:"C1"},
  {fragment:"c2",text:"C2"},
  {fragment:"price",text:"Цены"}
];
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  static assss: string;
  data: Array<map> = g_data;
  constructor(private router: Router, private params: ParamOfSize) {
    if(g_a)
    this.router.events.subscribe((event: Event) => {
      g_a = false;
      if(event instanceof Scroll) {
          if(event.routerEvent.url.search('/courses') == 0) {
            setTimeout(()=>{
              CoursesComponent.assss=event.anchor;
              CoursesComponent.pos(event.anchor);
            },200);
          }
        }
    });
  }

  static pos(param: string) {
      if(param==null){
        param = "a1";
      }
      const elem = document.querySelector("#"+param);
      const yCoordinate = elem.getBoundingClientRect().top + window.pageYOffset;
      const yOffset = -45; 
      window.scrollTo({
           top: yCoordinate + yOffset,
           behavior: 'smooth'
      });    
  }
  pos_button(param: string) {
    if(CoursesComponent.assss==param)
      CoursesComponent.pos(param);
    
}

  mobilemode() {
    return this.params.mobilemode();
  }

  ngOnInit() {
  }

}
