import React from "react";
import aleman from "../assets/aleman.jpg";
import espanol from "../assets/espanol.png";
import frances from "../assets/frances.png";
import holandes from "../assets/holandes.png";
import ingles from "../assets/ingles.png";

function Flags() {
  const ingles = <Image source={ingles}  />;
  const espanol = <Image source={espanol}  />;
  const frances = <Image source={frances}  />;
  const aleman = <Image source={aleman} />;
  const holandes = <Image source={holandes}  />;
}

export { ingles,espanol,frances,aleman,holandes};
