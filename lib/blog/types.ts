export interface BlogPost {
  id: string;
  title: string;
  url: string;
  date: string;
  tags: Tag[];
  excerpt: string;
}

export interface BlogFeed {
  posts: BlogPost[];
  // RSSの取得・解析に失敗した場合true（記事が0件なだけの場合はfalse）
  failed: boolean;
  // noteマガジンのページURL（RSS URLから末尾の/rssを除いたもの）
  magazineUrl: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}
