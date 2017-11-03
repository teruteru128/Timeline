export interface User {
    permanent_id: number;       // 恒久ID (0-)
    id: string;                 // ユーザ名(@kitten)
    name: string;               // 表示名(Kitten)
    posts_count: number;        // 投稿総数(0-)
    location: string;           // 居住地(グンマー)
    followees_count: number;    // フォローしている数(0-)
    followers_count: number;    // フォローされている数(0-)
    website_url: string;        // ウェブサイトのURL(http://example.com)
    profile_image_url: string;  // プロフィール画像(http://static_cdn/profile_images/0.png)
  }

  export interface LoginCallback {
    permanent_id: number;       // 恒久ID (0-)
    id: string;                 // ユーザ名(@kitten)
    mailAddress: string;        // メールアドレス(kitten@example.com)
    createDate: Date;           // ユーザ登録日時(2017-08-28T07:46:09.801Z)
    updateDate: Date;           // 最終更新日(2017-09-28T07:46:09.801Z)
    sessionToken: string;       // JWTセッショントークン(RS256_JWT_TOKEN)
  }