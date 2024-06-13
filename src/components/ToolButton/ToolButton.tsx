import classNames from "classnames";
import React, {FC} from "react";
import {Icon} from "../helpers/Icon";
import {Image} from "../helpers/Image";

import "./ToolButton.less"
import { Caption } from "../helpers/Caption";

export interface IRibbonToolButtonProps {
    className?: string,
    icon?: string,
    image?: string,
    children?: any
    title?: string,
    onClick?: any,
    hotkey?: string,
    caption?:string
}

const RibbonToolButton: FC<IRibbonToolButtonProps> = ({caption,hotkey = "", children, className, title = '', icon, image, onClick, ...rest}) => {
    const classes = classNames(
        "ribbon-tool-button",
        className
    )
    console.log("max",onClick);
    return (
        <button data-original={'tool-button'} data-onclick={onClick?onClick.toString():''}   className={classes} title={title} {...rest} onClick={onClick} data-hotkey={hotkey}>
            {children}
            
            {
                caption && (
                    <Caption className="hidden" caption={caption} />
                )
            }
            {icon && (
                <Icon name={icon} />
            )}

            {image && (
                <Image src={image} />
            )}
        </button>
    )
}

export default RibbonToolButton