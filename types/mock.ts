import { LabelTypes,LabelType } from "./label";
// mockデータ　最終的に削除予定
export const mockLabels: LabelTypes = {
	d: [
		{
			text: "Hello, this is the first zweet!",
			user: { id: 1, name: "alice", ico: "/favicon.ico" },
			good: 3,
			heart: 1,
			createAt: new Date().toISOString(),
		},
		{
			text: "もう一つのサンプル投稿です。",
			user: { id: 2, name: "bob", ico: "/favicon.ico" },
			good: 5,
			heart: 2,
			createAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
		},
		{
			text: "TypeScript と Next.js のテスト投稿。",
			user: { id: 3, name: "carol", ico: "/favicon.ico" },
			good: 0,
			heart: 0,
			createAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
		},
	],
};

export default mockLabels;