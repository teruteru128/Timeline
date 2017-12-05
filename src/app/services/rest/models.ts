export interface User {
  description: string;
  followers: number[];
  friends: number[];
  id: string;
  location: string;
  name: string;
  official: boolean;
  posts_count: number;
  profile_image_url: string;
  url: string;
  screen_name: string;
}

export interface LoginCallback {
    id: string;                 // 恒久ID (0-)
    screen_name: string;             // ユーザ名(@kitten)
    name: string;          // ユーザ登録日時
    posts_count: number;          // 最終更新日
    location: string;       // JWTセッショントークン(RS256_JWT_TOKEN)
    friends: string[];
    followers: string[];
    url: string;
    official: boolean;
    profile_image_url: string;
    session_token: string;
}

export interface PostEntity {
    urls: string[];
    hashtags: string[];
    user_mentions: Post[];
}

export interface Post {
    favorited_ids: string[];             // ユーザID
    created_at: Date;             // 投稿ID
    id: string;               // 投稿内容
    entities: PostEntity[];          // 投稿日時
    user: User;                 // 投稿ユーザ情報
    in_reply_to_user_id: string;
    text: string;
    shared: boolean;
    shared_count: boolean;
    in_reply_to_screen_name: string;
    favorited: boolean;
}

export interface ErrorResponse {
   error: string;
}

export interface MessageResponse {
  message: string;
}
