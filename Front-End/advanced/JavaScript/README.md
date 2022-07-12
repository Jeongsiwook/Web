# ES6

## var => let / const

### var

특정 범위에서 재선언을 했을 때, 이미 같은 이름의 변수가 정의 되어있다는 것을 모를 경우 문제가 발생할 수 있음.

1. scope

- 전역 범위  
  var 변수가 함수 밖에서 선언될 경우, 모든 window에서 접근이 가능.

- 함수 범위  
  var 변수가 함수 안에서 선언될 경우, 해당 함수 안에서만 접근이 가능.

2. 선언 및 할당  
   같은 범위 내에서 var 변수는 재선언을 해도 오류가 발생하지 않음.

3. Hoisting  
   JS에서 변수나 함수의 정의 부분이 해당 범위의 최상위로 끌어올려지는 것을 의미.

```js
// 실제 코드
console.log(hi);
var hi = 'hello';

// 다음과 같이 코드를 해석 함.
var hi;
console.log(hi); // undefined
hi = 'hello';
```

### let

중복 이름을 사용하더라도 범위가 다른 경우에는 명확하게 구분하여 사용할 수 있음.

1. scope  
   block 범위를 가져, 선언된 변수는 블록 내에서만 사용할 수 있음.

2. 선언 및 할당  
   재할당은 가능하나, 재선언 불가.  
   단, 범위가 다른 경우에는 재선언 가능.

3. Hoisting  
   var는 undefined로 초기화 된 것과는 달리 let은 초기화 되지 않아 `Reference Error`오류가 발생.

### const

상수이며, let 선언과 유사하게 동작.

1. scope  
   let과 같음.

2. 선언 및 할당  
   재선언 및 재할당이 불가능. 따라서, 변수 선언 시 초기화를 바로 해줘야 함.

- 객체 값의
  const로 선언될 경우 object로 재할당할 수 없음. 만약 속성값을 변경하고 싶을 경우에는 `.`을 사용하여 속성에 접근.

```js
const hi = {
  msg: 'hi',
  time: 4,
};

hi = {
  msg: 'bye',
  addr: 'Seoul',
}; // SyntaxError: Identifier 'hi' has already been declared
```

3. Hoisting  
   let과 같음.

---

# 함수 호출 방법

## call-by-value

객체를 제외한 변수 적용.

```js
var a = 5;
var b;
b = a;
a = 3;
console.log(a); // 3
console.log(b); // 5
```

## call-by-reference

객체 적용.

```js
let c = { greeting: 'Welcome' };
let d;
d = c;

// Mutating the value of c
c.greeting = 'Welcome to geeksforgeeks';
console.log(c); // {greeting: 'Welcome to geeksforgeeks'}
console.log(d); // {greeting: 'Welcome to geeksforgeeks'}
```

---

# 실행 컨텍스트

코드를 실행하는데 필요한 환경을 제공하는 객체.  
식별자 결정(코드에서 변수나 함수의 값을 결정하는 것)을 더욱 효율적으로 하기 위한 수단.  
record와 outer로 구성.

## record(=Environment Record)

식별자와 식별자에 바인딩된 값을 기록.

1. 생성 단계  
   실행 컨텍스트 생성.  
   선언문만 실행해서 환경 레코드에 기록.  
   var는 undefined로 let, const는 초기화하지 않음.
2. 실행 단계  
   선언문 외 나머지 코드 순차적 실행.  
   환경 레코드 참조하거나 업데이트.

## outer(=Outer Environment Reference)

바깥 Lexical Environment를 가리킴.

---

# 함수

## 함수 표현식

변수 호이스팅과 동일하게 동작.

```js
study1(); // Type Error
study2(); // reference Error

var study1 = () => {
  //  do study
};
const study2 = () => {
  //  do study
};
```

## 함수 선언문

선언과 동시에 함수가 생성되어 선언 전에도 함수를 사용할 수 있음.

```js
study3(); // 정상 실행

function study3() {
  //  do study
}
```

---

# 클로저

closure는 함수와 함수가 선언된 렉시컬 환경의 조합.

함수가 생성될 당시의 외부 변수를 기억하는 특징이 있습니다.

## 장점

데이터를 보존할 수 있고, 정보의 접근을 제한할 수 있으며, 모듈화에 유리.

## 단점

메모리를 소모하며, scope 생성에 따른 퍼포먼스 손해가 있음.

## 사용법

```js
// cnt를 cntPlus() 함수로만 변화를 주고 싶었음
let cnt = 0;

function cntPlus() {
  cnt = cnt + 1;
}

console.log(cnt);
cntPlus();
console.log(cnt);

// 1억개의 코드
cnt = 100;
// 1억개의 코드
cntPlus();
console.log(cnt);
```

```js
function closure() {
  let cnt = 0;

  function cntPlus() {
    cnt = cnt + 1;
  }
  function printCnt() {
    console.log(cnt);
  }
  return {
    cntPlus,
    printCnt,
  };
}

const cntClosure = closure();
cntClosure.printCnt(); // 0
cntClosure.cntPlus();
cntClosure.printCnt(); // 1
```

---

# this

# 이벤트 루프

## Event Bubbling

## Capturing Delegation

# Promise

# Async/Await

## 예외처리 까다로운

# 원시 값

# 가비지 컬렉션 알고리즘

# Date 객체 현재 시간은 실제 시간과 차이가 있을 수 있고, moment를 쓰면 그걸 보상할 수 있는데 왜?

# 함수 객체

함수 객체는 일반 객체와 동일한 비교 원칙을 따름.
함수 객체는 오직 자신에게만 동일.

```js
function sumFactory() {
  return (a, b) => a + b;
}

const sum1 = sumFactory();
const sum2 = sumFactory();

console.log(sum1 === sum2); // => false
console.log(sum1 === sum1); // => true
console.log(sum2 === sum2); // => true
```

# 2022-06 추가된 기능

## Top level await

await을 async 안에서 쓰지 않아도 됨.

```js
// 이전 버전
(async function () {
  await startServer();
})();

// 최신 버전
await startServer();
```

## Error cause

오류의 원인을 설명하여, 더 나은 오류 메시지를 만들 수 있음.

```js
// 이전 버전
new Error("Can't save comment");

// 최신 버전
const err1 = new Error("Can't save comment", { cause: 'Not allowed.' });
const err2 = new Error("Can't save comment", { cause: 'Post not found.' });
const err3 = new Error("Can't save comment", { cause: 'Database is full.' });

err1.message; // Can't save comment
err1.cause; // Not allowed
```

## .at()

배열의 모든 인덱스에 엑세스 할 수 있음.

```js
const food = ['피자', '햄버거', '감자튀김', '고기'];

food.at(2); // 감자튀김
```

### 기존의 []와의 차이점

- -1 인덱스를 사용할 수 있음

## Class field

JS가 OOP를 위한 성숙한 언어처럼 느껴지게 함.  
이전에 불가능했던 `Private` 메서드 및 속성을 `#`을 통해 가질 수 있음.  
`static` 메서드를 사용 할 수 있음.  
속성을 초기화하기 위해 `constructor`를 사용할 필요가 없음.

```js
class Message {
  #destruct() {
    console.log('boom!');
  }
}

const btn = new Message();
btn.#destruct(); // 작동 X

// 이전 버전
class Message {
  // 속성을 초기화 하기 위해
  constructor() {
    this.text = 'Hi';
  }
}

// 최신 버전
class Message {
  #text = 'Hi';
}
```

```js
// 이전 버전
class Message {
  // body
}
Message.build() {
  // body
}

// 최신 버전
class Message {
  static build() {
    // body
  }
}
```
