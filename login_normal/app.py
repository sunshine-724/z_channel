from flask import Flask, render_template, request, redirect, session  # Flaskの主要な機能をインポート

import sqlite3  # SQLiteデータベース操作用の標準ライブラリをインポート

import bcrypt  # パスワードのハッシュ化・検証のためのbcryptライブラリをインポート

app = Flask(__name__)  # Flaskアプリケーションのインスタンスを生成

app.secret_key = 'your_secret_key'  # セッションの暗号化に必要な秘密鍵を設定

def get_db():
    return sqlite3.connect('users.db')  # users.dbに接続し、コネクションを返す

@app.route('/')  # ルートURL（トップページ）のルーティングを設定
def index():
    if 'username' in session:  # セッションに'username'が存在するか確認
        return f"ようこそ、{session['username']}さん！ <a href=/logout>ログアウト</a>"  # ログイン済みなら挨拶文を表示
    return redirect('/login')  # 未ログインならログインページへリダイレクト

@app.route('/login', methods=['GET', 'POST'])  # /loginのルーティング、GETとPOSTの両方を許可
def login():
    if request.method == 'POST':  # フォーム送信（POST）の場合
        username = request.form['username']  # フォームからユーザー名を取得
        password = request.form['password'].encode('utf-8')  # パスワードを取得し、バイト列に変換

        conn = get_db()  # データベースに接続
        cursor = conn.cursor()  # カーソルオブジェクトを作成
        cursor.execute("SELECT password FROM users WHERE username=?", (username,))  # 入力されたユーザー名のパスワードハッシュを取得
        user = cursor.fetchone()  # 1件だけレコードを取得
        conn.close()  # 接続を閉じる

        if user and bcrypt.checkpw(password, user[0].encode('utf-8')):  # ユーザーが存在し、パスワードが一致する場合
            session['username'] = username  # セッションにユーザー名を保存
            return redirect('/')  # ホームページへリダイレクト
        else:
            return "ログイン失敗"  # ログイン失敗時のメッセージ

    return render_template('login.html')  # GETリクエスト時はログイン画面を表示

@app.route('/register', methods=['GET', 'POST'])  # /registerのルーティング、GETとPOST両対応
def register():
    if request.method == 'POST':  # フォーム送信（POST）の場合
        username = request.form['username']  # フォームからユーザー名を取得
        password = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())  # パスワードをハッシュ化

        conn = get_db()  # データベースに接続
        cursor = conn.cursor()  # カーソルオブジェクトを作成
        try:
            cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)",  # 新しいユーザーをDBに追加
                           (username, password.decode('utf-8')))
            conn.commit()  # 変更をコミット
        except sqlite3.IntegrityError:  # ユニーク制約違反などのエラー時
            return "ユーザー名が既に使われています"  # エラーメッセージを返す
        finally:
            conn.close()  # 接続を閉じる

        return redirect('/login')  # 登録成功時はログイン画面へリダイレクト

    return render_template('register.html')  # GETリクエスト時は登録画面を表示

@app.route('/logout')  # /logoutのルーティング
def logout():
    session.pop('username', None)  # セッションから'username'を削除
    return redirect('/login')  # ログイン画面へリダイレクト

if __name__ == '__main__':  # このファイルが直接実行された場合
    app.run(debug=True)  # Flaskアプリをデバッグモードで起動
    