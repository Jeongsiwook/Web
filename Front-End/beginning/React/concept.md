# React   
✔️ 사용자 인터페이스를 만들기 위한 JS 라이브러리   
- *Component*
  - React에서 서비스를 개발하는 데 있어 독립적인 단위로 쪼개어 구현 
- *Virtual DOM** 
  - DOM을 직접 제어하지 않는 경우 가상의 DOM TREE를 사용, 이전 상태와 이후 상태를
 비교하여 바귄 부분을 찾아내서 자동으로 바꿈
- *jsx*
  - JS 내에서 UI를 작성하기 위해 개발자에게 익숙한 환경을 제공, HTML과 유사함
- *CSR*
  - JS가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행되기 전까지느 화면이 보이지 않음.
  - JS가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 화면이 보이면서 유저가 인터렉션 가능
- *SSR*
  - JS가 전부 다운로드 되지 않아도, 일단 화면은 보이지만 유저가 사용할 수 없음
  - JS가 전부 다운로드 되어 리액트 애플리케이션이 정상 실행된 후, 유저가 사용 가능     
   
❓ 생산성 / 재사용성   
- Component와 Hook을 활용해 작은 단위의 독립적인 요소로 개발  

❓ 풍부한 자료 / 라이브러리   
- 현재 React는 전 세계적으로 가장 활발하게 커뮤니티 활동이 이루어지고 있음  

❓ 다양한 사용처   
- 웹 애플리케이션 뿐만 아니라 React-Native에 적용하여 개발할 수 있음   

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
✔️ 하나의 블록을 만들어서 필요한 곳에 조립하여 개발    
- React에서 페이지를 구성하는 최소단위이며, 이름은 대문자로 시작   
- controlled Component / Uncontrolled Component   
- 데이터는 부모에서 자식으로만 전달   

### Class
```js
// 정의
class ClassComponent extends Component {
  render() {
    const { name } = this.props
    return <div>Hello</div>;
  }
}

// 사용
ReactDOM.render(<ClassComponent />, document.querySelector('#root'));
```

### Function
```js
 // 정의 1
function FunctionComponent(props) {
  const { name } = props
  return <div>{name}</div>
}
// 정의 2
const FunctionComponent2 = () => <div>Hello</div>;

// 사용
ReactDOM.render(<FunctionComponent />, document.querySelector("#root"))
ReactDOM.render(<FunctionComponent2 />, document.querySelector("#root"))
```

### React.createElement
```js
React.createElement(
  type, // 태그 이름 문자열 | 리액트 컴포넌트 | React.Fragment
  [props], // 리액트 컴포넌트에 넣어주는 데이터 객체
  [...children] // 자식으로 넣어주는 요소들
);
```

```js
// 1. 태그 이름 문자열 type
// <h1>type 이 "태그 이름 문자열" 입니다.</h1>
ReactDOM.render(
  React.createElement('h1', null, 'type 이 "태그 이름 문자열" 입니다.'),
  document.querySelector("#root")
);

// 2. 리액트 컴포넌트 type
const Component = () => {
  return React.createElement('p', null, `type 이 "React 컴포넌트" 입니다.`);
}
// <Component></Component> => <Component /> => <p>type 이 "React 컴포넌트" 입니다.</p>
ReactDOM.render(
  React.createElement(Component, null, null),
  document.querySelector("#root")
);

// 3. React.Fragment
// 1, 2 와는 다르게 따로 태그 없이 들어감
ReactDOM.render(
  React.createElement(
    React.Fragment,
    null,
    `type 이 "React Fragment" 입니다.`,
    `type 이 "React Fragment" 입니다.`,
    `type 이 "React Fragment" 입니다.`,
    `type 이 "React Fragment" 입니다.`
  ),
  document.querySelector("#root")
)

// 4. 복잡한 리액트 엘리먼트 모임
// <div>
//   <div>
//     <h1>
//       주제
//     </h1>
//     <ul>
//       <li>React</li>
//       <li>Vue</li>
//     </ul>
//   </div>
// </div>
// babel을 이용해야 가능
ReactDOM.render(
  <div>
    <div>
      <h1>
        주제
      </h1>
      <ul>
        <li>React</li>
        <li>Vue</li>
      </ul>
    </div>
  </div>,
  document.querySelector("#root")
)
```

