import { useState, useEffect } from "react";
import { getRamndomNumber } from "./utils/getRandom";
import phrases from "./assets/phrases.json";
import Phrase from "./components/Phrase/Phrase";

import "./App.css";
import space1 from "./assets/space1.gif";
import space2 from "./assets/space2.gif";
import space3 from "./assets/space3.gif";
import space4 from "./assets/space4.gif";
import space5 from "./assets/space5.gif";
import space6 from "./assets/space6.gif";
import space7 from "./assets/space7.gif";
import space8 from "./assets/space8.gif";

const backgrounds = [
  space1,
  space2,
  space3,
  space4,
  space5,
  space6,
  space7,
  space8,
];

function App() {
  const getRamndomPhrase = () => phrases[getRamndomNumber(phrases.length - 1)];
  const getRamndomBackground = () =>
    backgrounds[getRamndomNumber(backgrounds.length - 1)];

  const [phraseObject, setphraseObject] = useState(getRamndomPhrase());
  const [background, setBackground] = useState(getRamndomBackground());

  const changePhrase = () => {
    let newPhrase = getRamndomPhrase();

    while (newPhrase.phrase === phraseObject.phrase) {
      newPhrase = getRamndomPhrase();
    }

    setphraseObject(newPhrase);
  };

  const changeBackground = () => {
    let newBackground = getRamndomBackground();

    while (newBackground === background) {
      newBackground = getRamndomBackground();
    }

    setBackground(newBackground);
  };

  const handlerClick = () => {
    changePhrase();
    changeBackground();
  };

  useEffect(() => {
    const handleTouchMove = (e) => {
      const inicioX = e.touches[0].clientX;
      let deltaX = 0;

      const handleTouchEnd = () => {
        if (deltaX > 50) {
          changePhrase();
          changeBackground();
        } else if (deltaX < -50) {
          changePhrase();
          changeBackground();
        }
      };

      document.addEventListener("touchmove", (e) => {
        deltaX = e.touches[0].clientX - inicioX;
      });

      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    };

    const handleWheel = (e) => {
      if (e.deltaY > 50) {
        changePhrase();
        changeBackground();
      } else if (e.deltaY < -50) {
        changePhrase();
        changeBackground();
      }
    };

    document.addEventListener("touchstart", handleTouchMove);
    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("touchstart", handleTouchMove);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [changePhrase, changeBackground]);

  return (
    <div
      className="container_app"
      style={{ backgroundImage: `url("${background}")` }}
    >
      <div className="card">
        <Phrase phrase={phraseObject.phrase} />
        <p className="author">Author: {phraseObject.author}</p>
      </div>
    </div>
  );
}

export default App;
