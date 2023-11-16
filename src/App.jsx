import { useState } from "react";
import { getRamndomNumber } from "./utils/getRandom";
import phrases from "./assets/phrases.json";
import Phrase from "./components/Phrase/Phrase";
import Button from "./components/Button/Button";

import "./App.css";
import space1 from "./assets/space1.jpg";
import space2 from "./assets/space2.jpg";
import space3 from "./assets/space3.jpg";
import space4 from "./assets/space4.jpg";

const backgrounds = [space1, space2, space3, space4];

function App() {
  const getRamndomPhrase = () => phrases[getRamndomNumber(phrases.length - 1)];
  const getRamndomBackground = () => backgrounds[getRamndomNumber(backgrounds.length - 1)];
  
  const [phraseObject, setphraseObject] = useState(getRamndomPhrase());
  const [background, setBackground] = useState(getRamndomBackground());

  const changePhrase = () => {
    let newPhrase = getRamndomPhrase();
    
    while (newPhrase.phrase === phraseObject.phrase) {
      newPhrase = getRamndomPhrase();
    }

    setphraseObject(newPhrase);
  }
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
  }
  return (
    <div
      className="container_app"
      style={{ backgroundImage: `url("${background}")` }}
    >
        <div className="card">
          <h1>KNOW YOUR GALAXY</h1>
          <Phrase phrase={phraseObject.phrase} />
          <p className="author">
            Author: {phraseObject.author}
          </p>
          <div className="btn.container">
            <Button handlerClick={handlerClick} />
          </div>
      </div>      
    </div>
  );
}

export default App;
