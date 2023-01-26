import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { PostViewComponent } from './pages/post-view/post-view.component';
import { PostsComponent } from './pages/posts/posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: FormComponent, data: { title: 'Register', icon: 'truck' } },
  { path: 'posts', component: PostsComponent, data: { title: 'Posts', icon: 'image' } },
  { path: 'posts/:id', component: PostViewComponent, data: { title: 'Post Details', icon: 'image' } },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
