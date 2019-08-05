import React, { Component } from "react";
import T                    from "prop-types";
import { translate }        from "react-i18next";
import V                    from "../../constants/PanelView";

const teamArray = [
  {
    name: "Thao Tran",
    color: "yellow",
    image: require("../../img/team/Thao.jpg"),
    position: ["landingExplain.chapter5.thao"]
  },
  {
    name: "Helmut Wolman",
    color: "pink",
    homepage: "http://www.ideenhochdrei.org/de/verein/kennenlernen/menschen/helmut-wolmann/",
    image: require("../../img/team/Helmut.jpg"),
    position: ["landingExplain.chapter5.chair", "landingExplain.chapter5.project-development"]
  },
  {
    name: "David Ziegler",
    color: "berry",
    homepage: "https://slowtec.de/team.html#",
    image: require("../../img/team/David.jpg"),
    position: ["slowtec GmbH","landingExplain.chapter5.software-development"]
  },
  {
    name: "Lisa Stehr",
    color: "green",
    image: require("../../img/team/Lisa.jpg"),
    position: ["landingExplain.chapter5.lisa1", "landingExplain.chapter5.lisa2"]
  },
  {
    name: "Marten Röbel",
    color: "green",
    homepage: "http://martenroebel.de/",
    image: require("../../img/team/Marten.jpg"),
    position: ["landingExplain.chapter5.marten"]
  },
  {
    name: "Markus Kohlhase",
    color: "green",
    homepage: "https://slowtec.de/team.html#",
    image: require("../../img/team/Markus.jpg"),
    position: ["slowtec GmbH","landingExplain.chapter5.software-development"]
  },
  {
    name: "Florian Jostock",
    color: "pink",
    image: require("../../img/team/placeholder_1.png"),
    position: ["landingExplain.chapter5.florian"]
  },
  {
    name: "Louisa Pieper",
    color: "blue",
    image: require("../../img/team/Louisa.jpg"),
    position: ["landingExplain.chapter5.louisa", "landingExplain.chapter5.pr-marketing"]
  },
  {
    name: "Anja Dannemann",
    color: "blue",
    image: require("../../img/team/Anja.jpg"),
    position: ["landingExplain.chapter5.anja", "landingExplain.chapter5.graphic-design"]
  },
  {
    name: "Xueqian Chen",
    color: "berry",
    image: require("../../img/team/Xueqian.jpg"),
    position: ["landingExplain.chapter5.xueqian", "landingExplain.chapter5.pr-marketing"]
  },
  {
    name: "Frederik Schütz",
    color: "green",
    image: require("../../img/team/Frederik.jpg"),
    position: ["landingExplain.chapter5.project-development"]
  },
  {
    name: "Linus Covic",
    color: "green",
    image: require("../../img/team/Linus.jpg"),
    position: ["landingExplain.chapter5.linus", "landingExplain.chapter5.communication-marketing"]
  },
  {
    color: "blue",
    image: require("../../img/team/placeholder_4.png"),
    position: ["landingExplain.chapter5.new-members"]
  }
]

const getTeamMembers = t =>
  teamArray
    .map( member => {
      const link = !!member.homepage && member.image
      const key = member.name ? member.name : member.position

      return(
        <div key={key} className="teamMember">
          <div className={ "circle "+member.color }>
            { link
              ? <a target="_blank" href={member.homepage}><img className="teamImage" src={member.image} /></a>
              : !!member.image && <img className="teamImage" src={member.image} />
            }
          </div>
          <div className="team-member-name">{member.name}</div>
          { member.position.map( pos =>
            <div key={pos}>{ pos.startsWith('landingExplain.') ? t(pos) : pos  }</div>
          )}
        </div>
      )
    })

