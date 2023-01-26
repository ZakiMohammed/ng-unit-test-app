import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription, throwError } from 'rxjs';
import { mockPosts } from 'src/app/mocks/post.mock';
import { PostService } from 'src/app/services/post.service';
import { PostsComponent } from './posts.component';

describe('PostsComponent', () => {
  let fixture: ComponentFixture<PostsComponent>;
  let component: PostsComponent;
  let element: HTMLElement;

  let stubPostService = {
    getAll: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostsComponent],
      providers: [{ provide: PostService, useValue: stubPostService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get posts', () => {
      const spyGetAll = spyOn(component['postService'], 'getAll').and.returnValue(of(mockPosts));

      component.ngOnInit();

      expect(component.posts).toBeDefined();
      expect(component.posts?.length).toBeTruthy();
      expect(component.posts?.length).toEqual(3);
      expect(component.posts && component.posts[0].title).toEqual('Title 1');

      expect(spyGetAll).toHaveBeenCalled();
      expect(spyGetAll).toHaveBeenCalledTimes(1);
    });

    it('should get not posts incase of error', () => {
      const spyGetAll = spyOn(component['postService'], 'getAll').and.returnValue(throwError(() => new Error()));

      component.ngOnInit();

      expect(component.posts).toBeNull();
      expect(spyGetAll).toHaveBeenCalled();

      expect(spyGetAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe to get posts', () => {
      component.postsSubscription = new Subscription();

      const spyUnsubscribe = spyOn(component.postsSubscription, 'unsubscribe');

      component.ngOnDestroy();

      expect(spyUnsubscribe).toHaveBeenCalled();
      expect(spyUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
