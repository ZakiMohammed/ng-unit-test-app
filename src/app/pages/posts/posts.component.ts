import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  errorMessage = '';
  posts: Post[] | null = null;
  postsSubscription: Subscription = Subscription.EMPTY;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  getPosts() {
    this.postsSubscription = this.postService
      .getAll()
      .subscribe({
        next: posts => (this.posts = posts),
        error: () => this.errorMessage = 'Something went wrong'
      });
  }
}
