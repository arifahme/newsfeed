import React from "react";
import Particles from "react-particles-js";
import '../css/Bubbles.css'

export default () => (
  <div
  id="particles-js"
  style={
    {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }
  }>
  <Particles
  params={
    {
      "particles": {
        "number": {
          "value":30,
          "density": {
            "enable":false,
            "value_area":800
          }
        },
        "color": {
          "value":"#3d49a0"
        },
        "shape": {
          "type":"circle",
          "stroke": {
            "width":0,
            "color":"#000"
          }
        },
        "opacity": {
          "value":0.3,
          "random":true,
          "anim": {
            "enable":false,
            "speed":2,
            "opacity_min":0.1,
            "sync":false
          }
        },
        "size": {
          "value":27,
          "random":true,
          "anim": {
            "enable":false,
            "speed":10,
            "size_min":40,
            "sync":false
          }
        },
        "move": {
          "enable":true,
          "speed":8,
          "direction":"none",
          "random":false,
          "straight":false,
          "out_mode":"bounce",
          "bounce":false,
          "attract": {
            "enable":false,
            "rotateX":600,
            "rotateY":1200
          }
        }
      },
      "interactivity": {
        "detect_on":"canvas",
        "events": {
          "onclick": {
            "enable":true,
            "mode":"push"
          },
          "resize":true
        },
        "modes": {
          "push": {
            "particles_nb":4
          }
        }
      },
      "retina_detect":true
    }
  }
  />
  </div>
);
