import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { getDiseases, saveInspection } from '../Utils/Api';

export default class DiseaseForm extends Component {
  constructor(props) {
    super(props);
    this.checkedDiseases = [];
    this.Observations = '';
    this.state = {
      diseases: [],
    };
  }

  componentWillMount = async () => {
    try {
      let diseases = await getDiseases();
      let checked = {};

      diseases.forEach((disease) => {
        checked[disease.name] = false;
      });

      this.setState({ diseases, ...checked });
    } catch (error) {
      console.log(error);
    }
  };

  // React Checkboxes onChange Methods
  onChangeDisease = (e) => {
    let name = e.target.name;
    let checked = e.target.checked;

    if (checked) {
      this.checkedDiseases.push(name);
    } else {
      this.checkedDiseases.pop(name);
    }

    console.log(this.checkedDiseases);
    this.setState({ [name]: checked });
  };

  onChangeObservation = (e) => {
    this.Observations = e.target.value;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    try {
      this.props.setLoading(true);
      await saveInspection({
        zone: 1,
        greenhouse: this.props.greenHouseId,
        growbed: this.props.growBedId,
        pests: this.checkedDiseases,
        observation: this.Observations,
      });
      this.props.showNotification('success', 'Ok', 'Estado de la cama enviado');
      this.props.setLoading(false);
    } catch (error) {
      this.props.showNotification(
        'error',
        'Error',
        'Algo salió mal al enviar el estado de la cama',
      );
      this.props.setLoading(false);
    }
    this.setState({ editing: false });
  };

  render() {
    return (
      <React.Fragment>
        <h5>Seleccione Enfermedades:</h5>
        <Form onSubmit={this.onSubmit}>
          <Row className="mb-4">
            {this.state.diseases.map((disease, idx) => (
              <Col className="col-lg-2" key={idx}>
                <Form.Check
                  type="checkbox"
                  checked={this.state[disease.name]}
                  onChange={this.onChangeDisease}
                  label={disease.name}
                  name={disease.name}
                />
              </Col>
            ))}
          </Row>

          <Form.Group controlId="Observaciones">
            <Form.Label>
              <h5>Observaciones:</h5>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              onChange={this.onChangeObservation}
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              value="Submit"
              variant="btn btn-outline-primary"
              className="btn-block w-50 ">
              SAVE
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}
