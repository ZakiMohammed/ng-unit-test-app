import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit, OnDestroy {
  id = 0;
  post: Post | null = null;
  postSubscription: Subscription = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.id = +this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPost();
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  getPost() {
    if (!isNaN(this.id)) {
      this.postSubscription = this.postService.get(this.id).subscribe(post => (this.post = post));
    }
  }
}
