import React from "react";
import ReactDOM from "react-dom";
import Drag from "./Drag";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Drag/>
      <button style={{float:'right',marginRight:'77px',width:'10%',height:'5vh'}}>Submit</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
