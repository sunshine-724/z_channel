# /Dockerfile (プロジェクトルート)

# --- 1. ビルドステージ ---
FROM node:18-alpine AS builder

# 'app' ユーザーを作成
RUN addgroup -g 1001 -S nodejs
RUN adduser -S app -u 1001

WORKDIR /app

# package.json とロックファイルをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
# .dockerignore を使って不要なものを除外すること推奨
COPY . .

RUN chown -R app:nodejs /app

# 'app' ユーザーに切り替え
USER app

# アプリケーションをビルド
RUN npm run build

# --- 2. 本番ステージ ---
FROM node:18-alpine AS runner

WORKDIR /app

# 'app' ユーザーを作成 (builderと同じUID/GID)
RUN addgroup -g 1001 -S nodejs
RUN adduser -S app -u 1001

# 環境変数を設定
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# ビルドステージから必要なファイルをコピー
# 'standalone' 出力のおかげで、最小限のファイルのみコピー
COPY --from=builder --chown=app:nodejs /app/.next/standalone ./
COPY --from=builder --chown=app:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=app:nodejs /app/public ./public

# 'app' ユーザーに切り替え
USER app

# Renderが環境変数 PORT を自動的に設定します
# ホスト名 0.0.0.0 を指定し、Renderが指定する $PORT を使用
CMD ["sh", "-c", "node server.js -H 0.0.0.0 -p ${PORT:-3000}"]