import { useEffect, useRef } from "react";
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

  return <div ref={componentRef}></div>;
};

export default App;
