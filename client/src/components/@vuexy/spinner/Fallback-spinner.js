import React from "react"
import spinnerGIF from "../../../assets/img/spinner.gif"
import "../../../assets/scss/components/app-loader.scss"
class SpinnerComponent extends React.Component {
  render() {
    return (
      <div className="vh-100">
        <img className="fallback-logo" src={spinnerGIF} alt="logo" />
        {/* <div className="loading">
          <div className="effect-1 effects"></div>
          <div className="effect-2 effects"></div>
          <div className="effect-3 effects"></div>
        </div> */}
      </div>
    )
  }
}

export default SpinnerComponent
