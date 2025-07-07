import '../../styles/ShowTreesPopup.css'
interface PopupTreeDisplayProps {
  description : string;
}

export const PopupTreeDisplay: React.FC<PopupTreeDisplayProps> = ({description}) => {
  return (
    <div className="popup-tree-display-container">
      <div className='popup-top-part'> 
        <div className='image-holder'>

        </div>
      </div>
    
      <div className='popup-bottom-part'>
        <text className="tree-description">{description}</text>
      </div>
    </div>
  )
}

