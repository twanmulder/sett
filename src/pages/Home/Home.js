import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import netlifyIdentity from "netlify-identity-widget"
import "./Home.scss"

import HeroVisual from "../../components/HeroVisual/HeroVisual"
import Footer from "../../components/Footer/Footer"

import imgCodeScreenshot from "../../assets/code-screenshot.png"
import about1 from "../../assets/about-1.png"
import about2 from "../../assets/about-2.png"
import about3 from "../../assets/about-3.png"
import imgTest1 from "../../assets/testimonial-image-01.png"
import imgTest2 from "../../assets/testimonial-image-02.png"
import imgTest3 from "../../assets/testimonial-image-03.png"

function Home(props) {
  const user = props.user
  const goToDemoHref = user.isPro && user.isLoggedIn ? "/app" : "/demo"

  const login = () => netlifyIdentity.open("login")

  return (
    <Fragment>
      <main>
        <HeroVisual />

        <section className="section--hero">
          <article>
            <h1>
              Create a banner template,
              <br />
              <em>
                <span>absurdly</span> <span>fast</span>
              </em>
            </h1>
            <p className="hero-copy">No code, no struggle, no worries. SETT let's you create a banner template in just seconds!</p>
            <Link to={goToDemoHref} className="button">
              Try for free
            </Link>
            <p className="hero-disclaimer">No account required</p>
          </article>
        </section>

        <div className="product-wrapper">
          <section className="section--product">
            <img alt="" src={imgCodeScreenshot} />
          </section>
        </div>

        <div className="wrapper-about">
          <section className="section--about">
            <article className="text-right">
              <div className="about-image">
                <img alt="" src={about1} />
              </div>
              <div className="about-text">
                <h2>Save Time & Money</h2>
                <p>Setting up the development of a bannerset is just too boring and error-prone. SETT will save you time and money so you can focus on doing the work you love.</p>
                <div className="about-usp">
                  <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                      <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <p>Set-up no longer takes minutes, but just a few seconds</p>
                </div>
                <div className="about-usp">
                  <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                      <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <p>Template ready for Ad Platforms like Google Studio or DoubleCick</p>
                </div>
              </div>
            </article>
            <article className="text-left">
              <div className="about-text">
                <h2>Use Custom Formats</h2>
                <p>Working with a lot of different ad formats can be such a pain to get started working on. SETT offers the ability to create a template for all standard + custom formats you want to create.</p>
                <div className="about-usp">
                  <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                      <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <p>Implement formats used all over the industry</p>
                </div>
                <div className="about-usp">
                  <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                      <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <p>Add custom formats based on your needs</p>
                </div>
              </div>
              <div className="about-image">
                <img alt="" src={about2} />
              </div>
            </article>
            <article className="text-right">
              <div className="about-image">
                <img alt="" src={about3} />
              </div>
              <div className="about-text">
                <h2>Automatically import the Latest Frameworks</h2>
                <p>Working with frameworks you import using a CDN? Maybe you're using GreenSock? Anime.js? Three.js? SETT will automatically get the latest version and add it to your banners.</p>
                <div className="about-usp">
                  <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                      <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <p>Support for the latest version of GSAP, Anime.js, and Three.js</p>
                </div>
                <div className="about-usp">
                  <div className="svg-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                      <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <p>New frameworks added monthly</p>
                </div>
              </div>
            </article>
          </section>
        </div>

        <section className="section__testimonials">
          <h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 13H14C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13H8C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13Z" fill="currentColor" />
              <path d="M10 10C10 10.5523 9.55228 11 9 11C8.44772 11 8 10.5523 8 10C8 9.44771 8.44772 9 9 9C9.55228 9 10 9.44771 10 10Z" fill="currentColor" />
              <path d="M15 11C15.5523 11 16 10.5523 16 10C16 9.44771 15.5523 9 15 9C14.4477 9 14 9.44771 14 10C14 10.5523 14.4477 11 15 11Z" fill="currentColor" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z"
                fill="currentColor"
              />
            </svg>
            Testimonials - read what others say about us
          </h2>
          <div className="testimonials-tile__wrapper">
            <div className="testimonials-tile__content-wrapper">
              <div className="testimonials-tile">
                <div className="testimonial-tile-header">
                  <div className="ij">
                    <img src={imgTest1} alt="Testimonial 01" width="56" height="56" />
                  </div>
                </div>
                <div className="testimonial-tile-content">
                  <p>
                    <span className="testimonial-tile-dash">—</span> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu
                    fugiat.
                  </p>
                </div>
                <div className="testimonial-tile-footer">
                  <span className="testimonial-tile-name">Tijs Ots </span>
                  <span className="testimonial-tile-dash">- </span>
                  <span className="testimonial-tile-link">
                    <a href="https://trgr.nl" target="_blank" rel="noreferrer noopener">
                      TRGR
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="testimonials-tile__content-wrapper">
              <div className="testimonials-tile">
                <div className="testimonial-tile-header">
                  <div className="ij">
                    <img src={imgTest2} alt="Testimonial 02" width="56" height="56" />
                  </div>
                </div>
                <div className="testimonial-tile-content">
                  <p>
                    <span className="testimonial-tile-dash">—</span> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu
                    fugiat.
                  </p>
                </div>
                <div className="testimonial-tile-footer">
                  <span className="testimonial-tile-name">Tijs Ots </span>
                  <span className="testimonial-tile-dash">- </span>
                  <span className="testimonial-tile-link">
                    <a href="https://trgr.nl" target="_blank" rel="noreferrer noopener">
                      TRGR
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="testimonials-tile__content-wrapper">
              <div className="testimonials-tile">
                <div className="testimonial-tile-header">
                  <div className="ij">
                    <img src={imgTest3} alt="Testimonial 03" width="56" height="56" />
                  </div>
                </div>
                <div className="testimonial-tile-content">
                  <p>
                    <span className="testimonial-tile-dash">—</span> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum cillum dolore eu
                    fugiat.
                  </p>
                </div>
                <div className="testimonial-tile-footer">
                  <span className="testimonial-tile-name">Tijs Ots </span>
                  <span className="testimonial-tile-dash">- </span>
                  <span className="testimonial-tile-link">
                    <a href="https://trgr.nl" target="_blank" rel="noreferrer noopener">
                      TRGR
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section--pricing">
          <h2>Pricing - find a plan that suits you</h2>
          <article className="plans-parent">
            <div className="plan-wrapper plan-wrapper--free">
              <div>
                <p className="plan-name">Free</p>
                <p className="plan-price">€ 0</p>
              </div>
              <div>
                <p className="plan-lead">For anyone who just wants to try out our template generator.</p>
                <ul className="plan-features">
                  <li>
                    <div className="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                        <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <p>Banner template generator</p>
                  </li>
                  <li>
                    <div className="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" className="svg-icon svg-icon--cross">
                        <path d="M 9 2 L 2 9.5" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray=""></path>
                        <path d="M 9 9.5 L 2 2" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray=""></path>
                      </svg>
                    </div>
                    <p>Add custom formats</p>
                  </li>
                  <li>
                    <div className="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" className="svg-icon svg-icon--cross">
                        <path d="M 9 2 L 2 9.5" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray=""></path>
                        <path d="M 9 9.5 L 2 2" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray=""></path>
                      </svg>
                    </div>
                    <p>Import scripts via CDN</p>
                  </li>
                  <li>
                    <div className="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" className="svg-icon svg-icon--cross">
                        <path d="M 9 2 L 2 9.5" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray=""></path>
                        <path d="M 9 9.5 L 2 2" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeDasharray=""></path>
                      </svg>
                    </div>
                    <p>Custom project name</p>
                  </li>
                </ul>
              </div>
              <Link to={goToDemoHref} className="button">
                Try for free
              </Link>
            </div>
            <div className="plan-wrapper plan-wrapper--pro">
              <div>
                <p className="plan-name">Pro</p>
                <p className="plan-price">
                  € 25<span>/month</span>
                </p>
              </div>
              <div>
                <p className="plan-lead">For the individuals and teams that want to customize and improve their generated templates.</p>
                <ul className="plan-features">
                  <li>
                    <div className="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                        <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <p>Banner template generator</p>
                  </li>
                  <li>
                    <div className="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                        <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <p>Add custom formats</p>
                  </li>
                  <li>
                    <div className="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                        <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <p>Import scripts via CDN</p>
                  </li>
                  <li>
                    <div className="svg-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="svg-icon">
                        <path fill="transparent" d="M17 8.5l-7 7-3-3" strokeWidth="2" stroke="var(--svg-icon-tint)" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <p>Custom project name</p>
                  </li>
                </ul>
              </div>

              {!user.isPro && !user.isLoggedIn && (
                <button onClick={login} className="button button--invert">
                  Go pro
                </button>
              )}

              {!user.isPro && user.isLoggedIn && (
                <a href={user.stripePortalHref} className="button button--invert">
                  Go pro
                </a>
              )}

              {user.isPro && user.isLoggedIn && (
                <Link to="/app" className="button button--invert">
                  Go pro
                </Link>
              )}
            </div>
          </article>
        </section>
      </main>
      <Footer showBanner="true" />
    </Fragment>
  )
}

export default Home
