import "./App.css";
import "./styles/Buttons.css"
import FamilyTreeCanvas from "./components/FamilyTreeCanvas";
import MainMenu from "./components/MainMenu";
import CreateTreePopup from "./components/popups/CreateTreePopup";
import ShowTreesPopup from "./components/popups/ShowTreesPopup";
import useVisibilityStore from "./stores/visibilityStore";


function App() {

  const mainMenuVisibility = useVisibilityStore((state) => state.mainMenuVisibility);
  const createPopupVisibility = useVisibilityStore((state) => state.createPopupVisibility)
  const showTreesPopupVisibility = useVisibilityStore((state) => state.showTreesPopupVisibility)

  const goBackToMenu = () => {
    useVisibilityStore.getState().mainMenuOpened();
  }

  const closePopup = (event:React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      if (createPopupVisibility == true) {
        useVisibilityStore.getState().createPopupClosed();
      }
      if (showTreesPopupVisibility == true) {
        useVisibilityStore.getState().showTreesPopupClosed();
      }
    }
  };


  return (
    <div className="spa-layout-container" onClick={closePopup}>
      

      {mainMenuVisibility && 
        <>
          <MainMenu/>
          { createPopupVisibility && <CreateTreePopup/>}
          { showTreesPopupVisibility && <ShowTreesPopup/>}
        </>


      }
      {!mainMenuVisibility && <div className="main-page-grid">

        <div className="main-left-grid-block">
        
        </div>
        <div className="main-middle-grid-block">
          <FamilyTreeCanvas/>

          <button  className="details-button">
            <span>Tree Info</span>
          </button>

          <button className="back-menu-button" onClick={goBackToMenu}>
            <span>Main Menu</span>
          
          </button>
        </div>
      </div>}
    </div>
  );
}

export default App;
