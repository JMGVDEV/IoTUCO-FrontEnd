import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

export default class ShowD extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diseases: ['Roya', 'Manchas'],
      Observation: 'tiene mucha enfermedad, fumigar',
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="text-center">
          <ListGroup>
            <ListGroup.Item variant="danger">
              Enfermedades de la Planta:
            </ListGroup.Item>
            {this.state.diseases.map((disease, id) => (
              <ListGroup.Item key={id}>{disease}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <Col className="col-md-8">
          <div className="text-center">
            <ListGroup>
              <ListGroup.Item variant="info">Observaciones:</ListGroup.Item>
              <ListGroup.Item>{this.state.Observation}</ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </React.Fragment>
    );
  }
}
