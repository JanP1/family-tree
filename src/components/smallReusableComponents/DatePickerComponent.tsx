import "../../styles/DatePicker.css";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface DatePickerProps {
  value: Date | null;
  onDateChange: (date: Date) => void;
}

const Dropdown = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: (number | string)[];
  value: number | "";
  onChange: (val: number | "") => void;
}) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".dropdown-options")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: number) => {
    onChange(val);
    setOpen(false);
  };

  const toggleOpen = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setOpen(!open);
  };

  const dropdownContent = open && coords
    ? ReactDOM.createPortal(
        <div
          className="dropdown-options"
          style={{
            position: "absolute",
            top: coords.top,
            left: coords.left,
            width: coords.width,
            zIndex: 9999,
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              className="dropdown-option"
              onClick={() => handleSelect(Number(opt))}
            >
              {opt}
            </div>
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <div className="custom-dropdown" ref={ref}>
      <div className="selected-value" onClick={toggleOpen}>
        <div className="left-grid-column">{value || label}</div>
        <svg
          className={`dropdown-arrow ${open ? "rotate" : ""}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L6 6L11 1" strokeWidth="2" fill="none" />
        </svg>
      </div>
      {dropdownContent}
    </div>
  );
};

export default Dropdown;


// const Dropdown = ({
//   label,
//   options,
//   value,
//   onChange,
// }: {
//   label: string;
//   options: (number | string)[];
//   value: number | "";
//   onChange: (val: number | "") => void;
// }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//
//   const handleClickOutside = (event: MouseEvent) => {
//     if (ref.current && !ref.current.contains(event.target as Node)) {
//       setOpen(false);
//     }
//   };
//
//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//
//   const handleSelect = (val: number) => {
//     onChange(val);
//     setOpen(false);
//   };
//
//   return (
//     <div className="custom-dropdown" ref={ref}>
//       <div className="selected-value" onClick={() => setOpen(!open)}>
//         <div className="left-grid-column">
//           {value || label}
//         </div>
//         <svg
//           className={`dropdown-arrow ${open ? "rotate" : ""}`}
//           width="12"
//           height="8"
//           viewBox="0 0 12 8"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M1 1L6 6L11 1"  strokeWidth="2" fill="none" />
//         </svg>
//       </div>
//       {open && (
//         <div className="dropdown-options">
//           {options.map((opt) => (
//             <div
//               key={opt}
//               className="dropdown-option"
//               onClick={() => handleSelect(Number(opt))}
//             >
//               {opt}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };



export const DatePickerComponent = ({ value, onDateChange }: DatePickerProps) => {
  const [day, setDay] = useState<number | "">("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");

  useEffect(() => {
    if (day !== "" && month !== "" && year !== "") {
      const newDate = new Date(year, month - 1, day);
      if (!value || newDate.getTime() !== value.getTime()) {
        onDateChange(newDate);
      }
    }
  }, [day, month, year]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="date-picker-container">
      <Dropdown label="Day" options={days} value={day} onChange={setDay} />
      <Dropdown label="Month" options={months} value={month} onChange={setMonth} />
      <Dropdown label="Year" options={years} value={year} onChange={setYear} />
    </div>
  );
};



