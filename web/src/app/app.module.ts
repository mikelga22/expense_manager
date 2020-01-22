import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/layout/navbar/navbar.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HistoryComponent} from './pages/history/history.component';
import {AddComponent} from './pages/add/add.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthComponent} from './pages/auth/auth.component';
import {
  NbActionsModule, NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbIconModule, NbInputModule,
  NbLayoutModule, NbRadioModule,
  NbSearchModule, NbSelectModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HistoryComponent,
    AddComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AngularFireAuthModule,
    NbThemeModule.forRoot({name: 'default'}),
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
    NbDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
