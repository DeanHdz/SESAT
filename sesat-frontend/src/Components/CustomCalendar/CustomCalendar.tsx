
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

  import  { FC } from "react";
  import { CalendarProps } from "../../Interfaces/ICalendarProps";

  const CustomCalendar = () =>{
    const [startDate, setStartDate] = useState(new Date());


    function onChangeDateHandler(value: Date){      
      setStartDate(value);                 
    }

    return(
      <div>
        <DatePicker
          selected = {startDate}
          //onSelect={setSelectedDate}
          onChange={onChangeDateHandler}
          className="rounded"
        />
      </div>
    )
  }

export default CustomCalendar;