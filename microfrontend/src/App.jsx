// import "./App.css";
import ToDoWidget from "./Components/ToDoWidget";

const App = () => (
  <div>
    <p>тут мое приложение</p>
    {/* <div style={{ maxWidth: "200px", overflow: "hidden" }}> */}
    <div>
      <ToDoWidget />
    </div>
    <p>конец приложения</p>
  </div>
);

export default App;
