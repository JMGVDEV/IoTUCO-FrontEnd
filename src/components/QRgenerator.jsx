import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import QRCode from 'qrcode.react';

export default class QRgen extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title centered="true">Your QR code is:</Modal.Title>
          </Modal.Header>
          <div className="text-center">
            <Modal.Body>
              <QRCode
                value={this.props.IDcode}
                size="400"
                includeMargin="true"
              />
            </Modal.Body>
          </div>
        </Modal>
      </>
    );
  }
}
