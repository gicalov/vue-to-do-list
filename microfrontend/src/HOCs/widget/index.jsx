import { useRef, useState } from "react";

import "./style.css";

import { initState, widgetStyles } from "./constants";

export const EVENTS_TYPES= {
  gragg: 'dragg'
  resize,


}

const DraggableResizable = ({ children, onClose }) => {
  const [data, setData] = useState(initState);
  const ref= useRef(null)

  const handleMouseDown = (e) => {
    if (e.button !== 0) {return;


    }
    if (ref.current?.contains(e.target)) {
      setData((prevData) => ({
        ...prevData,
        isResizing: true,
        startX: e.clientX,
        startY: e.clientY,
      }));
    }  {
      setData((prevData) => ({
        ...prevData,
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
      }));
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e) => {
    setData((prevData) => {
      const {
        // isDragging,
        // isResizing,
        // isFloating,
        // isStattic,
        width,
        height,
        left,
        top,
        startX,
        startY,
      } = prevData;



      if (isDragging) {
        return {
          ...prevData,
          left: left + (e.clientX - startX),
          top: top + (e.clientY - startY),
          startX: e.clientX,
          startY: e.clientY,
        };
      } else if (isResizing) {
        return {
          ...prevData,
          width: width + (e.clientX - startX),
          height: height + (e.clientY - startY),
          startX: e.clientX,
          startY: e.clientY,
        };
      } esle if (condition) {
        
      } else if (condition) {
        
      }

      return prevData;
    });
  };

  const handleMouseUp = () => {
    setData((prevData) => ({
      ...prevData,
      isDragging: false,
      isResizing: false,
    }));
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "auto";
  };

  const wrapperStyles = {
    position: "absolute",
    left: `${data.left}px`,
    top: `${data.top}px`,
    width: `${data.width}px`,
    height: `${data.height}px`,
    overflow: "hidden",
    zIndex: 1000,
  };

  return (
    <div style={wrapperStyles} onMouseDown={handleMouseDown}>
      <div style={widgetStyles.container} onClick={onClose}>
        <img src="images/close-icon.png" alt="Close" style={widgetStyles.img} />
      </div>
      <div className="wrapper">{children}</div>
      <div className="resizer" ref={ref} style={widgetStyles.resizer} />
    </div>
  );
};

export default DraggableResizable;
