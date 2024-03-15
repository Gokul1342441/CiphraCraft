import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;
  // @ViewChild('themeDropdown') themeDropdown!: ElementRef<HTMLUListElement>;

  closeDrawer() {
    if (this.drawerToggle.nativeElement.checked) {
      this.drawerToggle.nativeElement.checked = false;
    }

 }

 showModalAndCloseDrawer(modalId: string) {
  this.closeDrawer();
  const modal = document.getElementById(modalId) as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
}
  
}
