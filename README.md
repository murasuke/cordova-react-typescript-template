# Create React App & Cordovaでアプリをつくる(2021年時点)

下記ページを参考に、2021年10月時点のCreate React Appで環境作成する手順を記載します。
https://qiita.com/bathtimefish/items/113154e89650b351b5b7


## 概要手順

* react用フォルダと、cordova用フォルダを並列で作成する
* cordova用フォルダから、config.xmlをreact用フォルダにコピーする
* reactのビルド対象フォルダを「build」⇒「www」に変更する
* reactの「public/index.html」ファイルに3行&lt;meta&gt;タグを追加する
* reactの「src/index.ts」を変更する。
* reactをビルドしてから、`cordova run browser`で実行する
## 手順

cordovaをグローバルインストールします(ローカルインストールだと動きません)
```bash
npm install -g cordova
```

craでreactアプリを作成する
```bash
create-react-app tutorial --template typescript --use-npm
```

Cordova プロジェクトを作成する
```
cordova create tutorial-cordova com.example.tutorial Tutorial
```


tutorial-corodova/config.xml を tutorial 下にコピーする
```
cp ./tutorial-cordova/config.xml ./tutorial/
```


reactビルド先フォルダを変更する(build⇒www)
https://stackoverflow.com/questions/41495658/use-custom-build-output-folder-when-using-create-react-app

windows用(cmd)の記載方法です。(gitbashを利用している場合も内部コマンドはcmd.exeのため、この書き方です)
* `&&`の前後にスペースを入れないこと。スペースを含む不正なパスになり、エクスプローラーから削除できなくなります。
```json
  "scripts": {
    "build": "set BUILD_PATH=www&&react-scripts build",
  }
```
windows以外の場合は、下記の通りだと思いますが未検証です。
```json
  "scripts": {
    "build": "BUILD_PATH='./www' react-scripts build",
  }
```


public/index.html の &lt;head&gt;内に下記を追加する。
```
  <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src * data: content:;">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">
```

tutorial/src/index.js を開いて以下のように編集する

変更前
```tsx
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

変更後
```tsx
const startApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if ((window as any).cordova) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}
```

reactをビルドする
```bash
npm run build
```

プラットフォームを追加
```bash
cordova platforms add browser
cordova platforms add android
```

cordovaプロジェクトを実行
```bash
cordova run browser
```

localhost:8000でReactアプリが開きます
