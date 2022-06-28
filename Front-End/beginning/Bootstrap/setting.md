# Bootstrap

## 1. 라이브러리 설치

```bash
$ npm install bootstrap
$ yarn add bootstrap
```

## 2. CSS 불러오기

index.js에 bootstrap.min.css를 import.

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

## 3. Bootstrap 공식 문서에서 필요한 디자인의 class 명을 확인

## 4. JSX의 ClassName에 class 명을 추가

```js
<button className='btn btn-primary'>버튼입니다.</button>
```

# React-Bootstrap

## 1. 라이브러리 설치

```bash
$ npm install react-bootstrap
$ yarn add react-bootstrap
```

## 2. 라이브러리에서 필요한 컴포넌트 불러오기

```js
import { Card, Button } from 'react-bootstrap';
```

## 3. react-bootstrap

기존과의 차이

- button이 대문자인 Button으로 바뀜
- className 대신 variant(props)로 바뀜

```js
<Button variant='primary'>Primary</Button>
```
