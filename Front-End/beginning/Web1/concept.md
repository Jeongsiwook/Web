# HTML
## 구조
```html
<header>
  <nav></nav>
</header>
<main role="main">
  <article>
    <h$>1개 이상 필수</h$>
  </article> 
</main>
<footer>
  <div></div>
</footer>
```

### CSS 인라인 구조
- 값 뒤에 세미콜론 붙임
`<h1 style="color: red;"></h1>`

# CSS
## 웹사이트의 정보와 디자인
- `font-family`: 입력한 글꼴 순서대로 우선 순위 적용, `sans-serif`는 마지막에 작성하는 디폴트 값
- `border: solid 10px red;`
- `background: yellow url("이미지 경로") no-repeat left;`
---
## 웹사이트 레이아웃에 영향을 미치는 요소
### 마진 병합 현상
- 형제 마진 병합: 형제 중 큰 값으로 적용
- 부모 자식 마진 영향: 자식 마진이 자식 뿐만 아니라 부모에도 영향

### 레이아웃에 영향을 미치는 속성
- `display: inline; / block; / inline-block;` 바꾸기 가능
- `float: left; / right;` 정렬 위치를 정함
  - float을 연속적으로 사용하면 레이어들끼리 겹치지 않은 상태로 정렬
  - `clear: both;` float을 제어하고자 할 때 사용하여 마지막 float 사용 후에 다음 태그 CSS에 clear 속성 사용
- `* { margin: 0; padding: 0; }` 브라우저와 공간 사이의 공백 지움

---
## 움직이는 웹사이트
### Transform
- `transform: rotate(45deg);`: 입력한 각도만큼 회전
- `transform: scale(2, 3);`: 숫자는 비율을 의미하며 width를 2배, height를 3배로 확대한다는 의미
- `transform: skew(10deg, 20deg);`: x축, y축을 기준으로 입력한 각도만큼 비틂
- `transform: translate(100px, 200px);`: 선택한 오브젝트의 좌표 변경

### Transition
- `transition-property: width;`: 효과를 적용하고자 하는 CSS 속성
- `transition-duration: 2s;`: 효과가 나타나는데 걸리는 시간
- `transition-timing-function: linear;`: 효과의 속도
- `transition-delay: 1s;`: 특정 조건 하에서 효과 발동
  - `선택자:hover {}`: 가상 선택자로 CSS에서 미리 만들어 놓은 클래스, 마우스를 올렸을 때 라는 조건
- `transition: width 2s linear 1s;`: 한 문장으로 가능하며, 처음 숫자는 duration을 의미하고 나머지 순서는 상관 없음

### Animation
- `animation-name: changeWidth;`: 애니메이션 이름
- `animation-duration: 3s;`: 효과가 나타나는데 걸리는 시간
- `animation-timing-function: linear;`: 효과의 속도
- `animation-delay: 1s;`: 특정 조건 하에서 효과 발동
- `animation-iteration-count: 6;`: 반복 횟수
- `animation-direction: alternate;` 진행 방향
- `animation: changeWidth 3s linear 1s 6 alternate;`: duration이 먼저 나오고, 나머지 순서 상관 없음
- `@keyframes changeWidth { from { width: 300px; } to { width: 600px; } }`

### prefix
- 낮은 버전 브라우저를 위해 사용
- ex)

```css
.box {
  -webkit- animation: rotation 3s;
}

@-webkit-keyframes rotation {
  from { -webkit- transform: rotate(); }
  to { -webkit- transform: rotate(); }
}
```
---
## 반응형 웹사이트
### 미디어쿼리
- PC 뿐만 아니라 모바일과 태블릿에도 대응되는 웹 사이트를 만들기 위해
- 모바일에 대응되는 반응형 또는 적응형 웹사이트를 만들 때 사용되는 CSS 구문
  - 반응형: 브라우저 크기를 변경 했을 때 부드럽게 나타남
  - 적응형: 브라우저 크기를 변경 했을 때 부드럽지 않게 나타남
- ex)

```css
@media (min-width: 320px) and (max-width: 800px) {
  .media {}
}
```

### 미디어쿼리 주의사항
- viewport가 있어야 함
- CSS 속성 상속을 받기 때문에, 미디어쿼리 바깥 css 속성을 사용하지 않으려면
  미디어쿼리 안쪽에서 none이라도 사용해야 함
---

### Tip
- `.list > p {}` vs `.list p {}`: list 클래스의 자식 p만 적용 vs list 클래스안의 모든 p 적용
- 그 태그를 가진 클래스 이름을 붙일 때 바로 붙여서 작성
- 클래스 이름은 띄어 쓰기를 사용해 여러 개 가능
- `!important`: CSS에 우선순위를 높일 수 있음
- flex: float보단 flex를 사용하는 추세
  - `display: flex`: 상하에서 좌우로 레이아웃을 배치함
  - `justify-content: center; align-items: center`: 정중앙에 배치
- grid: flex와 비슷하나 정확한 비율로 레이아웃할 때 사용
  - `display: grid;`
  - `grid-template-columns: 1fr 2fr 1fr`: 1:2:1 비율로 좌우배치
- `vh`: 단위는 %와 달리 스크린이 부모
