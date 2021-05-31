import React from "react";
import ingles from "../assets/ingles.png";
import español from "../assets/español.png";
import frances from "../assets/frances.png";
import aleman from "../assets/aleman.jpg";
import holandes from "../assets/holandes.png";


function banderas() {
  const ingles = <Image source={ingles}  />;
  const español = <Image source={español}  />;
  const frances = <Image source={frances}  />;
  const aleman = <Image source={aleman} />;
  const holandes = <Image source={holandes}  />;
}

export { ingles,español,frances,aleman,holandes};