## JSX   
✔️ 함수 호출과 객체 생성을 위한 문법적 편의를 제공하는 JS의 확장   
```js
// babele
<head>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <script type="text/babel">
</body>
```   
❓ 가독성이 뛰어나고, 문법적 오류를 인지하기 쉬움   
- 문법
  - 최상위 요소 리턴하는 경우, `()` 로 감싸야 함
  - 자식들을 바로 랜더링하고 싶으면, `<>자식들</>`를 사용 --> Fragment
  - 자바스크립트 표현식을 사용하려면, `{표현식}`를 이용
  - `if` 문은 사용할 수 없다 --> 삼항 연산자 혹은 `&&`를 사용
  - `style={{}}`을 이용해 인라인 스타일링이 가능하며 속성 이름을 camelCase로 적음
  - `class` 대신 `className`을 사용해 `class`를 적용할 수 있음
  - 자식요소가 있으면, 꼭 닫아야 하고, 자식요소가 없으면 열면서 닫아야 함

## Props & State    
✔️ Props와 State 둘 다 변경이 발생하면, 랜더가 다시 일어날 수 있다   
✔️ *Props*
- 컴포넌트에 속성에 해당하는 부분   
- 컴포넌트 외부에서 컴포넌트에게 주는 데이터   
- 컴포넌트 안에 작성된 하위 요소를 children, children도 props 중 하나   
- props의 값을 임의로 변경X, 변경해서 사용하고 싶다면 새로운 변수 생성
- 속성은 camelCase로 작성하나, `data-` 또는 `aria-`로 시작하는 속성은 예외
- `checked` 또는 `value`는 해당 값이 '초기값이 아닌 현재 값을 의미
  - 초기값의 의미로 사용하고 싶다면 속성을 `defaultChecked`, `defaultValue`를 설정
- `key`는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 도움   

✔️ *State*      
- 컴포넌트 내에서 State를 이용하여 데이터를 유동적으로 관리   
- State값은 setState함수를 이용해 값을 변경해야 변경될 때마다 컴포넌트가 다시 렌더링 됨 
  - 현재 값을 기반으로 State를 변경하고자 하는 경우 함수를 넣어서 사용
  - 객체 값의 경우 기존 내용을 새로운 객체에 담고 키의 값을 변경해야 함
  ```js
  const [user, setUser] = useState({name: "민", grade: 1 })
  setUser((cur) => {
    const newUser = { ...cur }
    newUser.grade = 2
    return newUser
  })
  ```

```js
// class에서만 사용 가능
static defaultProps = {
  message: "기본값"
  };
}

Component.defaultProps = {
  message: "기본값"
};
```

```js
class Component extends React.Component {
  //state 사용
  // state = {
  //   count: 0,
  // };
  constructor(props) {
    super(props);

    // state 초기화
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <h1>
          {this.props.message} 이것은 클래스로 만든 컴포넌트 입니다.
        </h1>
        <p>{this.state.count}</p>
      </div>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      // state 변경
      // this.setState({
      //   count: this.state.count + 1,
      // });
      this.setState((previousState) => {
        const newState = {count: previousState.count + 1};
        return newState;
      })
    }, 1000);
  }
}
```

## Event Handling   
✔️ HTML DOM에 클릭하면 이벤트가 발생하고, 발생하면 그에 맞는 변경이 일어나도록 해야함   
- JSX에 이벤트를 설정할 수 있음
- Event 이름은 camelCase로만 사용할 수 있음 ex) onClick, onMouseEnter
- 이벤트에 연결된 자바스크립트 코드는 함수 ex) 이벤트={함수}
- 실제 DOM 요소들에만 사용 가능하고, 리액트 컴포넌트에 사용하면 그냥 props로 전달
```js
/*
function Component() {
  return (
    <div>
      <button 
        onClick={() => {
        console.log("clicked");
        }}
      >
        클릭
      </button>
    </div>
  );
}
*/

class Component extends React.Component {
  state = {
    count: 0
  };
  /*
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }
  */
  render() {
    return 
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.click}>클릭</button>
      </div>
    );
  }
  
  click() = () => {
    console.log("clicked");
    this.setState((state) => ({
      ...state,
      count: state.count + 1
    }));
  }
}

ReactDOM.render(<Component />, document.querySelector("#root"))
```

