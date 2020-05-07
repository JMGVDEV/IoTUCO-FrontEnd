import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class DisComp extends Component {
  constructor(props) {
    super(props);
    this.checkedDiseases = [];
    this.state = {
      diseases: ["Cenicillas", "Manchas", "Roya", "Pudriciones"],
    };
  }

  // React Checkboxes onChange Methods
  onChangeDisease = (e) => {
    console.log(e.target.checked);
    console.log(e.target.value);
    if (e.target.checked) {
      this.checkedDiseases.push(e.target.value);
    } else {
      this.checkedDiseases.pop(e.target.value);
    }
  };

  onChangeObservation = (e) => {
    this.Obs = [];
    this.Obs.push(e.target.value);
  };

  // Submit
  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.checkedDiseases, this.Obs);
  };

  render() {
    return (
      <div className="Diseases">
        <h5>Seleccione la(s) enfermedad(es):</h5>
        <Form onSubmit={this.onSubmit}>
          <div style={{ padding: 30 }}>
            <div className="form-check">
              {this.state.diseases.map((disease) => (
                <Form.Group controlId="formBasicCheckbox" key={disease}>
                  <Form.Check
                    type="checkbox"
                    value={disease}
                    label={disease}
                    onChange={this.onChangeDisease}
                  />
                </Form.Group>
              ))}
            </div>
          </div>

          <Form.Group controlId="Observaciones">
            <Form.Label>
              <h5>Ingrese observaciones:</h5>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="8"
              onChange={this.onChangeObservation}
            />
          </Form.Group>

          <div className="text-center">
            <div className="form-group">
              <button className="btn btn-secondary">Guardar</button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}
