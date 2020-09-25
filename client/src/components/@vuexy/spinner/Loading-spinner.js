import React from "react"
import "../../../assets/scss/components/app-loader.scss"
import spinnerGIF from "../../../assets/img/spinner.gif"
class ComponentSpinner extends React.Component {
  render() {
    return (
      <div className="fallback-spinner">
        <img className="fallback-logo" src={spinnerGIF} alt="logo" />
        {/* <div className="loading component-loader">
          <div className="effect-1 effects"></div>
          <div className="effect-2 effects"></div>
          <div className="effect-3 effects"></div>
        </div> */}
      </div>
    )
  }
}

export default ComponentSpinner
