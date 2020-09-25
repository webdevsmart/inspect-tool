import React from "react"
import ScrollToTop from "react-scroll-up"
import { Button } from "reactstrap"
import { Heart, ArrowUp } from "react-feather"
import classnames from "classnames"

import footerLogo from "../../../assets/img/logo/footer_logo.png";

const Footer = props => {
  let footerTypeArr = ["sticky", "static", "hidden"]
  return (
    <footer
      className={classnames("footer footer-light", {
        "footer-static": props.footerType === "static" || !footerTypeArr.includes(props.footerType),
        "d-none": props.footerType === "hidden"
      })}
    >
      <p className="mb-0 clearfix">
        <span className="float-md-left d-block d-md-inline-block mt-25">
          <img src={footerLogo} alt="Footer Logo" width="150" className="mr-2"></img>
          © 2016 - 2020 - Tous droits réservés
          <span className="ml-2 text-warning">Numéro 1 des petites annonces automobiles en Afrique</span>
        </span>
        <span className="float-md-right d-none d-md-block">
          <span className="align-middle">Cet outil est proposé et développé par Africargroup</span>{" "}
        </span>
      </p>
      {props.hideScrollToTop === false ? (
        <ScrollToTop showUnder={160}>
          <Button color="primary" className="btn-icon scroll-top">
            <ArrowUp size={15} />
          </Button>
        </ScrollToTop>
      ) : null}
    </footer>
  )
}

export default Footer
