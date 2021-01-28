import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShiftCreateComponent } from './components/shift-create/shift-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    ShiftCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  entryComponents: [ShiftCreateComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
