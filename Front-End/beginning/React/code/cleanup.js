import { useEffect, useState } from "react";

function Hello() {
  useEffect(() => {
    console.log("hi :)");
    // 컴포넌트가 파괴될 때 사용하고 싶으면 return을 사용
    return () => console.log("bye :(");
  }, []);
  return <h1>Hello</h1>;
}


function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "show"}</button>
    </div>
  );
}

export default App;
