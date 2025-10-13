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
            <h1>ログイン</h1>
            {/* apiと連携 */}
            <form method="post" action="/zweet">
                <p>ユーザー名：<input name="username" required /></p>
                <p>パスワード：<input name="password" type="password" required /></p>
                <p><button type="submit">ログイン</button></p>
            </form>

            <br>
            </br>
            <Link href="./signUP">アカウントをお持ちでない方：新しいアカウントを作る</Link>
        </div>
    )
}