<a name=top />
<!-- TOC -->

- [1. Clien.net 용 텔레그램 봇](#1-cliennet-용-텔레그램-봇)
- [2. 참고 사이트](#2-참고-사이트)
- [3. Bot 실행 방법](#3-bot-실행-방법)
- [4. 명령어](#4-명령어)
- [5. 자신의 봇 및 게시판 추가](#5-자신의-봇-및-게시판-추가)
- [주의 사항](#주의-사항)

<!-- /TOC -->

## 1. Clien.net 용 텔레그램 봇
Clien.net의 로그인없이 접근이 가능한 페이지 `(모두의 공원, 알뜰 구매 게시판)`를 파싱하여 새로운 게시글을 telegram으로 전달하는 봇.

> 저 또한 nodejs를 처음 공부하면서 작성한 코드이므로 코드에 대한 태클은 사양하도록 하겠습니다 \\('' )/

해당 코드는 임의로 수정하여 배포하셔도 됩니다.

## 2. 참고 사이트
> 아래 사이트는 Bot을 개발하기위한 참고 사이트를 나열해놓은 것임.

[Telegram Bot API](https://core.telegram.org/bots/api)

[Telegram Bot SDK for Node.js](https://github.com/yagop/node-telegram-bot-api)

[Bot Father](https://core.telegram.org/bots)

[Back to top](#top)

## 3. Bot 실행 방법
- npm 명령을 위해 [nodejs](https://nodejs.org/ko/)를 설치 
- github에서 소스를 다운로드 받고 또는 git clone을 하고 해당 directory로 이동 후 `npm install` 실행
- npm start 또는 node main.js를 실행

[Back to top](#top)

## 4. 명령어
- **/help** : 이 설명을 보여줌.
- **/filter** `[filter name]` : 게시판에서 해당. `[filter name]` 이 들어가는 글만 알림
  - 띄어쓰기를 사용하여 여러개의 필터를 걸 수 있음. (ex. /filter 문재인 대통령)
  - 이렇게 검색하면 문재인과 대통령이 들어간 게시글은 모두 알려줌.
- **/dashboard** `<게시판 이름>` : 해당 게시판으로 이동. `help 명령으로 확인`
- **/showconfig** : 현재 설정을 보여줍니다
- **/resetfilter** : 저장한 필터를 초기화합니다.

[Back to top](#top)

## 5. 자신의 봇 및 게시판 추가
```javascript
// src/config.js
const listOfBoards = ["jirum", "park", "iphone", "nas"];

exports.listOfDashBoard = listOfBoards;

exports.dashboard = {
  [listOfBoards[0]]: "http://www.clien.net/cs2/bbs/board.php?bo_table=jirum",
  [listOfBoards[1]]: "http://www.clien.net/cs2/bbs/board.php?bo_table=park",
  [listOfBoards[2]]: "http://www.clien.net/cs2/bbs/board.php?bo_table=cm_iphonien",
  [listOfBoards[3]]: "http://www.clien.net/cs2/bbs/board.php?bo_table=cm_nas",
  main: "http://www.clien.net/"
};

exports.commonObj = {
  [listOfBoards[0]]: 0,
  [listOfBoards[1]]: 0,
  [listOfBoards[2]]: 0,
  [listOfBoards[3]]: 0,
};

// If you have your own bot token, you need to set below variables.
exports.token = '<여기에 자신이 만든 봇의 토큰을 입력>';
exports.chatId = '<기본으로 쓰여질 chat id를 여기에 입력>';
```

- 게시판을 추가방법
  - `listOfBoards`에 대표이름을 하나 추가
    - ex) const listOfBoards = ["jirum", "park", "iphone", "nas", "camping"];
  - `exports.dashboard`와 `exports.commonObj`에 각각에 배열값을 추가
    - ex) `[listOfBoards[4]]:` 이런 식으로....
  
- 새로운 봇 추가 방법
  - `exports.token`에 [Bot Father](https://core.telegram.org/bots)에서 생성한 Token을 입력
    - ex) exports.token = 'adfasdfjo29-03ur-3jfganvq2po34rr'

[Back to top](#top)

## 주의 사항
> `exports.token`값은 현재 제가 사용하고 있는 봇 토큰입니다. 제가 사용하고 있는 동안에 이거 그대로 사용하시면 어떻게 될지 모르니 [Bot Father](https://core.telegram.org/bots)를 보시고 자신의 봇을 만들어서 토큰값을 직접 입력하셔서 사용하세요.

[Back to top](#top)