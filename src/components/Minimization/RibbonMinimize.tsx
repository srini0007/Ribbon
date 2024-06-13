import React from 'react'
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import './RibbonMinimize.less'
interface IRibbonMinimize{
    isMinimized:boolean,
    onClick?:()=>any,

    [key:string]:any

}

function RibbonMinimize({isMinimized,onClick,...rest}:IRibbonMinimize) {
  return (
    <>
    {isMinimized ?(
        <FaChevronDown onClick={onClick} {...rest} className={'ribbon-minimize-icon'}/>
        ):(
        <FaChevronUp onClick={onClick} {...rest} className={'ribbon-minimize-icon'}/>
        )
    }
    </>
  )
    

}

export default RibbonMinimize