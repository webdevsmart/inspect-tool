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
  { title: "Paintwork", name: "paintWork" },
  { title: "Mud Flaps", name: "mudFlaps" },
  { title: "Exterior Trim", name: "exteriorTrim" },
  { title: "Lights Glass/Plastic", name: "lightsGlass" },
  { title: "Bumpers", name: "bumpers" },
  { title: "Grille", name: "grille" },
  { title: "Number Plates/Badges", name: "numberPlates" },
  { title: "Seals", name: "seals" },
  { title: "Windscreen/Glass", name: "windscreen" },
  { title: "Fuel Filler Cover", name: "fueFillerCover" },
  { title: "Keys/Door Locks", name: "keyLocks" },
  { title: "Wheel Caps/Alloys", name: "wheelCaps" },
]

class Step12 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bodyExterior: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let bodyExterior = new Object();
    if (currentData.bodyExterior != null)
      bodyExterior = currentData.bodyExterior;
    else {
      infos.map((info) => {
        bodyExterior[info.name] = "Nothing";
      });
    }

    this.setState({ bodyExterior: bodyExterior });
  }

  handleChangeOption = (name, value) => {
    let {bodyExterior} = this.state;
    bodyExterior[name] = value;
    this.setState({bodyExterior});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.bodyExterior, fieldName: "body_exterior"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        bodyExterior: this.state.bodyExterior
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { isLoading, bodyExterior } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>BODY EXTERIOR</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                Object.keys(bodyExterior).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={bodyExterior[info.name]}
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
export default Step12

