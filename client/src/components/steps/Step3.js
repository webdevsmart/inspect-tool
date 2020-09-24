import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";

const generateRandomId = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
}
const formSchema = Yup.object().shape({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  inspectorName: Yup.string().required("Required"),
  phoneNumber: Yup.number().required("Required"),
  reference: Yup.string().required("Required"),
});

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      initialValues: null,
      isLoading: false,
      civility: "Mr",
      location: "Yammoussoukro",
    }
  }

  componentDidMount() {
    let currentData = this.props.currentData;
    let initialValues = new Object();
    if (currentData.ownerDetails != null) {
      initialValues = currentData.ownerDetails;
    }
    else {
      initialValues = {
        firstname: "",
        lastname: "",
        inspectorName: "",
        email: "",
        phoneNumber: "",
        reference: generateRandomId(),
      }
    }
    this.setState({ initialValues });
  }

  handleSubmit(values) {
    let currentData = this.props.currentData;
    let ownerDetails = {
      ...values, location: this.state.location, civility: this.state.civility
    }
    values = {...ownerDetails, _id: this.props.currentData._id, fieldName: "owner_details"};
    axios.post("/api/inspection/save-by-name", values)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        ...currentData,
        _id: res.data._id,
        ownerDetails: {
          ...ownerDetails
        }
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
    });
  }
  render() {
    let { isLoading, initialValues } = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle>Step3: Car Owner Details:</CardTitle>
        </CardHeader>
        <CardBody>
          {
            initialValues && (
              <Formik
                initialValues={initialValues}
                validationSchema={formSchema}
                onSubmit={this.handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <FormGroup>
                      <Label for="civility">Civility</Label>
                      <Input name="civility" type="select" name="select" id="civilitySelect" onChange={(e) => this.setState({civility: e.target.value})}>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Miss">Miss</option>
                      </Input>
                    </FormGroup>
                    <FormGroup className="my-3">
                      <Label for="firstname">First Name</Label>
                      <Field
                        name="firstname"
                        id="firstname"
                        className={`form-control ${
                          errors.firstname && touched.firstname && "is-invalid"
                        }`}
                      />
                      {errors.firstname && touched.firstname ? (
                        <div className="invalid-tooltip mt-25">
                          {errors.firstname}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="my-3">
                      <Label for="lastname">Last Name</Label>
                      <Field
                        name="lastname"
                        id="lastname"
                        className={`form-control ${
                          errors.lastname && touched.lastname && "is-invalid"
                        }`}
                      />
                      {errors.lastname && touched.lastname ? (
                        <div className="invalid-tooltip mt-25">
                          {errors.lastname}
                        </div>
                      ) : null}
                    </FormGroup>
    
                    <FormGroup className="my-3">
                      <Label for="lastname">Phone Number</Label>
                      <Field
                        name="phoneNumber"
                        id="phoneNumber"
                        className={`form-control ${
                          errors.phoneNumber && touched.phoneNumber && "is-invalid"
                        }`}
                      />
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <div className="invalid-tooltip mt-25">{errors.phoneNumber}</div>
                      ) : null}
                    </FormGroup>
                    
                    <FormGroup className="my-3">
                      <Label for="email">Email</Label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={`form-control ${
                          errors.email && touched.email && "is-invalid"
                        }`}
                      />
                      {errors.email && touched.email ? (
                        <div className="invalid-tooltip mt-25">{errors.email}</div>
                      ) : null}
                    </FormGroup>
                    
                    <FormGroup className="my-3">
                      <Label for="lastname">Inspector Name</Label>
                      <Field
                        name="inspectorName"
                        id="inspectorName"
                        className={`form-control ${
                          errors.inspectorName && touched.inspectorName && "is-invalid"
                        }`}
                      />
                      {errors.inspectorName && touched.inspectorName ? (
                        <div className="invalid-tooltip mt-25">
                          {errors.inspectorName}
                        </div>
                      ) : null}
                    </FormGroup>
    
                    <FormGroup className="my-3">
                      <Label for="location">Location</Label>
                      <Input type="select" name="select" id="locationSelect" onChange={(e) => this.setState({location: e.target.value})}>
                        <option value="Yammoussoukro">Yammoussoukro</option>
                        <option value="Abidjan">Abidjan</option>
                        <option value="Bouake">Bouake</option>
                      </Input>
                    </FormGroup>
    
                    <FormGroup className="my-3">
                      <Label for="lastname">Reference</Label>
                      <Field
                        name="reference"
                        id="reference"
                        className={`form-control`}
                        readOnly
                      />
                    </FormGroup>
                    <FormGroup className="text-sm-left text-center">
                      <Button.Ripple color="warning" onClick={this.handleSubmit}>
                        {isLoading && (
                          <>
                            <Spinner color="white" size="sm" type="grow" />
                            <span className="ml-50">Please wait ...</span>
                          </>
                        )}
                        {!isLoading && <>Submit</>}
                      </Button.Ripple>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            )
          }
        </CardBody>
      </Card>
    );
  }
}
export default Step3;
