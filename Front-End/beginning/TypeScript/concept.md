# TypeScript
- 프로그래밍 언어
- Transpile 언어
- Interpreted 언어
- 순수한 js로 컴파일함
- type을 추가해서 js를 확장
- 코드를 실행하기 전에 에러를 잡고 고쳐서 시간을 절약

## 설치
- npm
1. global로 설치
```bash
$ npm i typescript -g # npm uninstall typescript -g
$ tsc source.ts # ts파일 컴파일 명령
```   
  - 설정 파일(tsconfig.json) 만들기
    - 설정 파일대로 컴파일 함         
```bash
$ tsc --init
$ tsc
```
  - 파일이 수정될 때마다 컴파일 하기
```bash
$ tsc -w # w는 watch
```

2. !global로 설치
```bash
$ npm init -y # package.json 파일 생성
$ npm i typescript -D # D는 dev
```
  - 설정 파일(tsconfig.json) 만들기
    - 설정 파일대로 컴파일 함
```bash
$ npx tsc --init
$ npx tsc
```  
  - 컴파일
```bash
$ node_modules/.bin/tsc # 첫 번째 방법
$ node_modules/typescript/bin/tsc # 두 번째 방법
$ npx tsc # 세 번째 방법 
```
  - 파일이 수정될 때마다 컴파일 하기
```bash
$ npx tsc -w # w는 watch
```
  - package.json 파일 수정
    - "scripts" : { "build": "tsc" },
```bash
$ npm run build
$ npm run build:watch
``` 
---

## Basic Types
### TypeScript Types vs JavaScript Types
- Static Types vs Dynamic Types
- 개발 중에 확인 vs run time에 확인

### Primitive Types
- boolean, number, string, symbol, null, undefined

### boolean
```ts
let isDone: boolean = false;
isDone = true;
console.log(typeof isDone);

let isOk: Boolean = true;
console.log(typeof isOk);
// let isNotOk: boolean = new Boolean(true);
```

### number
```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let notANumber: number = NaN;
let underscoreNum: number = 1_000_000;
```

### string
```ts
let fullName: string = 'Mark Lee';
let age: number = 39;
let sentence: string = `Hello, My name is ${fullName}.
I'll be ${age + 1} years old next month.`;
```

### symbol
- new Symbol로 사용할 수 없음
- Symbol을 함수로 사용해서 symbol 타입을 만들어낼 수 있음
- primitive type의 값을 담아서 사용함
- 고유하고 수정불가능한 값으로 만들어 줌
```ts
console.log(Symbol('foo') === Symbol('foo')); // false
const sym = Symbol();
const obj = {
  sym: "value", // [sym]: "value" 로 하면 접근 불가능
};
console.log(obj["sym"]); // value 
// console.log(obj[sym]); 이렇게 하면 접근 가능
```

### null & undefined
- 둘 다 소문자만 존재
- 설정을 하지 않으면 다른 모든 타입에 할당할 수 있음
- 컴파일 옵션에서 '--strictNullChecks' 사용하면 할당 불가능
  - null과 undefined를 할당할 수 있게 하려면, union type을 이용
```ts
// let MyName: string = null;

// let u: undefined = null;
let v: void = undefined;

let union: string | null = null;
union = 'Mark';
```

### object
- primitive type이 아닌 것을 나타내고 싶을 때 사용
```ts
// create by object literal
const person1 = { name: 'Mark', age: 39 }; // person1은 object type이 아니라 "{ name: string, age: number }" type

// create by Object.create
const person2 = Object.create({ name: 'Mark', age: 39 });
```

### array
```ts
let list: number[] = [1, 2, 3]; // 이 방법을 추천함
let list: Array<number> = [1, 2, 3];
let list: (number | string)[] = [1, 2, 3, "4"];
```

### tuple
```ts
let x: [string, number];
x = ['hello', 39];
const [first, second] = x;
```

### any
- 어떤 타입이어도 상관없는 타입
- 컴파일 타임에 타입 체크가 정상적으로 이뤄지지 않기 때문에 최대한 사용하지 않는 게 좋음
- noImplicitAny로 설정 가능
```ts
function returnAny(message: any): any {
  console.log(message);
}

const any1 = returnAny('리턴은 아무거나');
any1.toString();

