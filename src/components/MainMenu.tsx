import "../styles/MainMenu.css"
import logo from '../assets/tree.png'
import useVisibilityStore from "../stores/visibilityStore"

export default function MainMenu() {

  const openShowTreesPopup = () => {
    useVisibilityStore.getState().showTreesPopupOpened();
  };

  const openCreatePopup = () => {
    useVisibilityStore.getState().createPopupOpened();
  };

  const exitMenu = () => {
    useVisibilityStore.getState().mainMenuClosed();
  };

  return (
    <div className="main-menu-container">
      <img src={logo} alt="Logo" className="tree-logo"/>
      
      <div className="menu-button-container">

        {/* === Button for showing created trees === */}
        <button className="animated-button aqua-button" onClick={openShowTreesPopup}>
          <svg viewBox="0 0 24 24" className="arr-2" >
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
          <span className="text">Show Trees</span>
          <span className="circle"></span>
          <svg viewBox="0 0 24 24" className="arr-1" >
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
            ></path>
          </svg>
        </button>

        {/* === Button for showing tree creation popup === */}
        <button className="animated-button green-button" onClick={openCreatePopup}>
          <svg viewBox="0 0 24 24" className="arr-2" >
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <span className="text">Create Tree</span>
          <span className="circle"></span>
          <svg viewBox="0 0 24 24" className="arr-1" >
            <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>

      </div>
    </div>
  )
}


