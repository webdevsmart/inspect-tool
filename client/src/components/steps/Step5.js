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
  { title: "Cassings", name: "cassings" },
  { title: "Mounthings", name: "mounthings" },
  { title: "Cables/Adjustments", name: "cables" },
  { title: "Universal/Sliding Joints", name: "universal" },
  { title: "Linkage", name: "linkage" },
  { title: "Gatlers/Boots", name: "gatlers" },
  { title: "Drive Shaft Assembles", name: "driveShaft" },
  { title: "Supports/Bearings", name: "supports" },
  { title: "Electrical Sensors", name: "electricalSensors" },
  { title: "Gear Lever", name: "gearLever" },
  { title: "Fluid/Oil Leaks", name: "fluidLeaks" },
  { title: "Clutch/pressure plate", name: "clutchPlate" },
]

class Step5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      transmission: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let transmission = new Object();
    if (currentData.transmission != null)
      transmission = currentData.transmission;
    else {
      infos.map((info) => {
        transmission[info.name] = "Nothing";
      });
    }

    this.setState({ transmission: transmission });
  }

  handleChangeOption = (name, value) => {
    let {transmission} = this.state;
    transmission[name] = value;
    this.setState({transmission});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.transmission, fieldName: "transmission"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        transmission: this.state.transmission
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { isLoading, transmission } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>TRANSMISSION</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="justify-content-md-center mb-3">
              {
                Object.keys(transmission).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={transmission[info.name]}
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
export default Step5