### 조건부 렌더링
1. if문
2. 논리 연산자(&&)   
✔️ `표현식1 && 표현식2` 표현식1이 true 값을 반환할 수 있으면 표현식2를 반환하고, 그렇지 않으면 표현식 1을 반환   
3. 삼항 연산자   
✔️ `조건 ? 표현식1 : 표현식2` 조건의 결과값이 true인 경우 표현식 1, 그렇지 않으면 표현식2   

## Hooks   
✔️ 컴포넌트에서 데이터를 관리(State)하고 데이터가 변경될 때 상호작용(Effect)을 하기 위해 사용   
❓ 함수 컴포넌트에서 클래스 컴포넌트의 기능을 구현하기 위해 추가 됨   
- React 함수(컴포넌트, Hook) 내에서만 사용이 가능
- Hook의 이름은 반드시 'use'로 시작해야 함
- 최상위 Level에서만 Hook을 호출할 수 있음

### State Hook과 Effect Hook   
✔️ *State Hook*   
```jsx
const App = () => {
  const [state이름, setState이름] = useState(초기값)
}
```
- `useState` 컴포넌트 내 동적인 데이터를 관리할 수 있는 hook
- 최초에 `useState`가 호출될 때 초기값으로 설정되며 이후 재 렌더링이 될 경우 무시 됨
- `state`는 읽기 전용이므로 직접 수정하면 안 됨
- `state`를 변경하기 위해서는 `setState`를 이용
- `state`가 변경되면 자동으로 컴포넌트가 재 렌더링 됨

✔️ *Effect Hook*   
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

### 이외의 Hooks   
1. *useMemo*   
✔️ 지정한 State나 Props가 변경될 경우 해당 값을 활용해 계산된 값을 메모제이션하여 재렌더링 시 불필요한 연산을 줄임   
- `useMemo`의 연산은 렌더링 단계에서 이루어지기 때문에 시간이 오래 걸리는 로직을 작성하지 않는 것이 권장 됨

```jsx
const App = () => {
  const [f, setF] = useState('철')
  const [l, setL] = useState('김')
  
  const fN = useMemo(() => {
    return `${f} ${l}`
  }, [f, l])
}
```

2. *useCallback*      
✔️ 함수를 메모제이션하기 위해 사용하는 Hook, 컴포넌트가 재렌더링될 때 불필요하게 함수가 다시 생성되는 것을 방지   
- `useMemo(() => fn, deps)`와 `useCallback(fn, deps)`은 같음
```jsx
const App = () => {
  const [f, setF] = useState('철')
  const [l, setL] = useState('김')
  
  const gF = useCallback(() => {
    return `${f} ${l}`
  }, [f, l])
  
  return <>{gF()}</>
}
```

3. *useRef*   
✔️ 컴포넌트 생애 주기 내에서 유지할 ref 객체를 반환   
- ref 객체는 `.current`라는 프로퍼티를 가지며 이 값을 자유롭게 변경할 수 있음
- 일반적으로 React에서 DOM Element에 접근할 때 사용(DOM Element의 ref 속성을 이용함)
- `uesRef`에 의해 반환된 ref 객체가 변경되어도 컴포넌트가 재렌더링되지 않음

```jsx
const App = () => {
  const iR = useRef(null)
  const onB = () => iR.current.focus()
  return (
    <div>
      <input ref={iR} type="text" />
      <button onClick={onB}>input으로 포커스</button>
    </div>
  )
}
```

