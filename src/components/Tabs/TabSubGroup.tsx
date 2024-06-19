import React, {FC} from "react";
import "./Tab.less"
import useMin from "../../hooks/useMin";
export interface IRibbonTabSubGroupProps {
    children?: React.ReactNode
    style?: any,
    ismin?:boolean,
}

const RibbonTabSubGroup: FC<IRibbonTabSubGroupProps> = ({children, ...rest}) => {
    const {ismin} = useMin();
    if(ismin){
        return (
            <div data-original={'tabSubGroup'} className="tabSubGroup-min">
                {children}
            </div>
        )
    }
    return (
        <div data-original={'tabSubGroup'}  className="ribbon-sub-group " {...rest}>
            {children}
        </div>
    )
}

export default RibbonTabSubGroup