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
  { title: "Engine Performance", name: "enginePerformance" },
  { title: "Suspension Noise", name: "suspensionNoise" },
  { title: "Excess Smoke", name: "excessSomke" },
  { title: "Engine Noise", name: "engineNoise" },
  { title: "Overheating Evidence", name: "overheatingEvidence" },
  { title: "AC Operation", name: "acOperation" },
  { title: "Auto Gearbox Changes", name: "autoGearboxChanges" },
  { title: "Steering Alignment", name: "steeringAlignment" },
  { title: "Clutch Operation", name: "clutchOperation" },
  { title: "Brake Operation", name: "brakeOperation" },
  { title: "Instruments/Controls", name: "instruments" },
  { title: "Road Holding Stability", name: "roadHoldingStability" },
  { title: "Cruise Control", name: "cruiseControl" },
  { title: "Hot Starting", name: "hotStarting" },
  { title: "Steering Effort/Handling", name: "steeringEffort" },
]

class Step15 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      roadTest: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let roadTest = new Object();
    if (currentData.roadTest != null)
      roadTest = currentData.roadTest;
    else {
      infos.map((info) => {
        roadTest[info.name] = options[0];
      });
    }

    this.setState({ roadTest: roadTest });
  }

  handleChangeOption = (name, value) => {
    let {roadTest} = this.state;
    roadTest[name] = value;
    this.setState({roadTest});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.roadTest, fieldName: "road_test"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        roadTest: this.state.roadTest
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { isLoading, roadTest } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>ROAD TEST & FINAL CHECKS</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                Object.keys(roadTest).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={roadTest[info.name]}
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
export default Step15

