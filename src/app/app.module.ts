import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CoursesComponent } from './courses/courses.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ContactComponent } from './contact/contact.component';
import { A1Component } from './courses/a1/a1.component';
import { B1Component } from './courses/b1/b1.component';
import { C1Component } from './courses/c1/c1.component';
import { A2Component } from './courses/a2/a2.component';
import { B2Component } from './courses/b2/b2.component';
import { C2Component } from './courses/c2/c2.component';
import { PriceComponent } from './courses/price/price.component';
import { TelMailComponent } from './contact/tel-mail/tel-mail.component';
import { AccountComponent } from './toolbar/account.toolbar.component';
import { LkAccountComponent } from './toolbar/lk.account.toolbar.component';
import { ParamOfSize } from './ParamOfSize';
import { SafeHtml } from './blog/SafeHtml'
import { BasementComponent } from './basement/basement.component';
import { TermsofuseComponent } from './basement/termsofuse/termsofuse.component';
import { PrivacypolicyComponent } from './basement/privacypolicy/privacypolicy.component'
import { MainDialogComponent } from './main/main.dialog.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { 
  MatMenuModule, 
  MatButtonModule, 
  MatCardModule, 
  MatSidenavModule,
  MatToolbarModule, 
  MatSnackBarModule,
  MatDialogModule,
  MatInputModule,
  MatExpansionModule,
  MatSelectModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatBadgeModule
} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CoursesComponent,
    AboutComponent,
    BlogComponent,
    ToolbarComponent,
    ContactComponent,
    A1Component,
    B1Component,
    C1Component,
    A2Component,
    B2Component,
    C2Component,
    PriceComponent,
    TelMailComponent,
    BasementComponent,
    TermsofuseComponent,
    MainDialogComponent,
    PrivacypolicyComponent,
    SafeHtml,
    AccountComponent,
    LkAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TextMaskModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollDispatchModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    MatBadgeModule
  ],
  providers: [
    ParamOfSize
  ],
  bootstrap: [AppComponent],
  entryComponents: [MainComponent, MainDialogComponent, LkAccountComponent]
})
export class AppModule { }


