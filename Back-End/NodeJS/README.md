# Node.js

## 이해

Node.js는 JS를 어느 환경에서나 실행할 수 있게 해주는 실행기

- 크로스 플랫폼 실행
- 제한 없는 동작
- 다양한 어플리케이션 개발

## 특징

싱글 쓰레드 - 비동기 - 이벤트 기반

1. 리로스 관리에 효율적이나 쓰레드 기반의 작업들의 효율이 떨어짐
2. 비동기 동작으로 쓰레드 기반의 작업을 최소화
3. 비동기 동작이 완료가 되면 미리 등록된 함수를 실행

## ES6

```js
const o = { n: 'e', a: 5 };
const { n, a } = obj; // Object의 key와 같은 이름으로 변수 선언 가능
const { n1: n, a1: a } = obj; // Object의 key와 다른 이름으로 변수 선언
const a = ['s', 'v'];
const [f, s] = arr;
```

## 비동기 코딩

1. _Callback_: 전통적인 JS의 이벤트 기반 코딩 방식

- 쿼리가 완료되면 오류가 있는지, 혹은 유저목록의 결과로 미리 등록된 callback 함수를 실행
- callback의 표준: 에러와 결과를 같이 전달하는 것이 표준으로 자리 잡혀 있음

```js
db.getUsers((err, users) => {
  console.log(users);
});
```

2. _Promise_: callback의 단점을 보완한 비동기 코딩 방식

```js
db.getUsersPromise().then(users => promise1(users)).then(r1 => promise2(r1)).catch(...)
```

```js
// callback 함수를 promise로 변환
function getUsersPromise(params) {
  return new Promise((resolve, reject) => {
    getUsers(params, (err, users) => {
      if (err) {
        reject(err)
        return
      }
      resolve(users)
      }
    })
  })
}
```

3. _Async-Await_: promise의 단점을 보완한 비동기 코딩 방식

- try, catch로 오류 처리
- promise.all을 사용해 비동기적으로 사용가능

```js
async function doSometing() => {
  const r1 = await promise1()
  const r2 = await promise2(r1)
  const r3 = await promise3(r1, r2)
  ...
  return r3
})

doSomething().then(r3 => { console.log(r3) })
```

## 이벤트 루프

:heavy_check_mark: 이벤트를 처리하는 반복되는 동작

### 구성 요소

1. call stack

- 작성된 함수들이 등록되는 LIFO 스택
- 이벤트 루프는 콜스택이 비어있을 때까지 스택의 함수를 실행

2. message queue

- setTimeout 같은 지연실행 함수를 등록하는 FIFO 큐
- 정해진 timing이 끝나고, 콜스택이 비어있을 경우 등록된 함수를 콜스택에 추가

3. job queue

- promise에 등록된 콜백을 등록하는 FIFO 큐
- 상위 함수가 종료되기 전에 콜스택이 비어있지 않더라도 잡큐에 등록된 콜백을 콜스택에 추가

---

# NPM과 모듈

## 이해

:heavy_check_mark: Node Package Manager로 Node.js 프로젝트를 관리하는 필수적인 도구

### 온라인 저장소

:heavy_check_mark: 수 많은 오픈소스 라이브러리와 도구들이 업로드되는 저장소

- 필요한 라이브러리나 도구를 손쉽게 검색 가능
- Node.js의 인기로, 거대한 생태계를 보유

### 커맨드라인 도구

:heavy_check_mark: 프로젝트 관리를 위한 다양한 명령어를 제공

- 저장소에서 라이브러리, 도구 설치
- 프로젝트 설정 / 관리
- 프로젝트 의존성 관리

## 사용해보기

1. `$ npm init`

- 해당 디렉토리 안에서 명령어를 사용하면 package.json이라는 파일을 만들어 주고, 이 디렉토리는 Node.js 프로젝트
- package.json은 프로젝트 관련 정보들이 저장되는 파일이며 직접 수정하거나 npm 명령어를 사용하여 수정 가능

2. `$ npm install 패키지이름`

