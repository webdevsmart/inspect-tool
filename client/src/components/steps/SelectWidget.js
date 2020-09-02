import React from "react";
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Label,
} from "reactstrap";
import { ChevronDown } from "react-feather";

class SelectWidget extends React.Component {
  state = {
    currentOption: null,
  };

  componentDidMount() {
    let currentOption = this.props.currentValue;
    this.setState({currentOption});
  }

  handleClick(value) {
    this.props.handleChange(this.props.name, value);
    this.setState({ currentOption: value });
  }

  render() {
    let { currentOption } = this.state;

    return (
      <React.Fragment>
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <Label className="font-medium-2 text-bold-600">
            {this.props.title}
          </Label>
          <div className="dropdown d-inline-block">
            <UncontrolledButtonDropdown>
              <DropdownToggle color="flat-info" caret>
                {currentOption}
                <ChevronDown size={15} />
              </DropdownToggle>
              {
                this.props.options && (
                  <DropdownMenu>
                    {this.props.options &&
                      this.props.options.map((option, index) => {
                        return (
                          <DropdownItem
                            onClick={(e) => this.handleClick(option)}
                            key={index}
                            tag="a"
                          >
                            {option}
                          </DropdownItem>
                        );
                      })}
                  </DropdownMenu>
                )
              }
            </UncontrolledButtonDropdown>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default SelectWidget;
