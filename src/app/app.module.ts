import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HostsComponent } from './hosts/hosts.component';
import { SortPipe } from './sort.pipe';
import { NagiosService } from './nagios.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HostsComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [NagiosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
