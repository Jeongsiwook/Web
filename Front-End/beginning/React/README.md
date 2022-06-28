# React

사용자 인터페이스를 만들기 위한 JS 라이브러리.

- _Component_  
  React에서 서비스를 개발하는 데 있어 독립적인 단위로 쪼개어 구현
- _Virtual DOM_  
  DOM을 직접 제어하지 않는 경우 가상의 DOM TREE를 사용, 이전 상태와 이후 상태를 비교하여 바뀐 부분을 찾아내서 자동으로 바꿈
- _jsx_  
  JS 내에서 UI를 작성하기 위해 개발자에게 익숙한 환경을 제공, HTML과 유사함
- _CSR_  
  JS가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행되기 전까지는 화면이 보이지 않음.
- _SSR_  
  JS가 전부 다운로드 되지 않아도, 일단 화면은 보이지만 유저가 사용할 수 없음.

## 특징

- 생산성 / 재사용성  
  Component와 Hook을 활용해 작은 단위의 독립적인 요소로 개발

- 풍부한 자료 / 라이브러리  
  현재 React는 전 세계적으로 가장 활발하게 커뮤니티 활동이 이루어지고 있음

- 다양한 사용처  
  웹 애플리케이션 뿐만 아니라 React-Native에 적용하여 개발할 수 있음

## 라이브러리

```js
// 1. 리액트 컴포넌트 => HTMLElement 연결하기
import ReactDOM from 'react-dom';

// 2. 리액트 컴포넌트 만들기
import React from 'react';
```

### CDN

```js
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

## Component

하나의 블록을 만들어서 필요한 곳에 조립하여 개발

- React에서 페이지를 구성하는 최소단위이며, 이름은 대문자로 시작
- controlled Component / Uncontrolled Component
- 데이터는 부모에서 자식으로만 전달

### Function

```js
// 정의 1
function FunctionComponent(props) {
  const { name } = props;
  return <div>{name}</div>;
}
// 정의 2
const FunctionComponent2 = () => <div>Hello</div>;

