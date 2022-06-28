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

# Express.js와 REST API

## 웹 서비스 동작 방식

:heavy_check_mark: 웹 서비스는 기본적으로 HTTP 요청과 응답의 반복으로 이루어짐

### 동적 웹

1. **CSR(Client-Side Rendering)**: 프론트에서 사용자가 페이지에서 보는 동적인 부분을 대부분 처리하는 방식

- 프론트엔드 코드에 페이지 리소스들이 미리 정의되어 있음
- 서버와의 통신은 API 통신을 이용
- 빠른 반응이지만 페이지의 내용은 API 호출이 완료된 후에 보여짐

2. **SSR(Server-Side Rendering)**: 백엔드에서 페이지 대부분의 영역을 처리해서 프론트엔드로 전달하는 방식

- 백엔드에서 HTML 파일을 작성해서 프론트엔드로 전달
- CSR에 비해 쉬운 구성, 작은 개발 사이즈
- 로딩이 완료되면 페이지와 데이터가 한 번에 표시됨

## 웹 프레임워크

:heavy_check_mark: 웹 서비스에 필요한 기능들을 제공해주는 다양한 도구들의 모음

1. HTTP 요청처리
2. HTTP 응답처리
3. 라우팅
4. HTML Templating

## Express.js

:heavy_check_mark: Node.js의 웹 프레임워크 중 가장 유명

- 필요에 따라 유연하게 구조 설정 가능
- 다양한 미들웨어를 통해 필요한 기능을 간단하게 추가 가능
- 모든 동작이 명시적으로 구성

```js
const express = require('express');
const app = express();
```

```json
"sciprts": {"start": "node index.js"}
```

1. `npm init`

```bash
$ npm init
$ npm i express
```

2. `express-generator`  
   :heavy_check_mark: 기본 구조를 자동으로 생성해줘서 빠르게 프로젝트를 시작할 수 있음

```bash
$ npm i -g express-generator
$ express 폴더이름
$ cd 폴더이름
$ npm i
$ npm start
```

3. `npx + express-generator`  
   :heavy_check_mark: express-generator를 설치하지 않고, 바로 사용 가능

```bash
$ npx express-generator 폴더이름
$ cd 폴더이름
$ npm i
$ npm start
```

## Express.js의 구조

1. **app.js**: 가장 기본이 되는 파일, 웹 어플리케이션의 기능을 정의
2. **bin/www**: 실행 부분을 담당, 포트와 실행 오류 등을 정의
3. **package.json**: 프로젝트 의존성 및 스크립트 정의
4. **public**: 코드를 통하지 않고, 직접 제공되는 파일 디렉토리
5. **routes**: 라우팅 파일 디렉토리
6. **views**: HTML Template 디렉토리

## Express.js 동작 방식

1. `app.js`  
   :heavy_check_mark: app 객체는 Express.js의 기능을 담은 객체로 Express.js의 모든 동작은 app객체에 정의됨

- `app.use()`: middleware를 사용하기 위한 함수
- `app.listen()`: http 서버를 생성해주는 함수
- `app.locals()`: app에서 사용할 공통 상수

```js
const express = require('express');
const app = express();
```

2. 라우팅  
   :heavy_check_mark: app 라우팅과 Express.Router를 통한 라우팅으로 나누어짐

- app 라우팅
  - app 객체에 직접 get, post, put, delete 함수를 사용하여 HTTP method로 라우팅 할 수 있음
  - HTTP mothod 함수의 첫 번째 인자가 이 라우팅을 실행할 URL
  - 마지막 인자가 이 라우팅이 실행될 때 작동하는 함수
  - all 함수를 사용하면 HTTP method에 상관없이 라우팅 가능
  ```js
  app.get('/', (req, res) => {
    res.send('GET /');
  });
  app.post('/', (req, res) => {
    res.send('POST /');
  });
  app.put('/', (req, res) => {
    res.send('PUT /');
  });
  app.delete('/', (req, res) => {
    res.send('DELETE /');
  });
  app.all('/all', (req, res) => {
    res.send('ANY /');
  });
  ```
- Express.Router

  - 라우팅을 모듈화 할 수 있음

  ```
  const express = require("express")
  const router = express.Router()

  router.get('/', (req, res, next) => {res.send('respond with a resource')})

  module.exports = router
  ```

  - 작성된 라우터 모듈을 app에 use함수로 연결하여 사용할 수 있음
  - router 객체에도 하위 라우터를 use 함수를 연결하여 사용할 수 있음

  ```js
  // ./app.js
  const userRouter = require('./routes.users');
  const app = express();

  app.use('/users', userRouter);

  // ./routes/users.js
  const petRouter = require('./pets');
  const router = express.Router();

  router.use('/pets', petRouter);
  module.exports = router;
  ```

  - path parameter 사용하면, 주소의 일부를 변수처럼 사용할 수 있음
    - `/uesers/:id/` => /users/123
    - `Router({ mergeParams: true })` 계층적 구조의 라우터를사용할 때 사용해야 함

3. Request Handler  
   :heavy_check_mark: 라우팅에 적용되는 함수, HTTP 요청과 응답을 다룰 수 있는 함수로 설정된 라우팅 경로에 해당하는 요청이 들어오면 Request Handler 함수가 실행됨

- router나 app의 HTTP method 함수의 가장 마지막 인자로 전달되는 함수
- 설정된 라우팅 경로에 해당하는 요청이 들어오면 요청을 확인하고, 응답을 보내는 역할을 함
- **req**: HTTP 요청 정보를 가진 객체(path parameter, query parameter, body, header)
  - `req.params`: URL 표현 중 /path/:id에서 id를 req.params.id로 사용할 수 있음
  - `req.queries`: URL 표현 중 /path?page=2에서 page 부분을 req.queries.page로 사용할 수 있음
  - `req.body`: 일반적으로 POST 요청의 요청 데이터를 담고 있음, req.body에 요청 데이터가 저장되어 들어옴
  - `req.get('')`: HTTP Request의 헤더 값을 가져올 수 있음, req.get('Authorization')등으로 값을 가져옴
- **res**: HTTP 응답을 처리하는 객체
  `res.send()`: text 형식의 HTTP 응답을 전송함
  `res.json()`: json 형식의 HTTP 응답을 전송함
  `res.render()`: HTML Template을 사용하여 화면을 전송함
  `res.set()`: HTTP 응답의 헤더를 설정함
  `res.status()`: HTTP 응답의 상태 값을 설정함

---

## Express.js의 Middleware

✔️ HTTP 요청과 응답 사이에서 단계별 동작을 수행해주는 함수

## Middleware의 작성과 사용

✔️ req, res, next를 가진 함수를 작성하면 해당 함수는 미들웨어로 동작할 수 있음

- `req`: HTTP 요청을 처리하는 객체
- `res`: HTTP 응답을 처리하는 객체
- `next`: 다음 미들웨어를 실행하는 함수, 이 함수가 호출되지 않으면 미들웨어 사이클이 멈춤

```js
const l = (req, res, next) => {
  console.log(req.path);
  next();
};
```

