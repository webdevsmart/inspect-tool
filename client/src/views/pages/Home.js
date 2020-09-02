import React from "react"
import { Link } from "react-router-dom";
import { Card, CardBody, Row, Col, Button } from "reactstrap"
import queryString from "query-string"
import { Award } from "react-feather"

import InspectionList from "./InspectionList"

import decorLeft from "../../assets/img/elements/decore-left.png"
import decorRight from "../../assets/img/elements/decore-right.png"

import "../../assets/scss/pages/dashboard-analytics.scss"

class Home extends React.Component{
  render(){
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
              <Link to="/new">
                <Button.Ripple
                  block
                  className="btn-block bg-gradient-info"
                  color="none"
                >
                  CREATE NEW INSEPCTION
                </Button.Ripple>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
      <Row>
        <Col sm="12">
          <InspectionList thumbView={true} parsedFilter={queryString.parse(this.props.location.search)}/>
        </Col>
      </Row>
    </>
    )
  }
}

export default Home