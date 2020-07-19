import React from "react"
import { Link } from "react-router-dom"
import "./Footer.scss"

import imgBannerVisual from "../../assets/banner-visual.png"

function Footer(props) {
  const showBanner = props.showBanner

  return (
    <footer className={showBanner ? "footer--product-banner" : ""}>
      <svg viewBox="0 100 1440 200">
        <path fill="var(--bodyBackgroundColor)" d="M0 192l120-5.3c120-5.7 360-15.7 600-16 240 .3 480 10.3 600 16l120 5.3V0H0z"></path>
      </svg>

      {showBanner && (
        <Link to="/app" className="product-banner">
          <div className="product-banner__content">
            <div className="product-banner__headline">Excited to try SETT out?</div>
            <div className="product-banner__subline">Create your FREE bannerset right now! →</div>
          </div>
          <div className="product-banner__media">
            <img className="product-banner__image" alt="" src={imgBannerVisual} />
          </div>
        </Link>
      )}

      <section className="footer-links">
        <div className="footer-links__company">
          <p>
            <b>SETT</b>
            <br />© 2020
          </p>
        </div>
        <div className="footer-links__about">
          <div>
            <Link to="/tos">Terms of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
        <div className="footer-links__logo">
          <span>Built by me, </span>
          <a href="https://twitter.com/toktoktwan" target="_blank" rel="noreferrer noopener">
            Twan
          </a>
        </div>
      </section>
    </footer>
  )
}

export default Footer
