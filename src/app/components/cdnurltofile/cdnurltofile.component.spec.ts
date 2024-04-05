import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdnurltofileComponent } from './cdnurltofile.component';

describe('CdnurltofileComponent', () => {
  let component: CdnurltofileComponent;
  let fixture: ComponentFixture<CdnurltofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdnurltofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CdnurltofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
