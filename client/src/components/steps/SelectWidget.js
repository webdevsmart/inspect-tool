import React from "react";
import {
  Label,
} from "reactstrap";
import Checkbox from "../@vuexy/checkbox/CheckboxesVuexy"
import { Check, X } from "react-feather"

class SelectWidget extends React.Component {
  state = {
    currentOption: null,
  };

  componentDidMount() {
    let currentOption = this.props.currentValue;
    this.setState({currentOption});
  }

  handleClick(e, value) {
    let option = "Nothing";
    if (e.target.checked === true)
      option = value;
    else
      option = "Nothing";
    this.setState({currentOption: option});
    this.props.handleChange(this.props.name, option);
  }

  render() {
    let { currentOption } = this.state;

    return (
      <React.Fragment>
        <div className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
          <Label className="font-medium-2 text-bold-600">
            {this.props.title}
          </Label>
          <div className="d-flex">
            <Checkbox
              color="danger"
              icon={<X className="vx-icon" size={32} />}
              checked={currentOption === "No" ? true : false}
              onChange={(e) => this.handleClick(e, "No")}
              size="xl"
            />
            <Checkbox
              color="success"
              icon={<Check className="vx-icon" size={32} />}
              checked={currentOption === "Yes" ? true : false}
              onChange={(e) => this.handleClick(e, "Yes")}
              size="xl"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default SelectWidget;