// any가 개체를 통해서 계속 전파됨
let looselyTyped: any = {};
const d = looselyTyped.a.b.c.d;

function leakingAny(obj: any) {
  const a: number = obj.num;
  const b = a + 1;
  return b;
}

const c = leakingAny({ num: 0 });
// c.indexOf('0'); 사용전에 a에서 number라고 지정해줘서 오류가 뜸
```

### unknown
- 응용 프로그램을 작성할 때 모르는 변수의 타입을 묘사해야 할 수 있음
- any보다 Type-safe한 타입
- 컴파일러가 타입을 추론할 수 있게끔 타입의 유형을 좁히거나 타입을 확정해주지 않으면 할당x, 사용x
- API에 사용할 수 있음
```ts
declare const maybe: unknown;
// const aNumber: number = maybe; 오류가 뜸, 따라서 type guard를 써야함

if (maybe === true) {
  const aBoolean: boolean = maybe;
}

if (typeof maybe === 'string') {
  const aString: string = maybe;
}
```

### never
- 모든 타입의 subtype이며 모든 타입에 할당할 수 있음
- never에는 어떤 것도 할당할 수 없음
- 잘못된 타입을 넣는 실수를 막고자 할 때 사용함
```ts
// 밑으로 내려가지 않으니 오류가 뜨지 않음
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error('faild');
}

// 밑으로 내려가지 않으니 오류가 뜨지 않음
function infiniteLoop(): never {
  while (true) {}
}

declare const a: string | number;
if (typeof a !== 'string') {
  a;
}

type Indexable<T> = T extends string ? T & { [index: string]: any } : never;
type ObjectIndexable = Indexable<{}>;
```

### void
```ts
function returnVoid(message: string): void {
  console.log(message);

  return undefined;
}

returnVoid('리턴이 없다.');
```

---

## Type System
### 작성자와 사용자의 관점으로 코드 바라보기
- 컴파일러에게 사용하는 타입을 명시적으로 지정하는 시스템
- 컴파일러가 자동으로 타입을 추론하는 시스템
- noImplicitAny 옵션: 타입을 명시적으로 지정하지 않은 경우, 타입스크립트가 추론 중 'any'라고 판단하게 되면, 컴파일에러를 발생시켜 명시적으로 지정하도록 유도한다.
- strictNullChecks 옵션: 모든 타입에 자동으로 포함되어 있는 'null'과 'undefined'를 제거해줌
- noImplicitReturns 옵션: 함수 내에서 모든 코드가 값을 리턴하지 않으면, 컴파일 에러를 발생시킴 

#### 나만의 타입을 만드는 방법
```ts
interface PersonInterface {
  name: string;
  age: number;
}

type PersonTypeAlias = {
  name: string;
  age: number;
}

function f(a: PersonInterface): string {
  return `이름은 ${a.name} 이고, 연령대는 ${Math.floor(a.age / 10) * 10}대 입니다.`;
}

