import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog, ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { LkAccountComponent, input_data } from './lk.account.toolbar.component';
import { ParamOfSize } from '../ParamOfSize';
import { DataService, JsoN } from '../data.service';
var sha256 = require('sha256')
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-account-toolbar',
  templateUrl: './account.toolbar.component.html',
  styleUrls: ['./account.toolbar.component.scss']
})
export class AccountComponent implements OnInit {
  emailFormControl: any;
  passwordFormControl: any;
  matcher: any;

  logging: boolean= false;
  auth_window: boolean= false;
  lk_opened: boolean = false;
  warn_auth_window: boolean= false;
  note: number = 0;

  constructor(private params: ParamOfSize, private data_: DataService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl = new FormControl('');
  
    this.matcher = new MyErrorStateMatcher();
    localStorage.removeItem('note'); }

  ngOnInit() {
  }
  mobilemode() {
    return this.params.mobilemode();
  }
  minimode() {
    return this.params.minimode();
  }
  notifications() {
    return this.note;
  }
  lk() {
      if(this.lk_opened)return;
      let a: input_data = {
        data: this.getKey()
      }
      const dialogRef = this.dialog.open(LkAccountComponent, {data: a});
      dialogRef.afterClosed().subscribe(result => {
        this.lk_opened = false;
        if(result=="0"){
          this.delKey();
        }
      });
      this.lk_opened = true;
  }
  collback_note(){
    var a = () => {
      this.check(this.getKey()).then((res)=>{
        if(res){
          this.data_.lkData(this.getKey(),{getInfo: 0}).subscribe(data => {
            let json = <JsoN>data;
            if(json.meta == 'ok'){
              this.note = JSON.parse(json.data['note']);
            }
            else{
              if(this.getKey() != null){
                this.delKey();
                this.infomanager("Повторите вход");
              }
            }
          },
          success => {
            if(this.getKey() != null){
              this.delKey();
              this.infomanager("Ошибка подключения к серверу!");
            }
          });
          if(this.getKey() != null)
            setTimeout(a,30000);
        } else {
          this.delKey();
        }
      })
      .catch((err)=>{
        this.delKey();
      });
    };
    if(!localStorage.getItem('note')){
      localStorage.setItem('note','true');
      a();
    }
    return true;
  };
  account() {
    var a: string = this.getKey();
    if(a == null){
      this.auth_window = !this.auth_window;
      return;
    }
    this.check(a).then((res)=>{
      if(res){
        this.lk();
        if(!localStorage.getItem('note'))this.collback_note();
      } else {
        this.delKey();
        this.warn_auth_window = false;
        this.account();
      }
    })
    .catch((err)=>{
      this.delKey();
      this.warn_auth_window = false;
      this.account();
    });
  }
  getKey():string {
    //var name = 'certificate';
    //var matches = document.cookie.match(new RegExp(
    //  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    //));
    //return matches ? decodeURIComponent(matches[1]) : undefined;
    return localStorage.getItem('certificate');
  }
  delKey(){
    this.note = 0;
    //document.cookie = 'certificate= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('certificate');
  }
  check(str:string){
    if(str == null)
      return new Promise((resolve)=>{return resolve(false);});
    return new Promise((resolve)=>{
      this.data_.auth_check(str).subscribe(data => {
        let json = <JsoN>data;
        if(json.meta == 'ok'){
          this.logging = false;
          //document.cookie = 'certificate='+str; //str+"; expires= Thu, 21 Aug 2014 20:00:00 UTC"
          if(this.auth_window){
            localStorage.setItem('certificate',str);
            localStorage.removeItem('note');
            this.collback_note();
            this.auth_window = !this.auth_window;
            this.account();
          };
          return resolve(true);
        }
        else{
          this.logging = false;
          var a: string = this.getKey();
          if(a != null){
            if(this.auth_window)this.warn_auth_window = true;
            this.delKey();
            this.infomanager("Повторите вход");
          }
          //this.account();
          return resolve(false);
        }
      },
      success => {
        this.logging = false;
        this.warn_auth_window = true;
        this.infomanager("Ошибка подключения к серверу!");
        return resolve(false);
      });
    });
  }
  infomanager(str:string, f: boolean = false){
    var action: string = '';
    if(f) action = '!';
    this.snackBar.open(str, action, {
      duration: 3000,
    });
  }
  enter() {
    if(!this.emailFormControl.value || this.emailFormControl.hasError('email'))this.warn_auth_window = true;
    if(!this.passwordFormControl.value)this.warn_auth_window = true;
    var login = sha256(this.emailFormControl.value);
    var pass = sha256(this.passwordFormControl.value);
    this.data_.auth(login, pass).subscribe(data => {
      let json = <JsoN>data;
      if(json.meta == 'ok'){
        this.check(json.data.toString());
      }
      else{
        this.logging = false;
        this.warn_auth_window = true;
      }
    },
    success => {
      this.logging = false;
      this.warn_auth_window = true;
    });
    this.logging = true;
  }
  warning_auth_window() {
    this.warn_auth_window = false;
  }
  warning_auth_info() {
    return "Неправильный Email или пароль!";
  }
  isNotifications() {
    if(this.notifications() > 0)
      return false;
    return true;
  }

}
