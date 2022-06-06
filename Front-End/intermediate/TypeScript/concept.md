# Classes
## 클래스란
- object를 만드는 blueprint(청사진, 설계도)
- 클래스 이전에 object를 만드는 기본적인 방법은 function
- JavaScript에도 class는 es6부터 사용 가능
- OOP을 위한 초석
- TypeScript에서는 클래스도 사용자가 만드는 타입의 하나

## class
- class 키워드를 이용하여 클래스를 만들 수 있음
- class 이름은 보통 대문자를 이용
- new를 이용하여 class를 통해 object를 만들 수 있음
- constructor를 이용하여 object를 생성하면서 값을 전달할 수 있음
- this를 이용해서 만들어진 object를 가리킬 수 있음
- JS로 컴파일 되면 es5의 경우 function으로 변경됨

## constructor & initialize
- 생성자 함수가 없으면, 디폴트 생성자가 불림
- 프로그래머가 만든 생성자가 하나라도 있으면, 디폴트 생성자는 사라짐
- strict 모드에서는 프로퍼티를 선언하는 곳 또는 생성자에서 값을 할당해야 함
- 프로퍼티를 선언하는 곳 또는 생성자에서 값을 할당하지 않는 경우에는 !를 붙여서 위험을 표현
- 클래스의 프로퍼티가 정의되어 있지만, 값을 대입하지 않으면 undefined
- 생성자에는 async를 설정할 수 없음

## 접근 제어자(Access Modifiers)
- 접근 제어자에는 public, private, protected
- 설정하지 않으면 public
- 클래스 내부의 모든 곳(생성자, 프로퍼티, 메서드)에 설정 가능
- private으로 설정하면 클래스 외부에서 접근할 수 없음
- JS에서 private을 오랜동안 지원하지 않아 프로퍼티나 메서드 이름 앞에 _ 를 붙여서 표현했음 

## Getters & Setters / readonly / static
- getters & setters: 비공개로 설정하려는 속성은 private로 설정하고, 속성값을 읽고 수정하는 getter/setter 함수를 사용
- readonly: 읽기만 가능한 속성을 선언하기 위해 사용
- static: 전역 멤버를 선언할 때 사용하며 `클래스명.`을 붙여 접근

## 추상 클래스
- 다른 클래스들이 파생될 수 있는 기초 클래스
- 직접 인스턴스화 할 수 없음
- `abstract` 키워드는 추상 클래스나 추상 메소드를 정의하는 데 사용
- 추상 메소드는 클래스에는 구현되어 있지 않고, 파생된 클래스에서 구현해야 함

---

# 인터페이스
## 인터페이스란?
- 일반적으로 변수, 함수, 클래스에 타입 체크를 위해 사용
- 직접 인스턴스를 생성할 수 없고 모든 메소드가 추상 메소드
- 추상 클래스의 추상 메소드와 달리 abstract 키워드는 사용할 수 없음

## Properties
- 컴파일러는 프로퍼티의 두 가지 요소를 검사
- `?`, `readonly` 예약어로 프로퍼티를 세밀하게 컨트롤 할 수 있음

## interface types
- 함수, 클래스에서 사용할 수 있음
  - 함수의 인자의 타입과 반환 값의 타입을 정의, 함수의 타입을 정의할 때에도 사용
  - 클래스가 특정 계약을 충족하도록 명시적으로 강제 함
- 인터페이스도 인터페이스 간의 확장이 가능함
- 하이브리드 타입
  - 자바스크립트의 유연하고 동적인 타입 특성에 따라 인터페이스 역시 여러 가지 타입을 조합할 수 있음

---

# Generic
## Generic이란?
- 정적 type 언어는 클래스나 함수를 정의할 때 type을 선언해야 함
- Generic은 코드를 작성할 때가 아니라 코드가 수행될 때 타입을 명시함
- 코드를 작성할 때 식별자를 써서 아직 정해지지 않은 타입을 표시함

## 제약조건
원하지 않는 속성에 접근하는 것을 막기 위해 Generic에 제약조건을 사용함
- Constraints: 특정 타입들로만 동작하는 Generic 함수를 만들 때 사용함(extends 사용)
- Keyof: 두 객체를 비교할 때 사용함(key 값 중에서만 사용)

---

