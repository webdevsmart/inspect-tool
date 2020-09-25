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
  UncontrolledTooltip,
} from "reactstrap";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import * as Icon from "react-feather";

import "../../assets/scss/plugins/extensions/dropzone.scss";
import uplaodIcon from "../../assets/img/upload-icon.png";
import emptyImage from "../../assets/img/empty.jpg";

const types = [
  { name: "Devant de la voiture", value: "front" },
  { name: "Avant gauche de la voiture", value: "front_left" },
  { name: "Côté gauche de la voiture", value: "left_side" },
  { name: "Arrière gauche de la voiture", value: "rear_left" },
  { name: "Arrière de la voiture (coffre fermé)", value: "rear_boot_closed" },
  { name: "Arrière de la voiture (coffre ouvert)", value: "rear_boot_open" },
  { name: "Arrière droit de la voiture", value: "rear_right" },
  { name: "Côté droit de la voiture", value: "right_side" },
  { name: "Avant droit de la voiture", value: "front_right" },
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
          <img src={uplaodIcon} width="50" height="50" alt="upload-icon" />
        </p>
        <p>Veuillez ajouter une photo pour :</p>
        <span className="mb-1 font-large-1 text-dark text-bold-600">
          {props.photoType}
        </span>
        <Button.Ripple color="dark" disabled={props.disabled} onClick={open}>
          Prendre ou choisir une photo
        </Button.Ripple>
      </div>
    </section>
  );
}

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isIntialized: false,
      photos: null,
      currentStep: 0,
      isLoading: false,
      currentKey: null,
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  async componentDidMount() {
    let initialPhotos = {};
    let { photos, _id } = this.props.currentData;
    types.map((type) => {
      initialPhotos[type.value] = null;
    });
    if (photos !== null && _id !== null) {
      await Promise.all(
        Object.keys(photos).map(async function (key, index) {
          let blob = await fetch(`/uploads/${photos[key]}`).then((r) =>
            r.blob()
          );
          let newFile = new File([blob], photos[key]);
          initialPhotos[key] = Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          });
        })
      );
    }
    this.setState({ photos: initialPhotos }, () => {
      this.setState({ isIntialized: true });
    });
  }

  pushPhotos = (name, file) => {
    let { photos, currentStep } = this.state;
    photos[name] = file;
    currentStep = currentStep + 1;
    this.setState({ photos, currentStep });
  };

  skipStep = (name) => {
    let { photos, currentStep } = this.state;
    if (currentStep >= 9) return;
    currentStep++;
    this.setState({ currentStep, photos });
  };

  submitPhotos = (e) => {
    this.setState({ isLoading: true });
    let { photos } = this.state;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    let formData = new FormData();
    Object.keys(photos).map(function (key, index) {
      if (photos[key] !== null) formData.append(key, photos[key]);
    });
    const apiUrl = `/api/inspection/upload-photos?_id=${this.props.currentData._id}`;
    axios
      .post(
        apiUrl,
        formData,
        config
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ isLoading: false });
        let newData = {
          photos: res.data.photos,
          vehicleDetails: res.data.vehicle_details,
          _id: res.data._id,
        };
        this.props.setCurrentData(newData);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  handleRemove = (e, key) => {
    let { photos } = this.state;
    photos[key] = null;
    this.setState({ photos });
  };

  handleUploadAgain = (e, key) => {
    this.setState({ currentKey: key }, () => {
      this.upload.click();
    });
  };

  uploadFile = (e) => {
    let file = e.target.files[0];
    let { photos, currentKey } = this.state;
    if (!currentKey) return;
    photos[currentKey] = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    this.upload.value = null;
    this.setState({ photos, currentKey: null });
  };

  render() {
    let { photos, currentStep, isLoading, isIntialized } = this.state;
    const handleRemove = this.handleRemove;
    const handleUploadAgain = this.handleUploadAgain;
    return (
      <Card>
        <CardHeader>
          <CardTitle>STEP 1: VEHICLE PHOTOS</CardTitle>
        </CardHeader>
        <CardBody>
          {photos && isIntialized && (
            <Row>
              <Col md="4" xs="12" sm="12" className="text-center">
                <Dropzone
                  pushPhotos={(file) =>
                    this.pushPhotos(types[currentStep].value, file)
                  }
                  photoType={currentStep < 9 ? types[currentStep].name : ""}
                  disabled={currentStep >= 9 ? true : false}
                />
                {currentStep < 9 && (
                  <u
                    className="w-100 text-center cursor-pointer mt-2"
                    onClick={(e) => this.skipStep(types[currentStep].value)}
                  >
                    Sauter cette étape
                  </u>
                )}
                <div className="w-100 text-center mt-2">
                  <Button.Ripple
                    className="text-white w-100"
                    color="warning"
                    onClick={this.submitPhotos}
                  >
                    {isLoading && (
                      <>
                        <Spinner color="white" size="sm" type="grow" />
                        <span className="ml-50">Please wait ...</span>
                      </>
                    )}
                    {!isLoading && <>Envoyer</>}
                  </Button.Ripple>
                </div>
              </Col>
              <Col md="8" sm="12" xs="12">
                <aside className="thumb-container">
                  <input
                    id="customUpload"
                    type="file"
                    ref={(ref) => (this.upload = ref)}
                    style={{ display: "none" }}
                    onChange={this.uploadFile}
                  />
                  {Object.keys(photos).map(function (key, index) {
                    return (
                      <div className="dz-thumb" key={index}>
                        <div className="dz-thumb-inner">
                          {photos[key] === null ? (
                            <img
                              src={emptyImage}
                              className="dz-img"
                              alt="Empty"
                            />
                          ) : (
                            <img
                              src={photos[key].preview}
                              className="dz-img"
                              alt={photos[key].name}
                            />
                          )}
                          <div className="photo-hover-actions d-flex justify-content-center align-items-center">
                            <a
                              href="#!"
                              className="button"
                              onClick={(e) => handleUploadAgain(e, key)}
                            >
                              <Icon.Plus
                                color="white"
                                size={24}
                                className="fonticon-wrap"
                                id={`upload-${index}`}
                              />
                              <UncontrolledTooltip
                                placement="top"
                                target={`upload-${index}`}
                              >
                                Upload
                              </UncontrolledTooltip>
                            </a>
                            {photos[key] !== null && (
                              <a
                                href="#!"
                                className="button ml-2"
                                onClick={(e) => handleRemove(e, key)}
                              >
                                <Icon.Minus
                                  color="white"
                                  size={24}
                                  className="fonticon-wrap"
                                  id={`remove-${index}`}
                                />
                                <UncontrolledTooltip
                                  placement="top"
                                  target={`remove-${index}`}
                                >
                                  Remove
                                </UncontrolledTooltip>
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="divider divider-default">
                          <div className="divider-text text-bold-600">
                            {types[index].name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </aside>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default Step1;