### middleware 사용법

✔️ 적용되는 위치에 따라서 분류 가능하며 필요한 동작 방식에 따라 미들웨어를 적용할 위치를 결정

1. 어플리케이션 미들웨어

- use나 http method 함수를 사용하여 미들웨어를 연결할 수 있음
- 미들웨어를 모든 요청에 공통적으로 적용하기 위한 방법
- HTTP 요청이 들어온 순간부터 적용된 순서대로 동작함

```js
// 1번
app.use((req, res, next) => {
  console.log(req.path)
  next()
}
app.use(auth) // 2번
app.get('/'. (req, res, next) => { res.send('H') }) // 3번
```

2. 라우터 미들웨어

- router 객체에 미들웨어가 적용되는 것
- 특정 경로의 라우팅에만 미들웨어를 적용하기 위한 방법
- app 객체에 라우터가 적용 된 이후로 순서대로 동작 함

```js
router.use(auth); // 3번
router.get('/', (req, res, next) => {
  res.send('H');
}); // 4번
// 1번
app.use((req, res, next) => {
  console.log(req.path);
  next();
});
app.use('/admin', router); // 2번
```

3. 미들웨어 서브스택

- use나 http method 함수에 여러 개의 미들웨어를 동시에 적용할 수 있음
- 주로 한 개의 경로에 특정해서 미들웨어를 적용하기 위해 사용
- 전달된 인자의 순서 순으로 동작

```js
app.use(middleware1, middleware2, ...)
app.use('/admin', auth, adminRouter)
app.get('/', logger, (req, res, next) => {res.send('H')})
```

4. 오류처리 미들웨어  
   ✔️ 일반적으로 가장 마지막에 위치

- 다른 미들웨어들과는 달리 err, req, res, next 네가지 인자를 가지며, 앞선 미들웨어에서 next 함수에 인자가 전달되면 실행됨
- 이전에 적용 된 미들웨어 중 next에 인자를 넘기는 경우 중간 미들웨어들은 뛰어넘고 오류처리 미들웨어가 바로 실행 됨

```js
app.use((req, res, next) => {
  if (!isAdmin(req)) {
    next(new Error()); // 1번
    return;
  }
  next();
});

app.get('/', (req, res, next) => {});

app.use((err, req, res, next) => {}); // 2번
```

5. 함수형 미들웨어  
   ✔️ 하나의 미들웨어를 작성하고, 작동 모드를 선택하면서 사용하고 싶을 경우 미들웨어를 함수형으로 작성

- API 별로 사용자의 권한을 다르게 제한하고 싶은 경우
- auth 함수는 미들웨어 함수를 반환하는 함수
- auth 함수 실행 시 미들웨어의 동작이 결정되는 방식으로 작성 됨
- 일반적으로 동일한 조직에 설정 값만 다르게 미들웨어를 사용하고 싶을 경우에 활용 됨

```js
const auth = memberType => {
  return (req, res, next) => {
    if (!checkMemeber(req, memberType) {
      next(new Error())
      return
    }
    next()
  }
}

app.use('/admin', auth('admin'), adminRouter)
app.use('/users', auth('member'), userRouter)
```

## REST API

✔️ REST 아키텍쳐를 준수하는 웹 API, RESTful API라고도 부름

- 동작을 HTTP method + 명사형 URL로 표현함
- URL 자원은 복수형으로 표현되며, 하나의 자원에 대한 접근은 복수형 + 아이디를 통해 특정 자원에 접근함
- URL을 통해 자원을 계층적으로 표현함

## JSON

✔️ 웹 API에서 데이터를 전송할 때 표현식으로 주로 사용됨

- 웹 API는 기본적으로 데이터를 문자열로 전송하게 됨
- 어떤 객체를 웹 API를 통해 문자열로 전달하기 위해 JSON을 사용함

## Express.js로 REST API 구현하기

- 데이터베이스 없이 Node.js 모듈 활용
- 간단한 메모의 작성, 수정, 삭제, 확인 기능 API 구현
- express-generator를 사용하지 않고 MVC 패턴 구현
  - MVC(Model-View-Controller): 웹 서비스의 가장 대표적인 프로젝트 구성 패턴
    - 프로젝트의 기능들을 어떻게 분리할지에 대한 하나의 구성 방법
    - Model: 데이터에 접근하는 기능 또는 데이터 그 자체를 의미
    - View: 데이터를 표현하는 기능을 의미, 주로 Controller에 의해 데이터를 전달받음
    - Controller: Model을 통해 데이터에 접근하여, 처리 결과를 View로 전달하는 기능을 의미. 웹 서비스에선 주로 라우팅 함수가 해당 기능을 수행함

### JSON 데이터 처리 미들웨어 사용하기

✔️ express에서 기본적으로 제공 해주는 express.json() 미들웨어를 사용해야 JSON 데이터를 사용할 수 있음  
`app.use(express.json())`

## Postman 사용하기

✔️ API를 테스트할 수 있는 도구로, HTTP 요청을 손쉽게 작성하여 테스트 해 볼 수 있게 도움

### Postman으로 API 문서화하기

1. collection 만들기
2. api request 만들기
3. document 작성하기
4. 전체 문서 확인하기

### Postman으로 API 테스트하기

1. HTTP Method 설정하기
2. qeury param 사용하기
3. path variable 사용하기
4. body 사용하기

---

# 게시판 CRUD 제작

## MongoDB

✔️ 대표적인 NoSQL, Document DB이며 대용량 데이터를 처리하기 좋게 만들어짐

- _Database_
  - 하나 이상의 collection을 가질 수 있는 저장소
  - SQL에서의 database와 유사
- _Collection_
  - 하나 이상의 Document가 저장되는 공간
  - SQL에서의 table과 유사하지만, document의 구조를 정의하지 않음
- _Document_
  - MongoDB에 저장되는 자료
  - SQL에서 row와 유사하지만 구조제약 없이 유연하게 저장 가능
  - JSON과 유사한 BSON을 사용하여 다양한 자료형을 지원
  - ObjectID: 각 document의 유일한 키값, document를 생성할 때 자동으로 생성되는 값

### NoSQL(Non SQL) VS RDB(Relational Database)

- _NoSQL_  
  ✔️ 구조화된 질의어를 사용하지 않는 데이터베이스
  - 자료 간의 관계에 초점을 두지 않음
  - 데이터를 구조화하지 않고, 유연하게 저장함
  - 사전작업 없이 데이터 베이스를 사용할 수 있음
  - 데이터베이스 작업에 크게 관여하지 않고 프로젝트를 빠르게 진행할 수 있음
- _RDB_  
  ✔️ 관계형 데이터베이스
  - 자료들의 관계를 주요하게 다룸
  - SQL 질의어를 사용하기 위해 데이터를 구조화해야함
  - 스키마에 정의된 데이터가 아니면 저장할 수 없는 제약이 따름

## Mongoose ODM(Object Data Modeling)

