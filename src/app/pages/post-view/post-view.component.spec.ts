import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription, throwError } from 'rxjs';
import { mockPost, mockPosts } from 'src/app/mocks/post.mock';
import { PostService } from 'src/app/services/post.service';
import { PostViewComponent } from './post-view.component';

describe('PostViewComponent', () => {
  let fixture: ComponentFixture<PostViewComponent>;
  let component: PostViewComponent;
  let element: HTMLElement;

  const stubPostService = {
    get: (id: number) => of(null),
  };
  const stubActivatedRoute = { snapshot: { params: { id: 0 } } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostViewComponent],
      providers: [
        { provide: PostService, useValue: stubPostService },
        { provide: ActivatedRoute, useValue: stubActivatedRoute },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get post', () => {
      component.id = 1;

      const spyGet = spyOn(component['postService'], 'get').and.returnValue(of(mockPost));

      component.ngOnInit();

      expect(component.post).toBeDefined();
      expect(component.post).toBeTruthy();
      expect(component.post?.title).toEqual('Title 1');

      expect(spyGet).toHaveBeenCalled();
      expect(spyGet).toHaveBeenCalledTimes(1);
    });

    it('should not get post incase of error', () => {
      component.id = 1;

      const spyGet = spyOn(component['postService'], 'get').and.returnValue(throwError(() => new Error()));

      component.ngOnInit();

      expect(component.post).toBeNull();
      expect(component.post).toBeFalsy();

      expect(spyGet).toHaveBeenCalled();
      expect(spyGet).toHaveBeenCalledTimes(1);
    });

    it('should not get post incase of invalid id', () => {
      component.id = 'invalid id coming from url' as any;

      const spyGet = spyOn(component['postService'], 'get').and.returnValue(of(mockPost));

      component.ngOnInit();

      expect(component.post).toBeNull();
      expect(component.post).toBeFalsy();
      expect(component.errorMessage).toEqual('Oops! Post not found');

      expect(spyGet).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe to get posts', () => {
      component.postSubscription = new Subscription();

      const spyUnsubscribe = spyOn(component.postSubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(spyUnsubscribe).toHaveBeenCalled();
      expect(spyUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
