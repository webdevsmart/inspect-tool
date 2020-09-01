import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Spinner,
  Row,
  Col,
} from "reactstrap";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import "../../assets/scss/plugins/extensions/dropzone.scss";
import uplaodIcon from "../../assets/img/upload-icon.png";

const types = [
  { name: "Front of car", value: "front" },
  { name: "Front left of car", value: "front_left" },
  { name: "Left side of car", value: "left_side" },
  { name: "Rear left of car", value: "rear_left" },
  { name: "Rear of car (boot closed)", value: "rear_boot_closed" },
  { name: "Rear of car (boot open)", value: "rear_boot_open" },
  { name: "Rear right of car", value: "rear_right" },
  { name: "Right side of car", value: "right_side" },
  { name: "Front right of car", value: "front_right" },
];

function Dropzone(props) {
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      props.pushPhotos(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
  });

  return (
    <section className="mt-1">
      <div
        {...getRootProps({
          className: "dropzone cursor-pointer flex-column p-2 mb-1",
        })}
      >
        <input {...getInputProps()} />
        <p>
          <img src={uplaodIcon} width="50" height="50" alt="upload-icon"/>
        </p>
        <p>Please upload a photo for:</p>
        <span className="mb-1 font-large-1 text-dark text-bold-600">
          {props.photoType}
        </span>
        <Button.Ripple color="dark" disabled={props.disabled} onClick={open}>
          take or choose photo
        </Button.Ripple>
      </div>
    </section>
  );
}

class Step1 extends React.Component {
  state = {
    photos: [],
    currentStep: 0,
    isLoading: false,
  };

  pushPhotos = (file) => {
    let { photos, currentStep } = this.state;
    photos.push(file);
    currentStep = currentStep + 1;
    this.setState({ photos, currentStep });
  };

  skipStep = () => {
    let { photos, currentStep } = this.state;
    if (currentStep >= 8)
      return;
    currentStep++;
    photos.push("empty");
    this.setState({ currentStep, photos });
  };

  submitPhotos = (e) => {
    this.setState({isLoading: true});
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    let formData = new FormData();
    this.state.photos.map((photo, index) => {
      if (photo !== "empty")
        formData.append(types[index].value, photo);
    })
    axios.post("/api/inspection/upload-photos", formData, config)
    .then((res) => {
      this.setState({isLoading: false});
      let newData = {
        photos: res.data.photos,
        vehicleDetails: res.data.vehicle_details,
        _id: res.data._id,
      }
      this.props.setCurrentData(newData);
    })
    .catch((error) => {
      this.setState({isLoading: false});
      console.log(error)
    });
  }

  render() {
    let { photos, currentStep, isLoading } = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle>STEP 1: VEHICLE PHOTOS</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4" xs="12" sm="12" className="text-center">
              <Dropzone
                pushPhotos={this.pushPhotos}
                photoType={photos.length < 9 ? types[currentStep].name : ""}
                disabled={photos.length >= 9 ? true : false}
              />
              {photos.length < 9 && (
                <u
                  className="w-100 text-center cursor-pointer mt-2"
                  onClick={this.skipStep}
                >
                  Or skip this step
                </u>
              )}
              <div className="w-100 text-center mt-2">
                <Button.Ripple
                  className="bg-gradient-success w-100"
                  color="none"
                  onClick={this.submitPhotos}
                >
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
              </div>
            </Col>
            <Col md="8" sm="12" xs="12">
              <aside className="thumb-container">
                {photos.map((file, index) => {
                  if (file !== "empty") {
                    return (
                      <div className="dz-thumb" key={index}>
                        <div className="dz-thumb-inner">
                          <img
                            src={file.preview}
                            className="dz-img"
                            alt={file.name}
                          />
                        </div>
                        <div className="divider divider-default">
                          <div className="divider-text text-bold-600">
                            {types[index].name}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </aside>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default Step1;
