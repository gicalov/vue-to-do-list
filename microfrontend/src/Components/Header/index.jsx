import "./style.css";
import useStore from "../../store";

const Header = () => {
  const { isShowWidget, toggleWidget } = useStore();

  const handleClickWidgetButton = () => {
    toggleWidget((prev) => !prev);
  };

  return (
    <header className="header">
      {isShowWidget ? (
        <button onClick={handleClickWidgetButton}>remove widget</button>
      ) : (
        <button onClick={handleClickWidgetButton}>show widget</button>
      )}
    </header>
  );
};

export default Header;
