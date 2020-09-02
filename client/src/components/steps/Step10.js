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
  { title: "Manifold", name: "maniFold" },
  { title: "Pipes", name: "pipes" },
  { title: "Silencer/Catalyst", name: "silencer" },
  { title: "Heat Shields/Mounthings", name: "heatShields" },
  { title: "Evidence of Leaks", name: "evidenceLeaks" },
  { title: "Electrical Sensor", name: "electricalSensor" },
]

class Step10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      exhaustSystem: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let exhaustSystem = new Object();
    if (currentData.exhaustSystem != null)
      exhaustSystem = currentData.exhaustSystem;
    else {
      infos.map((info) => {
        exhaustSystem[info.name] = options[0];
      });
    }

    this.setState({ exhaustSystem: exhaustSystem });
  }

  handleChangeOption = (name, value) => {
    let {exhaustSystem} = this.state;
    exhaustSystem[name] = value;
    this.setState({exhaustSystem});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.exhaustSystem, fieldName: "exhaust_system"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        exhaustSystem: this.state.exhaustSystem
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { exhaustSystem, isLoading } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>EXHAUST SYSTEM</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                Object.keys(exhaustSystem).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={exhaustSystem[info.name]}
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
export default Step10

