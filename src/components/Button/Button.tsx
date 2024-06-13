import classNames from "classnames";
import React, {FC} from "react";
import {Icon} from "../helpers/Icon";
import {Image} from "../helpers/Image";
import {Caption} from "../helpers/Caption";

import "./Button.less"
import RibbonDropdown from "../Dropdown/Dropdown";

export interface IRibbonButtonProps {
    className?: string,
    title?: string,
    icon?: string,
    image?: string,
    caption?: string,
    children?: any,
    onClick?: any,
    hotkey?: string,
    ismin?:boolean
}

const RibbonButton: FC<IRibbonButtonProps> = ({hotkey = "",title, children, className, icon, image, caption,ismin, onClick, ...rest}:IRibbonButtonProps) => {
    let classes = classNames(
        "ribbon-button",
        className
    )

    if(ismin){
         classes = classNames(
            "ribbon-icon-button",
            className
        )
        
    }
    
    return (
        <button data-original={'button'} data-onclick={onClick?onClick.toString():''} className={classes} onClick={onClick} data-hotkey={hotkey} {...rest} title={title}>
            {children}

            {icon && (
                <Icon name={icon} />
            )}

            {image && (
                <Image src={image} />
            )}

            {caption && (
                <Caption caption={caption}/>
            )}
        </button>
    )
    
}

export default RibbonButton