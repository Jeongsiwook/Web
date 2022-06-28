# React styling 방법론

## CSS Module

스타일 충돌을 방지하고 코드를 격리하여 체계적으로 CSS 설계가 가능.

- class, id 등에 random string을 달아주기 때문에 선택자가 겹칠 우려가 없음
- 스타일링 직접 하나하나 해야함

```jsx
import styles from './app.module.css';

export default function App() {
  return (
    <div>
      <h1 className={styles.title}>Pink Hello world</h1>
      <h1 className={'title'}>Normal Hello world</h1>
    </div>
  );
}
```

```css
.title {
  font-size: 2.5rem;
  color: pink;
}
```

## UI framework

이미 다 만들어져 있어서 간편하고 쉽게 쓰기에 좋음.

- styling의 학습 및 훈련이 필요한 초심자들에게는 비추천
- 해당 framework의 디자인철학을 벗어나기 쉽지 않음
- 컴포넌트들을 커스터마이징 하기 어려움
- ex) Ant Desing, Material UI

```jsx
import 'antd/dist/antd.css';
import { Button } from 'antd';

export default function App() {
  return (
    <div>
      <Button type='primary'>Primary Button</Button>
    </div>
  );
}
```

## CSS framework

거대한 CSS 파일 하나를 가져오는 것임.

- 개발자가 따로 CSS 파일을 작성하지 않아도 HTML에 클래스만 적어주면 정해진 규칙대로 스타일링이 적용 됨
- CSS에 대한 이해력이 있어도 해당 framework를 사용하기 위한 학습을 또다시 해야함
- 이미 다 만들어져 있어서 초심자들에게는 비추천
- ex) W3CSS, TailwindCSS

```jsx
import { Helmet } from 'react-helmet';

export default function App() {
  return (
    <div>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://www.w3schools.com/w3css/4/w3.css'
        />
      </Helmet>
      <div className='w3-container w3-green'>
        <h1>W3Schools Deomo</h1>
      </div>
    </div>
  );
}
```

## CSS-in- JS library

따로 CSS 파일 만들 것 없이 JSX 파일 안에서 스타일링까지 해결 가능함.

- React component처럼 사용
- SCSS 사용 가능  
  ❓ 컴포넌트 재사용이 쉬워짐  
  ❓ JS 값들을 props로 넘겨줘서 해당 JS 값에 의도된 styling을 바로 적용할 수 있음  
  ❓ class 이름에 random string이 생성되기 때문에 선택자 이름이 겹칠 우려가 없음  
  ❓ 스타일링을 직접 개발자가 하나하나 해야 함

```jsx
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonsContainer = styled.div`
  margin-top: 20px;
`;

const Count = styled.div`
  width: 100px;
  height: 50px;
  line-height: 50px;
  font-size: 2rem;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;
`;

const Button = styled.button`
  color: white;
  width: 80px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  background: ${(props) => (props.inc ? 'blue' : 'red')};
  + button {
    margin-left: 10px;
  }
  &:hover {
    box-shadow: 10px 5px 5px gray;
  }
`;

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Count>{count}</Count>
      <ButtonsContainer>
        <Button inc onClick={() => setCount(count + 1)}>
          증가
        </Button>
        <Button dec onClick={() => setCount(count - 1)}>
          감소
        </Button>
      </ButtonsContainer>
    </Container>
  );
}
```

---
