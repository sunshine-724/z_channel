# /login_normal/Dockerfile

# ベースイメージ
FROM python:3.11-slim

# 'app' ユーザーを作成
RUN adduser --system --group app

# ワーキングディレクトリを設定
WORKDIR /app

# 依存関係ファイルをコピー
# (Dockerfileが /login_normal にあるため、カレントの requirements.txt をコピー)
COPY requirements.txt .

# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションのソースコードをコピー
# (Dockerfileが /login_normal にあるため、カレントの . を /app にコピー)
COPY . .

# 'app' ユーザーに所有権を移し、切り替え
RUN chown -R app:app /app
USER app

# Renderが $PORT を自動的に設定します
# 'app:app' の部分はあなたのFlaskアプリのファイル名とインスタンス名に合わせてください
# (login_normal/app.py の中の Flaskインスタンスが app だと仮定)
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:${PORT:-8000}", "app:app"]