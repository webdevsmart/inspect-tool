import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  Row,
  FormGroup,
  Label,
} from "reactstrap";

class Step2 extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Step2: VEHICLE DETAILS:</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label className="text-success font-medium-2 text-bold-600 mr-2">
                  Make:{" "}
                </Label>
                <span className="text-one">
                  {this.props.currentData.vehicleDetails &&
                    this.props.currentData.vehicleDetails.make}
                </span>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="text-success font-medium-2 text-bold-600 mr-2">
                  Colour:{" "}
                </Label>
                <span className="text-one">
                  {this.props.currentData.vehicleDetails &&
                    this.props.currentData.vehicleDetails.colour}
                </span>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label className="text-success font-medium-2 text-bold-600 mr-2">
                  Model:{" "}
                </Label>
                <span className="text-one">
                  {this.props.currentData.vehicleDetails &&
                    this.props.currentData.vehicleDetails.model}
                </span>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="text-success font-medium-2 text-bold-600 mr-2">
                  Plate:{" "}
                </Label>
                <span className="text-one">
                  {this.props.currentData.vehicleDetails &&
                    this.props.currentData.vehicleDetails.plateNumber}
                </span>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label className="text-success font-medium-2 text-bold-600 mr-2">
                  Generation:{" "}
                </Label>
                <span className="text-one">
                  {this.props.currentData.vehicleDetails &&
                    this.props.currentData.vehicleDetails.generation}
                </span>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="text-success font-medium-2 text-bold-600 mr-2">
                  Country:{" "}
                </Label>
                <span className="text-one">
                  {this.props.currentData.vehicleDetails &&
                    this.props.currentData.vehicleDetails.countries}
                </span>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label className="text-success font-medium-2 text-bold-600 mr-2">
                  Year:{" "}
                </Label>
                <span className="text-one">
                  {this.props.currentData.vehicleDetails &&
                    this.props.currentData.vehicleDetails.year}
                </span>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="text-success font-medium-2 text-bold-600 mr-2">
                  Provience:{" "}
                </Label>
                <span className="text-one">
                  {this.props.currentData.vehicleDetails &&
                    this.props.currentData.vehicleDetails.provience}
                </span>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}
export default Step2;