4. *Custom Hook*   
✔️ 자신만의 Hook을 만들면 컴포넌트 로직을 함수로 뽑아내어 재사용할 수 있음   
- Hook의 이름은 use로 시작해야 함
- 한 Hook 내의 state는 공유되지 않음

## Component Lifecycle   
✔️ 리액트 컴포넌트는 탄생부터 죽음까지 여러지점에서 개발자가 작업이 가능하도록 메서드를 오버라이딩 할 수 있게 해줌   
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


# React Router   
✔️ Declarative routing for React   
- React의 JSX를 이용하거나, History API를 사용하여 라우팅을 구현
- 웹에서는 react-router-dom을 사용
- 적용 시, 서버의 모든 path에서 같은 앱을 서빙하도록 해야 함

## 기능
- React 컴포넌트를 특정 path와 연결하면, 해당하는 path로 진입 시 컴포넌트를 렌더링하게 함
- query, path variable 등 URL parameter를 얻어 활용함
- 조건에 맞지 않을 경우 redirect 함
- 페이지 이동 시, 이벤트 핸들러를 등록함
- /posts/my-post-1 등의 nested route를 구현함

## SPA(Single Page Application)     
✔️ 하나의 페이지 요청으로 전체 웹앱을 사용하는 방식, 유저는 웹페이지를 사용하며 모바일 앱 같은 경험을 느낌   
- CSR 기술을 활용, 페이지 진입 시 리로드 없이 라우팅 함
- AJAX 기술을 활용, 페이지 이동 시 서버에 데이터만 요청하여 JS로 페이지를 만듦
- MPA와 다르게, 여러 페이지를 하나의 앱의 구성요소로 보고 여러 페이지 간의 스타일, 컴포넌트를 재활용하는 방향으로 구현
- JS만을 활용해 전체 페이지를 만들기에, 첫 요청 시 빈 페이지를 받게 됨   

### 장점   
❓ 서버에서 페이지를 만들 필요가 없으므로 CDN에 캐싱이 가능   
❓ 매번 페이지 요청을 할 필요가 없어 네트워크 요청이 줄어듦   
❓ 데이터 요청 등을 캐싱하여 재사용하는 등 제약 조건이 줄어듦   
❓ 웹 사이트를 개별 페이지보다는 하나의 앱으로 보는 설계로 고도의 SW 설계와 패턴을 적용할 수 있음   

### 단점
- MAP 방식 보다는 Search Engine Optimization에 불리함
- 하나의 JS 앱이 지속하므로, 메모리 관리와 성능, 데이터 활용 등이 중요
- 여러 페이지를 전송 받는 것보다, 하나의 거대한 JS 앱을 전송받아야 하므로 코드가 많아질수록 로드 속도가 느려짐   

### BrowserRouter   
✔️ HTML5의 History API를 사용하여, UI와 URL의 싱크를 맞추는 역할   
- 모든 url에 대해 동작하게 하기 위해서는 서버 설정 필요
- 모든 path 앞의 basename을 지정할 수 있음
  - `basename='/ko'`
- forceRefresh로, 페이지 이동 시 리프레시 할 것인지 지정할 수 있음

### Route   
✔️ path와 컴포넌트를 매칭함   
- 매칭되는 컴포넌트는 children으로 넣어주거나 component prop으로 넘김
- exact 키워드로 정확하게 매칭하는 path를 설정함
- Route로 렌더링 되는 최상위 컴포넌트는 match, location, history를 prop으로 받음
- render prop으로, 매칭되었을 때 실제 어떤 컴포넌트를 렌더링할지 통제함

### 라우팅 과정   
✔️ 주로 History API 혹은 URL Hash를 이용해 페이지 리로드 없는 페이지 전환을 구현   

1. 브라우저에서 최초에 '/' 경로로 요청을 하면, React Web App을 내려줌
2. 내려받은 React App에서 '/' 경로에 맞는 컴포넌트를 보여줌
3. React App에서 다른 페이지로 이동하는 동작을 수행하면, 새로운 경로에 맞는 컴포넌트를 보여

```bash
$ npm i react-router-dom
```

