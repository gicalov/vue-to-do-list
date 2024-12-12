import ToDoWidget from "./Components/ToDoWidget";
import Header from "./Components/Header";
import useStore from "./store";

import "../../vue-widget/dist/vue-to-do.css";

import { styles } from "./constants";

const App = () => {
  const { isShowWidget } = useStore();

  return (
    <div style={styles.container}>
      <Header />
      {isShowWidget && <ToDoWidget />}
      <div style={styles.content}>
        <h1 style={styles.title}>Добро пожаловать на нашу страницу!</h1>
        <p style={styles.description}>
          Это простая страница, созданная с использованием React. Вы можете
          использовать её как основную точку для разработки вашего приложения.
        </p>
        <input />
      </div>
    </div>
  );
};

export default App;
