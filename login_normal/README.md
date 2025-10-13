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