- cra에 기본 내장된 패키지가 아님
- react-router-dom은 Facebook의 공식 패키지가 아님
- 가장 대표적인 라우팅 패키지

- 특정 경로에서 보여줄 컴포넌트를 준비
    - '/' => Home 컴포넌트
    - '/profile' => Profile 컴포넌트
    - '/about' => About 컴포넌트

```js
// App.js
import { BrowserRouter, Route} form "react-router-dom"
function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} /> // component 앞에 exact를 추가해주면 동시에 뜨는 걸 없애줌
      <Route path="/profile" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
```

## Dynamic 라우팅
- Routes의 경로에 특정 값을 넣어 해당 페이지로 이동할 수 있게 하는 것

```js
// App.js
import { BrowserRouter, Router } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
// URL parameters 방식

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
```

```js
//Profile.jsx
export default function Profile(props) {
  const id = props.match.params.id;
  return (
    <div>
      <h2>Profile 페이지 입니다.</h2>
      {id && <p>id는 {id} 입니다.</p>} // id가 있을 경우
    </div>
  );
}
```

```bash
$ npm i query-string
```

```js
// About.jsx
import queryString from "query-string";

export default function About(props) {
  const searchParams = props.location.search;
  const query = quryString.parse(searchParams);
  return (
    <div>
      <h2>About 페이지입니다.</h2>
      {query.name && <p>name 은 {query.name} 입니다.</p>}
    </div>
  );
}
```

## Switch
- 여러 Route 중 순서대로 먼저 맞는 하나만 렌더링함
- `path="/"`의 경우 모든 path에 매칭되므로 exact 키워드를 추가하거나 가장 아래로 내림
- 가장 마지막에 어디 path에도 맞지 않으면 보여지는 컴포넌트를 설정해서, "Not Found" 페이지를 만들 수 있음

```js
// App.js에 추가
import { Switch, } from "react-router-dom";
import NotFound from "./pages/NotFound";

<BrowserRouter>
  <Switch>
    <Route path="/profile/:id" component={Profile} />
    <Route path="/profile" component={Profile} />    
    <Route path="/about" component={About} />
    <Route path="/" exact component={Home} /> // home만 exact
    <Route component={NotFound} />
  </Swtich>
<BroswserRouter>
```

## JSX 링크로 라우팅 이동하기   
✔️ to prop을 특정 URL로 받아, 클릭 시 네비게이션 함   
- anchor tag를 래핑함
- to에 location obejct나 함수를 받을 수 있음
```js
// App.js 추가
import { Link } from "react-router-dom";

<BrowserRouter>
  <Link to="/">Home</Link> // 서버로부터 새로운 파일을 가져오지 않고 이미 가지고 있는 react view 중에서 지금 이동 하고자 하는 view를 보여준다.
</BrowserRouter>
```

- Navigation
  - `import { NavLink } from "react-router-dom";`
  - activeClassName, activeStyle처럼 active 상태에 대한 스타일 지정이 가능
  - Route의 path처럼 동작하기 때문에 exact가 있음
   
```js
// App.js
import Links from "./components/Links";
import NavLinks from "./components/NavLinks";

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <NavLink />
      <Switch>
        <Route path='/profile/:id' component={Profile} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/aboue' component={About} />
        <Route path='/' exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
```

```js
//NavLink.jsx
import { NavLink } from 'react-router-dom';

const activeStyle = { color: "green" };

export default function NavLinks() {
  return (
    <ul>
      <li>
        <NavLink to="/" exact activeStyle={}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/profile" exact activeStyle={activeStyle}>Profile</NavLink>
      </li>
      <li>
        <NavLink to="/profile/1" activeStyle={activeStyle}>Profile/1</NavLink>
      </li>
      <li>
        <NavLink 
        to="/about" 
        activeStyle={activeStyle}
        isActive{(match, location) => {
          return match != null && location.search === "";
          }}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/about?name=mark" activeStyle={activeStyle}
        isActive{(match, location) => {
          return match != null && location.search === "?name=mark";
          }}
        >
          About?name=mark
        </NavLink>
      </li>
    </ul>
  );
}
```
### userHistory, useLocation, useParams, useRouteMatch   
✔️ 최상위 컴포넌트가 아니더라도, hook으로 react-router 관련 객체에 접근할 수 있음   
- history, location, params, match 객체에 접근 함

