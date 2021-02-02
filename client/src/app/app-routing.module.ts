import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShiftPageComponent } from './components/shift/smart/shift-page/shift-page.component';

const routes: Routes = [ // маршруты (пути для компонентов страниц)
  {
    path: '',
    component: ShiftPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
