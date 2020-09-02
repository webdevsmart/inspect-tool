import React from "react"
import Wizard from "./WizardComponent"
import { AvInput, AvGroup, AvFeedback, AvField } from "availity-reactstrap-validation"
import {
  Label,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Col,
  Row,
} from "reactstrap"
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import axios from "axios"

class Step14 extends React.Component {
  
  state = {
    frontRight: {
      date: new Date(),
    },
    frontLeft: {
      date: new Date(),
    },
    rearLeft: {
      date: new Date(),
    },
    rearRight: {
      date: new Date(),
    },
    spare: {
      date: new Date(),
    },
  };

  componentDidMount() {
    let currentData = this.props.currentData;
    if (currentData.tyres !== null) {
      this.setState({
        frontRight: currentData.tyres.frontRight,
        frontLeft: currentData.tyres.frontLeft,
        rearLeft: currentData.tyres.rearLeft,
        rearRight: currentData.tyres.rearRight,
        spare: currentData.tyres.spare,
      })
    }
  }

  handleChangeFrontRight = (e) => {
    let {frontRight} = this.state;
    frontRight[e.target.name] = e.target.value;
    this.setState({frontRight}, () => {
    });
  }

  handleChangeFrontLeft = (e) => {
    let {frontLeft} = this.state;
    frontLeft[e.target.name] = e.target.value;
    this.setState({frontLeft}, () => {
    });
  }
  
  handleChangeRearRight = (e) => {
    let {rearRight} = this.state;
    rearRight[e.target.name] = e.target.value;
    this.setState({rearRight}, () => {
    });
  }
  
  handleChangeRearLeft = (e) => {
    let {rearLeft} = this.state;
    rearLeft[e.target.name] = e.target.value;
    this.setState({rearLeft}, () => {
    });
  }
  
