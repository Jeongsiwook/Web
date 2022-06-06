# SCSS
## SCSS(SASS)
```bash
$ npm init -y
$ npm i -D parcel-bundler
$ npm run dev
```
```json
"scripts": {
  "dev": "parcel index.html",
  "build": "parcel build index.html"
},
```

### SCSS란
- SCSS는 CSS 전처리기이며, CSS의 확장
- SASS의 문법을 보완해 기능은 같음

### 중첩
- scss
```scss
.constainer {
    // >: 자식 선택자
  > ul {
    li {
      font-size: 40px;
      .name {
        color: royalblue;
      }
      .age {
        color: orange;
      }
    }
  }
}
```
- css
```cs
.constainer > ul li {
  font-size: 40px;
}
.constainer > ul li .name {
  color: royalblue;
}
.constainer > ul li .age {
  color: orange;
}
```

### 상위(부모) 선택자 참조
- `&`: 상위 선택자를 참조 및 치환
- scss
```scss
. btn {
    position: absolue;
    &.active {
        color: red;
    }
}

.list {
    lit {
        &:last-child {
            margin-right: 0;
        }
    }
}

.fs {
    &-small { font-size: 12px; }
    &-medium { font-size: 14px; } 
    &-large { font-sze: 16px; }
}
```
- css
```css
.btn {
  position: absolue;
}
.btn.active {
  color: red;
}

.list lit:last-child {
  margin-right: 0;
}

.fs-small {
  font-size: 12px;
}
.fs-medium {
  font-size: 14px;
}
.fs-large {
  font-sze: 16px;
}
```

### 중첩된 속성
- scss
```scss
.box {
    // font- 이라는 네임스페이스
    font: {
        weight: bold;
        size: 10px;
        family: sans-serif;
    };
    margin: {
        top: 10px;
        left: 20px;
    };
    padding: {
        top: 10px;
        bottom: 40px;
        left: 20px;
        right: 30px;
    };
}
```
- css
```css
.box {
  font-weight: bold;
  font-size: 10px;
  font-family: sans-serif;
  margin-top: 10px;
  margin-left: 20px;
  padding-top: 10px;
  padding-bottom: 40px;
  padding-left: 20px;
  padding-right: 30px;
}
```

### 변수
- 유효범위가 존재
- 재할당할 경우 그 값이 변해서 유효범위를 나가도 그대로 유지 됨
- scss
```scss
.container {
    $size: 200px;
    position: fixed;
    top: $size;
    .item {
        $size: 100px;
        width: $size;
        height: $size;
        transform: translateX($size);
    }
    left: $size;
}
```
- css
```css
.container {
  position: fixed;
  top: 200px;
  left: 100px; // 주의
}
.container .item {
  width: 100px;
  height: 100px;
  transform: translateX(100px);
}
```

### 산술 연산
- 기본적인 연산 똑같이 사용
- 단, 나누기 같은 경우는 css 단축 속성과 같으므로 연산을 괄호로 묶어주거나 변수를 사용하거나 다른 연산자와 같이 사용
- 단위가 동일해야하나, `calc()`를 사용하면 다른 단위도 가능
- scss
```scss
.container {
    $size: 200px;
    margin: (200px / 2);
    width: $size / 2;
    height: (10px + 190px) / 2;
    font-size: calc(100% - 200px);
}
```
- css
```css
.container {
  margin: 100px;
  width: 100px;
  height: 100px;
  font-size: calc(100% - 200px);
}
```

### 재활용(Mixins)
- 재활용할 코드 앞에 `@mixin`
- 재활용할 코드를 사용할 때 앞에 `@include`
- scss
```scss
@mixin center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    @include center;
    .item {
        @include center;
    }
}
.box {
    @include center;
}

// 기본값을 주거나, 특정 값 넣기
@mixin box($size: 80px, $color: tomato) {
    width: $size;
    height: $size;
    background-color: $color;
}
.container {
    @include box(200px, red);
    .item {
        @include box($color: green); // 키워드 인수
    }
}
.box {
    @include box;
}
```
- css
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container .item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 200px;
  height: 200px;
  background-color: red;
}
.container .item {
  width: 80px;
  height: 80px;
  background-color: green;
}

.box {
  width: 80px;
  height: 80px;
  background-color: tomato;
}
```

### 반복문
- `@for`
- scss

```scss
// for (let i = 0; i < 5; i += 1) {
//     console.log(`loop-${i}`)
// }

@for $i from 1 through 5 {
    .box:nth-child(#{$i}) {
        width: 100px * $i;
    }
}
```
- css

```css
.box:nth-child(1) {
  width: 100px;
}

.box:nth-child(2) {
  width: 200px;
}

.box:nth-child(3) {
  width: 300px;
}

.box:nth-child(4) {
  width: 400px;
}

.box:nth-child(5) {
  width: 500px;
}
```

### 함수
- `@function`, `@return`
- scss

```scss
@function ratio($size, $ratio) {
    @return $size * $ratio
}

.box {
    $width: 160px;
    width: $width;
    height: ratio($width, 9/16);
}
```
- css

```css
.box {
  width: 160px;
  height: 90px;
}
```

### 색상 내장 함수
- `darken($color, $amount)`: 더 어두운 색을 만듬
- `saturate($color, $amount)`: 색상의 채도를 올림
- `desaturate($color, $amount)`: 색상의 채도를 낮춤
- `gratscale($color)`: 색상을 회색으로 변환함
- `invert($color)`: 색상을 반전시킴
- `rgba($color, $alpha)`: 색상의 투명도를 변경

### 가져오기
- `@import`
- 파일 확장자가 .css일 때, 파일 이름이 http://로 시작할 때, url()이 붙었을 때, 미디어 쿼리가 있는 경우에 가능
```scss
@import "hello.css";
@import "http://hello.com/hello";
@import url(hello);
@import "hello" screen;
@import "./sub", "./sub2"; // 여러 개도 한 번에 가능
```

### 데이터 종류
데이터|설명|예시
---|---|---
Numbers|숫자|1, .82, 20px, 2em ...
Strings|문자|bold, relative, "/images/a.png", "dotum"
Colors|색상 표현|red, blue, #FFFF00, rgba(255,0,0,.5)
Booleans|논리|true, false
Nulls|아무것도 없음|null
Lists|공백이나 , 로 구분된 값의 목록|(apple, orange, banana), apple, orange
Maps|Lists와 유사하나 값이 key: Value 형태|(apple: a, orange: o, banana: b)

### 반복문 
- `@each`

```scss
@each $c in $list {
  .box {
    color: $c;
}

@each $k, $v in $map {
  .box-#{$k} {
    color: $v;
  }
}
```
```css
.box {
  color: orange;
}

.box {
  color: royalblue;
}

.box {
  color: yellow;
}

.box-o {
  color: orange;
}

.box-r {
  color: royalblue;
}

.box-y {
  color: yellow;
}
```

### 재활용
- `@content`
```scss
@mixin left-top {
  position: absolute;
  top: 0;
  left: 0;
  @content;
}
.container {
  width: 100px;
  height: 100px;
  @include left-top;
}
.box {
  width: 200px;
  height: 300px;
  @include left-top {
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
```
```css
.container {
  width: 100px;
  height: 100px;
  position: abolute;
  top: 0;
  left: 0;
}

.box {
  width: 200px;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
