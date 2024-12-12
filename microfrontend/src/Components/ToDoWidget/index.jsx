import { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { mount, unmount } from "../../../../vue-widget/dist/my-widget.es";
import Drugs from "../../HOCs/widget";
import useStore from "../../store";

const ToDoWidget = () => {
  const componentRef = useRef();
  const { toggleWidget } = useStore();

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
    <Drugs onClose={toggleWidget}>
      <div ref={componentRef} />
    </Drugs>
  );
};

export default ToDoWidget;