  handleChangeSpare = (e) => {
    let {spare} = this.state;
    spare[e.target.name] = e.target.value;
    this.setState({spare}, () => {
    });
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let newValue = {
      frontRight: {
        ...this.state.frontRight
      },
      frontLeft: {
        ...this.state.frontLeft
      },
      rearLeft: {
        ...this.state.rearLeft
      },
      rearRight: {
        ...this.state.rearRight
      },
      spare: {
        ...this.state.spare
      },
    }
    let values = {_id: currentData._id, ...newValue, fieldName: "tyres"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      // this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        tyres: newValue
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      // this.setState({isLoading: false});
    });
  }

  render() {
    const steps = [
      {
        title: 1,
        content: <Row>
          <Col md="12" sm="12">
            <div className="divider"><div className="divider-text">Front Right</div></div>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Manufacturer </Label>
              <AvInput name="manufacturer" type="text" required value={this.state.frontRight.manufacturer} onChange={(e) => this.handleChangeFrontRight(e)}/>
              <AvFeedback>Please enter valid Manufacturer</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Size </Label>
              <AvInput name="size" type="text" required value={this.state.frontRight.size} onChange={(e) => this.handleChangeFrontRight(e)} />
              <AvFeedback>Please enter valid Size</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Date </Label>
              <Flatpickr
                className="form-control"
                value={this.state.frontRight.date}
                onChange={date => {
                  let {frontRight} = this.state
                  frontRight.date = date
                  this.setState({frontRight})
                }}
              />
              <AvFeedback>Please enter valid Date</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Tread(mm) </Label>
              <AvInput name="tread" type="text" required value={this.state.frontRight.tread} onChange={(e) => this.handleChangeFrontRight(e)} />
              <AvFeedback>Please enter valid Tread</AvFeedback>
            </AvGroup>
          </Col>
        </Row>
      }, {
        title: 2,
        content: <Row>
          <Col md="12" sm="12">
            <div className="divider"><div className="divider-text">Front Left</div></div>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Manufacturer </Label>
              <AvInput name="manufacturer" type="text" required value={this.state.frontLeft.manufacturer} onChange={(e) => this.handleChangeFrontLeft(e)}/>
              <AvFeedback>Please enter valid Manufacturer</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Size </Label>
              <AvInput name="size" type="text" required value={this.state.frontLeft.size} onChange={(e) => this.handleChangeFrontLeft(e)} />
              <AvFeedback>Please enter valid Size</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Date </Label>
              <Flatpickr
                className="form-control"
                value={this.state.frontLeft.date}
                onChange={date => {
                  let {frontLeft} = this.state
                  frontLeft.date = date
                  this.setState({frontLeft})
                }}
              />
              <AvFeedback>Please enter valid Date</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Tread(mm) </Label>
              <AvInput name="tread" type="text" required value={this.state.frontLeft.tread} onChange={(e) => this.handleChangeFrontLeft(e)} />
              <AvFeedback>Please enter valid Tread</AvFeedback>
            </AvGroup>
          </Col>
        </Row>
      }, {
        title: 3,
        content: <Row>
          <Col md="12" sm="12">
            <div className="divider"><div className="divider-text">Rear Right</div></div>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Manufacturer </Label>
              <AvInput name="manufacturer" type="text" required value={this.state.rearRight.manufacturer} onChange={(e) => this.handleChangeRearRight(e)}/>
              <AvFeedback>Please enter valid Manufacturer</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Size </Label>
              <AvInput name="size" type="text" required value={this.state.rearRight.size} onChange={(e) => this.handleChangeRearRight(e)} />
              <AvFeedback>Please enter valid Size</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Date </Label>
              <Flatpickr
                className="form-control"
                value={this.state.rearRight.date}
                onChange={date => {
                  let {rearRight} = this.state
                  rearRight.date = date
                  this.setState({rearRight})
                }}
              />
              <AvFeedback>Please enter valid Date</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Tread(mm) </Label>
              <AvInput name="tread" type="text" required value={this.state.rearRight.tread} onChange={(e) => this.handleChangeRearRight(e)} />
              <AvFeedback>Please enter valid Tread</AvFeedback>
            </AvGroup>
          </Col>
        </Row>
      }, {
        title: 4,
        content: <Row>
          <Col md="12" sm="12">
            <div className="divider"><div className="divider-text">Rear Left</div></div>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Manufacturer </Label>
              <AvInput name="manufacturer" type="text" required value={this.state.rearLeft.manufacturer} onChange={(e) => this.handleChangeRearLeft(e)}/>
              <AvFeedback>Please enter valid Manufacturer</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Size </Label>
              <AvInput name="size" type="text" required value={this.state.rearLeft.size} onChange={(e) => this.handleChangeRearLeft(e)} />
              <AvFeedback>Please enter valid Size</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Date </Label>
              <Flatpickr
                className="form-control"
                value={this.state.rearLeft.date}
                onChange={date => {
                  let {rearLeft} = this.state
                  rearLeft.date = date
                  this.setState({rearLeft})
                }}
              />
              <AvFeedback>Please enter valid Date</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Tread(mm) </Label>
              <AvInput name="tread" type="text" required value={this.state.rearLeft.tread} onChange={(e) => this.handleChangeRearLeft(e)} />
              <AvFeedback>Please enter valid Tread</AvFeedback>
            </AvGroup>
          </Col>
        </Row>
      }, {
        title: 5,
        content: <Row>
          <Col md="12" sm="12">
            <div className="divider"><div className="divider-text">Spare</div></div>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Manufacturer </Label>
              <AvInput name="manufacturer" type="text" required value={this.state.spare.manufacturer} onChange={(e) => this.handleChangeSpare(e)}/>
              <AvFeedback>Please enter valid Manufacturer</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Size </Label>
              <AvInput name="size" type="text" required value={this.state.spare.size} onChange={(e) => this.handleChangeSpare(e)} />
              <AvFeedback>Please enter valid Size</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Date </Label>
              <Flatpickr
                className="form-control"
                value={this.state.spare.date}
                onChange={date => {
                  let {spare} = this.state
                  spare.date = date
                  this.setState({spare})
                }}
              />
              <AvFeedback>Please enter valid Date</AvFeedback>
            </AvGroup>
          </Col>
          <Col md="6" sm="12">
            <AvGroup>
              <Label> Tread(mm) </Label>
              <AvInput name="tread" type="text" required value={this.state.spare.tread} onChange={(e) => this.handleChangeSpare(e)} />
              <AvFeedback>Please enter valid Tread</AvFeedback>
            </AvGroup>
          </Col>
        </Row>
      }
    ]
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>TYRES</CardTitle>
          </CardHeader>
          <CardBody>
            <Wizard
              validate
              onFinish={this.handleSubmit}
              steps={steps}
            />
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default Step14

