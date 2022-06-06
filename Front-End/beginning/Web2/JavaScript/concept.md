# 자바스크립트
## 자바스크립트 소개
### 데이터 타입   
✔️ 함수   
```js
const func1 = function() {}
function fun2() {}
```   
✔️ 객체      

```js
const student = {
  age: 20,
  name: "sw",
  sum: function() {}
}

student.age
student["name"]
```

### 프로퍼티와 메서드   
✔️ 문자열   
  - `str.length`: 문자열 길이 반환
  - `str.charAt(인덱스)`: 인덱스 위치 문자 반환
  - `str.charCodeAt(인덱스)`: 문자열 내 인덱스에 해당하는 문자의 유니코드 값 반환
  - `str.split(인자)`: 인자를 기준으로 문자 나눈 후 배열 반환
  - `parseInt(str)`: 정수형으로 반환
  - `parseFloat(str)`: 실수형으로 
  - `str.includs(검색할문자열, 인덱스)`: 문자열이 특정 문자열을 포함하는지 반환   

✔️ 배열   
  - `arr.length`: 배열 길이 반환
  - `arr.push(데이터)`: 배열 뒤에 데이터 삽입
  - `arr.unshift(데이터)`: 배열 앞에 데이터 삽입
  - `arr.pop()`: 배열 뒤의 데이터 제거
  - `arr.shift()`: 배열 앞의 데이터 제거
  - `arr.sort()`: 아스키 코드로 정렬
    - `arr.sort((a, b) => a - b)`: 오름차순 
  - `arr.map((요소, 인덱스) => {})`: 요소 하나씩 접근해서 실행해 배열 반환
    - ex) `arr.map(v => v.map(w => w))`: 이 중 배열 반환
  - `arr.forEach(콜백함수)`: map과 비슷하나 객체도 가능하며 반환값 없음, 콜백함수는 현재 값, 인덱스, forEach를 호출한 배열을 매개변수로 받음
  - `arr.filter(함수)`: 특정 요소 삭제할 때 사용
  - `arr.reduce(함수)`: 요소들 더할 때 사용
  
  ```js
  A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  A.reduce((a, b) => a + b) // 55
  A.reduce((a, b) => a + b, 10) // 65
  ```   

✔️ Math   
  - `Math.abs(숫자)`: 숫자의 절대값 반환
  - `Math.ceil(숫자)`: 숫자의 올림 반환
  - `Math.floor(숫자)`: 숫자의 내림 반환
  - `Math.round(숫자)`: 숫자의 반올림 반환
  - `Math.random()`: 임의의 숫자 반환

### 참고   
✔️ `onClick`, `onChange`, 백틱 안에 태그 사용 가능   
✔️ script을 맨 뒤에 놔야 body를 읽고 querySelector 가능   

---

## 자바스크립트 문법 활용
### 연산자   
✔️ 숫자 뿐 아니라 문자열도 산술연산자 사용 가능(단, + 빼고 다 숫자처럼 계산)   
- ==: 값이 같다, ===: 데이터 타입과 값이 같다

### 값 입력 받기   
✔️ 자바스크립트에서 콘솔을 통해 값을 입력받기 위해서는 readline 모듈을 이용할 수 있음   
1. 모듈 가져오기
2. readline 모듈을 이용해 입출력을 위한 인터페이스 객체 만듦
3. rl 변수 사용

```js
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on("line", (line) => {
  // 한 줄씩 입력 받은 후 실행할 코드
  // 입력된 값은 line에 저장 됨
  rl.close() // close가 없으면 입력을 무한히 받음
})
rl.on("close", () => {
  // 입력이 끝난 후 실행할 코드
})
```
- 한 번에 여러 입력 받기
```js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = []

rl.on("line", function (line) {
    input = line.split(' ') // 문자열로 입력 받음
    line.split(' ').map((el) => parseInt(el)) // 숫자로 입력 받음
    rl.close();
}).on("close", function () {
    const inputLen = input.length
    for (let i = 0; i < inputLen; i++) {
        console.log(input[i])
    }
});
```
### Destructuring assignment
✔️ 구조 분해 할당은 객체나 배열을 해체하여 개별 변수에 담을 수 있게 하는 표현식   
- 객체
```js
const a = {i: 1, j: 2, k: 3}
const {i, j, k} = a
```
- 배열
```js
const a = [1, 2, 3]
const [a0, a1, a2] = a
```

### Shorthand property names   
✔️ 단축 속성명을 이용해 새로운 객체 선언을 간편하게 할 수 있음   
```js
const u = "u"
const a = 2
const s = "엘"

const p = {u, a, s}
```