## JS로 라우팅 이동
```js
// App.js
import Login from "./pages/Login";

<BrowserRouter>
  <Switch>
    <Route path="/login" component={Login} />
  </Switch>
</BrowserRouter>
```

```js
// Login.jsx
import LoginButton from "../components/LoginButton";

export default function Login() {  
  return (
    <div>
      <h2>Login 페이지 입니다.<h2>
      <LoginButton />
    </div>
  );
}
```

```js
// LoginButton.jsx
import { withRouter } from "react-router-dom";

export default withRouter(function LoginButton(props) {
  function login() {
    setTimeout(() => {
      props.history.push("/");
    }, 1000);
  }
  return <button onClick={login}>로그인하기</button>;
});
```

## Redirect   
✔️ Link와 비슷하나, 렌더링 되면 to prop으로 지정한 path로 이동함   
```js
// App.js
const isLogin = true; // true이면 home, false이면 로그인 페이지

<Route path="/login" 
render={() => (isLogin ? <Redirect to="/" /> : <Login />)}
/>
```

## Private Route 만들기   
✔️ 특정 조건이 충족되지 않았을 때 다른 페이지로 Redirect하도록 하는 기능   
- 유저의 상세 페이지, 개인정보 변경 페이지 등을 만들 때 사용 됨

## query string 활용   
✔️ URL의 query string 정보를 활용해 앱을 구성할 수 있음   
- URLSearchParams API를 활용함

---

# JS 비동기 통신
##

---

# 상태 관리   
✔️ 앱 상에서 데이터를 메모리 등에 저장하고 하나 이상의 컴포넌트에서 데이터를 공유 하는 것   
❓ 앱이 사용하는 데이터가 점점 많아지고, 유저와의 인터렉션 시 임시로 저장하는 데이터가 많아지는 경우 상태 관리를 고려   

## MPA와 SPA에서의 상태 관리   
✔️ MPA에서는 서버의 데이터를 이용해 페이지를 렌더링하므로, 클라이언트의 데이터와 서버의 데이터가 큰 차이를 가지지 않음   
✔️ SPA에서는 자체적으로 데이터를 갖고, 서버와의 동기화가 필요한 데이터만을 처리, 그 외의 데이터는 Client만의 데이터로 유지   

## 해결하는 문제들   
1. 데이터 캐싱과 재활용
- SPA에서 페이지 로딩 시마다 모든 데이터를 로딩한다면, 사용자 경험 측면에서 MPA를 크게 넘어서기 힘듦
- 오히려 네트워크 요청 수가 많아져 더 느릴 수도 있음
- 변경이 잦은 데이터가 아니라면, 데이터를 캐싱하고 재활용함
- 변경이 잦다면, 데이터의 변경 시점을 파악해 최적화   
- 
2. Prop Drilling   
✔️ 상위 컴포넌트가 하위 컴포넌트에 불필요하게 데이터를 전달   
- 컴포넌트가 복잡해지는 경우, 상위 부모와 자식 컴포넌트 간의 깊이가 커짐
- 최하단의 자식 컴포넌트가 데이터를 쓰기 위해 최상위 컴포넌트로부터 데이터를 보내야 하는 상황이 발생
- Context API 등을 활용, 필요한 컴포넌트에서 데이터를 가져올 수 있음
- 컴포넌트 간의 결합성을 낮춤

## Flux Pattern   
✔️ 웹 애플리케이션 아키텍처 패턴   
- Unidirectional data flow를 활용, 데이터의 업데이트와 UI 반영을 단순화
- React의 UI 패턴인 합성 컴포넌트와 어울리도록 설계
- redux, react-redux 라이브러리의 Prior art

### Flux Pattern vs MVC Pattern   
✔️ MVC(Model View Controller)    
-패턴에서는 Bidirectional data flow라, View에서 특정 데이터를 업데이트하면 연쇄적인 업데이트가 일어남   
- 앱이 커지면 업데이트의 흐름을 따라가기 힘듬   

