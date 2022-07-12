# React

페이스북에서 만든 오픈소스 JS 라이브러리.

## 장점

- 이미 만들어진 컴포넌트들을 사용할 수 있음
- 페이스북이라는 대기업의 지원을 받음

## 단점

# Virtual-DOM

UI의 가상적인 표현을 메모리에 저장하고, ReactDOM과 같은 라이브러리에 의해 실제 DOM과 동기화.  
재조정이라고도 함.

## 장점

- 가벼움
- 상태를 가지지 않음
- 불변성
  - 비교하고 업데이트 하는 게 쉬워짐

## 동작 과정

- 기존 과정

  1. JSX를 컴포넌트에서 리턴
  2. 바벨은 JSX를 React.createElement()호출로 컴파일
  3. react elements는 reactDOM의 render에 의해서 비로소 실제 DOM 요소가 됨

- Virtual DOM이 도입된 과정  
  모든 React DOM object는 그에 대응하는 virtual DOM object가 있음.  
  vitual DOM object는 DOM object를 대신함.

  1. 데이터가 업데이트 되면 바뀐 데이터를 바탕으로 React.createElement()를 통해 JSX element를 렌더링 함
  2. 모든 각각의 virtual DOM Object가 업데이트 됨
  3. virtual DOM이 업데이트되면 React는 virtual DOM을 업데이트 이전에 virtual DOM 스냅샷과 비교하여 정확히 어떤 virtual DOM이 바뀌었는지 검사.

2번과 3번의 과정을 `Diffing` 알고리즘이라고 부르며 재조정 과정에 해당.

### Diffing

element의 속성 값만 변한 경우 속성 값만 업데이트.  
element의 태그 또는 컴포넌트가 변경된 경우, 해당 노드를 포함한 하위 모든 노드를 unmount 후 새로운 virtual DOM으로 대체.

# 렌더링 최적화 관련

같은 props로 렌더링이 자주 일어나는 컴포넌트에서 사용.

## useMemo

계산된 값을 메모제이션된 값을 반환하여, 재렌더링 시 불필요한 연산을 줄임.

렌더링 단계에서 이루어지기 때문에 시간이 오래 걸리는 로직을 작성하지 않는 것이 권장 됨.

```jsx
const Info = ({ color, movie }) => {
  // 값이 변경 될 때마다 두 개가 다 실행 됨
  const colorKor = getColorKor(color);
  const movieGenreKor = getMovieGenreKor(movie);

  // useMemo를 사용하여 변경된 것만 실행 됨.
  const colorKor = useMemo(() => getColorKor(color), [color]);
  const movieGenreKor = useMemo(() => getMovieGenreKor(movie), [movie]);
};
```

## useCallback

메모리제이션 된 함수를 반환하여, 컴포넌트가 재렌더링될 때 불필요하게 함수가 다시 생성되는 것을 방지.

```jsx
const App = () => {
  // 기존
  const onChangeHandler = (e) => {
    if (e.target.id === 'color') setColor(e.target.value);
    else setMovie(e.target.value);
  };

  // useCallback 사용
  const onChangeHandler = useCallback((e) => {
    if (e.target.id === 'color') setColor(e.target.value);
    else setMovie(e.target.value);
  }, []);
};
```

하위 컴포넌트가 `React.memo()` 같은 것으로 최적화 되어 있고 그 하위 컴포넌트에게 callback 함수를 props로 넘길 때, 상위 컴포넌트에서 useCallback으로 함수를 선언하는 것이 유용함.  
함수가 매번 재선언되면 하위 컴포넌트는 넘겨 받은 함수가 달라졌다고 인식하기 때문.

- `React.memo()`로 함수형 컴포넌트 자체를 감싸면 넘겨 받는 props가 변경되지 않았을 때는 상위 컴포넌트가 메모리제이션된 함수형 컴포넌트를 사용하게 됨
- 함수는 오로지 자기 자신만이 동일하기 때문에 상위 컴포넌트에서 callback함수를 (같은 함수이더라도) 재선언한다면 props로 callback 함수를 넘겨 받는 하위 컴포넌트 입장에서는 props가 변경 되었다고 인식함
- 해결하기 위해서 useCallback()을 이용해서 콜백 인스턴스를 보존

```js
function Logout({ username, onLogout }) {
  return <div onClick={onLogout}>Logout {username}</div>;
}

const MemoizedLogout = React.memo(Logout);

// 메모리제이션 중단 예제
function MyApp({ store, cookies }) {
  return (
    <div className='main'>
      <header>
        <MemoizedLogout
          username={store.username}
          onLogout={() => cookies.clear()}
        />
      </header>
      {store.content}
    </div>
  );
}

// 메모리제이션 정상 예제
const MemoizedLogout = React.memo(Logout);

function MyApp({ store, cookies }) {
  const onLogout = useCallback(() => {
    cookies.clear();
  }, []);
  return (
    <div className='main'>
      <header>
        <MemoizedLogout username={store.username} onLogout={onLogout} />
      </header>
      {store.content}
    </div>
  );
}
```

# 리렌더링 되는 조건

## state

setState() 메서드를 이용해서 state 값의 변경이 감지되면 리렌더링 됨.

## props

전달받은 props 값이 업데이트 되었다면 렌더링 됨.

## 부모 컴포넌트

새로운 prop이 들어오지 않더라도, 부모 컴포넌트가 리렌더링 된다면 자식 컴포넌트 역시 리렌더링 됨.

## shouldComponentUpdate

컴포넌트에 shouldComponentUpdate 메소드의 return value를 false로 지정하면 리렌더링 되는 상황을 막음.

## forceUpdate

`this.forceUpdate()`를 사용하면 강제 리렌더링을 할 수 있음.
