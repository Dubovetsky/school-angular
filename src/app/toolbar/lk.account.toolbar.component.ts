import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService, JsoN } from '../data.service';
import { MatSnackBar } from '@angular/material';
export interface input_data{
  data: string
}
@Component({
  selector: 'app-lk-account-toolbar',
  templateUrl: './lk.account.toolbar.component.html',
  styleUrls: ['./lk.account.toolbar.component.scss']
})
export class LkAccountComponent {
  ID: string;
  name: string;
  constructor(
    private snackBar: MatSnackBar,
    private data_: DataService,
    public dialogRef: MatDialogRef<LkAccountComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: input_data) {
      this.ID = data.data;
      
      var a: string = this.getKey();
      if(a == null){
        return;
      }
      this.check(a).then((res)=>
      {
        if(res){
          this.data_.lkData(this.ID,{getInfo: 1}).subscribe(data => {
            let json = <JsoN>data;
            if(json.meta == 'ok'){
              console.log(json.data);
            }
            else{
              var a: string = this.getKey();
              if(a != null){
                this.delKey();
                this.exit();
                this.infomanager("Повторите вход");
              }
            }
          },
          success => {
            this.delKey();
            this.exit();
            this.infomanager("Ошибка подключения к серверу!");
          });
        } else {
          this.delKey();
          this.exit();
        }
      })
    }
  exit() {
    this.dialogRef.close("0");
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
    //document.cookie = 'certificate= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('certificate');
  }
  check(str:string){
    let a = new Promise((resolve)=>{
      this.data_.auth_check(str).subscribe(data => {
        let json = <JsoN>data;
        if(json.meta == 'ok'){
          return resolve(true);
        }
        else{
          var a: string = this.getKey();
          if(a == null){
            this.delKey();
            this.infomanager("Повторите вход");
          } else {
          }
          return resolve(false);
        }
      },
      success => {
        this.infomanager("Ошибка подключения к серверу!");
        return resolve(false);
      });
    });
    return a;
  }
  infomanager(str:string, f: boolean = false){
    var action: string = '';
    if(f) action = '!';
    this.snackBar.open(str, action, {
      duration: 3000,
    });
  }
}
