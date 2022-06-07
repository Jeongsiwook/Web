# 01. React 앱에서의 스타일링

## 좋은 앱을 만들려면?

- 번들 사이즈에 대한 고려
- 앱 성능에 대한 고려
- 사용자에게 유리한 UI/UX를 고려
- JS를 이용한 다양한 기법
- 유지보수가 용이하고 확장 가능한 코드를 작성

## CSS import

CSS(혹은 SCSS, Sass) 파일을 import해서 사용.  
필요한 모든 CSS 스타일을 하나의 파일에 작성하여, 자바스크립트 파일과 코드 분리 가능.

### 장/단점

- 단순히 CSS 파일만을 import하여 사용할 수 있어 편리
- 컴포넌트가 많지 않을 경우, 하나의 CSS 파일에 코드를 관리하는 것도 가능
- CSS 파일은 분리할 수 있으나, namespace를 나눌 수 없음
- 만일 스타일이 겹칠 경우 cascading rule에 따라, 마지막에 나온 룰이 덮어씌어짐

## CSS module

하나의 CSS module 파일 안에 작성한 스타일은 하나의 파일 namespace로 관리.  
class name 뒤에 겹치지 않는 hash를 붙임.  
스타일이 겹치는 상황을 해결.  
두 단어 이상의 경우, class 명을 camelCase로 이름을 지음.

## CSS-in-JS

별도의 CSS 파일을 만들지 않고 하나의 컴포넌트 파일 안에서 스타일을 작성.  
JS 문법을 그대로 활용하여 코드를 작성.  
React 컴포넌트를 사용하는 것처럼 사용.  
Sass 문법 활용 가능.

```js
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(0, 0, 0, 0.05);
  margin: 10px;
  padding: 5px;
`;
```

## CSS, SASS

### CSS Box Model

CSS layout의 기본이 되는 모델.  
content-box, padding-box, border-bodx, margin-box 순으로 하나의 element를 감싸고 있음.  
box의 타입은 inline, block 두 가지.  
`display: inline`, `display: inline-block`, `display: block`으로 서로 다른 box type을 적용함.

### box-sizing

width, height는 디폴트로 content-box의 크기를 정의.  
`width: 100px`으로 정의 시, content의 크기만 100px이 되며, padding, border의 크기는 100px에 추가됨.  
`box-sizing: border-box`로 box sizing의 방식을 변경할 수 있음.  
border-box는 padding, border를 width, height에 포함.

### CSS Position

| 속성     | 설명                                                                            |
| -------- | ------------------------------------------------------------------------------- |
| static   | position의 default 값으로, element는 normal flow를 따라 위치함                  |
| relative | normal flow를 따라 위치하되, 자기 자신에 상대적으로 위치함                      |
| absolute | normal flow에서 벗어나 가장 가까운 ancestor에 상대적으로 위치함                 |
| fixed    | normal flow를 벗어나 viewport에 상대적으로 위치함                               |
| sticky   | normal flow에 따라 위치하되, 가장 가까운 scrolling ancestor에 상대적으로 위치함 |

### CSS Units

| 속성               | 설명                                     |
| ------------------ | ---------------------------------------- |
| px, pt, cm, in     | 절대적인 길이를 표현하는 unit            |
| rem, em, %         | 특정 값에 상대적인 길이를 표현하는 unit  |
| vw, vh, vmin, vmax | viewport에 상대적인 길이를 표현하는 unit |

### Sass

Syntactically Awesome Style Sheets.  
CSS Preprocessor.  
SCSS, Sass 문법을 지원함.  
모듈, 믹스인, nested style, 변수, 조건문, 반복문 등의 기능으로 CSS를 프로그래밍 언어적으로 활용하도록 확장.  
styled-components는 Sass를 기본적으로 지원함.

```scss
// sample.scss
$color-red: red;

.reset-botton {
  color: $color-red;
  &.active {
  }
  &.hover {
  }
  > button {
  }
}

@mixins flex-center {
  display: flex;
  justify-content: center;
  align-itmes: center;
}

// sample2.scss
@import './sample.scss' .layout {
  @include flex-center;
}
```

## CSS Flexbox

HTML element를 하나의 상자로 간주하고, 그 안에서 어떻게 내부 item을 배열할 것인가를 스타일 하는 모델.  
1차원의 레이아웃을 디자인하는 데 사용.  
responsive design에 유리.  
가운데 정렬, 비율로 정렬 등을 처리할 때 유리.

### container

| 속성            | 설명                                                                                    |
| --------------- | --------------------------------------------------------------------------------------- |
| flex-direction  | row, column 등의 방향을 결정, 방향에 따라 main axis가 달라짐                            |
| justify-content | main axis에서의 정렬을 결정                                                             |
| align-items     | cross axis에서의 정렬을 결정                                                            |
| flex-wrap       | flex container가 내부 item의 width를 합친 것보다 작아질 때, 어떻게 정렬할 것인지를 결정 |

### item

| 속성         | 설명                                                            |
| ------------ | --------------------------------------------------------------- |
| flex-grow    | flex container가 커질 때 item이 얼마만큼 늘어날 것인지를 결정   |
| flex-shrink  | flex container가 줄어들 때 item이 얼마만큼 줄어들 것인지를 결정 |
| flex-basis   | 기준점이 되는 item의 크기                                       |
| justify-self | 한 아이템을 main-axis에 따라 어떻게 정렬할 것인지를 결정        |
| align-self   | 한 아이템을 cross-axis에 따라 어떻게 정렬할 것인지를 결정       |
| order        | flex container에서 item의 순서를 결정                           |

```css
.container {
  /* main axis가 column으로 바뀜 */
  flex-direction: column;
  /* 따라서 원래는 가로 정렬이지만, 세로 정렬로 바뀜 */
  justify-content: center;
}
.one {
  /* flex-grow flex-shrink flex-basis 순 */
  flex: 0 0 120px;
}
.two {
  /* flex-grow = flex-shrink = 1, flex-basis = auto */
  flex: 1;
}
```

### Tip

```css
/* 첫 번째 span 제외하고 적용 */
.container span:not(:first-of-type) {
  margin-left: 12px;
}

/* 업다운 버튼 없애기 */
.answer-input::-webkit-outer-spin-button,
.answer-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```
