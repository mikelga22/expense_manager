import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {environment} from "../environments/environment";

import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {NavbarComponent} from "./shared/layout/navbar/navbar.component";
import {FooterComponent} from "./shared/layout/footer/footer.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AddComponent} from "./pages/add/add.component";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AuthComponent} from "./pages/auth/auth.component";
import { NgxEchartsModule } from "ngx-echarts";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbRadioModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule,
  NbWindowModule,
} from "@nebular/theme";
import {NbEvaIconsModule} from "@nebular/eva-icons";
import { PieChartComponent } from "./pages/dashboard/charts/pie-chart.component";
import {BarChartComponent} from "./pages/dashboard/charts/bar-chart.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DashboardComponent,
    AddComponent,
    AuthComponent,
    PieChartComponent,
    BarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AngularFireAuthModule,
    NbThemeModule.forRoot({name: "default"}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbActionsModule,
    NbUserModule,
    NbSearchModule,
    NbIconModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbRadioModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
    NbWindowModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts")
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddComponent,
  ],
})
export class AppModule {
}
