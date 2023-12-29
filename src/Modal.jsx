import React from "react";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="modal-shadow" centered>
        <div className="modal">
          <div className="modal-header">{this.props.header}</div>
          <div className="modal-body">{this.props.children}</div>
          <div className="modal-footer">{this.props.footer}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