✔️ Flux
- 하나의 Action이 하나의 Update만을 만들도록 함
- data와 업데이트가 한 방향으로 흐르므로 UI의 업데이트를 예측하기 쉬움

### Flux 구조   
✔️ Action -> Dispatcher -> Store -> View 순으로 데이터가 흐름   
- store는 미리 dispatcher에 callback을 등록해, 자신이 처리할 action을 정의
- action creator는 action을 생성하여 dispatcher로 보냄
- dispatcher는 action을 store로 넘김
- store는 action에 따라 데이터를 업데이트 후, 관련 view로 변경 이벤트 발생
- View는 그에 따라 데이터를 다시 받아와 새로운 UI를 만듦
- 유저 인터렉션이 발생하면 View는 action을 발생

## useState, useRef, useContext, useReducer   
✔️ 외부 라이브러리 없이 React가 제공하는 훅 만으로 상태 관리를 구현하기 위해 사용    
- 함수형 컴포넌트에 상태를 두고, 여러 컴포넌트 간 데이터와 데이터 변경 함수를 공유하는 방식으로 상태를 관리하게 됨

1. *useState*   
✔️ 단순한 하나의 상태를 관리하기에 적합   
- `const [state, setState] = useState(initState | initFn)`   
- state가 바뀌면, state를 사용하는 컴포넌트를 리렌더함
- useEffect와 함께, state에 반응하는 훅을 구축

2. *useRef*   
✔️ 상태가 바뀌어도 리렌더링 하지 않는 상태를 정의함   
- 즉, 상태가 UI의 변경과 관계없을 때 사용   
- uncontrolled component의 상태를 조작하는 등, 리렌더링을 최소화하는 상태 관리에 사용 됨

3. *useContext*   
✔️ 컴포넌트와 컴포넌트 간 상태를 공유할 때 사용   
- 부분적인 컴포넌트들의 상태 관리, 전체 앱의 상태 관리를 모두 구현
- Context Provider 안에서 렌더링되는 컴포넌트는, useContext를 이용해 깊이 nested 된 컴포넌트라도 바로 context value를 가져옴
- context value가 바뀌면 내부 컴포넌트는 모두 리렌더링 됨
1. `createContext`로 Context 생성하고, 해당 Context를 export
2. 변수나 함수 A 생성
3. 특별한 컴포넌트인 Context.provider 컴포넌트 (value=A)로, 다른 컴포넌트 B를 감싸기
4. 그 다른 컴포넌트 B는, context를 import하고 useContext 쓰기
5. 그 다른 컴포넌트 B에서, 변수나 함수 A 사용
```jsx
export const UserStateContext = createContext(null)
export const DispatchContext = createContext(null)

function App() {
  const [userState, dispatch] = useReducer(loginReducer, { user: null })
  
  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </Router>
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  )
}

import { DispatchContext } from "App"

function LoginForm() {
  const dispatch = useContext(DispatchContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await Api.post("user/login", {
        email,
        password,
      })
      const user = res.data
      dispatch({
        type: "LOGIN_SUCCESS"
        payload: user,
      })
    
```

4. *useReducer*   
✔️ useState보다 복잡한 상태를 다룰 때 사용   
- 별도의 라이브러리 없이 flux pattern에 기반한 상태 관리를 구현
- `const [state, dispatch] = useReducer(reducer, initState)`
- nested state 등 복잡한 여러 개의 상태를 한꺼번에 관리하거나, 어떤 상태에 여러 가지 처리를 적용할 때 유용
- 상태 복잡하다면, useState에 관한 callback을 내려주는 것보다 dispatch를 prop으로 내려 리렌더링을 최적화하는 것을 권장
1. `action`을 `dispatch`하면 state가 바뀜
  - `action`이라는 객체가 `dispatch`되면 상태가 변한다라는 뜻
