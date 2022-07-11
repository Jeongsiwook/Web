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
