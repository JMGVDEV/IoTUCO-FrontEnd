import React from 'react';
import NavBarDark from '../components/NavBarDark';
import { Row, Col } from 'react-bootstrap';
import Filters from '../components/Filters';
import DisComp from '../components/DiseaseForm';

export default class Diseases extends React.Component {
  constructor(props) {
    super(props);
    this.checkedDiseases = [];
    // Checkbox Initial State
    this.state = {
      growBedId: null,
      greenHouseId: null,
    };
  }

  handleFiltersChange = (filters) => {
    this.setState({
      growBedId: filters.growBedId,
      greenHouseId: filters.greenHouseId,
    });
  };

  render() {
    return (
      <div className="body">
        <NavBarDark />

        <Row className="content">
          <Col className="col-md-4 w-100 shadow-lg pt-3 mt-4 text-center justify-content-center">
            <Filters handleFiltersChange={this.handleFiltersChange} />
          </Col>
          <Col className="col-md-8 px-5">
            <div>
              <div className="pt-3 text-center">
                <h2> Cama #{this.state.growBedId}</h2>
              </div>
            </div>
            <DisComp />
          </Col>
        </Row>
      </div>
    );
  }
}
