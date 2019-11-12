import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
    <Carousel showIndicators={false} showThumbs={false} showStatus={false}>
        <div className="slide-wrapper">
            <h3 style={{ marginTop: "20px", marginBottom: "20px"}}>Як дадаць новую ініцыятыву</h3>
            <img style={{width: "100%"}} src={require("../../img/tutorial/tutorial-1.gif")} />
        </div>
        <div className="slide-wrapper">
            <h3 style={{ marginTop: "20px", marginBottom: "20px"}}>Як рэдагаваць ініцыятыву</h3>
            <img style={{width: "100%"}} src={require("../../img/tutorial/tutorial-2.gif")} />
        </div>
        <div className="slide-wrapper">
            <h3 style={{ marginTop: "20px", marginBottom: "20px"}}>Як дадаць новы тэг</h3>
            <img style={{width: "100%"}} src={require("../../img/tutorial/tutorial-3.gif")} />
        </div>
        <div className="slide-wrapper">
            <h3 style={{ marginTop: "20px", marginBottom: "20px"}}>Як шукаць па тэгах</h3>
            <img style={{width: "100%"}} src={require("../../img/tutorial/tutorial-4.gif")} />
        </div>
    </Carousel>
);