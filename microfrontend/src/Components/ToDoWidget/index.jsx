import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { mount, unmount } from "../../../../vue-widget/dist/my-widget.es";

const App = () => {
  const componentRef = useRef();
  useEffect(() => {
    const container = document.createElement("div");
    container.id = "my-vue-widget";
    const currentElement = componentRef.current;
    currentElement.appendChild(container);

    mount(container);

    return () => {
      unmount(container);
      currentElement.removeChild(container);
    };
  }, []);

  return (
    <Rnd
      default={{
        x: 400,
        y: 100,
        width: 264,
        height: 434,
      }}
      minWidth={264}
      minHeight={434}
      bounds="parent"
      style={{
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <div ref={componentRef}></div>
    </Rnd>
  );
};

export default App;
