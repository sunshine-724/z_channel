export default async function Page(props: { params: Promise<{ username: string }> }) {
    const { username } = await props.params;
    const data = await fetchUser(username);

    if (!data) {
        return (
            <div className="user-page">
                <p>ユーザー情報が見つかりませんでした: {username}</p>
                <Link href="/">ホームへ戻る</Link>
            </div>
        );
    }

    const path = !!data.is_following ? '/api/unfollow' : '/api/follow';
    const url = `${process.env.BACKEND_ROOT_URL}${path}`;

    return (
        <div className="user-page">
            <div className="user-header">
                <Image src={data.ico || '/favicon.ico'} alt={data.username} width={128} height={128} />
                <h2>{data.username}</h2>
                <div className="user-follow-stats">
                    <div>フォロワー: {data.followers_count ?? 0}</div>
                    <div>フォロー中: {data.following_count ?? 0}</div>
                    <FollowButton
                        targetUsername={data.username}
                        initialIsFollowing={!!data.is_following}
                        url={url}
                    />
                </div>
            </div>
            <div className="user-intro">
                <p>{data.bio}</p>
            </div>
            <div className="user-follow-list">
                <h3>フォロワー</h3>
                <ul>
                    {(data.followers || []).map(f => (
                        <li key={f.id}><Link href={`/account/user/${f.username}`}>{f.name || f.username}</Link></li>
                    ))}
                </ul>
                <h3>フォロー中</h3>
                <ul>
                    {(data.following || []).map(f => (
                        <li key={f.id}><Link href={`/account/user/${f.username}`}>{f.name || f.username}</Link></li>
                    ))}
                </ul>
            </div>
        </div>
    );
}