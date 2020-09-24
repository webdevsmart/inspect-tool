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
  { title: "Starting System/Ignition Lock", name: "startingSystem" },
  { title: "Climate Control", name: "climateControl" },
  { title: "Car Battery", name: "carBattery" },
  { title: "Side Lights", name: "sideLights" },
  { title: "Key Remote Battery", name: "keyRemoteBattery" },
  { title: "Brake Lights", name: "brakeLights" },
  { title: "Headlights", name: "headlights" },
  { title: "Reverse Lights", name: "reverseLights" },
  { title: "Rear Lights", name: "rearLights" },
  { title: "Interior Lighting", name: "interiorLighting" },
  { title: "Indicators/Hazard Lights", name: "indicatorLights" },
  { title: "Switches/Controls", name: "switches" },
  { title: "Fog Lights", name: "fogLights" },
  { title: "Horn Operational", name: "hornOperational" },
  { title: "Panel Lights", name: "panelLights" },
  { title: "Cigarette Lighter", name: "cigaretteLighter" },
  { title: "Mirrors", name: "mirrors" },
  { title: "Sunroof Operation", name: "sunroofOperation" },
  { title: "Instruments/Functions", name: "instruments" },
  { title: "Headlamp Wipers/Washers", name: "headlamp" },
  { title: "Entertainment System", name: "entertainmentSystem" },
  { title: "Door Locking", name: "doorLocking" },
  { title: "Fan Control", name: "fanControl" },
  { title: "SRS Airbags", name: "srsAirbags" },
  { title: "Window Operation", name: "windowOperation" },
  { title: "Air Con/Climate Control", name: "airConControl" },
  { title: "Wipers/Washers", name: "wipers" },
  { title: "Parking Sensors/System", name: "parkingSystem" },
  { title: "Radio/LCD Display", name: "radioDisplay" },
  { title: "Cameras", name: "cameras" },

]

class Step7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      electricalControls: {},
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let electricalControls = {};
    if (currentData.electricalControls != null)
      electricalControls = currentData.electricalControls;
    else {
      infos.map((info) => {
        electricalControls[info.name] = "Nothing";
      });
    }

    this.setState({ electricalControls: electricalControls });
  }

  handleChangeOption = (name, value) => {
    let {electricalControls} = this.state;
    electricalControls[name] = value;
    this.setState({electricalControls});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.electricalControls, fieldName: "electrical_controls"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      console.log(res.data);
      let newData = {
        ...currentData,
        _id: res.data._id,
        electricalControls: this.state.electricalControls
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { isLoading, electricalControls } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>ELECTRICAL CONTROLS</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                Object.keys(electricalControls).length !== 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={electricalControls[info.name]}
                        title={info.title}
                        name={info.name}
                      />
                    </Col>
                  );
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
export default Step7