✔️ MongoDB의 Collection에 집중하여 관리하도록 도와주는 패키지  
✔ Collection을 모델화하여, 관련 기능들을 쉽게 사용할 수 있도록 도와줌

- _연결관리_
  - MongoDB의 기본 Node.js 드라이버는 연결 상태를 관리하기 어려움
  - Mongoose를 사용하면 간단하게 데이터베이스와의 연결 상태를 관리해줌
- _스키마 관리_
  - 데이터 형식을 미리 정의해야 코드 작성과 프로젝트 관리에 유용함
  - Mongoose는 Code-Level에서 스키마를 정의하고 관리할 수 있게 해 줌
- _Populate_
  - MongoDB는 기본적으로 Join을 제공하지 않음
  - Join 대신 populate를 사용하여 간단하게 구현할 수 있음

### 사용 방법

1. 스키마 정의

- Collection에 저장될 Document의 스키마를 Code-Level에서 관리할 수 있도록 Schema를 작성할 수 있음
- 다양한 형식을 미리 지정하여, 생성, 수정 작업 시 데이터 형식을 체크해주는 기능을 제공함
- `timestamps` 옵션을 사용하면 생성, 수정 기간을 자동으로 기록해 줌

```js
const { Schema } = require('mongoose');
const PostSchema = new Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);
```

2 모델 만들기

- 작성된 스키마를 mongoose에서 사용할 수 있는 모델로 만들어야 함
- 모델의 이름을 지정하여 Populate 등에서 해당 이름으로 모델을 호출할 수 있음

```js
const mongoose = require('mongoose');
const PostSchema = require('./schemas/board');
exports.Post = mongoose.model('Post', PostSchema);
```

3. 데이터베이스 연결

- connect 함수를 이용하여 간단하게 데이터베이스에 연결할 수 있음
- mongoose는 자동으로 연결을 관리해주어 직접 연결 상태를 체크하지 않아도 모델 사용 시 연결 상태를 확인하여 사용이 가능할 때 작업을 실행 함

```js
const mongoose = require('mongoose');
const { Post } = require('./models');
mongoose.connect('mongodb://localhost:270177/myapp');
```

4. 모델 사용

- 작성 된 모델을 이용하여 CRUD를 수행할 수 있음

| CRUD   | 함수명                                                     |
| ------ | ---------------------------------------------------------- |
| CREATE | create                                                     |
| READ   | find, findById, findOne                                    |
| UPDATE | updateOne, updateMany, findByIdAndUpdate, findOneAndUpdate |
| DELETE | deleteOne, deleteMany, findByIdAndDelete, findOneAndDelete |

- _CREATE_

  - create 함수를 사용하여 Document 생성
  - create 함수에는 Document Object(단일 Document) 전달 가능
  - Document Object의 Array(복수 Document) 전달 가능
  - create는 생성된 Document를 반환해 줌

  ```js
  const { Post } = require('./models');

  async function main() {
    const created = await Post.create({
      title: 'first title',
      content: 'second title',
    });

    const multipleCreated = await Post.create([item1, item2]);
  }
  ```

- _FIND(READ)_

  - find 관련 함수를 사용하여 Document를 검색
  - query를 사용하여 검색하거나 findById를 사용하면 ObjectID로 Document를 검색할 수 있음

  ```js
  const { Post } = require('./models');

  async function main() {
    const listPost = await Post.find(query);
    const onePost = await Post.findOne(query);
    const postById = await Post.findById(id);
  }
  ```

- _UPDATE_
  - update 관련 함수를 사용하여 Document를 수정
  - find~함수들은 검색된 Document를 업데이트를 반영하여 반환해줌
  - mongoose의 update는 기본적으로 `$set operator`를 사용하여, Document를 통째로 변경하지 않음
  ```js
  async function main() {
    const updateResult = await Post.updateOne(query, { ... })
    const updateResults = await Post.updateMany(query, { ... })
    const postById = await Post.findByIdAndUpdate(id, { ... })
    const onePost = await Post.findOneAndUpdate(query, { ... })}
  ```
- _DLETE_
  - delete관련 함수를 사용하여 Document 삭제
  - find~함수들은 검색된 Docuemnt를 반환해 줌
  ```js
  async function main() {
    const deleteResult = await Post.deleteOne(query);
    const deleteResults = await Post.deleteMany(query);
    const onePost = await Post.findOneAndDelete(query);
    const postById = await Post.findByIdAndDelete(query);
  }
  ```

### query

✔️ MongoDB에도 SQL의 where와 유사한 조건절 사용 가능  
✔️ MongoDB의 query는 BSON 형식으로, 기본 문법 그대로 mongoose에서도 사용 가능

- {key: value}로 exact match
- `$lt`, `$lte`, `$gt`, `$gte`를 사용하여 range query 작성 가능
- `$in`을 사용하여 다중 값으로 검색
- `$or`를 사용하여 다중 조건 검색

```js
Person.find({
  name: 'siwook',
  age: {
    $lt: 20,
    $gte: 10,
  },
  language: {
    $in: ['ko', 'en'],
  },
  $or: [{ status: 'ACTIVE' }, { istFresh: true }],
});
```

- Mongoose는 쿼리 값으로 배열이 주어지면 자동으로 `$in` 쿼리를 생성해 줌

```js
Person.find({ name: ['elice', 'bob'] });
// {name: { $in: ["elice", "bob"]}}
```

### populate

✔️ Document 안에 Document를 담지 않고, ObjectID를 가지고 reference하여 사용할 수 있는 방법을 제공 함  
✔️ Document에는 reference되는 ObjectID를 담고, 사용할 때는 populate하여 하위 Document처럼 사용할 수 있게 해 줌

```js
const Post = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const post = await Post.find().populate(['user', 'comments']);
```

## Express.js + Mongoose ODM

✔️ Express.js는 프로젝트 구조를 자유롭게 구성할 수 있기 때문에 어느 부분에 Mongoose ODM을 위치시키면 좋을지 적절한 위치를 결정하는 것이 중요

- 일반적으로 models 디렉토리에 Schema와 Model을 같이 위치
- app 객체는 어플리케이션 시작을 의미하는 부분이므로 해당 부분에 데이터 베이스 연결을 명시하는 mongoose.connect를 위치

### mongoose ODM 커넥션 이벤트

- Express.js 어플리케이션은 종료되지 않고 동작
- 데이터베이스가 정상적으로 동작하는지를 파악해야 함
- 동작 중에 발생하는 데이터베이스 연결 관련 이벤트에 대한 처리를 하는 것이 좋음

```js
mongoose.connect('----');
mongoose.connection.on('connected', () => {});
mongoose.connection.on('disconnected', () => {});
mongoose.connection.on('reconnected', () => {});
mongoose.connection.on('reconnectFailed', () => {});
```

## Sequelize ORM(Object-Relational Mapping)

✔️ MySQL, PostgreSQL 등의 RDBMS를 이용하는 간단한 방법  
✔️ ODM이 단순히 모델에 집중하여 관리하는 것에 반해, ORM은 테이블 관계와 쿼리 등의 기능을 더욱 단순화 하는 용도로 주로 사용

