import React from "react";
import Logo from "./assets/Troll Face.png"

export default function Header(){
  return(
    <nav className="header">
      <img src={Logo} alt="MemeGen" className="nav-logo"/>

      <h1 className="nav-title">Meme Generator</h1>

    </nav>
  )
}