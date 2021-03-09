import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotepadComponent } from './components/notepad/notepad.component';


const routes: Routes = [
  {path: '', component: NotepadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
