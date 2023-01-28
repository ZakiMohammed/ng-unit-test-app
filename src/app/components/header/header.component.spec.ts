import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('menu', () => {
    let eleNavBurger;
    let eleNavMenu;
    let isActiveBurger: boolean | undefined;
    let isActiveMenu: boolean | undefined;

    const getElementValues = () => {
      eleNavBurger = element.querySelector('.navbar-burger');
      eleNavMenu = element.querySelector('.navbar-menu');
      isActiveBurger = eleNavBurger?.classList.contains('is-active');
      isActiveMenu = eleNavMenu?.classList.contains('is-active');
    };

    it('should hide menu', () => {
      component.showMenu = true;

      component.hideMenu();

      fixture.detectChanges();
      getElementValues();

      expect(component.showMenu).toBeFalse();
      expect(isActiveBurger).toBeFalse();
      expect(isActiveMenu).toBeFalse();
    });

    describe('toggleMenu', () => {
      it('should toggle menu - hide if shown', () => {
        component.showMenu = true;

        component.toggleMenu();

        fixture.detectChanges();
        getElementValues();

        expect(component.showMenu).toBeFalse();
        expect(isActiveBurger).toBeFalse();
        expect(isActiveMenu).toBeFalse();
      });

      it('should toggle menu - show if hidden', () => {
        component.showMenu = false;

        component.toggleMenu();

        fixture.detectChanges();
        getElementValues();

        expect(component.showMenu).toBeTrue();
        expect(isActiveBurger).toBeTrue();
        expect(isActiveMenu).toBeTrue();
      });
    });
  });
});
