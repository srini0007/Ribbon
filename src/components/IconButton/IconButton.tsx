import classNames from "classnames";
import React, {FC} from "react";
import {Icon} from "../helpers/Icon";
import {Image} from "../helpers/Image";
import {Caption} from "../helpers/Caption";

import "./IconButton.less"

export interface IRibbonIconButtonProps {
    className?: string,
    icon?: string,
    image?: string,
    caption?: string,
    children?: any,
    onClick?: any,
    hotkey?: string,
    title?: string,
}

const RibbonIconButton: FC<IRibbonIconButtonProps> = ({title, hotkey = "", children, className, icon, image, caption, onClick, ...rest}) => {
    const classes = classNames(
        "ribbon-icon-button",
        className
    )
    return (
        <button data-original={'icon-button'}  data-onclick={onClick?onClick.toString():''}   className={classes} {...rest} onClick={onClick} title={title} data-hotkey={hotkey}>
            {children}

            {icon && (
                <Icon name={icon} />
            )}

            {image && (
                <Image src={image} />
            )}

            {caption && (
                <Caption caption={caption} />
            )}
        </button>
    )
}

export default RibbonIconButton