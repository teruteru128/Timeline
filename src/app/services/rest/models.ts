export interface User {
    id: string;                 // 恒久ID
    userId: string;             // ユーザ名(@kitten)
    displayName: string;        // 表示名(Kitten)
    postsCount: number;         // 投稿総数(0-)
    location: string;           // 居住地(グンマー)
    followingCount: number;     // フォローしている数(0-)
    followersCount: number;     // フォローされている数(0-)
    websiteUrl: string;         // ウェブサイトのURL(http://example.com)
    avatarUrl: string;          // プロフィール画像(http://static_cdn/profile_images/0.png)
    official: boolean;          // 公式
}

export interface LoginCallback {
    id: string;                 // 恒久ID (0-)
    userId: string;             // ユーザ名(@kitten)
    createdDate: Date;          // ユーザ登録日時
    updatedDate: Date;          // 最終更新日
    sessionToken: string;       // JWTセッショントークン(RS256_JWT_TOKEN)
}

export interface Post {
    userId: string;             // ユーザID
    postId: string;             // 投稿ID
    text: string;               // 投稿内容
    createdDate: Date;          // 投稿日時
    user: User;                 // 投稿ユーザ情報
}

export interface ErrorResponse {
   error: string;
}

export interface MessageResponse {
  message: string;
}
