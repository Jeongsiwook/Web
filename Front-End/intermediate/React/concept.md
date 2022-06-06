# React 맛보기
## JSX와 Babel, JSX 다루기
문자도 HTML도 아닌 JS의 확장 문법
- JSX: React.createElement 표현식
- Babel: JS Compiler
- JSX 다루기: spread 연산자

```html
<script type="text/babel">
  const text = "Hello"
  const title = "title"
  const props = { className: title, children: text }
  const element = <h1 {...props} />
</script>
```


## 멀티 Element 생성하기
children으로 주입함
```html
<script type="text/babel">
const element = (
        <>
          <h1>Hi</h1>
          <h3>Bye</h3>
          <h5>children</h5>
        </>
      );
</script>
```

## Element 찍어내기
- function: 재사용 가능한 element
- custom element: upper case
- children 제한: 없음


```html
<script type="text/babel">
  const Paint = ({ title, description, children }) => {
    return (
      <>
        <h1>{title}</h1>
        <h3>{description}</h3>
        {children}
      </>
    )
  }
  
  const element = (
    <>
      <Paint title="Good" description="good">
        <h1>Hi</h1>
      </Paint>
    </>
  )
</script>
```


## 리액트의 리랜더링
- 변경된 부분만 다시 그려 리플로우, 리페인트 부분에 있어서 이점을 가질 수 있음
- 리액트 앨리먼트는 불변객체이며 변경 판단 및 반영은 리액트가 알아서 함
- 비교 알고리즘으로 앨리먼트 타입이 바뀌면 이전 앨리먼트는 버리고 새로 그림
- 앨리먼트 타입이 같다면 key를 먼저 비교하고, props를 비교해서 변경사항을 반영함
- virtual DOM으로 비교시 활용


## 이벤트 핸들러 써보기
on{Event}: 카멜 케이스

```html
<script type="text/babel">
  const handleClick = () => alert("pressed");
      const element = (
        <button onClick={handleClick} onMouseOut={() => alert("bye")}>
          pressed
        </button>
      );
</script>
```
- Object.assign: 객체 내용 복사
- 전역 변수 변경: ReactDOM.render
