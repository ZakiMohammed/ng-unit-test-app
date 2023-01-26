import { Post } from '../models/post.model';

export const mockPosts: Post[] = [
  { id: 1, userId: 1, title: 'Title 1', body: 'Body 1' },
  { id: 2, userId: 1, title: 'Title 2', body: 'Body 2' },
  { id: 3, userId: 1, title: 'Title 3', body: 'Body 3' },
];

export const mockPost = { id: 1, userId: 1, title: 'Title 1', body: 'Body 1' };
