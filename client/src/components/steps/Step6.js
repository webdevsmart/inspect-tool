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
    let currentData = this.props.currentData;
    let brakeSystem = new Object();
    if (currentData.brakeSystem != null)
      brakeSystem = currentData.brakeSystem;
    else {
      infos.map((info) => {
        brakeSystem[info.name] = "Nothing";
      });
    }

    this.setState({ brakeSystem: brakeSystem });
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
    let { isLoading, brakeSystem } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>BRAKE SYSTEM</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
            {
                Object.keys(brakeSystem).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={brakeSystem[info.name]}
                        title={info.title}
                        name={info.name}
                      />
                    </Col>
                  );
                })
              }
            </Row>
            
            <Row>
              <Col lg="12" className="text-sm-left text-center">
                <Button.Ripple color="warning" onClick={this.handleSubmit}>
                  {isLoading && (
                    <>
                      <Spinner color="white" size="sm" type="grow" />
                      <span className="ml-50">Please wait ...</span>
                    </>
                  )}
                  {!isLoading && <>Envoyer</>}
                </Button.Ripple>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default Step6
