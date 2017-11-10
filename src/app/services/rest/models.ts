export interface User {
    permanentId: number;        // 恒久ID (0-)
    id: string;                 // ユーザ名(@kitten)
    displayName: string;        // 表示名(Kitten)
    postsCount: number;         // 投稿総数(0-)
    location: string;           // 居住地(グンマー)
    followeesCount: number;     // フォローしている数(0-)
    followersCount: number;     // フォローされている数(0-)
    websiteUrl: string;         // ウェブサイトのURL(http://example.com)
    avatarUrl: string;          // プロフィール画像(http://static_cdn/profile_images/0.png)
}

  export interface LoginCallback {
    permanentId: number;        // 恒久ID (0-)
    id: string;                 // ユーザ名(@kitten)
    email: string;              // メールアドレス(kitten@example.com)
    createdDate: Date;          // ユーザ登録日時
    updatedDate: Date;          // 最終更新日
    sessionToken: string;       // JWTセッショントークン(RS256_JWT_TOKEN)
}

 export interface ErrorResponse {
   error: string;
}
