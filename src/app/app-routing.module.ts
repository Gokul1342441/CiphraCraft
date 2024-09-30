import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptionComponent } from './encryption/encryption.component';
// import { EncoderDecoderComponent } from './encoder-decoder/encoder-decoder.component';

const routes: Routes = [
  { path: '', redirectTo: '/encryption', pathMatch: 'full' },
  { path: 'encryption', component: EncryptionComponent },
  // Uncomment this line if you want to add more routes in the future
  // { path: 'encoder-decoder', component: EncoderDecoderComponent },
  { path: '**', redirectTo: '/encryption' } // Redirect any unknown path to /encryption
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
