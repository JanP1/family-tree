import { useState } from 'react';
import { DatePickerComponent } from '../smallReusableComponents/DatePickerComponent';

import '../../styles/CreateTreePopup.css'

export default function CreateTreePopup() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log("Selected date:", date.toISOString());
  };

  return (
    <div className="create-tree-popup-container">
      <div className="scroll-wrapper">
        <div className="create-tree-form-container">
          <div className="field-title">Root Person's name</div>
          <input className="input-field" />

          <div className="field-title">Root Person's surname</div>
          <input className="input-field" />

          <div className="field-title">Root Person's date of birth</div>
          <DatePickerComponent value={selectedDate} onDateChange={handleDateChange}/>
          <div className="field-title">Root Person's birthplace</div>
          <input className="input-field" />
        </div>
        
        
      </div>
    </div>
  )
}