### 디비 연결

```js
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
```

- sequelize도 연결을 관리하는 간단한 방법을 제공
- mongoose가 MongoDB만 연결이 가능한 데에 반해 sequelize는 MySQL, PostgreSQL, SQLite등 다양한 RDBMS에 연결 가능

### 스키마 작성

```js
const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    age: {
      type: DataTypes.Integer,
    },
  },
  {}
);
```

- sequelize는 define을 통해 Schema를 생성
- mongoose.Schema와 유사하지만 sequelize는 Schema가 DDL도 생성해 줌

```js
User.hasMany(Post);
Post.belongsTo(User);
Foo.belongsToMany(Bar);
Bar.belongsToMany(Foo);
```

- sequelize를 이용하면 테이블 간의 관계를 Code-Level로 관리할 수 있음
- 이를 이용하면 외래키 설정과 제약조건까지 DDL로 생성해 줌
- 또한 다대다 관계 설정을 통해 relation table도 자동으로 생성해 줌

### 쿼리

```User.findAll({
  where: {
    name: "e",
    age: {
      [Op.lt]: 20,
      [Op.gte]: 10
    },
  },
  include: User,
})
```

- Operator를 이용해 SQL 쿼리를 코드로 작성 가능
- 스키마의 관계 설정을 한 경우, include를 사용하여 자동으로 join 쿼리 생성 가능

### Synchronization

`sequelize.sync()`

- define된 model 데이터를 바탕으로 DDL을 자동으로 실행해 줌
- 직접 데이터 베이스에 접속하여 테이블 생성 및 관리를 할 필요가 없어짐
- 자동으로 생성된 DDL을 따르지 않으면 테이블 관리가 어려워짐

---

## Template Engine

✔️ 서버에서 클라이언트로 보낼 HTML의 형태를 미르 템플릿으로 저장  
✔️ 동작 시에 미리 작성된 템플릿에 데이터를 넣어서 완성된 HTML 생성  
✔️ 템플릿 엔진은 템플릿 작성 문법과 작성된 템플릿을 HTML로 변환하는 기능을 제공

- EJS: html과 유사한 문법의 템플릿 엔진
- Mustache: 간단한 데이터 치환 정도만 제공하는 경량화된 템플릿 엔진
- Pug: 들여쓰기 표현식을 이용한 간략한 표기와 레이아웃 등 강력한 기능을 제공

### Pug

✔️ 들여쓰기 표현식을 이용해 가독성이 좋고 개발 생산성이 높음  
✔️ HTML을 잘 모르더라도 문법적 실수를 줄일 수 있음  
✔️ layout, include, mixin 등 강력한 기능 제공

```pug
html
  head
    title= title
  body
    h1#greeting 안녕
    a.link(href="/") 홈
```

- HTML 닫기 태그 없이 들여쓰기로 블럭을 구분
- 등호를 이용해서 전달받은 변수 사용 가능
- id나 class는 태그 뒤에 이어서 바로 사용, 괄호를 이용해서 attribute 사용

```pug
each item in arr
  if item.name == "new"
    h1 New Document
  else
    h1= `$item.name}`
```

- each ~ in 표현식으로 주어진 배열의 값을 순환하며 HTML 태그를 만들 수 있음
- if, else if, else 를 이용해 주어진 값의 조건을 확인하여 HTML 태그를 만들 수 있음

```pug
// --- layout.pug ---
html
  head
    title= title
  body
    block content
// --- main.pug ---
extends layout
block content
  h1 Main Page
```

- `block`을 포함한 템플릿을 선언하면 해당 템플릿을 layout으로 사용할 수 있음
- layout을 `extends`하면 `block`부분에 작성한 HTML 태그가 포함됨
- 반복되는 웹사이트의 틀을 작성해두고 `extends` 하며 개발하면 매우 편리한 기능

```pug
// --- title.pug ---
h1= title
// --- main.pug ---
extend layout
block content
  include title
  div.content
    안녕하세요
  pre
    include article.txt
```

- 자주 반복되는 구문을 미리 작성해 두고 `include` 하여 사용할 수 있음
- 일반적인 텍스트 파일도 `include`하여 템플릿에 포함 가능

```
// --- listItem.pug ---
mixin listItem(title, name)
  tr
    td title
    td name
// --- main.pug ---
include listItm
table
  tbody
    listItem("제목", "이름")
```

- `mixin`을 사용하여 템플릿을 함수처럼 사용할 수 있게 선언할 수 있음
- `include`는 값을 지정할 수 없지만 `mixin`은 피라미터를 지정하여 값을 넘겨받아 템플릿에 사용할 수 있음

### Express.js와 pug의 연동

✔️ app.set을 이용해 템플릿이 저장되는 디렉토리를 지정하고, 어떤 템플릿 엔진을 사용할지 지정할 수 있음  
✔️ `res.render` 함수는 `app.set`에 지정된 값을 이용해 화면을 그리는 기능을 수행함  
✔️ `render(템플릿의이름, 템플릿에전달되는값)`

```js
// --- app.js ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// --- request handler ---
res.render('main', { title: 'Hello Express' });
```

### Express.js의 app.locals

✔️ Express.js의 `app.locals`를 사용하면 `render` 함수에 전달되지 않은 값이나 함수를 사용할 수 있음  
✔️ 템플릿에 전역으로 사용될 값을 지정하는 역할

```js
// --- app.js ---
app.locals.appName = 'Express';
```

```pug
// --- main.pug ---
h1 = appName  // <h1>Express</h1>
```

### express-generator 사용 시 템플릿 엔진 지정하기

`$ express --view=pug myapp`  
✔️ express-generator는 기본적으로 jade라는 템플릿 엔진을 사용  
✔️ jade는 pug의 이전 이름으로, 최신 지원을 받기 위해선 템플릿 엔진을 pug로 지정해야 함  
✔️ `--view`옵션을 사용하여 템플릿 엔진을 지정할 수 있음

---

## 게시판 CRUD 만들기

✔️ Create, Read, Update, Delete

- 데이터를 다루는 4 가지 기본적인 기능
- 일반적으로 위 4 가지에 대한 구현이 가능해야 서비스 개발에 필요한 요구사항을 충족할 수 있음

1. _Create_

- 게시판은 게시글을 작성할 수 있어야함
- 게시글 작성 시 제목, 내용, 작성자, 작성 기간 등의 정보를 기록함
- 게시글의 제목과 내용은 최소 n글자 이상이어야 함

2. _Read_

- 게시판은 게시글의 목록과 게시글의 상세를 볼 수 있어야 함
- 게시글 목록은 제목과 작성자 작성 시간의 간략화된 정보를 보여줌
- 게시글 상세는 제목, 작성자, 내용, 작성 시간, 수정 시간 등의 상세한 정보를 보여줘야 함

3. _Update_

- 게시판의 게시글은 수정이 가능해야 함
- 게시글 수정 시 제목과 내용이 수정 가능하고, 수정 시간이 기록되어야 함
- 게시글의 제목과 내용은 최소 n글자 이상이어야 함
- 게시글 수정은 작성자만 가능해야 함

