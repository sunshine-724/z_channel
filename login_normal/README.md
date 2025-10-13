#　環境構築
```zsh
cd login_normal
python3 -m venv .venv
source .venv/bin/activate
pip install flask bcrypt
```
## アカウント新規作成
```zsh
curl -v -X POST \
-H "Content-Type: application/x-www-form-urlencoded" \
--data "username=testuser&password=secret123" \
-L http://127.0.0.1:5000/register
```
## ログイン
```zsh
curl -v -X POST \
-H "Content-Type: application/x-www-form-urlencoded" \
--data "username=testuser&password=secret123" \
-c cookies.txt \
-L http://127.0.0.1:5000/login
```
## クッキーで保護ページにアクセス
```zsh
curl -v -b cookies.txt http://127.0.0.1:5000/
```
## プロフィール取得（存在するユーザー名で）
```zsh
curl 'http://127.0.0.1:5000/api/user?name=testuser'
```
## ユーザー投稿一覧
```zsh
curl 'http://127.0.0.1:5000/api/post/user?name=testuser'
```
## 最新投稿
```zsh
curl 'http://127.0.0.1:5000/api/post/latest?limit=10'
```
## 投稿作成（JSON）
```zsh
curl -X POST 'http://127.0.0.1:5000/api/post/make' \
-H 'Content-Type: application/json' \
-d '{"text":"テスト投稿","user":{"name":"testuser"},"good":0,"heart":0,"createAt":"2025-10-13T00:00:00Z"}'
```
```bash
# ログインして cookie を保存
curl -c cookiejar -d "username=alice&password=PASSWORD" -X POST http://127.0.0.1:5000/login

# フォローする (alice が bob をフォローする)
curl -b cookiejar -H "Content-Type: application/json" -d '{"username":"bob"}' -X POST http://127.0.0.1:5000/api/follow

# フォロー解除
curl -b cookiejar -H "Content-Type: application/json" -d '{"username":"bob"}' -X POST http://127.0.0.1:5000/api/unfollow

# 対象ユーザーの情報を確認 (followers_count, following_count, is_following が含まれる)
curl http://127.0.0.1:5000/api/user?name=bob
```
