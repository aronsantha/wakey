import { useState } from "react";
import "./App.css";

function App() {
  const [offsetInMins, setOffset] = useState(15);
  const offsetInMs = offsetInMins * 60 * 1000;
  const now = new Date();
  const options = { hour: "numeric", minute: "numeric" };

  const step = 60 * 60 * 1000;
  const sevenAndAHalfHours = new Date(now.getTime() + offsetInMs + step * 7.5);
  const nineHours = new Date(now.getTime() + offsetInMs + step * 9);

  return (
    <>
      <h1>Current time: {now.toLocaleTimeString("en-US", options)}</h1>
      <h2>Recommended wakeup times:</h2>
      <p>{sevenAndAHalfHours.toLocaleTimeString("en-US", options)}</p>
      <p>{nineHours.toLocaleTimeString("en-US", options)}</p>
      <div>
        <button onClick={() => setOffset((offsetInMins) => offsetInMins + 15)}>
          Time to fall asleep is {offsetInMins} minutes
        </button>
      </div>
    </>
  );
}

export default App;