# 타입 심화
## Union Type 
`let o: string | number`: string 또는 number 둘 중 하나
인터페이스는 객체 타입만 확장할 수 있으므로, type과 &를 사용하면 가능
```ts
type s = {
  a: string
} & (string | number)
```

### 타입가드
Union Type은 동시에 여러 타입이 될 수 없기 때문에 타입 가드를 사용함

## Intersection Type
A타입이면서 B타입
```ts
type H = { t: () => void }
type D = { w: () => void }
const e: H & D = { think() { console.log("t") }, work() { console.log("w") } }
```
- 각 타입에 겹치는 필드가 있다면
  - 타입이 같을 때: ok
  - 타입이 다를 때: error
  - 타입이 포함관계일 때: ok or error
  ```ts
  type D { o: number }
  type d { o: string | number }
  const Dd: D & d = { o: 1 }
  ```
  
## Type Guard
데이터의 타입을 알 수 없거나, 될 수 있는 타입이 여러 개라고 가정할 때 조건문을 통해 데이터의 타입을 좁혀나가는 것

- 구별된 유니온(or 태그된 유니온 or 서로소 유니온): 타입을 구별할 수 있는 단서가 있는 유니온 타입
1. 각 타입에 타입을 구별할 단서(태그)를 만듬
2. 조건문을 통해 각  타입의 단서로 어떤 타입인지 추론함
3. 해당 타입의 프로퍼티를 사용함


```ts
type B = { a: true, b: any }
type C = { a: false, c: Error }
type BorC = B | C

declare function d(): BorC
const f: BorC = d()

if (f.a) console.log(f.b)
else if (f.a === false) console.log(f.c)
```

- `인스턴스 instanceof 클래스`: 클래스를 확인해서 사용함
- `typeof 데이터 === 원시타입`: 데이터 타입을 확인해서 사용함
- `객체key(문자열로) in 객체`: 객체의 key 중에 문자열이 존재하는지 확인해서 사용함
- `switch`: 리터럴 타입을 동등 연산자 일치 연산자 또는 switch로 사용함
- `sindresorhus/is`: 오픈소스 활용
```bash
$ npm install @sindersorhus/is
```

## Optional Chaining
`?.`
접근하는 객체의 프로퍼티가 null 또는 undefiend일 수 있는 optional property인 경우 if 문을 사용하지 않고 넘어가게 하는 체이닝 방법
객체가 null 또는 undefined이면 undefined를 리턴하고, 그렇지 않으면 데이터 값을 리턴

- `&&` 와 `?.` 차이점

```ts
type A = { c: boolean, d: () => string }
function e(f: A): string { return f.c && f.d() }

type A = { c?: { d: () => string } }
function e(f: A): string { return f.c?.d() }
```

## Nullish Coalescing Operator
`??`
기존의 A || B는 A가 falsy한 값인 경우 B를 반환하고 그렇지 않으면 A를 반환
null, undefined를 제외한 falsy 값을 그대로 리턴하고 싶은 경우 사용

- `||` 와 `??` 차이점

```ts
// price가 0인 경우에도 -1을 리턴
function a(b: { c?: number }) { return b.c || -1 }

function a(b: { c?: number }) { return b.c ?? -1 }
```

## Function Overloading
1. 함수의 이름이 같아야 함
2. 매개변수의 순서는 서로 같아야 함
3. 반환 타입이 같아야 함

## Type Assertion
타입스크립트가 추론하지 못하는 타입을 as keyword를 통해 명시해주는 것

```ts
let a: unknown = "hi"
let b: number = (a as string).length

// angle bracket은 react의 JSX에서 혼동되서 잘 사용하지 않음
let a: unknown = "hi"
let b: number = (<string>a).length
```
### Type Casting vs Type Assertion
- 데이터의 타입을 변환하는 것 vs 데이터의 타입을 명시하는 것
- 실수를 저지를 위험이 낮음 vs 개발자 의존도가 높아 에러를 뱉지 않음

```ts
const duck = {} as Duck // Bad
const duck: Duck = {...} // Good
```

