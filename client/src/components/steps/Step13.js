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
  { title: "Chassis", name: "chassis" },
  { title: "Strut Towers", name: "strutTowers" },
  { title: "Shields/Covers", name: "shields" },
  { title: "Corrosion Floor", name: "corrosionFloor" },
  { title: "Reinforcement Frame", name: "reinforcementFrame" },
  { title: "Floor Pan", name: "floorPan" },
]

class Step13 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      underbody: new Object(),
    }

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let underbody = new Object();
    if (currentData.underbody != null)
      underbody = currentData.underbody;
    else {
      infos.map((info) => {
        underbody[info.name] = "Nothing";
      });
    }

    this.setState({ underbody: underbody });
  }

  handleChangeOption = (name, value) => {
    let {underbody} = this.state;
    underbody[name] = value;
    this.setState({underbody});
  }

  handleSubmit = () => {
    let currentData = this.props.currentData;
    let values = {_id: currentData._id, ...this.state.underbody, fieldName: "underbody"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        underbody: this.state.underbody
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }

  render() {
    let { isLoading, underbody } = this.state;
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle>UNDERBODY</CardTitle>
          </CardHeader>
          <CardBody style={{paddingBottom: '200px'}}>
            <Row className="mb-3">
              {
                Object.keys(underbody).length != 0 && infos.map((info, index) => {
                  return (
                    <Col lg="6" key={index}>
                      <SelectWidget
                        handleChange={this.handleChangeOption}
                        currentValue={underbody[info.name]}
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
export default Step13