### Spread Syntax   
✔️ 전개 구문은 배열이나 객체를 전개할 때 사용.
- 배열이나 객체에 `...`을 붙여 사용
- 함수 호출 및 선언, 배열 선언, 객체 선언 시 다양하게 활용 가능
```js
const n = [1, 2, 3]
const g = (...n) => {
  let s = 0
  n.forEach((i) => s += i )
  return s
}
g(...n)
const l = [0, ...n, 4, 5, 6]
```
```js
const u = {n: "김", a: 2, s: "엘"}
const nU = {...u, g: 3, a: 4} // 겹치는 key는 나중에 오는 값으로
```

### Optional chaining   
✔️ 객체나 변수에 연결된 다른 속성 참조할 때 유효한 속성인지 검사하지 않고 값을 읽을 수 있게 해줌   
- 유효한 속성이 아닐 경우 에러를 발생시키지 않고 `undefined`를 반환
```js
const x = a?.b?.c
const y = array?.[index]
```

### 참고   
✔️ 얕은 복사 VS 깊은 복사   
- 주소를 복사, a = b
- 값을 복사, spread / map / slice() / Lodash

- `setInterval(콜백함수, 시간ms)`, `clearInterval()`
- `delete 객체이름["키"]`: 특정 키를 값진 데이터 제거
- `document.querySelector('[name=" "]')`: 특정 속성 축출
- `innerText` vs `innerHTML`
  - 텍스트로만 읽는 것과 html element를 포함시킴
- script를 맨 밑에 쓰지 않고 싶을 때

```html
<script>
  window.onload = () => {
  <!-- 코드 작성 -->
  }
</script>
```

- querySelectorAll 같이 배열로 가져왔을 때 진짜 배열로 사용
```js
real_arr = Array.from(arr)
```
---

## DOM, 이벤트
### DOM이란?
Document Object Model: 객체 지향 모델로써 구조화된 문서를 표현하는 형식
DOM 요소로 스타일 변경: `요소.style.color = "색상"`

### Node와 Node tree
노드의 종류
- 문서 노드: HTML 문서 전체를 나타내는 노드 - 9
- 요소 노드: 모든 HTML 요소는 요소 노드로, 속성 노드를 가질 수 있는 유일한 노드 - 1
- 주석 노드: HTML 문서의 모든 주석 - 8
- 속성 노드: 모든 HTML 요소의 속성, 요소 노드에 관한 정보를 가짐. 하지만 해당 요소 노드의 자식 노드에는 포함되지 않음 - 2
- 텍스트 노드: HTML 문서의 모든 텍스트 - 3

노드의 값
- NodeName: 이름
- NodeValue: 값
- NodeType: 타입

### Event
웹 브라우저가 알려주는 HTML 요소에 대한 사건의 발생, JS는 발생한 이벤트에 반응하여 특정 동작을 수행할 수 있다.

---
## 실행 컨텍스트
### 화살표 함수와 일반 함수의 this
- 화살표 함수의 this: 호출된 함수를 둘러싼 실행 컨텍스트를 가리킴, this가 정해지면 바꿀 수 없음
- 일반 함수의 this: 새롭게 생성된 실행 컨텍스트를 가리킴

### 자바스크팁트 Closure
함수는 일급 객체
- 일급 객체란, 다른 변수처럼 대상을 다룰 수 있는 것
- 자바스크립트에서 함수는 일급 객체
- 즉, 자바스크립트에서 함수는 변수처럼 다룰 수 있음

클로저
- 자바스크립트 클로저는, 함수의 일급 객체 성질을 이용
- 함수가 생성될 때, 함수 내부에서 사용되는 변수들이 외부에 존재하는 경우 그 변수들은 함수의 스코프에 저장
- 함수와 함수가 사용하는 변수들을 저장한 공간을 클로저라 함

### Rest, Spread Operator
Rest Operator
- 함수의 인자, 배열, 객체 중 나머지 값을 묶어 사용하도록 함
- 함수의 인자 중 나머지를 가리킴
- 배열의 나머지 인자를 가리킴
- 객체의 나머지 필드를 가리킴 

Spread Operator
- 묶인 배열 혹은 객체를 각각의 필드로 전환
- 객체는 또 다른 객체로의 spread를 지원
- 배열은 또 다른 배열의 인자, 함수의 인자로의 spread를 지원

---

