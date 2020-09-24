import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";
import { Download, Edit, Trash } from 'react-feather';
import moment from "moment";
import isoCountries from "../../constants/isoCountries";

import "../../assets/scss/components/thumbview.scss"
import emptyImage from "../../assets/img/empty.jpg";

class ThumbView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getCountries(countries) {
    let isoCodes = [];
    try {
      isoCodes = countries.split(",").map((cn) => {
        return isoCountries[cn];
      });
    } catch {
      isoCodes = [];
    }
    return isoCodes.toString();
  }

  render() {
    const { item } = this.props;
    // console.log(item);
    return (
        <div className="thumb-item">
          <div className="d-flex align-items-center justify-content-center justify-content-md-between flex-wrap">
            <div className="item-left flex-wrap mb-2 mb-md-0 d-flex align-items-center justify-content-center">
              {
                item.photos ? (
                  <img className="car-photo mb-2 mb-sm-0" src={`uploads/${item.photos[Object.keys(item.photos)[0]]}`} />
                ) : (
                  <img className="car-photo mb-2 mb-sm-0" src={emptyImage} />
                )
              }
              <div className="item-details ml-0 ml-sm-2 d-flex flex-column">
                {
                  item.vehicle_details && (
                    <>
                      <h4 className="text-warning">{item.vehicle_details.make} {item.vehicle_details.model} {item.vehicle_details.year}</h4>
                      <span>{item.vehicle_details.plateNumber}</span>
                      <span>{this.getCountries(item.vehicle_details.countries)}</span>
                    </>
                  )
                }
                
                <span>{moment(item.date).format("DD/MM/YYYY - hh.mm A")}</span>
              </div>
            </div>
            <div className="item-actions">
              <Link to={`/edit/${item._id}`}>
                <Button.Ripple
                  className="btn-icon rounded-circle"
                  color="info"
                  size="lg"
                >
                  <Edit size={48} />
                </Button.Ripple>
              </Link>
              <Button.Ripple
                className="btn-icon rounded-circle"
                color="success"
                size="lg"
              >
                <Download size={48} />
              </Button.Ripple>
              <Button.Ripple
                className="btn-icon rounded-circle"
                color="danger"
                size="lg"
              >
                <Trash size={48} />
              </Button.Ripple>
            </div>
          </div>
        </div>
    );
  }
}

export default ThumbView;
