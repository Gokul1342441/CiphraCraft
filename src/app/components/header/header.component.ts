import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;

  closeDrawer() {
    if (this.drawerToggle.nativeElement.checked) {
      this.drawerToggle.nativeElement.checked = false;
    }
  }
  
}
