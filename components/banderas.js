import React from "react";
import ingles from "../assets/ingles.png";
import español from "../assets/español.png";
import frances from "../assets/frances.png";
import aleman from "../assets/aleman.jpg";
import holandes from "../assets/holandes.png";


function banderas() {
  const ingles = <Image source={ingles} style={styles.image} />;
  const español = <Image source={español} style={styles.image} />;
  const frances = <Image source={frances} style={styles.image} />;
  const aleman = <Image source={aleman} style={styles.image} />;
  const holandes = <Image source={holandes} style={styles.image} />;
}

export { ingles,español,frances,aleman,holandes};
