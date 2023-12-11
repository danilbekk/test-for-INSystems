export interface RateType {
  user?: string;
  volume?: number;
}

export interface CommentType {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: number;
  rates: RateType[];
  email: string;
}
