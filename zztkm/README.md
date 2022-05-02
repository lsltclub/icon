# p5.dev

## Refs

- Home | Vite
	- https://ja.vitejs.dev/
- 静的サイトのデプロイ | Vite
	- https://ja.vitejs.dev/guide/static-deploy.html

## Guide

依存関係のインストール
```shell
yarn install
# or
npm install
```

開発サーバーの起動(コマンド実行後に http://localhost:3000/ をブラウザで開く)
```shell
yarn run dev
# or
npm run dev
```

ビルド
```shell
yarn run build
# or
npm run build
```

ビルドしたファイルの確認
```shell
yarn run serve
# or
npm run serve
```

## p5.sound リファレンス

普通にインポートしてもうまく扱えなかった。。

- 解決策 | https://github.com/processing/p5.js-sound/issues/512#issuecomment-812815281
	- 当面はこれで良さげだが、メンテナンスしにくいし、依存関係がよくわからんのでそのうちなんとかしたい(情報お待ちしてます)
- cdn | https://cdnjs.com/libraries/p5.js