## 이벤트 루프
### 자바스크립트 비동기
- 자바스크립트 엔진은 비동기 처리를 지원하지 않음
- 대신, 비동기 코드는 정해진 함수(API)를 제공하여 활용할 수 있음
- 비동기 API의 예시로, `setTimeout`, `XMLHttpRequest`, `fetch` 등의 Web API가 있음
- node.js의 경우 파일처리 API, 암호화 API 등을 제공

#### 비동기 처리 모델
- 비동기 코드를 처리하는 모듈은 자바스크립트 엔진 외부에 있음
- 이벤트 루프, 태스크 큐, 잡 큐 등으로 구성 됨
- API 모듈은 비동기 요청을 처리 후 태스크 큐에 콜백함수를 넣음
- 자바스크립트 엔진은 콜 스택이 비워지면, 태스크 큐의 콜백함수 실행

## Promise
### Promise API
- Promise API는 비동기 API 중 하나
- 태스크 큐가 아닌 잡 큐 또는 마이크로태스크 큐를 사용함
- 잡 큐는 태스크 큐보다 우선순위가 높음

#### Promise
- 비동기 작업을 표현하는 자바스크립트 객체
- 비동기 작업의 진행, 성공, 실패 상태를 표현
- 비동기 처리의 순서를 표현할 수 있음

```js
let promise = new Promise((resolve, reject) => {
  if (false) return reject("실패")
  else return resolve("성공")
  }
)
```

### 메서드
- `then()`: 성공했을 때 실행할 콜백 함수를 인자로 넘김
  - `then(callback1, callback2)`: callback1의 자리에 성공, callback2의 자리에 실패 메서드를 인자로 넘길 수 있음
- `catch()`: 실패했을 때 실행할 콜백 함수를 인자로 넘김
- `finally()`: 성공/실패 여부와 상관없이 모두 실행할 콜백 함수를 인자로 넘김
```js
promise
  .then(d => { console.log(d) }) // 
  .catch(e => { console.log(e) }) // 
  .finally(() => { console.log("end") })
```

#### 메서드 체인
- then/catch 메서드가 또 다른 promise를 리턴하여, 비동기 코드에 순서를 부여함
- 이렇게 동일한 객체에 메서드를 연결할 수 있는 것을 체이닝(chaining)
- 함수를 호출한 주체가 함수를 끝낸 뒤 자기 자신을 리턴하도록 하여 구현함

```js
promise
  .then(d => fetchUser(d))
  .then(u => { console.log('U: ', u) })
  .catch(e => { console.log("실패", e)})
```

#### resolve, reject
- `Promise.resolve` 함수는 성공한 Promise를 바로 반환함
- `Promise.reject` 함수는 실패한 Promise를 바로 반환함
- 인위적으로 Promise 메서드 체인을 만들 수 있음
- 비동기 코드로 진행해야 하는 상황 등에 유용하게 사용할 수 있음

```js
Promise
  .resolve(10)
  .then(console.log)
  
Promise
  .reject("E")
  .catch(console.log)
```

#### all
- `Promise.all`은 Promise의 배열을 받아 모두 성공 시 각 Promise의 resolved값을 배열로 반환함
- 하나의 Promise라도 실패할 시, 가장 먼저 실패한 Promise의 실패 이유를 반환함

```js
Promise.all([
  Promise1,
  Promise2,
  Promise3
])
  .then(v => { console.log("모두 성공", values)})
  .catch(e => { console.log("하나라도 실패", e)})
```

## async/await와 API
### async/await
- Promise를 활용한 비동기 코드를 간결하게 작성하는 문법
- async/await 문법으로 비동기 코드를 동기 코드처럼 간결하게 작성할 수 있음
- async 함수와 await 키워드를 이용함
- await 키워드는 반드시 async 함수 안에서만 사용해야 함
- async로 선언된 함수는 반드시 Promise를 리턴함

```js
// 두 개가 같음
const asyncFunc = async () => {
  let d1 = await fetchData1() // fetchData()는 Promise를 리턴하는 함수
  let d2 = await fetchData2(d1)
  let d3 = await fetchData3(2)
  return d3
}

const promiseFunc = () => {
  return fetchData1()
    .then(fetchData2)
    .then(fetchData3)
}
```

#### 에러 처리
- try-catch 구문으로 async/await 형태 비동기 코드 에러 처리가 가능함
- catch 절의 e는, Promise의 catch 메서드가 받는 반환 값과 동일함

```js
const asyncFunc = async () => {
  try {
    let d = await fetchData1()
    return fetchData2()
  }
  catch (e) {
    console.log("fail:", e)
  }
}
```

