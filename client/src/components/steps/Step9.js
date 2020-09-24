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
  { title: "Rear Right Shock Absorbers", name: "rearRightShockAbsorbers" },
  { title: "Rear Left Shock Absorbers", name: "rearLeftShockAbsorbers" },
  { title: "Rear Right Bushes", name: "rearRightBushes" },
  { title: "Rear Left Bushes", name: "rearLeftBushes" },
]

class Step9 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      rearSuspension: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let rearSuspension = new Object();
    if (currentData.rearSuspension != null)
      rearSuspension = currentData.rearSuspension;
    else {
      infos.map((info) => {
        rearSuspension[info.name] = "Nothing";
      });
    }

    this.setState({ rearSuspension: rearSuspension });
  }

  handleChangeOption = (name, value) => {
    let {rearSuspension} = this.state;
    rearSuspension[name] = value;
    this.setState({rearSuspension});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.rearSuspension, fieldName: "rear_suspension"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        rearSuspension: this.state.rearSuspension
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { isLoading, rearSuspension } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>REAR SUSPENSION</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                Object.keys(rearSuspension).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={rearSuspension[info.name]}
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
export default Step9

