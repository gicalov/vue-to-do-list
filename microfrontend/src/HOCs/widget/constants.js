export const initState = {
  isDragging: false,
  isResizing: false,
  startX: 0,
  startY: 0,
  width: 250,
  height: 500,
  left: 400,
  top: 400,
};

export const widgetStyles = {
  container: {
    width: "20px",
    height: "20px",
    position: "absolute",
    cursor: "pointer",
    backgroundColor: "white",
    borderRadius: "100px",
    top: "0",
    right: "0",
  },
  img: {
    width: "15px",
    height: "15px",
  },
  resizer: {
    width: "10px",
    height: "10px",
    borderRadius: "10px",
    background: "green",
    position: "absolute",
    bottom: "0",
    right: "0",
    cursor: "nwse-resize",
    pointerEvents: "all",
  },
};