4. _Delete_

- 게시판의 게시글은 삭제가 가능해야 함
- 게시글 삭제 시 목록과 상세에서 게시글이 접근되지 않아야 하며 게시글 삭제는 작성자만 가능해야 함

## Async Request Handler

✔️ request handler를 `async function`으로 작성하면서 `try ~ catch`, `next`를 자동으로 할 수 있도록 구성

- `asyncHandler`는 `requestHandler`를 매개변수로 갖는 함수형 미들웨어
- 전달된 `requestHanlder`는 `try ~ catch`로 감싸져 `asyncHandler` 내에서 실행 됨
- `throw` 되는 에러는 자동으로 오류처리 미들웨어로 전달되도록 구성됨

```js
const asyncHandler = (requestHandler) => {
  return async (req, res, next) => {
    try {
      await requestHandler(req, res);
    } catch (err) {
      next(err);
    }
  };
};
```

```js
router.get("/", asyncHandler(async (req, res) => {
  const posts = await Posts.find({})
  if (posts.length < 1) {
    throw new Error("Not Found")
  }
  res.render("posts/list", { posts })
})
```

### request handler의 오류 처리

1. `promise().catch(next`
2. `async function`, `try ~ catch`, `next`

## Pagination

✔️ 데이터가 많아지면 한 페이지의 목록에 모든 데이터를 표현하기 어려움  
✔️ 데이터를 균일한 수로 나누어 페이지로 분리하는 것

- page: 현재 페이지
- perPage: 페이지 당 게시글 수
- `/posts?page=1&perPage=10` 일반적으로 url query를 사용해 전달
- query는 문자열로 전달되기 때문에 Number로 형변환이 필요함

```js
router.get(... => {
  const page = Number(req.query.page || 1)
  const perPage = Number(req.query.perPage || 10)
  ...
}
```

- MongoDB의 `limit`와 `skip`을 사용하여 pagination 구현 가능
- `limit`: 검색 결과 수 제한
- `skip`: 검색 시 포함하지 않을 데이터 수
- pagination 시에는 데이터의 순서가 유지될 수 있도록 `sort`를 사용할 수 있도록 함
- 게시글 수 / 페이지 당 게시글 수 = 총 페이지 수

```js
router.get(... => {
  ...
  const total = await Post.countDocuments({})
  const posts = await Post.find({}).sort({createdAt: -1}).skip(perPage & (page - 1)).limit(perPage)
  const totalPage = Math.ceil(total / perPage)
```

- pagination을 `mixin`으로 선언
- pagination이 필요한 페이지에서 해당 템플릿을 `include`한 후, `+`pagination으로 `mixin`을 사용 함
- 현재 페이지는 `b` 태그로 굵게 표시

```js
mixin pagination(path)
  p
    -for(let i = 1; i <= totalPage; i++)
    a(href=`${path}?page=$[i}&perPage=${perPage}`)
      if i == page
        b = i
      else
        = i
    = " "
```

```js
include pagination
tr
  td
    +pagination("/posts")
```

## PM2 Process Manager

✔️ Node.js 작업을 관리해주는 Process Manager  
✔️ node 명령어로 실행 시 오류 발생이나 실행 상태 관리를 할 수 없음  
✔️ pm2는 작업 관리를 위한 다양한 유용한 기능을 제공해 줌

- 안정적인 프로세스 실행: 오류 발생 시 자동 재실행
- 빠른 개발환경: 소스 코드 변경 시 자동 재실행
- 배포 시 편리한 관리: pm2에 모든 프로세스를 한 번에 관리

### 사용 방법

- `$ pm2 init simple` 또는 `$ pm2 init` 명령어를 이용하여 pm2 설정파일 예제를 만들 수 있음
- 예제를 수정하여 설정파일을 생성한 후, `$ pm2 start` 명령어를 실행하면 어플리케이션을 pm2 데몬으로 실행해 줌
- 개발 시 `watch` 옵션 사용하여 파일 변경 시 서버 자동 재실행 구성

```js
module.exports = {
  apps: [
    {
      name: 'simple-board',
      scripts: './bin/www',
      watch: '.',
      ignore_watch: 'views',
    },
  ],
};
```

---

# 회원가입 및 로그인 구현

## 회원가입 구현

✔️ 이메일, 이름, 패스워드의 간단한 정보만 사용

- 이메일의 형식이 올바른지 확인
- 비밀번호 최소 길이 확인
- 패스워드와 패스워드 확인 문자가 일치하는지 확인

### 비밀번호 저장 방법 - Hash

✔️ `Hash`는 문자열을 되돌릴 수 없는 방식으로 암호화하는 방법

- 비밀번호의 `Hash` 값을 데이터베이스에 저장
- 로그인 시 전달된 비밀번호를 `Hash`하여 저장된 값과 비교해 로그인을 처리

```js
const hash = cryto.createHash('sha1'); // sha224, sha256
hash.update(password);
hash.digest('hex');
```

## Passport.js와 로그인

✔️ Express.js 어플리케이션에 간단하게 사용자 인증 기능을 구현하게 도와주는 패키지

- 유저 세션 관리 및 다양한 로그인 방식 추가 가능

### passport-local

✔️ `passport`는 다양한 로그인 방식을 구현하기 위해 `strategy`라는 인터페이스를 제공  
✔️ `strategy`는 인터페이스에 맞게 설계된 다양한 구현체들이 있음  
✔️ `passport-local`은 `username`, `password`를 사용하는 로그인의 구현체

### Passport.js 설정

```js
const local = require('./strategies/local');
passport.use(local);
```

- 작성한 strategy를 `passport.use`를 이용해 사용하도록 선언해야 함
- `passport.use`를 이용해 strategy를 사용하도록 선언한 후
- `passport.authenticate`를 사용해 해당 strategy를 이용해 요청을 처리할 수 있음

### Passport.js로 post 요청 처리

```js
// routes/auth.js
router.post('/', passport.authenticate('local'))

// app.js
const session = require('express-session')
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth/, authRouter)
```

- `passport.authenticate` 함수를 http 라우팅에 연결하면 passport가 자동으로 해당하는 strategy를 사용하는 request handler를 자동 생성
- `express-session`과 `passport.session()`을 사용하면 passport가 로그인 시 유저 정보를 세션에 저장하고 가져오는 동작을 자동으로 수행해 줌

### session 유저 활용

```js
passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((obj, callback) => {
  callback(null, obj);
});
```

- session을 이용해 user를 사용할 때에는 `serializeUser`와 `deserializeUser`를 설정해 주어야 함
- 이는 세션에 user 정보를 변환하여 저장하고 가져오는 기능을 제공
- 세션 사용 시 위 두 함수를 작성하지 않으면 passport 로그인이 동작하지 않음

### 로그아웃

```js
router.get('/logout', ... {
  req.logout()
  res.redirect('/')
})
```

- passport는 `req.logout`함수를 통해 세션의 로그인 정보를 삭제하여, 로그아웃 기능을 구현할 수 있음

