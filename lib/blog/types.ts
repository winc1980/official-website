export interface BlogPost {
  id: string;
  title: string;
  url: string;
  date: string;
  tags: Tag[];
  excerpt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}
