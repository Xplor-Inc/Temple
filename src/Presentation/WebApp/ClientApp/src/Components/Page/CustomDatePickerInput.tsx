import React from "react";

const CustomDatePickerInput = React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((props, ref) => {
    return <input type="text" className="form-control"
        onClick={props.onClick}
        ref={ref}
        onChange={props.onChange}
        value={props.value}
        readOnly
        placeholder={props.placeholder }
        style={{ backgroundColor: "white" }} />
});

export default CustomDatePickerInput;