console.log(f({ name: 'Mark', age: 38 })); // 이름은 Mark 이고, 연령대는 30대 입니다.
console.log(f('Mark')); // error
```

### Structural Type System vs Nominal Type System
- 구조가 같으면, 같은 타입
- 구조가 같아도 이름이 다르면, 다른 타입

### 타입 호환성(Type Compatibility)
- any는 supertype과 subtype 둘 다 가능
- 같거나 서브 타입인 경우, 할당이 가능 => 공변
- 함수의 매개변수 타입만 같거나 슈퍼타입인 경우, 할당이 가능 => 반병 
  - strictFunctionTypes 옵션: 함수를 할당할 시에 함수의 매개변수 타입이 같거나 슈퍼타입인 경우가 아닌 경우, 에러를 통해 경고

### 타입 별칭(Type Alias)
- Interface랑 비슷
- Primitive, Union Type, Tuple, Function 기타 직접 작성해야 하는 타입을 다른 이름으로 지정할 수 있음
- 만들어진 타입의 refer로 사용하는 것이지 타입을 만드는 것은 아님

---

## TypeScript Compiler
### Compilation Context

### tsconfig schema
[tsconfig 전체적인 schema 확인](http://json.schemastore.org/tsconfig)   

### compileOnSave
- 파일을 저장하면 컴파일
```json
{
  "compileOnSave": true,
}
```

### extends
- 옵션을 상속
- 파일(상대) 경로명: string
```json
{
  "extends": "./base.json",
}
```
- 지원해주는 옵션
```bash
$ npm install --save-dev @tsconfig/deno
```
```json
{
  "extends": "@tsconfig/deno/tsconfig.json",
}
```

### files, include, exclude
- 셋 다 설정이 없으면, 전부 다 컴파일
- files
  - 상대 혹은 절대 경로의 리스트 배열
  - exclude보다 쎔
- include, exclude
  - glob 패턴(마치 .gitignore)
  - include
    - exclude 보다 약함
    - * 같은 걸 사용하면, .ts/ .tsx/ .d.ts 만 include
  - exclude
    - 설정 안하면 4가지(node_modules, bower_components, jspm_packages, &#60;outDir&#62;)를 default로 제외함
    - &#60;outDir&#62;은 항상 제외함(include에 있어도)

### compileOptions - typeRoots, types
- @types
  - 내장 type definition 시스템
  - 아무 설정을 안하면 node_modules/@types 라는 모든 경로를 찾아서 사용
  - typeRoots를 사용하면 
    - 배열 안에 들어있는 경로들 아래서만 가져옴
  - types를 사용하면 
    - 배열 안의 모듈 혹은 ./node_modules/@types/ 안의 모듈 이름에서 찾아옴
    - [] 빈 배열을 넣는다는건 이 시스템을 사용하지 않겠다는 것
  - typeRoots와 types를 같이 사용하지 않음

### compileOptions - target, lib
- target
  - 빌드의 결과물을 어떤 버전으로 할 것인지
  - 지정을 안하면 es3
- lib
  - 기본 type definition 라이브러리를 어떤 것을 사용할 것인지
  - lib를 지정하지 않을 때
    - target이 es3이면, 디폴트로 lib.d.ts를 사용
    - target이 es5이면, 디폴트로 dom, es5, scripthost를 사용
    - target이 es6이면, 디폴트로 dom, es6, dom.iterable, scripthost를 사용
  - lib를 지정하면 그 lib 배열로만 라이브러리를 사용
    - 빈 [] => no definition found

### compileOptions - outDir, outFile, rootDir
- outFile: 하나의 파일로 합쳐서 컴파일 진행 후 반환
- rootDir: 컴파일을 시작하는 루트 폴더(설정 안하면 자동으로 가장 상위 디렉토리 지정)\
- outDir: 컴파일 후 생성되는 js 파일이 생성될 폴더명

### compileOptions - strict
- 엄격하게 타입을 확인하는 옵션들을 키고 끔
- &#8211;	&#8211;nolmplicitAny
  - 명시적이지 않게 any 타입을 표현식과 선언에 사용하면 에러를 발생
- &#8211;	&#8211;noImplicitThis
  - 명시적이지 않게 any 타입을 this 표현식에 사용하면 에러를 발생
- &#8211;	&#8211;strictNullChecks
  - 모든 타입은 null, undefined 값을 가질 수 없고, 가지려면 union type을 이용해서 직접 명시해야 함
  - any 타입은 null과 undefined를 가짐, 예외적으로 void 타입의 경우 undefined를 가짐
- &#8211; &#8211;strictFunctionTypes
  - 반환 타입은 공변적(convariant), 인자 타입은 반공변적(contravariant)
- &#8211; &#8211;strictPropertyInitialization
  - 정의되지 않은 클래스의 속성이 생성자에서 초기화되었는지 확인함
  - 이 옵션을 사용하려면 &#8211;	&#8211;strictNullChecks를 사용하도록 설정해야 함
  - 생성자에서 하지 않는 경우
    ```
    class Person {
      private _name!: string;
      
      public async initialize(name: string) {
        this._name = name
      }
    }
    ```
- &#8211;	&#8211;strictBindCallApply
  - bind, call, apply에 대한 엄격한 검사 수행
  - call은 함수의 인자를 여러 인자의 나열로 넣어서 사용하고, apply는 모든 인자를 배열 하나로 넣어서 사용

- &#8211;	&#8211;alwaysStrict
  - 각 소스 파일에 대해 JS의 strict mode로 코드를 분석하고, 엄격하게 사용을 해제함

---
