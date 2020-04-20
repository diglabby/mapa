import React, { Component } from "react";
import { translate }        from "react-i18next";
import T                    from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled               from "styled-components";
import logo                 from "../img/mapa_logo_by.png";
import CityList             from "./pure/CityList";
import Info                 from "./pure/Info";
import Contact              from "./pure/Contact";
import Imprint              from "./pure/Imprint";
import PrivacyStatement     from "./pure/PrivacyStatement";
import Explain              from "./pure/LandingExplain";
import Register             from "./pure/Register";
import Login                from "./pure/Login";
import URLs                 from "../constants/URLs";
import V                    from "../constants/PanelView";
import i18n                 from "../i18n";
import STYLE                from "./styling/Variables"
import {setLng} from "../reducers/lngReducer";
import {HashRouter, Link, NavLink, Route} from "react-router-dom";
import ApiComponent from "./pure/OpenApi/ApiComponent";


class LandingPage extends Component {





  state = {
    selectedCity : 0,
  }

  render() {

    const { content, searchText, searchError, cities, onSelection, onEscape,
      onChange, onRegister, onLogin, loggedIn, user, onDeleteAccount, loadingSearch } = this.props;
    const onClick = this.props.onMenuItemClick;
    var t = (key) => {
      return this.props.t("landingPage." + key);
    };

    const onChangeSelectedCity = (direction) => {
      const newSelection = (this.state.selectedCity + direction) > 0 ? (this.state.selectedCity + direction) : 0;
      if(cities.length - 1 >= newSelection){
        this.setState({ selectedCity: newSelection })
      }
    }

    const onKeyUp = ev => {
      ev.preventDefault();
      switch (ev.key) {
        case "Escape":
          onEscape();
          break;
        case "Enter":
          onSelection(cities[this.state.selectedCity]);
          break;
        case "ArrowDown":
          onChangeSelectedCity(1);
          break;
        case "ArrowUp":
          onChangeSelectedCity(-1);
          break;
      }
    }

    const onPlaceSearch = ev => {
      const target = ev.target;
      const v = target != null ? target.value : void 0;
      if (v == null) {
        return;
      }
      onChange(v);
    }

    let subscriptionLink = user.subscriptionExists ? t("subscribeToBbox.edit-link")
      : t("subscribeToBbox.new-link");

    let loginInfo = <div className="login-info">
      <p>{t("subscribeToBbox.message")}<br/>
        <a onClick={() => onClick(V.SUBSCRIBE_TO_BBOX)} href="#">{subscriptionLink}</a>.
      </p>
    </div>;

    let contentComp = null;
    switch (content) {
      case V.TEAM:
      case V.SUPPORTERS:
        contentComp = <Explain onClick={onClick} />;
        break;
      case V.PRIVACY_STATEMENT:
        contentComp = <PrivacyStatement />;
        break;
      case V.IMPRINT:
        contentComp = <Imprint />;
        break;
      case V.MAP_INFO:
      case V.OPEN_SOURCE:
        contentComp = <Info />;
        break;
      case V.INFO:
        contentComp = <Info />;
        break;
      case V.CONTACT:
        contentComp = <Contact />;
        break;
      case V.DONATE:
        contentComp = <div>
          <h2>{t("donate.heading")}</h2>
          <p>
            {t("donate.paragraph1")}
          </p>
          <strong>
            <a target="_blank" href="https://www.betterplace.org/de/projects/36213-von-morgen-alles-gute-auf-einer-karte/donations/new">
              {t("donate.betterplace-link")}
            </a>
          </strong>
          <p>
            <strong>{t("donate.paragraph2.bank-details1")}</strong> <br/>
            <br/>
            {t("donate.paragraph2.bank-details2")}<br/>
            {t("donate.paragraph2.bank-details3")}<br/>
            {t("donate.paragraph2.bank-details4")}<br/><br/>

            {t("donate.paragraph2.text")}
          </p>
          <h1>{t("donate.paragraph3.heading")}</h1>

          <p>
            {t("donate.paragraph3.text1")}
            {" "}<a href="http://bildungsagenten.org/solidargemeinschaftvonmorgen">{t("donate.paragraph3.form-link")}</a>)
            {t("donate.paragraph3.text2")}
          </p>
          <iframe src="https://app.box.com/embed/s/yae4jb2g0awtqkxj3cb98jyd4uld9hza"
            width="800" height="550" frameborder="0">
          </iframe>
          <p>
            {t("donate.paragraph3.text3")}
            {" "}<a target="_blank" href = {URLs.DONATE.link}>{URLs.DONATE.name}</a> <br/>
            {t("donate.paragraph3.text4")}
          </p>
          <p>
            {t("donate.paragraph3.text5")}
          </p>
          <p>{t("donate.paragraph3.text6")}</p>
        </div>;
        break;
      case V.REGISTER:
        contentComp = <div>
          <Register
            onSubmit = { onRegister }
            onLogin = {() => {
              onClick(V.LOGIN)
            }}
          />
        </div>;
        break;
      case V.REGISTER_SUCCESS:
        contentComp = <div>
          <p>
            {t("user.register-success.text1")}<br/>
            {t("user.register-success.text2")} {user.email} {t("user.register-success.text3")}
          </p>
        </div>;
        break;
      case V.CONFIRMING_EMAIL:
        contentComp = <div>
          <p>
            {t("user.confirming-email-address.text")}<br/>
          </p>
        </div>;
        break;
      case V.CONFIRM_EMAIL_ERROR:
        contentComp = <div>
          <p>
            {t("user.confirm-email-error.message")}
            <a onClick={() => {onClick(V.REGISTER)}} href="#">{t("user.confirm-email-error.link")}</a>.<br/>
          </p>
        </div>;
        break;
      case V.EMAIL_CONFIRMED:
        contentComp = <div>
          <p>
            {t("user.email-confirmed.text1")}<br/>
            {t("user.email-confirmed.text2")}
            <a onClick={() => {onClick(V.LOGIN)}} href="#">{t("user.email-confirmed.link")}</a>.
          </p>
        </div>;
        break;
      case V.LOGIN_ERROR:  // fall through
      case V.LOGIN:
        contentComp = <div>
          <Login
            onSubmit = { onLogin }
            onRegister = {() => {
              onClick(V.REGISTER)
            }}
            t = { t }
          />
        </div>;
        break;
      case V.LOGIN_SUCCESS:
        contentComp = loginInfo;
        break;
      case V.LOGOUT:
        contentComp = <div>
          <p>{t("user.logged-out")}</p>
        </div>;
        break;
      case V.JOIN:
        contentComp = <div>
          <h3>{t("join.heading")}</h3>
          <p>
            {t("join.paragraph1")}
          </p>
          <p>
            <a target="_blank" href={URLs.JOB_ADS.link}>{URLs.JOB_ADS.name}</a>
          </p>
          <p>
            {t("join.paragraph2")}
          </p>
          <p>
            {t("join.paragraph3")}
            <br />
            <a target="_blank" href= "mailto:netzwerk@kartevonmorgen.org">
              netzwerk@kartevonmorgen.org
            </a>
          </p>
        </div>;
        break;
      default:
    }

