import Link from "next/link";
import "./style.css" ;
import Image from 'next/image';

export default function Page(){
    return (
        <div className="login">
            <Image
                src="/img/logo.png" // publicフォルダからのパス
                alt="Logo"
                width={800} // 画像の元の幅を指定
                height={160} // 画像の元の高さを指定
            />
            <h1>サインアップ</h1>
            {/* apiと連携 */}
            <form method="post" action="/account/login">
                <p>ユーザー名：<input name="username" required /></p>
                <p>メールアドレス：<input name="mail" type="main" required /></p>
                <p>パスワード：<input name="password" type="password" required /></p>
                <p><button type="submit">登録</button></p>
            </form>
            <br></br>
            <Link href="./login">すでにアカウントをお持ちの方：ログイン</Link>
        </div>
    )
}