import { useState } from "react";
import "./App.css";

function App() {
  const [offset, setOffset] = useState(15);
  const now = new Date();
  const options = { hour: "numeric", minute: "numeric" };

  const step = 60 * 60 * 1000;
  const sevenAndAHalfHours = new Date(now.getTime() + step * 7.5);
  const nineHours = new Date(now.getTime() + step * 9);

  return (
    <>
      <h1>{now.toLocaleTimeString("en-US", options)}</h1>
      <h2>{sevenAndAHalfHours.toLocaleTimeString("en-US", options)}</h2>
      <h2>{nineHours.toLocaleTimeString("en-US", options)}</h2>

      <div>
        <button onClick={() => setOffset((offset) => offset + 15)}>offset is {offset}</button>
      </div>
    </>
  );
}

export default App;
