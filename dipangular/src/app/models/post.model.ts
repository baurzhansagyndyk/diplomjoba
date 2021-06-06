export interface Post {
  id: number;
  title: string;
  body: string;
  created: Date;
  owner: string;
  is_owner: boolean;
  image: string;
  likes: number;
  is_liked: boolean;
  favorites: number;
  is_favorited: boolean;
}

export interface PostForm {
  title: string;
  body: string;
  image: File;
}
