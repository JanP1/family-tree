import { useState } from 'react';

import '../../styles/CreateTreePopup.css'

export default function CreateTreePopup() {

  const [date, setDate] = useState('');

  return (
    <div className="create-tree-popup-container">
      <div className="scroll-wrapper">
        <div className="create-tree-form-container">
          <div className="field-title">Root Person's name</div>
          <input className="input-field" />

          <div className="field-title">Root Person's surname</div>
          <input className="input-field" />

          <div className="field-title">Root Person's date of birth</div>
          <div className="field-title">Root Person's birthplace</div>
          <input className="input-field" />
        </div>
      </div>
    </div>
  )
}

