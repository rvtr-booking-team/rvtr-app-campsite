import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, LayoutModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
