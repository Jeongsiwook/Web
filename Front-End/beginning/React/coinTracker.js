import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [select, setSelect] = useState();
  const onChangeInput = (event) => {
    setMoney(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChangeSelect = (event) => {
    setSelect(event.target.value);
  };
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      <hr />
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input
            value={money}
            onChange={onChangeInput}
            placeholder="Write your money..."
          />
          {money ? <h3>{money / coins[select].quotes.USD.price}</h3> : null}
          <br />
          <select onChange={onChangeSelect}>
            <option>select</option>
            {coins.map((coin, index) => (
              <option key={coin.id} value={index}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
