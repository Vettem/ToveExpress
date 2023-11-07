import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeDeliveryPage } from './home-delivery.page';

describe('HomeDeliveryPage', () => {
  let component: HomeDeliveryPage;
  let fixture: ComponentFixture<HomeDeliveryPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(HomeDeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
