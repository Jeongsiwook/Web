# 1. SPA

SPA(Single Page Application)은 하나의 페이지 요청으로 전체 웹앱을 사용하는 방식.  
유저는 웹페이지를 사용하며 모바일 앱 같은 경험을 느낌.

## 특징

- Client-side routing 기술을 활용, 페이지 진입 시 리로드없이 라우팅함
- AJAX 기술을 활용, 페이지 이동 시 서버에 데이터만 요청하여 JS로 페이지리를 만듦
- MPA와 다르게, 여러 페이지를 하나의 앱의 구성요소로 보고 여러 페이지 간의 스타일, 컴포넌트를 재활용하는 방향으로 구현
- JS만을 활용해 전체 페이지를 만들기에, 첫 요청 시 빈 페이지를 받게 됨

## 장점

- 서버에서 페이지를 만들 필요가 없으므로 CDN에 캐싱이 가능
- 매번 페이지 요청을 할 필요가 없어 네트워크 요청이 줄어듦. 마찬가지로 데이터 요청 등을 캐싱하여 재사용하는 등 제약 조건이 줄어듦
- 웹 사이트를 개별 페이지보다는 하나의 앱으로 보는 설계로 고도의 SW 설계와 패턴을 적용할 수 있음

## 기술적 난관들

- MPA방식 보다는 Search Engine Optimization에 불리함
- 하나의 JS 앱이 지속하므로, 메모리 관리와 성능, 데이터 활용 등이 중요
- 여러 페이지를 전송 받는 것보다, 하나의 거대한 JS 앱을 전송 받아야 하므로 코드가 많아질수록 로드 속도가 느려짐

## 라우팅

주로 History API 혹은 URL Hash를 이용해 리로드 없는 페이지 전환을 구현.  
history, location 등 HTML5 API를 활용.  
visibilitychange, popstate, beforeunload 등 window event를 활용하여 페이지 전환 등의 이벤트 시 핸들러를 등록.  
react-router, reach-router 등의 라이브러리를 활용하면, 라우팅 관련 기능을 쉽게 사용할 수 있음.

## MPA

MPA(Multi Page Application)은 서버에 미리 여러 페이지를 두고, 유저가 네이게이션 시 요청에 적합한 페이지를 전달.  
미리 서버에서 전체 페이지를 빌드해 브라우저로 전송됨.  
서버에 라우팅을 처리하는 기능이 있고, 서버에서 여러 페이지를 관리함.  
페이지 요청마다 모든 리소스를 다시 받아오므로, 페이지 간 데이터를 재활용하기 힘듦.

---

# 2. react-router

Declarative routing for React.  
React의 JSX를 이용하거나, History API를 사용하여 라우팅을 구현.  
웹에서는 react-router-dom을 사용.  
적용 시, 서버의 모든 path에서 같은 앱을 서빙하도록 해야 함.

## 기능

- React 컴포넌트를 특정 path와 연결하면, 해당하는 path로 진입 시 컴포넌트를 렌더링하게 함
- query, path variable 등 URL parameter를 얻어 활용함
- 조건에 맞지 않을 경우 redirect 함
- 페이지 이동 시, 이벤트 핸들러를 등록된
- /post/my-post-1 등의 nested route를 구현함

## 사용

- `<BrowserRouter>`로 감싸 Router Context를 제공해야 함
- Route로 path를 정의하고, 그 안에 렌더링 하고자 하는 컴포넌트를 넣음
- Link로 특정 페이지로 이동 시, 리로드 없이 페이지가 이동함

### BrowserRouter

HTML5의 History API를 사용하여, UI와 URL의 싱크를 맞추는 역할

- 모든 url에 대해 동작하게 하기 위해서는 서버 설정 필요
- 모든 path 앞의 basename을 지정할 수 있음
  - `basename='/ko'`
- forceRefresh로, 페이지 이동 시 리프레시 할 것인지 지정할 수 있음

### Route

path와 컴포넌트를 매칭함

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
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
    </BrowserRouter>
  );
}

export default App;
```

## Dynamic 라우팅

- Routes의 경로에 특정 값을 넣어 해당 페이지로 이동할 수 있게 하는 것

```js
// App.js
import { BrowserRouter, Router } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
// URL parameters 방식

function App() {
  return (
    <BrowserRouter>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/:id' element={<Profile />} />
      <Route path='/about' element={<About />} />
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
import queryString from 'query-string';

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

## Routes

- 여러 Route 중 순서대로 먼저 맞는 하나만 렌더링함
- 가장 마지막에 어디 path에도 맞지 않으면 보여지는 컴포넌트를 설정해서, "Not Found" 페이지를 만들 수 있음

```js
// App.js에 추가
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

<BrowserRouter>
  <Routes>
    <Route path="/profile/:id" element={<Profile />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/about" element={<About />} />
    <Route path="/*" element={<Home />} />
    <Route element={<NotFound />} />
  </Routes>
<BroswserRouter>
```

## JSX 링크로 라우팅 이동하기

to prop을 특정 URL로 받아, 클릭 시 네비게이션 함

- anchor tag를 래핑함
- to에 location obejct나 함수를 받을 수 있음

```js
// App.js 추가
import { Link } from 'react-router-dom';

<BrowserRouter>
  <Link to='/'>Home</Link>
  // 서버로부터 새로운 파일을 가져오지 않고 이미 가지고 있는 react view 중에서 지금
  이동 하고자 하는 view를 보여준다.
</BrowserRouter>;
```

- Navigation
  - `import { NavLink } from "react-router-dom";`
  - activeClassName, activeStyle처럼 active 상태에 대한 스타일 지정이 가능

```js
// App.js
import Links from './components/Links';
import NavLinks from './components/NavLinks';

function App() {
  return (
    <BrowserRouter>
      <Link to='/'>Home</Link>
      <NavLink />
      <Routes>
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/aboue' element={<About />} />
        <Route path='/' element={<Home />} />
        <Routes element={<NotFound />} />
      </Routes>
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
        <NavLink to="/" activeStyle={}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/profile" activeStyle={activeStyle}>Profile</NavLink>
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

최상위 컴포넌트가 아니더라도, hook으로 react-router 관련 객체에 접근할 수 있음

- history, location, params, match 객체에 접근 함

## JS로 라우팅 이동

```js
// App.js
import Login from './pages/Login';

<BrowserRouter>
  <Routes>
    <Route path='/login' element={<Login />} />
  </Routes>
</BrowserRouter>;
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
import { withRouter } from 'react-router-dom';

export default withRouter(function LoginButton(props) {
  function login() {
    setTimeout(() => {
      props.history.push('/');
    }, 1000);
  }
  return <button onClick={login}>로그인하기</button>;
});
```

## Redirect

Link와 비슷하나, 렌더링 되면 to prop으로 지정한 path로 이동함

```js
// App.js
const isLogin = true; // true이면 home, false이면 로그인 페이지

<Route
  path='/login'
  render={() => (isLogin ? <Redirect to='/' /> : <Login />)}
/>;
```

## Private Route 만들기

특정 조건이 충족되지 않았을 때 다른 페이지로 Redirect하도록 하는 기능

- 유저의 상세 페이지, 개인정보 변경 페이지 등을 만들 때 사용 됨

## query string 활용

URL의 query string 정보를 활용해 앱을 구성할 수 있음

- URLSearchParams API를 활용함

---
