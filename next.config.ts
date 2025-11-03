import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // サイトを静的ファイルとして出力(export)する設定
  output: 'standalone',
  
  // サイトのURLが /z_channel/ になるための設定
  basePath: '/z_channel',
  assetPrefix: '/z_channel/',
};

export default nextConfig;
