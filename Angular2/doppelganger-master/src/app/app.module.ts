import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { FaceComponent } from './face/face.component';
import { FaceService } from './face/face.service';
import { FullpageDirective } from './shared/directives/fullpage.directive';

@NgModule({
  declarations: [AppComponent, FaceComponent, FullpageDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [FaceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
