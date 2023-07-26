import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountrySearchComponent } from './country-search/country-search.component';

const routes: Routes = [

  { path: '', component: CountrySearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
