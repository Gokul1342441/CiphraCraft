import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { EncoderDecoderComponent } from './encoder-decoder/encoder-decoder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http'; 
import { EncryptionComponent } from './encryption/encryption.component'; // Import ReactiveFormsModule
// main.ts or app.module.ts
import '@andypf/json-viewer';

// primeng
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CdnurltofileComponent } from './components/cdnurltofile/cdnurltofile.component';
import { JsonTreeComponent } from './json-tree/json-tree.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    // EncoderDecoderComponent,
    HeaderComponent,
    FooterComponent,
    EncryptionComponent,
    CdnurltofileComponent,
    JsonTreeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // primeng
    SidebarModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule
    
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
