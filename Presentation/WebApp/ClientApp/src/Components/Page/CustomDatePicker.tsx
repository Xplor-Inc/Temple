import React from "react";
import ReactDatePicker from "react-datepicker";
import { Utility } from "../Service/Utility";
import CustomDatePickerInput from "./CustomDatePickerInput";

interface IDatePickerProps {
    selectedDate?: Date | null,
    setValue: React.Dispatch<React.SetStateAction<Date>>,
    placeholder?:string
}

const CustomDatePicker = (props: IDatePickerProps) => {
    const { selectedDate, setValue } = props;
    return (
        <ReactDatePicker placeholderText={ props.placeholder} className='form-control'
            onChange={(date) => { if (date) setValue(date) }}
            value={Utility.Format.Date_DD_MMM_YYYY(selectedDate)}
            selected={Utility.Validate.Date(selectedDate?.toDateString())}
            maxDate={new Date()} customInput={<CustomDatePickerInput />} />
    )
}

export default CustomDatePicker;