2. action.type의 종류에 따라 reducer가 state를 바꿈
3. reducer가 state를 바꿀 때, action.payload 데이터를 사용
  - state를 action.payload의 데이터가 덮어 씌우거나 추가할 수도 있다라는 뜻

```jsx
export function loginReducer(userState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...userState,
        user: action.payload,
      }
    case "LOGOUT":
      return {
        ...userState,
        user: null,
      }
    defult:
      return userState
  }
}

const [userState, dispatch] = userReducer(loginReducer, { user: null })

const res = await Api.post("user/login", {
  email,
  password,
})
const user = res.data
dispatch({
  type: "LOGIN_SUCCESS",
  payload: user,
})
```
---

## useState   
✔️ 상위 컴포넌트에서 state와 state 변경 함수를 정의하고, 그 state나 변경 함수를 사용하는 컴포넌트까지 prop으로 내려주는 패턴   
- state가 변경되면, 중간에 state를 넘기기만 하는 컴포넌트들도 모두 리렌더링 됨
- 상태와 상태에 대한 변화가 단순하거나, 상대적으로 소규모 앱에서 사용하기에 적합

## useContext   
✔️ Provider 단에서 상태를 정의하고, 직접 상태와 변경 함수를 사용하는 컴포넌트에서 useContext를 이용해 바로 상태를 가져와 사용하는 패턴   
- useReducer와 함께, 복잡한 상태와 상태에 대한 변경 로직을 두 개 이상의 컴포넌트에서 활용하도록 구현 가능
- state는 필요한 곳에서만 사용하므로, 불필요한 컴포넌트 리렌더링을 방지
- Prop Drilling(Plumbing)을 방지하여 컴포넌트 간 결합도를 낮춤

---

## React-Router-Dom 라이브러리 V6    
✔️ React의 싱글페이지 웹 앱 구현에 사용   
1. `Switch` 대신 `Routes` 사용
```jsx
<Routes>
</Routes>
```
2. 컴포넌트 샌드위치 구조, `component props` 대신 `element props` 사용
```jsx
<Route path="/login" element={<LoginForm />} />
```
3. `useHistory` 대신 `useNavigate` 사용
```jsx
const history = useHistory()

history.push("/login")
history.replace("/login")

const navigate = useNavigate()
navigate("/login")
navigate("/login", {replace: true})
```
4. `Redirect` 대신 `path="*"` 사용
```jsx
<Route path="*" element={<NotFound />} />
```

---

## Component Styling
### Style Loaders
```js
// CSS (webpack.config.js)
import './App.css';

// CSS Module (webpack.config.js)
import styles from './App.module.css';

// Sass (webpack.config.js)
import './App.scss';
import './App.sass';

// Sass Module (webpack.config.js)
import styles from './App.module.scss';
import styles from './App.module.sass';
```

### CSS, SASS
```js
// App.js
import './App.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


// App.css
.App {
  text-align: center;
}

.App .logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App .logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App .header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App .link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


// App.scss
// $npm i sass 설치해줘야됨
.App {
  text-align: center;

  .logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
```

### CSS module, SASS module
- 전역적으로 오염되지 않게 사용할 수 있게 해준다.
```js
// App.js
import logo from "./logo.svg";
import styles from "./App.module.css";
import Button from "./components/Button";

function App() {
  return (
    <div className="{styles["App"]}">
      <header className={styles["header"]}>
        <img src={logo} className={styles["logo"]} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>Button</Button>
      </header>
    </div>
  );
}


// App.module.css
.App {
  text-align: center;
}

.App .logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App .logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App .header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App .link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


// Button.module.css
.button {
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 20px;
}

.loading {
  border: 2px solid grey;
  color: grey;
}


// Button.jsx
// npm i classnames
import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Button extends React.Component {
  state = {
    loading: false
  };
  
  render() {
  
    const {loading} = this.state;
    
    return (
      <button 
        onClick={this.startLoading}
        className={cx("button", { loading })} 
        {...this.props} 
      />
    );
  }
  
  startLoading = () => {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  };
}
    
  }
}

export default Button;
```

### Styled Components
```bash
$ npm i styled-components
```
