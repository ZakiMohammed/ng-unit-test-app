import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let fixture: ComponentFixture<FormComponent>;
  let component: FormComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should reset', () => {
    component.reset();

    expect(component.mobile).toEqual('');
    expect(component.message).toEqual('');
    expect(component.error).toBeFalse();
  });

  it('should cancel', () => {
    component.cancel();

    expect(component.message).toEqual('');
    expect(component.error).toBeFalse();
  });

  describe('validate', () => {
    it('should return false if mobile is empty', () => {
      const message = 'Please enter mobile number';
      component.mobile = '';

      const result = component.validate();

      expect(result).toBeFalse();
      expect(component.message).toEqual(message);
      expect(component.error).toBeTrue();

      fixture.detectChanges();

      const eleMessageBody = element.querySelector('.message-body');

      expect(eleMessageBody?.textContent).toContain(message);
    });

    it('should return false if mobile is invalid', () => {
      const message = 'Please provide a valid mobile number';
      component.mobile = '222';

      const result = component.validate();

      expect(result).toBeFalse();
      expect(component.message).toEqual(message);
      expect(component.error).toBeTrue();

      fixture.detectChanges();
      
      const eleMessageBody = element.querySelector('.message-body');

      expect(eleMessageBody?.textContent).toContain(message);
    });

    it('should return false if mobile is invalid', () => {
      const message = 'Please provide a valid mobile number';
      component.mobile = '+919988227711';

      const result = component.validate();

      expect(result).toBeFalse();
      expect(component.message).toEqual(message);
      expect(component.error).toBeTrue();

      fixture.detectChanges();
      
      const eleMessageBody = element.querySelector('.message-body');

      expect(eleMessageBody?.textContent).toContain(message);
    });

    it('should return true if mobile is valid', () => {
      const message = '';
      component.mobile = '9988778877';

      const result = component.validate();

      expect(result).toBeTrue();
      expect(component.message).toEqual(message);
      expect(component.error).toBeFalse();

      fixture.detectChanges();
      
      const eleMessageBody = element.querySelector('.message-body');

      expect(eleMessageBody).toBeFalsy();
    });
  });

  describe ('submit', () => {
    it ('should not submit if not validated', () => {
      const spyValidate = spyOn(component, 'validate').and.returnValue(false)

      component.submit();

      expect(spyValidate).toHaveBeenCalled();
    });

    it ('should submit if validated', () => {
      const message = 'Submitted successfully';
      const spyValidate = spyOn(component, 'validate').and.returnValue(true)

      component.submit();

      expect(spyValidate).toHaveBeenCalled();
      expect(component.mobile).toEqual('');
      expect(component.message).toEqual(message);
      expect(component.error).toBeFalse();
    });
  });
});
