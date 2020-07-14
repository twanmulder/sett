import React from "react"
import "./Footer.scss"

import imgBannerVisual from "../../assets/banner-visual.png"

function Footer() {
  return (
    <footer>
      <svg viewBox="0 100 1440 200">
        <path fill="var(--bodyBackgroundColor)" d="M0 192l120-5.3c120-5.7 360-15.7 600-16 240 .3 480 10.3 600 16l120 5.3V0H0z"></path>
      </svg>

      <a className="product-banner" href="/demo/">
        <div className="product-banner__content">
          <div className="product-banner__headline">Excited to try SETT out?</div>
          <div clasName="product-banner__subline">Create your FREE bannerset right now! →</div>
        </div>
        <div className="product-banner__media">
          <img className="product-banner__image" alt="" src={imgBannerVisual} />
        </div>
      </a>

      <section className="footer-links">
        <div className="footer-links__company">
          <p>
            <b>SETT</b>
            <br />© 2020
          </p>
        </div>
        <div className="footer-links__about">
          <div>
            <a href="/tos">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
        <div className="footer-links__logo">
          <span>Built by me, </span>
          <a href="https://twitter.com/toktoktwan">Twan</a>
        </div>
      </section>
    </footer>
  )
}

export default Footer
