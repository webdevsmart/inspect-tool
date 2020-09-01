import React from "react"
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import { Award } from "react-feather"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import classnames from "classnames"
import Step1 from "../../components/steps/Step1";
import Step2 from "../../components/steps/Step2";
import Step3 from "../../components/steps/Step3";
import Step4 from "../../components/steps/Step4";
import Step5 from "../../components/steps/Step5";
import Step6 from "../../components/steps/Step6";
import Step7 from "../../components/steps/Step7";
import Step8 from "../../components/steps/Step8";
import Step9 from "../../components/steps/Step9";
import Step10 from "../../components/steps/Step10";
import Step11 from "../../components/steps/Step11";
import Step12 from "../../components/steps/Step12";
import Step13 from "../../components/steps/Step13";
import Step14 from "../../components/steps/Step14";
import Step15 from "../../components/steps/Step15";


import decorLeft from "../../assets/img/elements/decore-left.png"
import decorRight from "../../assets/img/elements/decore-right.png"

import "../../assets/scss/pages/dashboard-analytics.scss"

const navs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
class NewInspection extends React.Component {
  state = {
    activeStep: 0,
    currentData: {
      _id: null,
      photos: [],
      vehicleDetails: null,
      ownerDetails: null,
      engineCompartment: null,
      brakeSystem: null,
      electricalControls: null,
      frontSuspension: null,
      rearSuspension: null,
      exhaustSystem: null,
      bodyInterior: null,
      bodyExterior: null,
      underbody: null,
      roadTest: null,
      tyres: null,
    },
  }

  toggle = tab => {
    if (this.state.activeStep !== tab) {
      this.setState({ activeStep: tab })
    }
  }

  setCurrentData = (data) => {
    let { currentData } = this.state;
    currentData = { ...currentData, ...data };
    this.setState({currentData}, () => {
      toast.success(JSON.stringify("Success!", null, 2))
    });
  }

  render() {
    let { currentData } = this.state;
    return (
      <>
        <Card className="bg-analytics text-white sales-card">
          <CardBody className="text-center">
            <img src={decorLeft} alt="card-img-left" className="img-left" />
            <img src={decorRight} alt="card-img-right" className="img-right" />
            <div className="avatar avatar-xl bg-primary shadow avatar-dashboard mt-0">
              <div className="avatar-content">
                <Award className="text-white" size={28} />
              </div>
            </div>
            <div className="award-info text-center">
              <h1 className="mb-2 text-white">Congratulations John,</h1>
              <div className="m-auto mb-0 w-50">
                <Link to="/">
                  <Button.Ripple
                    block
                    className="btn-block bg-gradient-info"
                    color="none"
                  >
                    GO TO HOME
                  </Button.Ripple>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Inspection</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="">
              <Nav tabs className="nav-left">
                {
                  navs && navs.map((item, index) => {
                    return (
                      <NavItem key={index}>
                        <NavLink
                          className={classnames({
                            active: this.state.activeStep === index
                          })}
                          onClick={() => {
                            this.toggle(index)
                          }}
                        >
                          Step {index + 1}
                        </NavLink>
                      </NavItem>
                    )
                  })
                }
              </Nav>
              <TabContent activeTab={this.state.activeStep} className="mt-1">
                {
                  navs && navs.map((item, index) => {
                    return (
                      <TabPane tabId={index} key={index}>
                        {
                          index === 0 && ( <Step1 setCurrentData={this.setCurrentData} /> )
                        }
                        {
                          index == 1 && ( <Step2 currentData={currentData} /> )
                        }
                        {
                          index == 2 && ( <Step3 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 3 && ( <Step4 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        
                        {
                          index == 4 && ( <Step5 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 5 && ( <Step6 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 6 && ( <Step7 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 7 && ( <Step8 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 8 && ( <Step9 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 9 && ( <Step10 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 10 && ( <Step11 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 11 && ( <Step12 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 12 && ( <Step13 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 13 && ( <Step14 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                        {
                          index == 14 && ( <Step15 setCurrentData={this.setCurrentData} currentData={currentData} /> )
                        }
                      </TabPane>
                    )
                  })
                }
              </TabContent>
            </div>
          <ToastContainer />
          </CardBody>
        </Card>
      </>
    )
  }
}
export default NewInspection