# WINC Team Web

WINCチームのオフィシャルウェブサイト。Next.jsで構築されたモダンなチームポータルです。

[![Netlify Status](https://api.netlify.com/api/v1/badges/e8b858c8-7377-4591-a378-b06fbcc4961d/deploy-status)](https://app.netlify.com/projects/winc/deploys)

## 概要

このプロジェクトは、チームメンバー情報、ブログ、プロジェクトポートフォリオ、ニュース、問い合わせ機能を提供する統合ウェブアプリケーションです。

## 主な特徴

- **マルチプルCMS連携**: Notion と microCMS からのデータ取得に対応
- **お問い合わせ機能**: Turnstile による CAPTCHA 検証付きのフォーム送信（Resend で Email 配信）
- **Instagram 連携**: Instagram API との同期機能
- **Discord 通知**: お問い合わせ時に Discord に通知
- **モダンなUI**: React + Tailwind CSS で実装
- **アニメーション**: GSAP によるスムーズなアニメーション
- **カルーセル機能**: Embla Carousel による画像スライダー

## 技術スタック

- **フレームワーク**: Next.js 15.5.12 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **フォーム処理**: React Hook Form + Yup
- **CMS**: Notion API, microCMS SDK
- **外部サービス**:
  - Resend (メール配信)
  - Cloudflare Turnstile (CAPTCHA)
  - Discord (Webhook通知)
- **アニメーション**: GSAP
- **Database ORM**: Prisma (オプション)

## プロジェクト構造

```
├── app/                          # Next.js App Router
│   ├── blog/                      # ブログページ
│   ├── contacts/                  # 問い合わせページ
│   ├── members/                   # メンバーページ
│   ├── news/                      # ニュースページ
│   ├── projects/                  # プロジェクトページ
│   └── [slug]/                    # 動的ルート
├── components/                    # React コンポーネント
│   ├── index/                     # ホームページコンポーネント
│   ├── blog/                      # ブログコンポーネント
│   ├── contacts/                  # フォームコンポーネント
│   └── ui/                        # UI コンポーネント
├── actions/                       # Server Actions
│   └── contact.ts                 # お問い合わせ送信処理
├── lib/                           # ユーティリティ関数
│   ├── notion/                    # Notion API ラッパー
│   ├── discord.ts                 # Discord Webhook
│   ├── resend.ts                  # Resend メール設定
│   └── google-apps-script.ts      # GAS 連携
├── types/                         # TypeScript 型定義
├── hooks/                         # React カスタムフック
├── workers/                       # Cloudflare Workers
│   └── instagram-sync/            # Instagram API 同期
└── public/                        # 静的ファイル
```

## 環境変数

以下の環境変数をセットアップしてください：

```env
# CMS
NEXT_PUBLIC_CMS_API_KEY=your_microcms_api_key
NEXT_PUBLIC_CMS_DOMAIN=your_microcms_domain

# Notion
NOTION_API_SECRET=your_notion_secret
NOTION_DATABASE_ID=your_notion_database_id

# メール配信
RESEND_API_KEY=your_resend_api_key
RESEND_EMAIL_FROM=your_email@domain.com

# CAPTCHA
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Discord
DISCORD_WEBHOOK_URL=your_discord_webhook_url

# Google Apps Script
GAS_DEPLOYMENT_ID=your_gas_deployment_id
```

## セットアップ

### 前提条件

- Node.js 20 以上
- pnpm (推奨)

### インストール

```bash
# 依存パッケージのインストール
pnpm install

# 環境変数の設定
cp .env.example .env.local
# .env.local を編集して必要な環境変数を設定
```

## 開発

```bash
# 開発サーバーの起動
pnpm dev

# ブラウザで http://localhost:3000 を開く
```

## ビルド & デプロイ

```bash
# プロダクションビルド
pnpm build

# ビルド結果の確認
pnpm start
```

### Netlify へのデプロイ

このプロジェクトは Netlify にデプロイするよう設定されています。`@netlify/plugin-nextjs` プラグインを使用して、サーバーサイド機能をサーバーレスファンクションに自動的に変換します。

**重要**: `next.config.ts` の `output: "export"` は削除してください（Server Actions を使用しているため）。

## 主な機能の詳細

### お問い合わせフォーム

- **ファイル**: [actions/contact.ts](actions/contact.ts)
- Server Actions を使用
- Cloudflare Turnstile で CAPTCHA 検証
- Resend で Email 配信
- Discord に通知送信
- Google Apps Script へのログ記録

### ブログ機能

- **CMS**: Notion
- **ファイル**: [lib/notion/](lib/notion/)
- Notion ブロックの動的レンダリング対応
- ブックマーク、コードブロック、見出しなど複数ブロックタイプをサポート

### Instagram 連携

- **Worker**: [workers/instagram-sync/](workers/instagram-sync/)
- Cloudflare Workers で定期実行
- Instagram フィードの自動同期

## Linting

```bash
# ESLint の実行
pnpm lint
```

## トラブルシューティング

### ビルドエラー「Server Actions are not supported with static export」

このプロジェクトはサーバーレンダリング（SSR）で動作します。

### 環境変数が読み込まれない

- `.env.local` ファイルが存在することを確認
- `NEXT_PUBLIC_*` プリフィックスは、クライアント側で使用可能な変数用
- サーバー側のみで使用する変数はプリフィックスなし
- 環境変数変更後は、開発サーバーの再起動が必要

## ライセンス

プライベートプロジェクト

## 関連ドキュメント

- [Instagram API セットアップ](docs/instagram-api-setup.md)
- [新入生向け機能](docs/fucntion/shinkan.md)