## Index Signature
- JS: 객체의 특정 value에 접근할 때 그 value의 key를 문자열로 인덱싱해 참조하는 방법   
- TS: 자바스크립트의 인덱스 시그니처에 대한 타입을 지정해주는 것
- 객체의 프로퍼티들을 명확히 알 수 없을 때 사용
```ts
type A = {
  [key: string]: string | number
  // [field: string]: string 에러
  [index: number]: string
  length: number
}
```
  - key: 자리 표시 용도이며 이름은 어떻게 짓든 상관없음
  - A 타입의 데이터를 인덱스 시그니처로 참조할 때 문자열을 넣으면 string 또는 number 타입 데이터 참조
  - 인덱스 시그니처에 number를 넣으면 string 값 참조
  - 다른 일반 프로퍼티와 공존 가능
  - 하늘 아래 같은 타입의 Index signature는 있을 수 없음
  - key가 string인 인덱스 시그니처는 하나만 존재 가능. 한 번 더 정의하려고 하면 타입 에러

### 문제점
```ts
type A = {
  [key: string]: string | number
}
const a: A = {} // 에러가 발생하지 않음
```
- empty object일 때 인덱스 시그니처로 참조하려해도 타입 에러가 나지 않음
- key 마다 다른 타입을 가질 수 없음
- 타입에 유연함을 제공하는 대신 키 이름을 잘못 쓴다든지 하는 휴먼 에러를 저지를 가능성이 있음

따라서 어떤 타입이 올지 알 수 있는 상황이라면 정확한 타입을 정의하여 실수를 방지하는 게 좋음   
Index signature는 런타임에 객체의 프로퍼티를 알 수 없는 경우에만 사용할 것

---

# 데코레이터
## 정의
:heavy_check_mark: 함수를 감싸는 함수이며, 기존 함수를 바꾸지 않고 함수를 관찰, 수정, 재정의할 수 있는 함수
- 함수가 한 가지 일만 하면서 가독성을 높이고 반복되는 코드를 사용하기 사용
- 실험 단계라 JS에서는 babel 플러그인을 사용해야 하고 TS에서는 tsconfig.json에 `experimentalDecorator` 옵션을 true로 설정해야 함

## 데코레이터를 쓰기 전 알아야 할 자바스크립트 개념
:heavy_check_mark: 일급객체
  - First Class Citizen, First Class Object는 객체로써 사용되는데 제약이 없는 상태
  - 일반적으로 객체가 사용될 수 있는 곳에는 함수도 쓰일 수 있음
  - 매개변수, 반환값, 할당의 대상, 비교 연산으로 사용 가능

:heavy_check_mark: 클로저
  - 함수의 실행이 끝나도 내부함수에서 외부함수의 context에 접근할 수 있는 것

:heavy_check_mark: 고차 함수
  - 함수를 반환하는 함수
  - 클래스 메서드는 고차 함수의 파라미터로서 전달했을 때 메서드는 인스턴스에 대한 this 바인딩을 잃어버림
    - 고차 함수를 호출할 때 인스턴스와 메서드를 함께 인자로 전달해야 함 `log(인스턴스, 인스턴스.메서드)
  - 용도
    - 커링: 함수의 매개변수를 받는 시점을 늦출 때 `(x) => (y) => x + y`
    - 함수의 실행 시점을 미룰 때 `() => f()`
    - 팩토리 함수를 만들 때
    - 훅, 데코레이터를 만들 때
    - 반복되는 코드를 줄일 때

:heavy_check_mark: Property Descriptor
  - JS 객체는 객체의 프로퍼티의 속성, 메타데이터를 갖고 있는 Property Descriptor를 갖음
  ```ts
  interface PropertyDescriptor {
    configurable?: boolean,  // 기본값은 true. property의 property descriptor가 수정 가능 한지
    enumerable?: boolean,    // 기본값은 true. 열거 가능 여부
    value?: any,             // 객체의 프로퍼티 값, 메서드
    writable?: boolean,      // 기본값은 true. 프로퍼티의 수정 가능 여부
    get?(): any,             // 객체에 접근할 때 실행될 함수
    set?(v: any): void      // 객체를 수정할 때 실행될 함수
  }
  ```
  ```ts
  ```ts
  const a = {
    b: "c",
    d: function () {
      return "f" + this.b
    }
  }

  const bD = Object.getOwnPropertyDescriptor(a, "b")
  const dR = Object.getOwnPropertyDescriptor(a, "d")?.value.call(a)
  
  console.log(bD)
  /*
  {
    value: "c"
    writable: true
    enumerable: true
    configurable: true
  }
  */
  console.log(dR) // f c
  ```














