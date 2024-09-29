import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptionComponent } from './encryption/encryption.component';
import { EncoderDecoderComponent } from './encoder-decoder/encoder-decoder.component';
const routes: Routes = [
  {path:'encoder',component:EncoderDecoderComponent},
  { path: '', redirectTo: '/encryption', pathMatch: 'full' },
  { path: 'encryption', component: EncryptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