    return (
      <LandingWrapper className="landing">
        <div className = "banner">
          <div className = "content pure-g">
            <div className = "logo-wrapper pure-u-6-24 pure-u-md-3-12">
              <div className = "logo">
                <a onClick={() => onClick('landing')} href="#">
                  <img className="logo pure-img" src={logo} />
                </a>
              </div>
            </div>
            <div className="menu-wrapper pure-u-18-24 pure-u-md-9-12">
              <div className="top-wrapper">
                <div className = "language-wrapper">

                  {/*{ loggedIn ?*/}
                  {/*    <a onClick = {() => onClick(V.LOGOUT)} href="#" className="login-link">*/}
                  {/*      {t("menu.logout")}*/}
                  {/*    </a>*/}
                  {/*    : <a onClick = {() => onClick(V.LOGIN)} href="#" className="login-link">*/}
                  {/*      {t("menu.login")}*/}
                  {/*    </a>*/}
                  {/*}*/}

                  {/*<a onClick={() => {*/}
                  {/*  i18n.changeLanguage('by');*/}
                  {/*  setLng('by');*/}
                  {/*}} href="#"*/}
                  {/*   className={"language-link" + ((i18n.language == "by") ? " selected" : " unselected")}>by</a>*/}
                  {/*{" "}*/}
                  {/*<a onClick={() => {*/}
                  {/*  i18n.changeLanguage('en');*/}
                  {/*  setLng('en');*/}
                  {/*}} href="#"*/}
                  {/*   className={"language-link" + ((i18n.language == "en") ? " selected" : " unselected")}>en</a>*/}


                </div>
              </div>
              <div className="menu pure-menu pure-menu-horizontal">
                <ul className="pure-g menu-list">
                <li className="menu-item">
                    <a onClick={() => onClick('map')} href="#map" className="pure-menu-link">
                      {t("menu.map")}
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#goals" className="pure-menu-link">
                      {t("menu.goals")}
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="#for-who" className="pure-menu-link">
                      {t("menu.for-whom")}
                    </a>
                  </li>
                  <li className="menu-item">
                      <a href="#principles" className="pure-menu-link">
                          {t("menu.principles")}
                      </a>
                  </li>
                  <li className="menu-item">
                    <a href="#work" className="pure-menu-link">
                      {t("menu.how-works")}
                    </a>
                  </li>
                  <li className="menu-item">
                      <a href="#team" className="pure-menu-link">
                          {t("menu.team")}
                      </a>
                  </li>
                  <li className="menu-item">
                      <a href="#donate" className="pure-menu-link">
                          {t("menu.donate")}
                      </a>
                  </li>
                  <li className="menu-item">
                      <a href="#partners" className="pure-menu-link">
                          {t("menu.partners")}
                      </a>
                  </li>
                  <li className="menu-item">
                      <a href="#contacts" className="pure-menu-link">
                          {t("menu.contact")}
                      </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className ={ "search" + (content ? '' : ' start')}>
          <div className = "landing-content">
            <h1>{t("slogan")}</h1>
            <div className="place-search">
              <div className= "pure-g pure-form">
                <input
                  className   = "pure-u-1"
                  onChange    = {onPlaceSearch}
                  onKeyUp     = {onKeyUp}
                  value       = {searchText || ''}
                  type        = 'text'
                  placeholder = {t("city-search.placeholder")}
                />
                <div className = "pure-u-1">
                  { searchText && !loadingSearch
                    ? (searchError
                      ? <div className="error">
                        <span className="errorText">{t("city-search.error")}</span>&nbsp;&nbsp;
                        <a onClick={() => onClick('map')} href="#" className="link">
                          {t("city-search.show-map")}

                        </a>
                      </div>
                      : cities && cities.length > 0
                        ? <CityList cities={cities} onClick={onSelection} selectedCity={this.state.selectedCity} selectedColor="#000"/>
                        : <div className="error">{t("city-search.no-results")}&nbsp;&nbsp;
                          <a onClick={() => onClick('map')} href="#" className="link">
                            {t("city-search.show-map")}
                          </a></div>
                    )
                    : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className = "content">{
            content == null
                ? <div>
                    {loggedIn ? loginInfo : null} <Explain onClick = { onClick } />
                </div>
                : contentComp
        }</div>
        <div className="footer">
          <h3>{t("footer.heading")}<a className="contact-top-link" href="mailto:falanster.by@gmail.com">{t("footer.email")}</a><a className="contact-link" href="tel:+375 29 127 42 67">{t("footer.phone")}</a></h3>
          <p>
            <a className="contact-link" target="_blank" href={URLs.FACEBOOK.link}><img className="pure-img"  src={require("../img/fb.png")}/></a>
            <a className="contact-link" target="_blank" href={URLs.VK.link}><img className="pure-img"  src={require("../img/vk.png")}/></a>
            <a className="contact-link" target="_blank" href={URLs.TELEGRAM.link}><img className="pure-img"  src={require("../img/telegram.png")}/></a>
            <a className="contact-link" target="_blank" href={URLs.REPOSITORY.link}><img className="pure-img"  src={require("../img/github.png")}/></a>
          </p>
            <a href="https://falanster.by"><img style={{margin: "65px auto 20px"}} className="pure-img"  src={require("../img/logo_f.png")}/></a>
          <p>
            <a className="license-link" href="http://creativecommons.org/licenses/by/4.0/"><img className="pure-img"  src={require("../img/cc.png")}/></a>
            <a className="license-link" href="http://creativecommons.org/licenses/by/4.0/"><img className="pure-img"  src={require("../img/by.png")}/></a>
            <a className="license-link" href="http://creativecommons.org/licenses/by/4.0/"><img className="pure-img"  src={require("../img/sa.png")}/></a>
          </p>
                 <a className='open-api' href={URLs.OPEN_API.link}>API /api</a>
          {/*F*/}
          {/*<ul>*/}
          {/*  <li>*/}
          {/*    <NavLink  className='open-api' to="/a">Modus</NavLink>*/}
          {/*    f*/}
          {/*  </li>*/}
          {/*</ul>*/}

            {/*<Route path='/openapi' component={ApiComponent}/>*/}
          {/*<NavLink to="/openapi">OPEN/ API</NavLink>*/}

          {/*    <Route path="/api" component={ApiComponent} />*/}


          {/*<NavLink to="/api">API</NavLink>*/}
          <p>
            {user.username != null ? <a onClick={onDeleteAccount} href="#">

              Account löschen
            </a> : ""}
          </p>
        </div>
      </LandingWrapper>);
  }
}

