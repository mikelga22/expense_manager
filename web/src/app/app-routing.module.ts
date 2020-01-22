import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoryComponent} from './pages/history/history.component';
import {AuthComponent} from './pages/auth/auth.component';
import {AuthGuard} from './core/guards/auth/auth.guard';


const routes: Routes = [
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  {
    path: '',
    redirectTo: '/history',
    pathMatch: 'full'
  },
  {path: 'auth/login', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
