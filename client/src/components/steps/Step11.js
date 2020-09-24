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
  { title: "Steering Wheel", name: "steeringWheel" },
  { title: "Interior Sills/Door Shuts", name: "interiorSills" },
  { title: "Seat Mechanism", name: "seatMechanism" },
  { title: "Seat Belts", name: "seatBelts" },
  { title: "Carpets", name: "carpets" },
  { title: "Trim Panels", name: "trimPanels" },
  { title: "Door Fittings/Operation", name: "doorFittings" },
  { title: "Door Seats/Hinges", name: "doorSeats" },
  { title: "Headlining", name: "headlining" },
  { title: "Internal Mirros", name: "internalMirrors" },
  { title: "Visor", name: "visor" },
  { title: "Rear Parcel Shelf", name: "rearParcelShelf" },
  { title: "Dashboard Condition", name: "dashboardCondition" },
  { title: "Seat Leather/Fabric", name: "seatLeather" },
  { title: "Boot/Trunk Area", name: "bootArea" },
  { title: "Tools/Safety Kit", name: "toolsKit" },
  { title: "Centre Console Box", name: "centreConsoleBox" },
  { title: "Arm rest", name: "armRest" },
  { title: "Warning Triangle", name: "warningTriangle" },
  { title: "Door Stoppers", name: "doorStopeers" },
  { title: "Window Blinds", name: "windowBlinds" },
  { title: "Steering Wheel Switches", name: "steeringWheelSwitches" },
  { title: "Tyre Infaltor", name: "tyrenInfaltor" },

]

class Step11 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bodyInterior: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let bodyInterior = new Object();
    if (currentData.bodyInterior != null)
      bodyInterior = currentData.bodyInterior;
    else {
      infos.map((info) => {
        bodyInterior[info.name] = "Nothing";
      });
    }

    this.setState({ bodyInterior: bodyInterior });
  }

  handleChangeOption = (name, value) => {
    let {bodyInterior} = this.state;
    bodyInterior[name] = value;
    this.setState({bodyInterior});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.bodyInterior, fieldName: "body_interior"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        bodyInterior: this.state.bodyInterior
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { isLoading, bodyInterior } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>BODY INTERIOR</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                Object.keys(bodyInterior).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={bodyInterior[info.name]}
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
                  {!isLoading && <>Submit</>}
                </Button.Ripple>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default Step11

