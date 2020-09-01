import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Spinner
} from "reactstrap"
import axios from "axios";
import SelectWidget from "./SelectWidget";

const options = [
  "Not Available",
  "Broken",
  "Pass",
  "Good",
  "New"
]

const infos = [
  { title: "ABS Engagements", name: "abcEngagement" },
  { title: "Rear Right Disc Pads", name: "rearRightDiscPads" },
  { title: "Parking Brake", name: "parkingBrake" },
  { title: "Rear Left Disc Pads", name: "rearLeftDiscPads" },
  { title: "Brake Oil", name: "brakeOil" },
  { title: "Fluid Leaks", name: "fluidLeaks" },
  { title: "Front Right Disc Pads", name: "frontRightDiscPads" },
  { title: "Hand Brake Operation", name: "handBrakeOperation" },
  { title: "Front Left Disc Pads", name: "frontLeftDiscPads" },
  { title: "Front Discs", name: "frontDiscs" },
  { title: "Back Discs", name: "backDiscs" },
]

class Step6 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      brakeSystem: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let {brakeSystem} = this.state;
    infos.map((info) => {
      brakeSystem[info.name] = options[0]
    });
    this.setState({brakeSystem: brakeSystem});
  }

  handleChangeOption = (name, value) => {
    let {brakeSystem} = this.state;
    brakeSystem[name] = value;
    this.setState({brakeSystem});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.brakeSystem, fieldName: "brake_system"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        brakeSystem: this.state.brakeSystem
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let {isLoading} = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>BRAKE SYSTEM</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget handleChange={this.handleChangeOption} title={info.title} name={info.name} options={options}/>
                    </Col>
                  )
                })
              }
            </Row>
            
            <Button.Ripple color="primary" onClick={this.handleSubmit}>
              {
                isLoading && (
                  <>
                    <Spinner color="white" size="sm" type="grow" />
                    <span className="ml-50">Please wait ...</span>
                  </>
                )
              }
              {
                !isLoading && (
                  <>
                    Submit
                  </>
                )
              }
            </Button.Ripple>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default Step6