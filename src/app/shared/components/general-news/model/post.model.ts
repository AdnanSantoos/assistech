export interface Post {
  author:string;
  title: string;
  date: string;
  image_url: string;
  image_label: string;
  category: string;
  comments: number;
  content: string;
  slug?: string;
  formattedDate?: string;
}
