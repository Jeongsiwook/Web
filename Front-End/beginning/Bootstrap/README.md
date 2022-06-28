# Bootstrap

## CSS 프레임워크 Bootstrap

웹사이트를 쉽게 만들 수 있게 도와주는 HTML,CSS, JS 프레임워크.

## CDN 프로젝트 생성

0. bootstrap 홈페이지
1. CSS cdn 복붙
2. Popper가 없는 경우엔 Bundle cdn 복붙
3. Docs 메뉴에서 코드를 가져다 씀

## NPM 프로젝트 생성

- JS

```js
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
```

- SCSS 파일을 만들고

```SCSS
@import '../node_modules/bootstrap/scss/bootstrap';
```

### 테마 색상 커스터마이징

- Customize 메뉴에서 Sass에서 확인
- 필수 항목 import 후 theme-colors 사용해서 커스터마인징

```scss
@import '../node_modules/bootstrap/scss/functions';

$theme-colors: (
  'primary': $primary,
  'secondary': yellowgreen,
  'success': $success,
  'info': $info,
  'warning': $warning,
  'danger': $danger,
  'light': $light,
  'dark': $dark,
);
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';
@import '../node_modules/bootstrap/scss/root';
```

### 성능 최적화(트리 쉐이킹)

0. Customize에 Optimize에서 확인
1. popperjs를 설치해줌

```bash
$ npm i @popperjs/core
```

2. 본인이 필요한 부분만 import(CSS는 파일이 크지 않으므로 건들지 않음)

```js
import Dropdown from 'bootstrap/js/dist/dropdown'; // dropdown 부분
```

3. via Js에서 코드 복사 후 붙여넣기(초기화가 필요한 지 확인 후에: via JS)

```js
// var을 const로 변경
const dropdownElementList = [].slice.call(
  document.querySelectorAll('.dropdown-toggle')
);
dropdownElementList.map(function (dropdownToggleEl) {
  return new Dropdown(dropdownToggleEl); // bootstrap. 을 지워줌
});
```
