import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { combineLatest, of, ReplaySubject } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  const mockData = {
    title: 'Register',
    icon: 'coffee',
  } as any;
  const mockRoutesRecognized = {
    state: {
      root: {
        firstChild: {
          data: mockData,
        },
      },
    },
  } as RoutesRecognized;
  const eventSubject = new ReplaySubject<RouterEvent>(1);
  const stubRouter = {
    events: eventSubject.asObservable(),
  } as Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: Router, useValue: stubRouter }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    eventSubject.next(new RoutesRecognized(1, 'posts', '', mockRoutesRecognized.state));
    expect(component.title).toEqual(mockData.title);
    expect(component.icon).toEqual(mockData.icon);
  });
});
