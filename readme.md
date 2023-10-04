### PG名
---
仮想通貨取引サイト
<br/>

### 目的
---
reactとtypescriptを用いて簡単なサイトを作ってみる
<br/>

### 具現内容
---
| 区分 | 詳細 |
| :--- | :--- |
| ユーザー | 会員登録 <br> ログイン <br> ログアウト |
| ページ | 言語選択(日本語、英語のみ) |
| 株式 | 株式選択機能 (btc, etc, eth, xrp, sol)<br> チャート機能 (1分ごとに株価が変える - 範囲 : 1 ~ 10) |
| 注文 | チャージ <br> ウォレット <br> 注文履歴 |


### DBについて
json-serverを利用しています。
<br/>
<br/>
- ユーザーテーブル(user)
| カラム名 | タイプ | 説明 |
| :--- | :---: | :--- |
|   id      |   number  |   json-serverのpk |
|   userId  |   string  |   userid|
|   userName|   string  |   userName|
|   password|   string  |   password|

<br/>
- 株式テーブル(stock)

| カラム名 | タイプ | 説明 |
| :--- | :---: | :--- |
|   id      |   number  |   json-serverのpk
|   userId  |   string  |   userid
|   stock   |   string[]|   有効株式リスト

<br/>

- ウォレットテーブル(wallet)
| カラム名 | タイプ | 説明 |
| :--- | :---: | :--- |
|   id      |   number  |   json-serverのpk
|   userId  |   string  |   userid
|   wallet   |   number|   ユーザーのチャージ金額

<br/>

- 注文履歴テーブル(trade)
| カラム名 | タイプ | 説明 |
| :--- | :---: | :--- |
|   id     |   string  |   注文Id
|   userId      |   string  |   userid
|   state       |   string  |   注文ステータス（0 : 待機 、1: 成功、2: cancel）
|   tradeStock  |   string  |   株式名
|   tradeType   |   string  |   取引タイプ（1 : 買い、2 : 売り、3：予約）
|   tradeMoney  |   string  |   注文単価
|   message     |   string  |   備考
