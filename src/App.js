import { useEffect, useState } from "react";
import Ads from "./components/Ads";
import BoardMain from "./components/BoardMain";

function App() {
  const [freeItems, setFreeItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/vote")
      .then((res) => res.json())
      .then((data) => setFreeItems(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="App">
      <BoardMain items={freeItems} />
      <Ads />
    </div>
  );
}

export default App;
