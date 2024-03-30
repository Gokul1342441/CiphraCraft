import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncoderDecoderComponent } from './encoder-decoder/encoder-decoder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EncryptionComponent } from './encryption/encryption.component'; // Import ReactiveFormsModule

// primeng
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    EncoderDecoderComponent,
    HeaderComponent,
    FooterComponent,
    EncryptionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // primeng
    SidebarModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
