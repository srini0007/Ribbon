import React, {Children, cloneElement, useState} from "react";
import classNames from "classnames";

import "./Dropdown.less"

export interface IRibbonDropdownProps {
    children?: React.ReactNode
    open?: boolean
}

export interface IRibbonDropdownState {
    isOpen: boolean
}

class RibbonDropdown extends React.Component<IRibbonDropdownProps, IRibbonDropdownState>{
    state: IRibbonDropdownState = {
        isOpen: false
    }

    private readonly dropdown: any

    constructor(props: IRibbonDropdownProps) {
        super(props);

        this.state = {
            isOpen: false
        }
        this.dropdown = React.createRef();
        this.toggleState = this.toggleState.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount(){
        document.addEventListener("mousedown", this.handleClickOutside)
    }

    componentWillUnmount(){
        document.removeEventListener("mousedown", this.handleClickOutside)
    }

    handleClickOutside (e: Event) {
        // @ts-ignore
        if (this.dropdown.current && !this.dropdown.current.contains(e.target)) {
            this.setState({
                isOpen: false,
            })
        }
    }

    toggleState(e: Event){
        const openState = this.state.isOpen;
        const dropdown = this.dropdown.current
        const dropObject = dropdown.querySelector(".drop-object")
        const rectDropdown = dropdown.getBoundingClientRect()
        const position = getComputedStyle(dropObject)["position"]

        if (position === "fixed") {
            dropObject.style.top = (rectDropdown.top + rectDropdown.height) + "px"
            dropObject.style.left = (rectDropdown.left-180) + "px"
        }

        this.setState({
            isOpen: !openState
        });

        e.preventDefault();
    }

    render(){
        const {children} = this.props
        const [toggle, menu] = Children.toArray(children)
        const {isOpen} = this.state
        const classes = classNames(
            'dropdown',
            isOpen ? 'dropped' : ''
        )


        return (
            <div data-original={'dropdown'} className={classes} ref={this.dropdown}>
                {/*@ts-ignore*/
                    toggle && cloneElement(toggle, {
                        /*@ts-ignore*/
                        className: ( "props" in toggle && toggle.props.className ? toggle.props.className : '') + ' dropdown-toggle ' + (isOpen ? ' drop-active active-toggle ' : ''),
                        onClick: this.toggleState,
                })}

                <nav className={`drop-object ` + (isOpen ? ' open ' : '')}>
                    {menu}
                </nav>
            </div>
        )
    }
}

export default RibbonDropdown