const LandingExplain = props => {

  const { onClick, t } = props;

  return(
    <div>
      <h2 style={{marginTop: "0px"}}><strong>{t("landingExplain.chapter1.name")}</strong>{t("landingExplain.chapter1.heading")}</h2>
      <img style={{marginTop: "50px"}} className="pure-img" src={require("../../img/mapa_explain.png")}/>
      <div style={{clear:"both"}} />

        <h2 id="goals" style={{marginTop: "130px"}}><strong>{t("landingExplain.chapter2.heading")}</strong></h2>
            <p style={{marginTop: "46px"}} >{t("landingExplain.chapter2.text")}</p>
            <p style={{marginTop: "40px"}}>{t("landingExplain.chapter2.subtext-1")}</p>
            <p>{t("landingExplain.chapter2.subtext-2")}</p>
            <p>{t("landingExplain.chapter2.subtext-3")}</p>
        <img className="pure-img"  style={{margin: "60px auto"}} src={require("../../img/map_for_2.png")}/>

        <div style={{clear:"both"}} />
      <br />
      <br />

        <h2 id="for-who"><strong>{t("landingExplain.chapter3.heading")}</strong></h2>
        <div className="pure-g" style={{marginTop: "60px"}}>
            <div className="pure-u-1-4"><p style={{textAlign: "left"}}><strong>{t("landingExplain.chapter3.column-1-head")}</strong>{t("landingExplain.chapter3.column-1")}</p></div>
            <div className="pure-u-1-8">&nbsp;</div>
            <div className="pure-u-1-4"><p style={{textAlign: "left"}}><strong>{t("landingExplain.chapter3.column-2-head")}</strong>{t("landingExplain.chapter3.column-2")}</p></div>
            <div className="pure-u-1-8">&nbsp;</div>
            <div className="pure-u-1-4"><p style={{textAlign: "left"}}><strong>{t("landingExplain.chapter3.column-3-head")}</strong>{t("landingExplain.chapter3.column-3")}</p></div>
        </div>
        <img className="pure-img"  style={{margin: "60px auto"}} src={require("../../img/partnership_2.png")}/>

        <h2 id="principles" style={{marginTop: "130px"}}><strong>{t("landingExplain.chapter4.heading")}</strong></h2>
        <p style={{marginTop: "46px"}} ><strong>{t("landingExplain.chapter4.text.head-1")}</strong></p>
        <p>{t("landingExplain.chapter4.text.1")}</p>
        <p style={{marginTop: "46px"}} ><strong>{t("landingExplain.chapter4.text.head-2")}</strong></p>
        <p>{t("landingExplain.chapter4.text.2")}</p>
        <p style={{marginTop: "46px"}} ><strong>{t("landingExplain.chapter4.text.head-3")}</strong></p>
        <p>{t("landingExplain.chapter4.text.3")}</p>
        <p style={{marginTop: "46px"}}><strong>{t("landingExplain.chapter4.text.4")}</strong></p>
        <img className="pure-img"  style={{margin: "60px auto"}} src={require("../../img/ctrl_c_v.png")}/>


        <h2 id="work" style={{marginTop: "130px"}}><strong>{t("landingExplain.chapter5.heading")}</strong></h2>
        <div className="pure-g" style={{marginTop: "60px"}}>
            <div className="pure-u-1-2">
                <div style={{maxWidth: "350px", margin: "auto"}}>
                    <p style={{marginTop: "46px"}}><strong>{t("landingExplain.chapter5.column-1-head")}</strong></p>
                    <p style={{marginTop: "46px"}}>{t("landingExplain.chapter5.column-1-1")}</p>
                    <p>{t("landingExplain.chapter5.column-1-2")}</p>
                    <p>{t("landingExplain.chapter5.column-1-3")}</p>
                </div>
            </div>
            <div className="pure-u-1-2"><img className="pure-img"  src={require("../../img/col-1.png")}/></div>
        </div>
        <div className="pure-g">
            <div className="pure-u-1-2"><img className="pure-img"  src={require("../../img/col-2.png")}/></div>
            <div className="pure-u-1-2">
                <div style={{maxWidth: "350px", margin: "auto"}}>
                    <p style={{marginTop: "46px"}}><strong>{t("landingExplain.chapter5.column-2-head")}</strong></p>
                    <p style={{marginTop: "46px"}}>{t("landingExplain.chapter5.column-2-1")}</p>
                    <p>{t("landingExplain.chapter5.column-2-2")}</p>
                    <p>{t("landingExplain.chapter5.column-2-3")}</p>
                </div>
            </div>
        </div>

        <h2 id="team" style={{marginTop: "130px"}}><strong>{t("landingExplain.chapter6.heading")}</strong></h2>
        <div className="pure-g" style={{marginTop: "60px"}}>
            <div className="pure-u-1-4">
                <img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse.png")}/>
                <p className="team-name" style={{marginTop: "22px"}}><strong>{t("landingExplain.chapter6.team-name-1")}</strong></p>
                <p className="team-role">{t("landingExplain.chapter6.team-description-1")}</p>
            </div>
            <div className="pure-u-1-4">
                <img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse.png")}/>
                <p className="team-name" style={{marginTop: "22px"}}><strong>{t("landingExplain.chapter6.team-name-2")}</strong></p>
                <p className="team-role">{t("landingExplain.chapter6.team-description-2")}</p>
            </div>
            <div className="pure-u-1-4">
                <img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse.png")}/>
                <p className="team-name" style={{marginTop: "22px"}}><strong>{t("landingExplain.chapter6.team-name-3")}</strong></p>
                <p className="team-role">{t("landingExplain.chapter6.team-description-3")}</p>
            </div>
            <div className="pure-u-1-4">
                <img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse.png")}/>
                <p className="team-name" style={{marginTop: "22px"}}><strong>{t("landingExplain.chapter6.team-name-4")}</strong></p>
                <p className="team-role">{t("landingExplain.chapter6.team-description-4")}</p>
            </div>
        </div>
        <p style={{marginTop: "46px"}}><strong>{t("landingExplain.chapter6.text-heading")}</strong>{t("landingExplain.chapter6.text")}</p>

        <h2 style={{marginTop: "130px"}}><strong>{t("landingExplain.chapter7.heading")}</strong></h2>
        <p style={{marginTop: "46px"}}>{t("landingExplain.chapter7.text.1")}</p>
        <p>{t("landingExplain.chapter7.text.2")}</p>
        <p>{t("landingExplain.chapter7.text.3")}</p>


        <a href="#" className="pure-button team-button">Запоўні анкету!</a>

        <h2 id="donate" style={{marginTop: "130px"}}><strong>{t("landingExplain.chapter8.heading")}</strong></h2>
        <img style={{marginTop: "90px"}} className="pure-img"  src={require("../../img/doika.png")}/>

        <h2 id="partners" style={{marginTop: "130px"}}><strong>{t("landingExplain.chapter9.heading")}</strong></h2>
        <div className="pure-g" style={{marginTop: "100px"}}>
            <div className="pure-u-1-4"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse.png")}/></div>
            <div className="pure-u-1-4"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse.png")}/></div>
            <div className="pure-u-1-4"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse.png")}/></div>
            <div className="pure-u-1-4"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse.png")}/></div>
        </div>
        <div className="pure-g" style={{marginTop: "60px"}}>
            <div className="pure-u-1-5"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse-small.png")}/></div>
            <div className="pure-u-1-5"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse-small.png")}/></div>
            <div className="pure-u-1-5"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse-small.png")}/></div>
            <div className="pure-u-1-5"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse-small.png")}/></div>
            <div className="pure-u-1-5"><img style={{margin: "auto"}} className="pure-img"  src={require("../../img/Ellipse-small.png")}/></div>
        </div>

        <h2 id="contacts" style={{marginTop: "130px"}}><strong>{t("landingExplain.chapter10.heading")}</strong></h2>
        <div className="pure-g" style={{marginTop: "60px"}}>
            <div className="pure-u-2-5">
                <p style={{textAlign: "left"}}>{t("landingExplain.chapter10.text.1")}</p>
                <p style={{textAlign: "left"}}><strong>{t("landingExplain.chapter10.text.email")}</strong></p>
                <p style={{textAlign: "left", marginTop: "40px"}}>{t("landingExplain.chapter10.text.2")}</p>
                <p style={{textAlign: "left"}}><strong>{t("landingExplain.chapter10.text.telegram")}</strong></p>
                <p style={{textAlign: "left", marginTop: "40px"}}>{t("landingExplain.chapter10.text.3")}</p>
                <p style={{textAlign: "left"}}><strong>{t("landingExplain.chapter10.text.github")}</strong></p>
                <p style={{textAlign: "left", marginTop: "40px"}}>{t("landingExplain.chapter10.text.4")}</p>
                <p style={{textAlign: "left"}}><strong>{t("landingExplain.chapter10.text.address")}</strong></p>
            </div>

            <div className="pure-u-3-5" style={{textAlign: "right"}}>
                <iframe width="500" height="500" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=27.580962181091312%2C53.90581086151094%2C27.586600184440613%2C53.90777965457411&amp;layer=mapnik&amp;marker=53.9067968497328%2C27.583783864974976" >
                </iframe>
            </div>
        </div>
    </div>
  )

}

LandingExplain.propTypes = {
  onClick  : T.func
}

module.exports = translate('translation')(LandingExplain)
