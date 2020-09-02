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
  { title: "Steering Box", name: "steeringBox" },
  { title: "Steering Rack/Box", name: "steeringRack" },
  { title: "Ball Joint", name: "ballJoint" },
  { title: "Power Steering", name: "powerSteering" },
  { title: "Bump Stops", name: "bumpStops" },
  { title: "Dampers/Bushes", name: "dampers" },
  { title: "Springs/Shock Absorbers", name: "springAbsorbers" },
  { title: "Suspension Arms/Mounthings", name: "suspecsionArms" },
  { title: "Pipes/Hoses", name: "pipes" },
  { title: "Wheels Hubs/Bearings", name: "wheelsHubs" },
  { title: "Tie Bars/Anti-roll Bars", name: "tieBars" },
  { title: "Sub Frames/Mounthings", name: "subFrames" },
  { title: "Front Differential", name: "frontDifferential" },
  { title: "Galters/Boots", name: "galters" },
  { title: "Front Axle", name: "frontAxle" },
  { title: "Z-Links", name: "zLinks" },
]

class Step8 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      frontSuspension: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let frontSuspension = new Object();
    if (currentData.frontSuspension != null)
      frontSuspension = currentData.frontSuspension;
    else {
      infos.map((info) => {
        frontSuspension[info.name] = options[0];
      });
    }

    this.setState({ frontSuspension: frontSuspension });
  }

  handleChangeOption = (name, value) => {
    let {frontSuspension} = this.state;
    frontSuspension[name] = value;
    this.setState({frontSuspension});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.frontSuspension, fieldName: "front_suspension"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        frontSuspension: this.state.frontSuspension
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { isLoading, frontSuspension } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>FRONT SUSPENSION / STEERING</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                Object.keys(frontSuspension).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={frontSuspension[info.name]}
                        title={info.title}
                        name={info.name}
                        options={options}
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
export default Step8