LandingPage.propTypes = {
  content     : T.string,
  searchText  : T.string,
  searchError : T.bool,
  cities      : T.array,
  onChange    : T.func,
  onEscape    : T.func,
  onSelection : T.func
};

module.exports = translate('translation')(LandingPage)

const LandingWrapper = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgba(0,0,0,0.7);
  h1, h3 {
    font-family: ${STYLE.headerFont};
    font-weight: 500;
  }
  h3 {
    font-size: 1.5em;
    margin: 0.3em 0;
  }
  h2 {
    font-size: 2em;
    margin-top: 1.5em;
    font-weight: 500;
  }
  .help-link {
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    text-decoration: none;
    display: block;
    margin-bottom: 0px;
    padding: 15px;
    
    color: #000000;
  }
  .logo-partner {
    display: flex !important;
    height: auto;
    align-items: center;
    justify-content: center;
    align-content: center;
    img {
        padding: 15px;
        box-sizing: border-box;
    }
  }
  .landing-link {
    font-family: PT Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 31px;
    color:#000;
    text-decoration: none;
  }
  .rounded {
    width: 146px;
    height: 146px;
    border-radius: 50%;
  }
  input {
    font-size: 1.2em;
  }
  p {
    margin-block-start: 0.1em;
  }
  .place-search {
    max-width: 500px;
    margin: auto;
    margin-top: 2em;
    margin-bottom: 2em;
    .error {
      margin: auto;
      padding: 1.1em;
      background: rgba(0,0,0,0.5);
      border-radius: 0 0 0.3em 0.3em;
      .errorText {
        color: #f44;
      }
      .link {
        color: #08f;
      }
    }

    /* only of city list on landing page, probably use props */
    .city-list {
      padding-top: 0.3em;
      background: rgba(0,0,0,0.5);
      border-radius: 0 0 0.3em 0.3em;
      li:hover {
        background: #000;
        border-radius: 0 0 0.3em 0.3em;
        div.chevron {
          color: #fff;
        }
      }
    }
  }
  .content {
    width: 100;
    margin: auto;
    z-index: 0;
    .login-info {
      margin-bottom: 10em;
    }
    .imprint-heading {
      margin-top: 2em;
      margin-bottom: 0.5em;
    }
    .content-wrapper {
      margin:auto;
      max-width: 945px;
    }
    .gray {
      background-color: #f0f0f0;
      width: 100%;
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
    .white {
      width: 100%;
      background-color: #fff;
      padding-bottom: 4rem;
      
    }
  }
  .partners-subtitle {
    letter-spacing: 0em !important;
    font-size: 24px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  .banner {
    background-color: #162D50;
    .content {
      max-width: initial;
      padding-bottom: 20px;
      div.logo {
        padding-top: 1em;
        margin-left: 50px;
      }
      img.logo {
        max-width: 239px;
        max-height: 95px;
        width: 100%;
      }
    }
    .top-wrap {
      position: absolute;
      top: 0;
      right: 0;    
    }
    .menu-wrapper {
      text-align: right;
      
        .login-link {
          text-decoration: none;
          color: #fff;
          margin-right: 30px;
        }
      
      .language-wrapper {
        display: none;        
        margin: 1em;
        position: absolute;
        top 0;
        right: 0;
        font-size: 0.8em;
        color: #fff;
        .language-link {
          margin: 3pt;
          text-decoration: none;
          &.selected {
            color: #777;
            pointer-events: none;
          }
          &.unselected {
            color: #fff;
            &:hover {
              color: #555;
            }
          }
        }
      }
    }
    .menu-wrapper-inner {
      bottom: 0;
      width: 100%;
      height: 20px;
      margin-bottom: 10px;
    }
    .menu {
      font-size: 0.9em;
      display: inline-block;
      position: relative;
      margin-top: 50px;
      max-width: 100%;
      .menu-list {
        list-style: none;
        letter-spacing: 0.05em;
      }
      ul {
        margin: 0;
      }
      li {
        &:hover {
          text-decoration: underline;
        }
        &:active {
          text-decoration: underline;
        }
        a {
          background: transparent;
        }
      }
      .menu-item {
        text-align: center;
      }
    }
  }
  
  .team-name {
    font-size: 18px;
  }
  
  .team-role {
    font-size: 18px;
  }
  
  .team-button {
    font-size: 36px;
    width: 100%;
    height: 82px;
    background: #FF7F2A;
    margin-top: 50px;
    color: #fff;
    cursor: pointer;
    
    &:hover {
      background: #90dd90;
    }
  }
  
  .explain {
    background-color: #fff;
    text-align: center;
    padding: 50px 1em;
    position: relative;
    ul {
      text-align: left;
      max-width: 600px;
      text-align: left;
      margin: auto;
    }
    h1 {
      margin-top: 0;
    }
    p {
      font-size: 1.2em;
    }
    a {
      color: ${STYLE.darkGray};
    }
    .teamMember {
      vertical-align: top;
      display: inline-block;
      width: 200px;
      margin-top: 30px;
      .team-member-name {
        font-weight: bold;
      }
      .circle {
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        margin: 10px;
        overflow: hidden;
        img {
          width: 100%;
        }
        &.pink {
          background-color: ${STYLE.pink};
        }
        &.yellow {
          background-color: ${STYLE.yellow};
        }
        &.berry {
          background-color: ${STYLE.berry};
        }
        &.green {
          background-color: ${STYLE.green};
        }
        &.blue {
          background-color: ${STYLE.blue};
        }
        &.grayBlue {
          background-color: ${STYLE.grayBlue};
        }
      }
    }
    .version {
      font-size: 0.7em;
    }
    .circleTutorial {
      display: block;
      text-decoration: none;
      position: absolute;
      width: 100px;
      border-radius: 50px;
      background-color: #000;
      color: #fff;
      left: 50%;
      margin-left: -50px;
      height: 73px;
      top: -180px;
      padding-top: 27px;
      cursor: pointer;
      z-index: 1;
    }
    .partnerLogo {
      margin: 2em;
      border: none;
      width: 25%;
      vertical-align: middle;
    }
    hr {
      margin: 100px 40px;
      &:before {
        content: ' ';
        display: block;
        position: absolute;
        margin-left: -100px;
        margin-top: -35px;
        background-color: #fff;
        background-image: url("../../img/pincloud.png");
        background-repeat: no-repeat;
        background-position: center center;
        left: 50%;
        width: 200px;
        height: 70px;
      }
    }
  }
  .slide {
    background: #fff !important;
  }
  .carousel-slider {    
    padding-left: 55px;
    padding-right: 55px;
    box-sizing: border-box;
  }
  
  .slider-wrapper h3 {
    letter-spacing: 0.05em !important;
  }
  
  .carousel.carousel-slider .control-arrow {
    top: 30px !important; 
    opacity: 1;
  }
  
  .carousel .control-next.control-arrow:before {
    border-left: 35px solid #FF7F2A;
  }
  
  .carousel .control-prev.control-arrow:before {
    border-right: 35px solid #FF7F2A;
  }
  .carousel .control-arrow:before, .carousel.carousel-slider .control-arrow:before {   
    border-top: 25px solid transparent;
    border-bottom: 25px solid transparent;    
  }
  
  .carousel.carousel-slider .control-arrow:hover {
    background: #fff;
  }

  .footer {
    background-color: #162D50;
    height: 349px;    

    color: #fff;
    text-align: center;
    padding: 20px 20px 50px 20px;
    line-height: 1.5em;
    h3 {
      font-size: 18px;
    }
    a {
      color: #fff;
    }
    .smallLink {
      margin: 0 7px;
    }
    .license-link {
      display:inline-block;
    }
    
    .contact-link {
      display:inline-block;
      margin-top: 18px;
    }
    
    .contact-top-link {
      display:inline-block;
      padding-right: 10px;
      padding-left: 10px;
      font-size: 18px;
    }
    .open-api{
    border:1px solid red;
    width:max-content;
    padding:10px 15px;
    margin: 0 auto
    }
  }
  .search {
    text-align: center;
    padding: 50px 1em;
    position: relative;
    text-align: center;
    color: #fff;
    height: 150px;
    z-index: 1;
    ul {
      text-align: left;
    }
    h1 {
      margin-top: 0;
      font-size: 3em;
      font-family: PT Sans;
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 39px;
      color: #FFFFFF;
    }
    .landing-content {
      position: relative;
      top: 20%;
      bottom: 0;
      left: 0;
      right: 0;
      width: calc(100vw - 50px);
      height: 50%;
      margin: 0 10px;
      display: inline-block;
    }
    h2 {
      font-weight: normal;
      font-size: 1.4em;
    }
    input {
      color: ${STYLE.coal};
    }
    button {
      color: ${STYLE.coal};
    }
    &.start {
      height: calc(100% - 100px);
      .content {
        height: 30%;
      }
    }
  }
`
