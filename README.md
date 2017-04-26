<!-- TOC -->

- [1. Clien.net 용 텔레그램 봇](#1-cliennet-용-텔레그램-봇)
- [2. 참고 사이트](#2-참고-사이트)
- [3. Bot 개발을 위한 Configuration](#3-bot-개발을-위한-configuration)
- [4. 명령어](#4-명령어)

<!-- /TOC -->

## 1. Clien.net 용 텔레그램 봇
로그인없이 접근이 가능한 페이지를 파싱하여 유용한 정보를 telegram으로 전달하는 봇을 만들기 위함.

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
- /help : 이 설명을 보여줌.
- /filter <filter name> : 게시판에서 해당. <filter name> 이 들어가는 글만 알림
- /dashboard <park | jirum> : 해당 게시판으로 이동. (park-모두의 공원, jirum-알구게)
- /config : 현재 설정을 보여줍니다
- /resetfilter : 저장한 필터를 초기화합니다.