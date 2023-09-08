import React, { useState } from "react";
import TimePicker from "react-time-picker";
//import TimePicker from 'react-time-picker/dist/entry.nostyle';

function CustomTimePicker() {
  const [value, onChange] = useState("10:00");

  function onChangeDateHandler(value: any) {
    console.log(value);
    onChange(value);
  }

  return (
    <div className="flex justify-center h-full w-2/5">
      <TimePicker 
        onChange={onChangeDateHandler} 
        value={value}    
        className="border-none"     
        />
    </div>
  );
}

export default CustomTimePicker;