- 프로젝트의 의존성을 관리할 수 있음
- 추가된 패키지는 package.json의 dependencies안에 추가되며, node_moudules 디렉토리에 저장됨
- `--save-dev`: 개발용 의존성(배포 전까지만 사용하는 의존성)을 분리하여 관리할 수 있음
- `패키지이름x --production`: package.json의 dependencies만 node_modules에 내려받음
- `@버전`: 지정한 버전으로 패키지 버전을 지정할 수 있음
  - ~1.13.0: 1.13.x 버전 설치
  - ^1.13.0: 1.x.x 버전 설치, 가장 왼쪽의 0이 아닌 버전을 고정
  - 0.13.0: 0.13.0 버전만 설치
- package-lock.json: 의존성 버전이 갑자기 변경되지 않도록, 설치된 버전을 고정하는 역할을 함
- `--global`: 패키지를 전역 패키지 디렉토리에 내려받음, 커맨드라인 도구들을 주로 추가해서 사용
  - package.json 내에 명시적으로 선언하는 것이 좋음
- `$ npm i`: 지웠던 node_moudules 내용 복구

3. `$npm remove 패키지이름`

- 의존성 패키지를 삭제할 수 있음

4. 스크립트 실행하기

- package.json의 sciprts에 스크립트 이름을 넣어 명령어로 만들 수 있음
- package.json의 scripts에 `npm run 스크립트이름` 명령어로 실행할 수 있음
- `$ npm test/start/stop`: 코드 유닛 테스트 등에 사용 / 프로젝트 실행 / 프로젝트 종료

## NPX

:heavy_check_mark: npm 패키지를 설치하지 않고 사용할 수 있게 해주는 도구

- 버전별로 실행 가능
- gist 코드를 다운받지 않고 바로 실행 가능

## Node.js의 모듈

:heavy_check_mark: 프로젝트가 커지면 기능에 맞게 코드를 분리하는 것이 중요, 모듈은 코드를 분리하기 위한 방법

### 기본 제공 모듈

1. console  
   :heavy_check_mark: 브라우저에서 제공되는 console과 유사한 디버깅 도구

- log, warn, error 함수로 로그 레밸 표시
- time, timeLog, timeEnd 함수로 시간 추적

2. process  
   :heavy_check_mark: 현재 실행 프로세스 관련 기능 제공

- arch, argv, env 등 실행 환경 및 변수 관련 값 제공
- abort, kill, exit 등 프로세스 동작 관련 함수 제공

3. fs  
   :heavy_check_mark: 파일 입출력을 하기 위해 사용

- readFile, writeFile 함수로 파일 읽기, 쓰기
- Sync 함수 제공. 동기 동작
- watch로 파일/디렉토리 변경 이벤트 감지

4. http  
   :heavy_check_mark: http 서버, 클라이언트를 위해 사용

- createServer 함수로 서버 생성
- Request 함수로 http 요청 생성

## 모듈의 작성과 사용

### 모듈의 기본적인 작성법

1. `module.exports = { ... }`
2. `exports.require할키이름 = export할key`
3. 함수

```js
module.exports = (n, a, t) => {
  return {
    n,
    a,
    t
  }
}
---
const s = require(경로)("e", 5, "k")
```

### require 동작의 이해

:heavy_check_mark: Node.js의 모듈은 첫 require 시에 cache, 두 번 실행하지 않음

- 모듈 코드를 여러 번 실행하기 위해선 함수 모듈로 작성

### 모듈의 사용방법

1. npm 패키지  
   패키지를 사용하려면 node_modules에 내려받아져 있어야 함
   `const d = require("패키지이름")`

2. 직접 작성한 모듈  
   모듈이 .js 파일인 경우 해당 파일이 load, 모듈이 디렉토리인 경우 모듈/index.js 파일 load
   `const m = require("현재파일과의상대디렉토리경로")`

3. 함수형 모듈  
   load한 경우 모듈이 바로 실행되지 않고 필요한 시점에 load된 함수를 실행하여 모듈을 사용할 수 있음

```js
const f = require('상대경로');
console.log(f(n, a, t));
```

4. json 파일
   require로 json 파일도 load 가능, object로 자동파싱되므로 .json을 붙일 필요 없음
   `const d = require("상대경로")`

## ES Module

:heavy_check_mark: ES6에서 등장한 JS의 공식적인 표준 모듈
프로젝트 타입을 module로 변경해야 사용 가능

1. commonjs: module.exports와 require
2. ES Module: export와 import

---
