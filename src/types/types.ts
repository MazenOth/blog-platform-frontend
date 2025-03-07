export interface Author {
  id: number;
  name: string;
  bio: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt?: String;
  authorId: number;
  author?: Author;
  authorName?: string;
}
