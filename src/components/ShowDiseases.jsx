import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { getInspection } from '../Utils/Api';

export default class ShowDiseases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diseases: null,
      observation: null,
      lastGrowBed: null,
    };
  }

  refreshDiseases = async () => {
    if (this.props.growBedId === this.state.lastGrowBed) {
      return;
    }

    try {
      let json = await getInspection(this.props.growBedId);

      if (!json.ok) {
        return;
      }

      let diseases = json.inspection.pests;
      let observation = json.inspection.observation;

      console.log(observation);

      if (diseases.length !== 0) {
        this.setState({ diseases });
      } else {
        this.setState({ diseases: null });
      }

      if (observation !== '') {
        this.setState({ observation });
      } else {
        this.setState({ observation: null });
      }
    } catch (error) {
      console.log(error);
    }

    this.setState({ lastGrowBed: this.props.growBedId });
  };

  componentDidUpdate() {
    this.refreshDiseases();
  }

  render() {
    return (
      <React.Fragment>
        {this.state.diseases && (
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
        )}
        <Col className="col-md-8">
          {this.state.observation && (
            <div className="text-center">
              <ListGroup>
                <ListGroup.Item variant="info">Observaciones:</ListGroup.Item>
                <ListGroup.Item>{this.state.observation}</ListGroup.Item>
              </ListGroup>
            </div>
          )}
        </Col>
      </React.Fragment>
    );
  }
}
