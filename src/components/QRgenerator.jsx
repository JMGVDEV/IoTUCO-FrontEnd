import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import QRCode from 'qrcode.react';

export default class QRgen extends Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title centered="true">
              Escaneé su Código con su aplicacion de autenticación preferida
            </Modal.Title>
          </Modal.Header>
          <div className="text-center">
            <Modal.Body>
              <QRCode
                value={this.props.TwoFactorUrl}
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
