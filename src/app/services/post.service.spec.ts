import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { mockPost, mockPosts } from '../mocks/post.mock';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  const stubHttpClient = {
    get: (url: string) => of(null),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: stubHttpClient }],
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should get all posts', () => {
      const spyGetAll = spyOn(service['http'], 'get').and.returnValue(of(mockPosts));

      service.getAll().subscribe(posts => {
        expect(posts).toBeTruthy();
        expect(posts.length).toBeGreaterThan(1);
        expect(posts[0].title).toEqual('Title 1');
        expect(spyGetAll).toHaveBeenCalled();
      });
    });

    it('should not get all posts incase of error', () => {
      const errorMessage = 'Some server error';
      const spyGetAll = spyOn(service['http'], 'get').and.returnValue(throwError(() => new Error(errorMessage)));

      service.getAll().subscribe({
        error: err => {
          expect(err).toBeTruthy();
          expect(err.message).toEqual(errorMessage);
          expect(spyGetAll).toHaveBeenCalled();
        },
      });
    });
  });

  describe('get', () => {
    it('should get post', () => {
      const id = 1;
      const spyGet = spyOn(service['http'], 'get').and.returnValue(of(mockPost));

      service.get(id).subscribe(post => {
        expect(post).toBeTruthy();
        expect(post.title).toEqual('Title 1');
        expect(spyGet).toHaveBeenCalled();
      });
    });

    it('should not get posts incase of error', () => {
      const id = 1;
      const errorMessage = 'Some server error';
      const spyGet = spyOn(service['http'], 'get').and.returnValue(throwError(() => new Error(errorMessage)));

      service.get(id).subscribe({
        error: err => {
          expect(err).toBeTruthy();
          expect(err.message).toEqual(errorMessage);
          expect(spyGet).toHaveBeenCalled();
        },
      });
    });
  });
});
