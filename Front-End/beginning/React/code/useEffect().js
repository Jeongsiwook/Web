import { useEffect, useState } from "react";
import Button from "./Button.js";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  console.log("I run all the time");

  // 처음 실행할 때만 사용함
  useEffect(() => {
    console.log("I run only once.");
  }, []);

  // keyword가 변할 때만 사용함
  useEffect(() => {
    if (keyword.length > 5) {
      console.log("I run when 'keyword' changes.", keyword);
    }
  }, [keyword]);
  // keyword나 counter가 변할 때만 사용함
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [keyword, counter]);
  return (
    <div>
      <input value={keyword} onChange={onChange} />
      <h1>{counter}</h1>
      <button onClick={onClick}>click</button>
    </div>
  );
}

export default App;
