import React from "react";
import "./style.css";

const withDraggableResizable = (WrappedComponent) => {
  class DraggableResizable extends React.Component {
    state = {
      isDragging: false,
      isResizing: false,
      startX: 0,
      startY: 0,
      width: 250,
      height: 500,
      left: 400,
      top: 400,
    };

    handleMouseDown = (e) => {
      if (e.target.className.includes("resizer")) {
        this.setState({
          isResizing: true,
          startX: e.clientX,
          startY: e.clientY,
        });
      } else {
        this.setState({
          isDragging: true,
          startX: e.clientX,
          startY: e.clientY,
        });
      }

      document.addEventListener("mousemove", this.handleMouseMove);
      document.addEventListener("mouseup", this.handleMouseUp);
      document.body.style.userSelect = "none";
    };

    handleMouseMove = (e) => {
      const { isDragging, isResizing, width, height, left, top } = this.state;

      if (isDragging) {
        this.setState({
          left: left + (e.clientX - this.state.startX),
          top: top + (e.clientY - this.state.startY),
          startX: e.clientX,
          startY: e.clientY,
        });
      } else if (isResizing) {
        this.setState({
          width: width + (e.clientX - this.state.startX),
          height: height + (e.clientY - this.state.startY),
          startX: e.clientX,
          startY: e.clientY,
        });
      }
    };

    handleMouseUp = () => {
      this.setState({ isDragging: false, isResizing: false });
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("mouseup", this.handleMouseUp);
      document.body.style.userSelect = "auto";
    };

    render() {
      const { left, top, width, height } = this.state;

      const styles = {
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        zIndex: 1000,
      };

      return (
        <div style={styles} onMouseDown={this.handleMouseDown}>
          <div
            style={{
              width: "20px",
              height: "20px",
              position: "absolute",
              border: "1px solid green",
              cursor: "pointer",
              backgroundColor: "white",
              borderRadius: "100px",
              top: "0",
              right: "0",
            }}
            onClick={this.props.onClose}
          />
          <WrappedComponent {...this.props} />
          <div
            className="resizer"
            style={{
              width: "10px",
              height: "10px",
              background: "blue",
              position: "absolute",
              bottom: "0",
              right: "0",
              cursor: "nwse-resize",
              pointerEvents: "all",
            }}
          />
        </div>
      );
    }
  }

  return DraggableResizable;
};

const Drugs = (props) => <div className="wrapper">{props.children}</div>;

export default withDraggableResizable(Drugs);
