import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InteractiveMapComponent } from './components/interactive-map/interactive-map.component';

const routes: Routes = [
  {path: '', component: InteractiveMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
