import React from 'react'
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import './RibbonMinimize.less'
import useMin from '../../hooks/useMin';
interface IRibbonMinimize{
    isMinimized:boolean,
    onClick?:()=>any,

    [key:string]:any

}

function RibbonMinimize({...rest}:IRibbonMinimize) {
  const {ismin,setIsMin} =useMin();
  return (
    <>
    {ismin ?(
        <FaChevronDown onClick={()=>setIsMin(!ismin)} {...rest} className={'ribbon-minimize-icon'}/>
        ):(
        <FaChevronUp onClick={()=>setIsMin(!ismin)} {...rest} className={'ribbon-minimize-icon'}/>
        )
    }
    </>
  )
    

}

export default RibbonMinimize