### HTTP, REST API
#### HTTP
- Web에서 서버와 클라이언트 간의 통신하는 방법을 정한 것
- 클라이언트는 웹 브라우저 등 서버로 요청을 보내는 대상
- 서버는 클라이언트가 요청을 보내기 전까지 대응하지 않음
- 서버와 클라이언트 사이에는 무수히 많은 요소가 존재
- HTTP는 이런 존재들 사이의 통신 방법을 규정

#### HTTP Message
- 서버 주소, 요청 메서드, 상태 코드, target path, 헤더 정보, 바디 정보 등이 포함
- 요청 메시지, 응답 메시지의 모양이 다름
- HTTP/1.1 메시지는 사람이 읽을 수 있음

#### HTTP Header
- HTTP 메시지의 헤더에는 콘텐츠 관련 정보, 인증 관련 정보, 쿠키 정보, 캐시 관련 정보 등 서버와 클라이언트 간 통신 시 필요한 정보를 담음
- 클라이언트 요청 시, 서버 응답 시 모두 헤더에 정보를 담을 수 있음

#### HTTP Status
- HTTP 요청 시, 클라이언트는 요청의 결과에 대한 상태 정보를 얻음
- 200, 400, 500 등 숫자 코등와 OK, NOT FOUND 등의 텍스트로 이루어짐
- 코드를 이용해 각 결과에 해당하는 행위를 할 수 있음

#### 요청 메서드
- HTTP에서, 클라이언트는 서버로 요청을 보냄
- 요청 시 요청 메서드로 특정 요청에 대한 동작을 저으이함
- GET, POST, PUT, PATCH, DELETE, OPTIONS, CONNECT, TRACE 등이 규정됨

#### REST API
- API는 사용자가 특정 기능을 사용할 수 있도록 제공하는 함수
- REST API는 HTTP의 요청 메서드에 응하는 서버 API와 클라이언트 간 통신의 구조가 지켜야 할 좋은 방법을 명시한 것
- 구체적인 내용으로는 요청 메서드의 의미, URI 설계, 클라이언트의 상태에 대한 동작 등을 정의함
- GET: 리소스 정보를 얻음, POST: 리소스를 생성, PUT: 리소스를 생성하거나 업데이트, DELETE: 리소스를 제거

### Fetch API
- 기존 XMLHTTPRequest를 대체하는 HTTP 요청 API
- Promise를 리턴하도록 정의됨
- 네트워크 요청 성공 시, Promise는 Response 객체를 resolve 함
- 네트워크 요청 실패 시, Promise는 에러를 reject 함

```js
let r = fetch(serverURL)
// response 객체는 결과에 대한 다양한 정보를 담음
r.then(response => {
  response.ok  // HTTP Status code가 200~299 사이면 true, 그 외 false
  response.status  // HTTP status code를 담음
  response.statusText
  response.url  // 요청한 URL 정보를 담음
  response.bodyUsed
  for (let [k, v] of response.headers) { console.log(k, v) }  // response 객체의 헤더 정보를 얻음
})
```

#### body 메서드
- response.json() 메서드는 얻어온 body 정보를 json으로 만드는 Promise를 반환함
- Promise가 resolve 되면 얻어온 body 정보를 읽음
- response.text(), response.blob(), response.formData() 등의 메서드로 다른 형태의 바디를 읽음

```js
fetch(serverURL).then(response => response.json()).then(json => { console.log('body: ', json) })
```

#### POST 요청
- fetch(url, options)로, fetch 메서드 옵션을 넣음
- method 필드로 여러 요청 메서드를 활용함
- headers, body 필드를 활용해 서버에 추가 정보를 보냄

```js
fetch(serverURL, {
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authentication: 'mysecret'
  },
  body: JSON.stringfy(formData)
  }
).then(response => response.json()).then(json => { console.log(json) })
```

### Axios
- 웹 브라우저와 Node.js를 위한 HTTP 비동기 통신 라이브러리
- 화면 전체를 새로 고침 하지 않고 변경된 일부 데이터만 로드하는 비동기 처리가 가능함
- Ajax와 유사하며 API를 이용한 통신을 할 때 주로 사용함
- 사용법
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```
```js
axios.post(url, data 객체)
axios.get(url)
axios.put(url, data 객체)
axios.delete(url)
```

#### Fetch vs Axios
Fetch
  - 별도의 import나 설치가 필요하지 않음
Axios
  - 설치 과정이 필요함
  - JSON 자동 변환, 응답 시간 초과 설정 기능 등을 지원함