// 사용
ReactDOM.render(<FunctionComponent />, document.querySelector('#root'));
ReactDOM.render(<FunctionComponent2 />, document.querySelector('#root'));
```

## JSX

함수 호출과 객체 생성을 위한 문법적 편의를 제공하는 JS의 확장.  
가독성이 뛰어나고, 문법적 오류를 인지하기 쉬움.

```js
// babel
<head>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <script type="text/babel">
</body>
```

### 문법

- 최상위 요소 리턴하는 경우, `()` 로 감싸야 함
- 자식들을 바로 랜더링하고 싶으면, `<>자식들</>`를 사용 --> Fragment
- 자바스크립트 표현식을 사용하려면, `{표현식}`를 이용
- `if` 문은 사용할 수 없다 --> 삼항 연산자 혹은 `&&`를 사용
- `style={{}}`을 이용해 인라인 스타일링이 가능하며 속성 이름을 camelCase로 적음
- `class` 대신 `className`을 사용해 `class`를 적용할 수 있음
- 자식요소가 있으면, 꼭 닫아야 하고, 자식요소가 없으면 열면서 닫아야 함

## Props & State

Props와 State 둘 다 변경이 발생하면, 랜더가 다시 일어날 수 있다

### Props

- 컴포넌트에 속성에 해당하는 부분
- 컴포넌트 외부에서 컴포넌트에게 주는 데이터
- 컴포넌트 안에 작성된 하위 요소를 children, children도 props 중 하나
- props의 값을 임의로 변경X, 변경해서 사용하고 싶다면 새로운 변수 생성
- 속성은 camelCase로 작성하나, `data-` 또는 `aria-`로 시작하는 속성은 예외
- `checked` 또는 `value`는 해당 값이 '초기값이 아닌 현재 값을 의미
  - 초기값의 의미로 사용하고 싶다면 속성을 `defaultChecked`, `defaultValue`를 설정
- `key`는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 도움

### State

- 컴포넌트 내에서 State를 이용하여 데이터를 유동적으로 관리
- State값은 setState함수를 이용해 값을 변경해야 변경될 때마다 컴포넌트가 다시 렌더링 됨
  - 현재 값을 기반으로 State를 변경하고자 하는 경우 함수를 넣어서 사용
  - 객체 값의 경우 기존 내용을 새로운 객체에 담고 키의 값을 변경해야 함
  ```js
  const [user, setUser] = useState({ name: '민', grade: 1 });
  setUser((cur) => {
    const newUser = { ...cur };
    newUser.grade = 2;
    return newUser;
  });
  ```

## Event Handling

HTML DOM에 클릭하면 이벤트가 발생하고, 발생하면 그에 맞는 변경이 일어나도록 해야함

- JSX에 이벤트를 설정할 수 있음
- Event 이름은 camelCase로만 사용할 수 있음 ex) onClick, onMouseEnter
- 이벤트에 연결된 자바스크립트 코드는 함수 ex) 이벤트={함수}
- 실제 DOM 요소들에만 사용 가능하고, 리액트 컴포넌트에 사용하면 그냥 props로 전달

### 조건부 렌더링

1. if문
2. 논리 연산자(&&)  
   `표현식1 && 표현식2` 표현식1이 true 값을 반환할 수 있으면 표현식2를 반환하고, 그렇지 않으면 표현식 1을 반환
3. 삼항 연산자  
   `조건 ? 표현식1 : 표현식2` 조건의 결과값이 true인 경우 표현식 1, 그렇지 않으면 표현식2

## Hooks

컴포넌트에서 데이터를 관리(State)하고 데이터가 변경될 때 상호작용(Effect)을 하기 위해 사용.  
함수 컴포넌트에서 클래스 컴포넌트의 기능을 구현하기 위해 추가 됨.

- React 함수(컴포넌트, Hook) 내에서만 사용이 가능
- Hook의 이름은 반드시 'use'로 시작해야 함
- 최상위 Level에서만 Hook을 호출할 수 있음

### State Hook

```jsx
const App = () => {
  const [state이름, setState이름] = useState(초기값);
};
```

- `useState` 컴포넌트 내 동적인 데이터를 관리할 수 있는 hook
- 최초에 `useState`가 호출될 때 초기값으로 설정되며 이후 재 렌더링이 될 경우 무시 됨
- `state`는 읽기 전용이므로 직접 수정하면 안 됨
- `state`를 변경하기 위해서는 `setState`를 이용
- `state`가 변경되면 자동으로 컴포넌트가 재 렌더링 됨

### Effect Hook

```jsx
const App = () => {
  useEffect(EffectCallback, Deps?)
}
```

- Effect Hook을 사용하면 함수 컴포넌트에서 side effect를 수행할 수 있음
- 컴포넌트가 최초로 렌더링될 때, 지정한 State나 Prop가 변경될 때마다 이펙트 콜백 함수가 호출 됨
- `Deps` 변경을 감지할 변수들의 집합(배열)
- `EffectCallback` `Deps`에 지정된 변수가 변경될 때 실행할 함수

```jsx
const App = () => {
  useEffect(() => {
    const i = setInterval(() => console.log("hi"), 1000)
    }
    return () => {
      clearInterval(i)
    }
  }, [])
}
```

- useEffect의 이펙트 함수 내에서 다른 함수를 반환할 경우 state가 변경되어 컴포넌트가 다시 렌더링되기 전과 컴포넌트가 없어질 때 호출할 함수를 지정하게 됨

### useMemo

지정한 State나 Props가 변경될 경우 해당 값을 활용해 계산된 값을 메모제이션하여 재렌더링 시 불필요한 연산을 줄임

- `useMemo`의 연산은 렌더링 단계에서 이루어지기 때문에 시간이 오래 걸리는 로직을 작성하지 않는 것이 권장 됨

```jsx
const App = () => {
  const [f, setF] = useState('철');
  const [l, setL] = useState('김');

  const fN = useMemo(() => {
    return `${f} ${l}`;
  }, [f, l]);
};
```

### useCallback

함수를 메모제이션하기 위해 사용하는 Hook, 컴포넌트가 재렌더링될 때 불필요하게 함수가 다시 생성되는 것을 방지

- `useMemo(() => fn, deps)`와 `useCallback(fn, deps)`은 같음

```jsx
const App = () => {
  const [f, setF] = useState('철');
  const [l, setL] = useState('김');

  const gF = useCallback(() => {
    return `${f} ${l}`;
  }, [f, l]);

  return <>{gF()}</>;
};
```

### useRef

컴포넌트 생애 주기 내에서 유지할 ref 객체를 반환

- ref 객체는 `.current`라는 프로퍼티를 가지며 이 값을 자유롭게 변경할 수 있음
- 일반적으로 React에서 DOM Element에 접근할 때 사용(DOM Element의 ref 속성을 이용함)
- `uesRef`에 의해 반환된 ref 객체가 변경되어도 컴포넌트가 재렌더링되지 않음

```jsx
const App = () => {
  const iR = useRef(null);
  const onB = () => iR.current.focus();
  return (
    <div>
      <input ref={iR} type='text' />
      <button onClick={onB}>input으로 포커스</button>
    </div>
  );
};
```

### Custom Hook

자신만의 Hook을 만들면 컴포넌트 로직을 함수로 뽑아내어 재사용할 수 있음

- Hook의 이름은 use로 시작해야 함
- 한 Hook 내의 state는 공유되지 않음

## Component Lifecycle

리액트 컴포넌트는 탄생부터 죽음까지 여러지점에서 개발자가 작업이 가능하도록 메서드를 오버라이딩 할 수 있게 해줌

1. 마운트: 컴포넌트가 실제 DOM에 삽입되는 것
2. 업데이트: 컴포넌트가 변하는 것
3. 언마운트: 컴포넌트가 DOM 상에서 제거되는 것

### 생명주기 메소드

- `constructor()` State 데이터를 초기화 하는 메소드
- `render()` 클래스 컴포넌트에서 반드시 구현되어야 하는 메소드
- `componentDidMount()` 컴포넌트가 마운트 된 직후 호출되는 메소드
- `componentDidUpdate()` 업데이트가 진행된 직후에 호출되는 메소드
- `componentWillUnmount()` 컴포넌트가 마운트 해제되어 제거되기 직전에 호출되는 메소드

- Declarative: 선언적 유저 인터페이스
  - Component 생성 및 마운트: constructor (생성) -> getDerivedStateFromProps -> render(최초 랜더) -> componentDidMount
  - Component props, state 변경: getDerivedStateFromProps -> shouldComponentUpdate -> render -> getSnapshotBeforeUpdate -> componentDidUpdate
  - Component 언마운트 : componentWillUnmount

---