### 로그인 확인 미들웨어

```js
const loginRequired = (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
    return;
  }
  next();
};

app.use('/posts', loginRequired, postsRouter);
```

## session store

✔️ 웹 서버가 클라이언트의 정보를 클라이언트별로 구분하여 서버에 저장  
✔️ 클라이언트 요청 시 Session ID를 사용하여 클라이언트의 정보를 다시 확인하는 기술

- 클라이언트가 정보를 저장하고, 요청 시 정보를 보내는 Cookie와 대조됨

### Session 작동 방식

1. 서버는 세션을 생성하여 세션의 구분자인 Session ID를 클라이언트에 전달
2. 클라이언트는 요청 시 session id를 함께 요청에 담아서 전송
3. 서버는 전달받은 session id로 해당하는 세션을 찾아 클라이언트 정보를 확인

### Express.js의 session

✔️ express-session 패키지를 사용하여 간단하게 session 동작을 구현할 수 있음  
✔️ 자동으로 session id를 클라이언트 전달, session id로 클라이언트 정보 확인

### MongoDB를 Session Store로 사용하기

✔️ connect-mongo 패키지를 이용해, MongoDB를 session store로 사용할 수 있음

- connect-mongo 패키지는 express-session 패키지의 옵션으로 전달 가능
- 자동으로 session 값이 변경될 때 update 되고, session이 호출될 때 find 함

### connect-mongo

```js
const MongoStore = require('connect-mongo');
app.use(
  session({
    secret: 'SeCrEt',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongoUrl',
    }),
  })
);
```

- `connect-mongo` 패키지를 사용해 express-session 설정 시 `store` 옵션에 전달하고 `mongoUrl`을 설정
- 세션데이터를 몽고디비에 저장하고 관리하는 기능을 자동으로 수행해 줌

## 회원과 게시글의 연동

### PostSchema 수정

```js
author: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
```

- PostSchema에 author 추가
- populate를 사용하기 위해 ObjectID 사용
- ref를 유저 모델의 이름인 'User'로 선언

### 게시글 등록 요청 수정

```js
const author = await User.find({
  shortId: req.user.shortId,
});
if (!author) {
  throw new Error('No User');
}

await Post.create({
  title,
  content,
  author,
});
```

- `req.user`에는 strategy에서 최소한의 정보로 저장한 shortId, email, username만 가지고 있음
- Post 생성 시 user의 ObejctID를 전달해야 하는데, 이를 위해 User에서 shortId로 회원을 검색하여 한번 더 검증
- type: ObjectID로 선언한 필드에 객체가 주어지면 자동으로 ObjectID 사용

### 게시글에 작성자 연동

```js
// ./routes/posts.js
router.get('/', ... {
  ...
  const posts = await Post.find({}) ... .populate('author')
}
res.render('posts/list', { posts })

// ./views/posts/list.pug
...
  td post.author.name
```

- 게시글 find시 populate를 추가하여 ObjectID로 저장된 author를 각 게시글에 주입
- 사용 시 `post.author.{field}`로 사용 가능

### 게시글 수정, 삭제 시 유저 확인

```js
const post = await Post.find({
  shortId,
}).populate('author');

if (post.author.shortId !== req.user.shortId) {
  throw new Error('Not Authorized');
}
```

- 게시글 수정, 삭제 시 작성자를 populate하여 로그인된 사용자와 일치하는지 확인

### 작성자 게시글 모아 보기 기능 구현

✔️ 기본적으로 MongoDB는 Document 검색 시, 전체 문서를 하나씩 확인  
✔️ 데이터가 많아질 경우 속도 저하의 가장 큰 원인  
✔️ MongoDB는 검색을 위해 Document를 정렬하여 저장하는 기능을 제공  
✔️ Index를 설정하면 주어진 쿼리를 효율적으로 수행하여 성능을 향상

- 다중 키, 좌표, 텍스트 등의 특별한 값으로 정리되는 인덱스도 제공

```js
author: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true,
  index: true
}
```

- PostSchema의 author 속성에 `index: true` 옵션을 사용하면 mongoose가 자동으로 MongoDB에 인덱스를 생성해 줌
- 이미 데이터가 많은 상태에서 인덱스를 추가할 시 작업 시간이 길어져, MongoDB가 응답하지 않을 수 있음
- 예상되는 인덱스를 미리 추가하는 것이 좋음

### 회원 게시글 라우팅 추가하기

```js
// ./routes/users.js
...
router.get('/:shortId/posts', ... => {
  ...
  const { shortId } = req.params
  const user = await User.find({ shortId })
  const posts = await Post.find({author: user}).populate('author')
  res.render('posts/list', { posts, user })
})
...
```

- RESTful 한 구성을 위해, 회원 -> 게시글의 경로를 `/users/{userId}/posts`로 구성
- 게시글 목록 view는 기존에 작성한 posts/list.pug를 재활용

### 게시글 목록 화면 수정

```pug
h2= user ? `${user.name}의 게시글`: "전체 게시글"
...
td: a(href='/users/${post.author.shortId}/posts`) = post.author.name
```

- 게시글 목록 화면을 재활용하기 위해 수정
- 유저의 게시글인 경우 `###의 게시글`이라는 제목 사용
- 게시글의 사용자 이름에 유저의 게시글 link 추가

## CSR로 댓글 기능 구현하기

1. 페이지 로드 시 필요한 리소스를 클라이언트에 선언
2. 클라이언트에서 필요한 데이터를 비동기 호출
3. 클라이언트가 전달받은 데이터를 가공, 리소스를 사용하여 화면에 표시

### 클라이언트에 리소스 선언 - HTML Template

✔️ 브라우저에 표시되지 않는 HTML Element를 작성  
✔️ JS로 이를 화면에 반복적으로 그릴 수 있게 하는 기술

### 댓글 화면 작성하기

```pug
table
  head
    tr
      td(colspan="2")
        input#content(type="text")
      td: button(onclick="writeComment()")
        댓글 작성
  tbody#comments
template#comment-template
  tr
    td.content
    td.author
    td.createdAt
```

- 게시글 상세 화면 하단에 댓글 작성, 목록 화면 추가
- HTML Template 사용하여 한 개의 댓글이 표시될 모양을 선언
- JS로 조작하기 위해 id, class를 선언하는 것이 유용함

### 데이터 비동기 호출 - API 작성하기

✔️ 지금까지의 구현들은 HTTP 응답으로 HTML을 전송하는 방식  
✔️ CSR을 구현하기 위해서는 HTML이 아닌, 데이터만 주고받을 수 있는 API를 구성해야 함(JSON 사용)

- 댓글 작성 API와 댓글 목록 API만 구현
- 댓글 작성 시 댓글 목록을 다시 불러와 그리는 형식으로 구현

### 게시글에 댓글 추가하기

```js
const CommentSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
})

const PostSchema = new Scheam({
  ...
  comments: [CommentSchema],
  ...
```

