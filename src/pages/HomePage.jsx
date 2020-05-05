import React from 'react';
import NavBarDark from '../components/NavBarDark';
import { Row, Col, Form } from 'react-bootstrap';
import Filters from '../components/Filters';
import Graphs from '../components/Graphs';
import '../styles/home.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      growbed_id: null,
      interval: 3,
    };
  }

  handleIntervalChange = (e) => {
    this.setState({ interval: e.target.value });
  };

  setGrowBedId = (id) => {
    this.setState({ growbed_id: id });
  };

  render() {
    return (
      <div className="body">
        <NavBarDark />

        <Row className="content">
          <Col className="col-md-4 w-100 shadow-lg filters">
            <Filters
              handleGrowBedChange={this.handleGrowBedChange}
              setGrowBedId={this.setGrowBedId}
            />
            <Form.Group>
              <Form.Label>Refrescar cada (segundos)</Form.Label>
              <Form.Control
                defaultValue="3"
                type="number"
                max="30"
                min="1"
                onChange={this.handleIntervalChange}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-8">
            <Graphs
              interval={this.state.interval}
              growbed_id={this.state.growbed_id}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default HomePage;

/**
 


 */
