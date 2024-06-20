import React, {Children, ReactNode, useEffect} from "react";
import classNames from "classnames";
import RibbonTabNav from "../Tabs/TabNav";
import RibbonTab from "../Tabs/Tab";
import { createRef, RefObject } from 'react';
import "./RibbonMenu.less"
import { MinProvider } from "../../context/MinContext";

export interface IRibbonMenuProps {
    children?: React.ReactNode,
    className?: string
}

export interface IRibbonMenuState {
    activeTab: string,
    widthContainer:number,
}

class RibbonMenu extends React.Component<IRibbonMenuProps, IRibbonMenuState> {

    myRef : React.RefObject<HTMLElement>
    divRef : React.RefObject<HTMLDivElement>

    state: IRibbonMenuState = {
        activeTab: '',
        widthContainer:0,
    }

    constructor(props: IRibbonMenuProps) {
        super(props);

        const tabs: any[] = Children.toArray(props.children)
        let staticTabs = -1

        tabs.forEach((tab: any, index: number) => {
            if (tab.props.mode === 'static') {
                staticTabs++
            }
        })

        this.state = {
            activeTab: tabs[staticTabs+1] ? tabs[staticTabs+1].props.label.toLowerCase() : '',
            widthContainer:0,
        }

        this.myRef = React.createRef()
        this.divRef=React.createRef<HTMLDivElement>();
        this.onTabClick = this.onTabClick.bind(this)
        this.windowResize = this.windowResize.bind(this)
        
    }

    componentDidMount() {
        if(this.divRef.current){
            // this.setState=this.divRef.current.offsetWidth;
            this.setState({
                widthContainer:0,
            })
        }
        window.addEventListener("resize",()=>{
         this.windowResize()
         if(this.divRef.current){
            if(this.state.widthContainer!==this.divRef.current.offsetWidth){
                this.setState({
                    widthContainer:this.divRef.current.offsetWidth,
                })
            }
        }
        });
    }

    componentDidUpdate(prevProps: Readonly<IRibbonMenuProps>, prevState: Readonly<IRibbonMenuState>, snapshot?: any): void {

        // window.addEventListener("resize",()=>{

        //     if(this.divRef.current){
        //         this.widthContainer=this.divRef.current.offsetWidth;
        //     }
        // })
        if(this.divRef.current){
            if(this.state.widthContainer!==this.divRef.current.offsetWidth){
                this.setState({
                    widthContainer:this.divRef.current.offsetWidth,
                })
            }
        }
        
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.windowResize)
      
      
    }

    windowResize(){
        const menu: any = this.myRef.current
        const menuRect = menu.getBoundingClientRect()
        const width = menuRect.width
        const sections = menu.querySelectorAll(".ribbon-section.active")

        sections.forEach((s: any )=> {
            const groups = Array.from(s.querySelectorAll(".group"))
            const move = groups.filter((g: any, index)=>{
                const {x, width: w} = g.getBoundingClientRect()
                const inView = width > x + w
                return !inView
            })
        })
    }

    renderTabs(): React.ReactNode {
        // @ts-ignore
        const { children = [] } = this.props;
        // @ts-ignore
        const { activeTab } = this.state;

        // @ts-ignore
        return Children.map(children, (el: React.ReactElement, index)=>{
            const {mode, label} = el.props
         
            return (
                <RibbonTabNav
                    key={index}
                    index={index}
                    staticTab={mode && mode === 'static'}
                    label={label}
                    active={activeTab.toLowerCase() === label.toLowerCase()}
                    onClick={this.onTabClick}
                />
            )
        })
    }

    renderSections(): React.ReactNode {
        // @ts-ignore
        const { children = [] } = this.props;
        // @ts-ignore
        const { activeTab } = this.state;
        
        

        return Children.map(children, (el, index)=>{
            // @ts-ignore
            const {label, children,ismin,limit} = el.props
            return (
                <RibbonTab menuWidth={this.state.widthContainer} limit={limit} key={index} ismin={ismin} label={label.toLowerCase()} active={activeTab === label.toLowerCase()}>
                    {children}
                </RibbonTab>
            )
        })
    }

    onTabClick(e: any){
        const staticTab = e.target.getAttribute('data-static') === 'true'
        let label = e.target.getAttribute('data-label')
        if (staticTab) {
            return
        }
        if(label===null){
            label=e.target.firstChild.getAttribute('data-label');
        }
        this.setState({
            activeTab: label
        })
    }

    render(){
        // @ts-ignore
        const {children, className, ...attrs} = this.props
        
        const classes = classNames(
            `ribbon-menu`,
            className
        )

        return (// @ts-ignore
        <MinProvider>

            <nav className={classes} {...attrs} ref={this.myRef}>
                <ul className={`tabs-holder`}>
                    {this.renderTabs()}
                </ul>

                <div ref={this.divRef} className={`content-holder`}>
                    {this.renderSections()}
                </div>
            </nav>
        </MinProvider>
        )
    }
}

export default RibbonMenu