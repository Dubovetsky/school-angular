import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tel-mail',
  templateUrl: './tel-mail.component.html',
  styleUrls: ['./tel-mail.component.scss']
})
export class TelMailComponent implements OnInit {
  tel: string;
  mail: string;
  constructor() {
    this.tel = "8-800-555-35-35";
    this.mail = "exemple@exemple.ru"
   }

  ngOnInit() {
  }

}
