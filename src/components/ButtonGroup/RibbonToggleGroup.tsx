import React from "react";
import ButtonGroup from "./ButtonGroup";


const RibbonToggleGroup = (props:any)=>{
        return <ButtonGroup {...props} notDropdownGroup={true}/>
}

export default RibbonToggleGroup;