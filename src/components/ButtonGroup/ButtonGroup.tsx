import React, { createRef } from "react";
import classNames from "classnames";

import "./ButtonGroup.less"
import useMin from "../../hooks/useMin";
import withMin from "../../hocs/withMin";

export interface IRibbonButtonGroupProps {
    active?: number | number[],
    radio?: boolean,
    children?: React.ReactNode,
    className?: string,
    classNameActive?: string,
    classNameButton?: string,
    style?: any,
    onButtonClick?: any,
    notDropdownGroup?:boolean,
    ismin?:boolean,
    
}

export interface IRibbonButtonGroupState {
    radio: boolean,
    buttons: any,
    
}

class RibbonButtonGroup extends React.Component<IRibbonButtonGroupProps, IRibbonButtonGroupState> {

    state: IRibbonButtonGroupState = {
        radio: false,
        buttons: [],
    }
    private divRef = createRef<HTMLDivElement>();

    constructor(props: IRibbonButtonGroupProps){
        super(props);

        const {active, radio = false} = props
        // console.log(,radio,'e');
        const pressedButtons = [];

        if (typeof active !== "undefined") {
            if (!Array.isArray(active)) {
                pressedButtons.push(active);
            } else {
                active.forEach((ind) => {
                    pressedButtons.push(ind);
                })
            }
        }

        this.state = {
            radio,
            buttons: pressedButtons || [],

        };

        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick(index: number){
        const {children, onButtonClick = () => {}} = this.props;
        const {buttons, radio} = this.state;
        const active = buttons.includes(index);
        const button = React.Children.toArray(children)[index - 1];

        if (!radio) {
            if (!active) {
                buttons.push(index)
            } else {
                buttons.splice(buttons.indexOf(index), 1)
            }

            this.setState({
                buttons: buttons
            });
        } else {
            this.setState({
                buttons: [index]
            });
        }
        if (typeof onButtonClick === 'function')
            onButtonClick(index);
    }
  
    componentDidUpdate(prevProps: Readonly<IRibbonButtonGroupProps>, prevState: Readonly<IRibbonButtonGroupState>, snapshot?: any): void {
        if (this.divRef.current) {
            const divElement = this.divRef.current; 
            const {radio} =this.state;
            const childElements = divElement.children;
            const newButtons: number[] = [];
            Array.from(childElements).forEach((child,index) => {   //assuming there will be no 2 active for radio
              if(child.classList.contains('active')){
                newButtons.push(index+1)
              }
              
            });
            if (JSON.stringify(newButtons) !== JSON.stringify(this.state.buttons)) {
                this.setState({ buttons: newButtons });
              }
        }
    }
  
    render(){
        let {children, className, classNameActive, classNameButton, style,onButtonClick,ismin,notDropdownGroup=false} = this.props;
        const {buttons, radio} = this.state;
        const classes = classNames(
            "ribbon-toggle-group",
            "button-group",
            className,
            radio ? 'radio-group' : 'check-group'
        )
       
         if(notDropdownGroup && ismin){
            style={display:'flex',flexDirection:'row'};
        }
        return (
            <div ref={this.divRef} data-original={'button-group'} data-onclick={onButtonClick?onButtonClick.toString():''} className={classes} style={ style}>
                {
                    React.Children.map(children, (button: any, index: number) => {
                        const props = button.props
                        const correctIndex = index + 1;
                        const isActive = buttons.includes(correctIndex);
                        const buttonClasses = classNames(
                            props.className,
                            classNameButton,
                            isActive ? !classNameActive ? ' active ' : classNameActive : ''
                        )
                        // const {onClick} = props
                        return (
                            React.cloneElement(button, {
                                className: buttonClasses,
                                index: correctIndex,
                                onClick: this.buttonClick.bind(this, correctIndex)
                            })
                        )
                    })
                }
            </div>
        )
    }
}
export default withMin(RibbonButtonGroup);