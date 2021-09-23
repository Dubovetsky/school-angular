import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { ErrorStateMatcher} from '@angular/material/core';
import { ElementRef } from '@angular/core'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export interface DialogData {
  name: string;
  email: string;
  number: string;
}
@Component({
  selector: 'app-main-dialog',
  templateUrl: './main.dialog.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainDialogComponent {
  focus_: boolean = true;
  @ViewChild('named', { read: ElementRef, static: true }) elementRef: ElementRef
  reffocus() {
    if(this.focus_){
      this.focus_ = !this.focus_;
      setTimeout(() =>{
      this.elementRef.nativeElement.focus();},300);
    }
      return true;
  }
  
  text: string = "Давай учится в месте с нами";
  emailFormControl: any;
  matcher: any;
  public data_form: DialogData = {name: "", email: "", number: ""}
  constructor(public dialogRef: MatDialogRef<MainDialogComponent>) {
      this.emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    
      this.matcher = new MyErrorStateMatcher();
     }
  getMask():{
    mask: Array<string | RegExp>;
    keepCharPositions: boolean;
  } {
    return {
      mask: ['+','7','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      keepCharPositions: true
  };}
  data_former(){
    this.data_form.email = this.emailFormControl.value;
    return this.data_form;
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
