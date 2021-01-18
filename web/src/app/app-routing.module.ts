import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AngularFireAuthGuard, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthComponent} from "./pages/auth/auth.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/auth/login"]);

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full"
  },
  {path: "auth/login", component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