- mongoose의 sub-schema를 이용하여 Post 스키마에 Comment를 배열로 추가
- populate를 사용할 때, ObjectID만 저장하는 것과는 다르게 Comment의 내용을 게시글이 포함하게 됨
- sub-schema 내부에서도 populate 가능

### API 작성하기 - 댓글 작성

```
// routes/api.js
...
router.post('/posts/:shortId/comments', ... {
  const { shortId } = req.params
  const { content } = req.body
  const author = await User.findOne({ shortId: req.user.shortId })

  await Post.updateOne({ shortId }, {
    $push: { comments: {
      content,
      author,
    }}
  })

  res.json({ result: 'success' })
})
```

- api 라우터를 추가하고, RESTful하게 `api/posts/{postId}/comments` 경로로 댓글 작성 기능 구현
- 게시글 업데이트 시 `$push`를 사용하여 comments 배열에 새로 작성된 댓글 추가 -> 동시에 들어오는 요청에 대해 정확하게 처리
- api는 render하지않고 json으로 응답

### API 작성하기 - 댓글 목록

```js
...
router.get('/posts/:shortId/comments', ... {
  const { shortId } = req.params
  const post = await Post.findOne({ shortId })
  await User.populate(post.comments, {
    path: author
  })
  res.json(post.comments)
})
...
```

