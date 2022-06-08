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

1. _useState_  
   ✔️ 단순한 하나의 상태를 관리하기에 적합

- `const [state, setState] = useState(initState | initFn)`
- state가 바뀌면, state를 사용하는 컴포넌트를 리렌더함
- useEffect와 함께, state에 반응하는 훅을 구축

2. _useRef_  
   ✔️ 상태가 바뀌어도 리렌더링 하지 않는 상태를 정의함

- 즉, 상태가 UI의 변경과 관계없을 때 사용
- uncontrolled component의 상태를 조작하는 등, 리렌더링을 최소화하는 상태 관리에 사용 됨

3. _useContext_  
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

4. _useReducer_  
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
    case 'LOGIN_SUCCESS':
      return {
        ...userState,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...userState,
        user: null,
      };
      defult: return userState;
  }
}

const [userState, dispatch] = userReducer(loginReducer, { user: null });

const res = await Api.post('user/login', {
  email,
  password,
});
const user = res.data;
dispatch({
  type: 'LOGIN_SUCCESS',
  payload: user,
});
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
<Routes></Routes>
```

2. 컴포넌트 샌드위치 구조, `component props` 대신 `element props` 사용

```jsx
<Route path='/login' element={<LoginForm />} />
```

3. `useHistory` 대신 `useNavigate` 사용

```jsx
const history = useHistory();

history.push('/login');
history.replace('/login');

const navigate = useNavigate();
navigate('/login');
navigate('/login', { replace: true });
```

4. `Redirect` 대신 `path="*"` 사용

```jsx
<Route path='*' element={<NotFound />} />
```
