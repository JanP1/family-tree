import "./App.css";
import { useState } from "react";
import "./components/Buttons.css"
import FamilyTreeCanvas from "./components/FamilyTreeCanvas";
import MainMenu from "./components/MainMenu";
import CreateTreePopup from "./components/popups/CreateTreePopup";

function App() {

  const [createPopupActive, setCreatePopupActive] = useState(true);

  let treeEditorActivated = false;


  const closePopup = (event:React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setCreatePopupActive(false);
    }
  };


  return (
    <div className="spa-layout-container" onClick={closePopup}>
      

      {!treeEditorActivated && 
        <>
          <MainMenu/>
          { createPopupActive && <CreateTreePopup/>}
        </>


      }
      {treeEditorActivated && <div className="main-page-grid">

        <div className="main-left-grid-block">
        
        </div>
        <div className="main-middle-grid-block">
          <FamilyTreeCanvas/>

          <button  className="details-button">
            <span>Tree Info</span>
          </button>

          <button className="back-menu-button">
            <span>Main Menu</span>
          
          </button>
        </div>
      </div>}
    </div>
  );
}

export default App;