- `/api/posts/{postId}/comments로 RESTful 경로 설정
- find에 populate 하지 않고 User (model)의 populate를 사용하는 방법도 가능

### 데이터 비동기 호출 - fetch로 클라이언트에서 api 호출하기

✔️ 브라우저는 비동기 HTTP 요청을 fetch 함수를 이용해 제공 함  
✔️ jQuery의 ajax와 유사한 기능, jQuery를 사용하지 않고도 HTTP 요청 구현 가능  
✔️ fetch를 이용하면 간단하게 JS로 HTTP 요청을 비동기 처리할 수 있음

```pug
...
script.
  function writeComment() {
    const input = document.querySelector('#content')
    const content = input.value
    fetch('/api/posts/#{post.shortId}/comments', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    .then(() => {
      if (res.ok) {
        input.value = ''
          loadComments()
        }  else {
          alert("오류 발생")
        }
      }))
```

- 댓글 작성 버튼 클릭시 `writeComment()` 실행
- `input#content`에서 내용르 읽어 fetch로 댓글 작성 api 호출
- 호출 결과의 성공 여부를 확인하여, 댓글 다시 불러오기 실행

## MongoDB Aggregation

✔️ MongoDB에서 Document들을 가공하고, 연산하는 기능  
✔️ RDBMS에서 SQL로 수행할 수 있는 기능들을 유사하게 구현할 수 있음

- MongoDB의 find는 검색 필터링과 정렬 이외의 기능을 제공하지 않음
- 다른 collection에서 데이터를 가져오거나, 검색된 데이터를 그룹화 하는 등의 작업이 필요한 경우 Aggregation을 통해 이를 수행할 수 있음

```js
db.posts.aggregate([
  { $group: { _id: '$author', count: { $sum: 1 } } },
  { $match: { sum: { $gt: 10 } } },
  {
    $lookup: {
      from: 'users',
      localField: '_id',
      foreginField: '_id',
      as: 'users',
    },
  },
]);
```

- aggregation은 Stage들의 배열로 이루어지고 각 Stage는 순차적으로 수행됨

1. 작성자별 게시글 수를 취합
2. 게시글 수가 10개보다 많은 작성자를 찾음
3. 해당 작성자를 회원 collection에서 검색

---

# JWT, Nginx

## JWT(JSON Web Token)

✔️ 인증을 위한 정보를 특별한 저장소를 이용하지 않고, 전자 서명을 이용하여 확인하는 방법  
✔️ 데이터를 웹에서 사용하기 위한 스펙이므로 웹에서 문제없이 사용할 수 있는 문자열로만 구성된 base64 인코딩을 사용

- _header_: 토큰의 타입 (jwt), 데이터 서명 방식
- _payload_: 전달되는 데이터
- _signature_: 헤더와 페이로드의 전자서명

### 보안

✔️ JWT의 payload는 단순히 정보를 base64 encode해 decode시 정보가 노출 됨  
✔️ 민감한 정보는 제외하고 토큰 생성 필수

- 서버는 JWT를 생성할 때, 비공개키를 이용하여 서명을 함
- payload를 조작할 경우 서명이 일치하지 않기 때문에 인증 실패

### 작동 방식

1. 사용자 로그인
2. 서버는 로그인된 유저 정보를 JWT로 생성하여 클라이언트에 전달
3. 클라이언트는 전달받은 JWT를 이용하여 인증이 필요한 요청에 사용

### 사용 이유

❓ session은 기본적으로 웹 브라우저의 통신 스펙  
❓ JWT를 사용하면 어느 클라이언트에서나 동일한 방식의 사용자 인증을 구현 가능

## JWT + Cookie 사용하기

✔️ Cookie란 웹 서비스에서 사용하는 정보를 클라이언트에 저장하고, HTTP 요청 시 이를 함께 전송하여, 클라이언트 정보를 서버에 전달하는 기술

- Session: 클라이언트 정보를 서버 측 저장소에 저장하고 사용
- Cookie: 클라이언트 정보를 클라이언트(브라우저)에 저장하고 사용
- JWT + Cookie: 데이터베이스 접근이 줄어서 효율적인 인증 구현 가능

### JWT 로그인 구현하기

1. 기존 세션으로 구현된 로그인을 비활성화
2. 로그인 로직에서 JWT 생성 후 쿠키로 전달
3. passport-jwt패키지로 JWT 로그인 미들웨어 작성 및 사용

### 로그인 로직에 JWT 토큰 생성 및 쿠키 전달

✔️ `res.cookie` 함수 사용하여 token을 클라이언트에 쿠키로 전달

```js
setUserToken = (res, user) => {
  const token = jwt.sign(user, secret);
  res.cookie('token', token);
};

// ---
router.post('/', passport.authenticate('local'), (res, req, next) => {
  setUserToken(res, req.user);
  res.redirect('/');
});
```

### passport-jwt 사용하기

✔️ `passport-jwt` 패키지를 이용해 요청된 JWT 토큰의 서명을 확인하고 인증하는 기능을 구현

```js
const JwtStrategy = require('passport-jwt').Strategy;
const cookieExtractor = (req) => {
  const { token } = req.cookies;
  return token;
};
const opts = {
  secretOrKey: secret,
  jwtFromRequest: cookieExtractor,
};
module.exports = new JwtStrategy(opts, (user, done) => {
  done(null, user);
});

// ---
passport.use(jwt);
```

### JWT 미들웨어 추가

✔️ JWT 토큰은 기본적으로 모든 요청에 포함  
✔️ 요청에 토큰이 있는 경우 로그인된 상태로 처리하기 위해 모든 요청에 공통적으로 적용할 수 있는 미들웨어로 JWT 로그인을 추가

```js
app.use((req, res, next) => {
  if (!req.cookies.token) {
    next();
    return;
  }
  return passport.authenticate('jwt', (req, res, next));
});
```

### 로그아웃

✔️ 로그아웃은 간단하게 클라이언트 쿠키를 삭제하여 처리 가능  
✔️ token 값을 null로 전달하는 것과 함께, cookie의 만료 시간을 0으로 설정하여 클라이언트가 쿠키를 바로 만료시키도록 전달

```js
res.cookie('token', null, { maxAge: 0 });
```

## 회원 비밀번호 찾기 구현

1. 임의의 문자열로 비밀번호 초기화
2. 초기화된 문자열을 메일로 전달 => 메일 발송기능 개발 필요
3. 초기화 후 첫 로그인 시 비밀번호 변경 요청

### SMTP(Simple Mail Transfer Protocol)

✔️ 메일 전송을 위한 표준 규약  
✔️ SMTP 서버란 표준 규악을 통해 메일을 전송하는 기능을 구현한 서버

- Nodemailer 패키지를 사용하여 SMTP 서버를 통해 메일을 발송할 수 있음
- 메일 기능을 제공하는 서비스 제공자들은 SMTP 서버를 사용할 수 있게 제공

## OAuth(Open Authorization)

✔️ 서비스 제공자가 다른 서비스에게 데이터를 제공하기 위해 서비스 사용자에게 제공하는 사용자 인증방식의 표준

### 동작 방식

1. 서비스 제공자에게 인증 요청
2. 인증 완료 후 사용자 정보를 요청한 서비스로 전달
3. 인증 정보를 이용해 서비스 제공자의 데이터 사용

### OAuth와 로그인

- OAuth는 사용자의 인증을 제공하는 표준
- 이를 활용하여, 로그인 기능을 간편하게 구성할 수 있음
- 웹 서비스 제공자는 아이디, 비밀번호 로그인을 구현할 필요 없음
- 웹 서비스 사용자는 로그인 시 아이디, 비밀번호를 입력할 필요 없음

## 구글 로그인 구현하기

1. 구글 클라우드 플랫폼 프로젝트 생성
2. API 및 서비스 => OAuth 동의화면 설정
3. 사용자 인증정보 => OAuth 클라이언트 ID 만들기
4. passport-google-oauth20 연동

- passport-strategy 인터페이스의 구글 로그인 구현체
- OAuth인증을 구현하기 위해서는 인증 요청, 데이터 수신 등의 복잡한 작업 필요
- passport-google-oauth20은 손쉽게 구글 OAuth 2.0을 구현해주는 패키지

### passport-google-oauth20 작성

```js
const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = {
  clientID: 'clientID',
  clientSecret: 'clientSecret',
  callbackURL: 'callbackUrl',
}

...
new GoogleStrategy(config, (accessToken, refreshToken, profile, done) => {
  const { email, name } = profile._json
  ..
  // create or update user
```

- 구글 로그인이 완료된 후 결과를 전달받는 부분
- OAuth 클라이언트 설정값 및 완료 결과를 전달받을 callbackURL을 config로 설정
- `accessToken`, `refreshToken`은 다른 구글 API들을 사용하기 위한 토큰
- profile은 전달 받은 유저 정보. 이를 이용해 유저를 생성하거나 OAuth 정보를 업데이트 함

```js
passport.use(google);

// ---

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
  }),
  (req, res, next) => {
    res.redirect('/');
  }
);
```

- `/auth/google` 접근 시 자동으로 구글 로그인 페이지로 넘어감
- 로그인 완료 후 로그인 정보를 `/auth/google/callback`으로 전달해 줌(config에 설정된 주소)
- 전달받은 데이터는 strategy에서 처리
- 처리가 완료되면 request handler 실행

```pug
...
td: a(href="/auth/google") 구글로 로그인하기
```

- `/auth/google`로 link시 passport가 자동으로 구글 로그인 페이지로 이동 시켜 줌
- 로그인 결과를 `/auth/google/callback`으로 전달해 줌

## Nginx

✔️ 최근 신규 프로젝트에서 가장 많이 채택되고 있는 웹 서버 소프트웨어

- 웹 서버 소프트웨어
  - HTTP 요청을 받아 파일이나 프로그램 실행 결과를 HTTP 응답으로 보내주는 소프트웨어

### 사용하는 이유

❓ Node.js는 다른 언어와 달리 기본적으로 HTTP 요청을 수신하고, 응답하는 기능이 이미 있음

- 웹 서버 소프트웨어 없이도 스스로 동작 가능

❓ HTTPS, 도메인 연결, static file caching 등의 기능을 사용하기 위해 Nginx 같은 웹 서버 소프트웨어는 필수

- Node.js 단독으로 production-level 서비스를 구축할 수는 없음

### Nginx + Node.js

✔️ Nginx의 reverse-proxy 기능을 사용해, Node.js와 Nginx를 연결할 수 있음  
✔️ reverse-proxy는 HTTP 요청을 다른 서버에 전달하는 기능  
✔️ Nginx가 HTTP 요청을 받아, 설정된 내용에 해당하는 요청만 Node.js로 전달

```js
server {
  listen 80
  server_name www.example.com

  location {
    proxy_pass http://localhost:3000
    proxy_http_version 1.1
  }
}
```

- url로 접속한 모든 요청을 localhost:3000으로 전달하는 설정 파일

---

# Express와 MongoDB로 유저 API 만들기

## 3계층 구조

✔️ 백엔드 코드를 Control layer, Service layer, Model layer 구조로 나누어 구현하는 것

1. _Control layer_  
   ✔️ 사용자의 요청을 분석한 후, 알맞은 서비스로 해당 요청을 전달해 준 다음, 서비스의 결과를 다시 응답하는 층  
   ✔️ 라우팅이 이루어지는 층

- express의 경우, `req.params()`, `req.body()`, `res.status()`, `res.send()`
- routers 폴더

2. _Sevice layer_  
   ✔️ 컨트롤러부터 전달된 요청에 로직을 적용하는 층

- services 폴더

3. _Model layer_  
   ✔️ 서비스 층에서 데이터베이스 접근이 필요한 경우, 데이터 관련 코드가 작성되는 층

- Mongoose의 경우, `Model.fild({})`
- db 폴더

### 장점

1. 각 역할별로 개발 업무를 분담할 수 있으므로 분업이 용이
2. MVP 별로 개발 업무를 분담하는 경우에도, 각 MVP가 어떤 흐름으로 구현 되는지 코드 구조를 보고 이해하기 쉬움
3. 라우팅 관련 코드는 Controller 폴더에서, 서비스 로직 관련 코드는 Service 폴더에서, 데이터 관련 코드는 Model 폴더에서 구분하여 확인할 수 있으므로, 필요한 코드를 빠르게 찾을 수 있으며, 따라서 유지보수가 용이
4. 웹 서비스의 구현 방식을 변경하고자 할 때, 각 폴더는 역할이 분리되어 있으므로, Model 폴더 코드만 변경하면 되고 나머지 Controller, Service 폴더는 변경하지 않아도 됨
5. 코드가 기능별로 구분되어 있으므로, 기능별로 테스트를 진행하기 용이

---
