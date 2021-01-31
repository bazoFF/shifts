import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShiftPageComponent } from './components/shift/smart/shift-page/shift-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShiftCreateComponent } from './components/shift/smart/shift-create/shift-create.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShiftsListComponent } from './components/shift/dumb/shifts-list/shifts-list.component';
import { HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { LoadingComponent } from './components/shared/dumb/loading/loading.component';
import { DateTimePickerComponent } from './components/shared/dumb/date-time-picker/date-time-picker.component';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    ShiftPageComponent,
    ShiftCreateComponent,
    ShiftsListComponent,
    LoadingComponent,
    DateTimePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false, delay: 700 }
    )
  ],
  entryComponents: [ShiftCreateComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
