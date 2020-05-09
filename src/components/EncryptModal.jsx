import React, { Component } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

export default class EMod extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.code = '';
    this.state = {
      show: true,
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow() {
    this.setState({ show: true });
  }

  onChangeCode = (e) => {
    this.code = e.target.value;
    console.log(e.target.value);
  };

  handleSubmit = (e) => {
    
  };

  render() {
    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Control Seguro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Ingrese código de 6 dígitos"
                onChange={this.onChangeCode}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              value="Submit"
              variant="btn btn-outline-primary"
              className="btn-block w-50 "
              onClick={this.handleClose}
              onSubmit={this.handleSubmit}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
