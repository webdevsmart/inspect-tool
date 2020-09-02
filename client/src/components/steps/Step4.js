import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import axios from "axios";
import SelectWidget from "./SelectWidget";

const options = ["Not Available", "Broken", "Pass", "Good", "New"];

const infos = [
  { title: "Coolant level", name: "coolantLevel" },
  { title: "Power Steering Fluid", name: "powerSteering" },
  { title: "Hoses/Pipes", name: "hoses" },
  { title: "Brake Fluid", name: "brakeFluid" },
  { title: "Drive Belts", name: "driveBelts" },
  { title: "Engine Shield Cover", name: "engineShield" },
  { title: "Engine Oil", name: "engineOil" },
  { title: "Engine Noise Level", name: "engineNoiseLevel" },
  { title: "Engine Oil Leaks", name: "engineOilLeaks" },
  { title: "AC Compressor", name: "acCompressor" },
  { title: "Engine Mounthings", name: "engineMounthings" },
  { title: "AC Condensor", name: "acCondensor" },
  { title: "Throttle Linkage", name: "throttleLinkage" },
  { title: "Fuse Box", name: "fuseBox" },
  { title: "Bonnet Hinge + Catch", name: "bonnetHinge" },
  { title: "Belts [Fan]", name: "beltsFan" },
  { title: "Coolant Leak", name: "coolantLeak" },
  { title: "Betls [AC]", name: "beltsAC" },
  { title: "Radiator/Cap", name: "radiator" },
  { title: "Water Pump", name: "waterPump" },
  { title: "Alernator", name: "alternator" },
  { title: "AC Fan Motor", name: "acFanMotor" },
];

class Step4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      engineCompartment: new Object(),
    };

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let engineCompartment = new Object();
    if (currentData.engineCompartment != null)
      engineCompartment = currentData.engineCompartment;
    else {
      infos.map((info) => {
        engineCompartment[info.name] = options[0];
      });
    }

    this.setState({ engineCompartment: engineCompartment });
  }

  handleChangeOption = (name, value) => {
    let { engineCompartment } = this.state;
    engineCompartment[name] = value;
    this.setState({ engineCompartment });
  };

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {
      _id: currentData._id,
      ...this.state.engineCompartment,
      fieldName: "engine_compartment",
    };
    axios
      .post("/api/inspection/save-by-name", values)
      .then((res) => {
        this.setState({ isLoading: false });
        let newData = {
          ...currentData,
          _id: res.data._id,
          engineCompartment: this.state.engineCompartment,
        };
        this.props.setCurrentData(newData);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    let { isLoading, engineCompartment } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>ENGINE COMPARTMENT</CardTitle>
          </CardHeader>
          <CardBody style={{ paddingBottom: "200px" }}>
            <Row className="mb-3">
              { Object.keys(engineCompartment).length != 0 && infos.map((info, index) => {
                return (
                  <Col lg="6" key={index}>
                    <SelectWidget
                      handleChange={this.handleChangeOption}
                      currentValue={engineCompartment[info.name]}
                      title={info.title}
                      name={info.name}
                      options={options}
                    />
                  </Col>
                );
              }) }
            </Row>

            <Button.Ripple color="primary" onClick={this.handleSubmit}>
              {isLoading && (
                <>
                  <Spinner color="white" size="sm" type="grow" />
                  <span className="ml-50">Please wait ...</span>
                </>
              )}
              {!isLoading && <>Submit</>}
            </Button.Ripple>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default Step4;
