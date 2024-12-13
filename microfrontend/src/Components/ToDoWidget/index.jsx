import { useEffect, useRef } from "react";
import { mount, unmount } from "../../../../vue-widget/dist/my-widget.es";
import DraggableResizable from "../../HOCs/widget";
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
    <DraggableResizable onClose={toggleWidget}>
      <div ref={componentRef} />
    </DraggableResizable>
  );
};

export default ToDoWidget;
