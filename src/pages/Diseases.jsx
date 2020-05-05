import React from 'react';
import NavBarDark from '../components/NavBarDark';
import { Row, Col } from 'react-bootstrap';
import Filters from '../components/Filters';

export default class Diseases extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
        <NavBarDark />

        <Row className="content">
          <Col className="col-md-4 w-100 shadow-lg pt-3 mt-4 text-center justify-content-center"></Col>
          <Col className="col-md-8">AQUI VA LA PARTE DE LAS ENFERMEDADES</Col>
        </Row>
      </div>
    );
  }
}
