import "./App.css";
import "./components/Buttons.css"
import CreateTreeButton from './components/CreateTreeButton'
import FamilyTreeCanvas from "./components/FamilyTreeCanvas";

function App() {

  let treeEditorActivated = true;

  return (
    <div className="spa-layout-container">
      {!treeEditorActivated && <CreateTreeButton/>}
      {treeEditorActivated && <div className="main-page-grid">
        <div className="main-left-grid-block">
          <button  className="details-button">
            <span>Tree Info</span>
          </button>

        </div>
        <div className="main-middle-grid-block">
          <FamilyTreeCanvas/>

        </div>
      </div>}
    </div>
  );
}

export default App;
