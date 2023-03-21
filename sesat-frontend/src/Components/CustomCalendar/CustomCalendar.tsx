
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



  function CustomCalendar(){
    const [startDate, setStartDate] = useState(new Date());


    function onChangeDateHandler(value: Date){
      console.log(value);
      setStartDate(value);

    }
    return(
      <div>
        <DatePicker
          selected = {startDate}
          onChange={onChangeDateHandler}
          className="rounded"
        />
      </div>
    )
  }

export default CustomCalendar;