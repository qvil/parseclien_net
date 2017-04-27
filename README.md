<!-- TOC -->

- [1. Clien.net 용 텔레그램 봇](#1-cliennet-용-텔레그램-봇)
- [2. 참고 사이트](#2-참고-사이트)
- [3. Bot 개발을 위한 Configuration](#3-bot-개발을-위한-configuration)
- [4. 명령어](#4-명령어)

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

## 3. Bot 개발을 위한 Configuration
- npm 명령을 위해 nodejs를 설치
- github에서 소스를 다운로드 받고 또는 git clone을 하고 해당 directory로 이동 후 `npm install` 실행
- npm start 또는 node main.js를 실행

## 4. 명령어
- **/help** : 이 설명을 보여줌.
- **/filter** `[filter name]` : 게시판에서 해당. `[filter name]` 이 들어가는 글만 알림
  - 띄어쓰기를 사용하여 여러개의 필터를 걸 수 있음. (ex. /filter 문재인 대통령)
  - 이렇게 검색하면 문재인과 대통령이 들어간 게시글은 모두 알려줌.
- **/dashboard** `<게시판 이름>` : 해당 게시판으로 이동. `help 명령으로 확인`
- **/showconfig** : 현재 설정을 보여줍니다
- **/resetfilter** : 저장한 필터를 초기화합니다.