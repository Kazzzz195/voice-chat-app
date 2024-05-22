# ボイスチャットアプリのセットアップガイド

このガイドでは、ボイスチャットアプリのセットアップ手順を詳しく説明します。

## 1. Gitリポジトリをクローンする

まず、以下のコマンドを使用してGitリポジトリをクローンします：

git clone https://github.com/Kazzzz195/voice-chat-app.git

## 2. プロジェクトディレクトリに移動

cd voice-chat-app

# 3.以下のコマンドで依存パッケージをインストール

npm install または　yarn install

# 4. .envを作成してキーの情報を環境変数として読み込めるようにします

VITE_VOICEVOX_API_KEYの取得は下から
https://voicevox.su-shiki.com/su-shikiapis/

$ touch .env

.envファイルに以下の内容を記述します

VITE_VOICEVOX_API_KEY="あなたのキー"
VITE_OPENAI_API_KEY="あなたのキー"

# 5.  開発サーバーを起動

npm run dev　または　yarn dev

localhost:5173を開きます

ここまでできたらデベロッパーツールをひらいてiphone SEのレイアウトにします。

# 6. 音声入力を試す

音声入力を行うと、ずんだもんが応答してくれます。ChatGPTが素早く応答するため、スムーズな会話が楽しめます。
音声入力するとずんだもんが答えてくれます！
ChatGPTが素早いので会話も比較的スムーズです！

