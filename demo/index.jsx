import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import {MifIcon} from "@metroui/icons";
import {
    RibbonMenu,
    RibbonTab,
    RibbonTabGroup,
    RibbonTabSubGroup,
    RibbonTabDivider,
    RibbonButton,
    RibbonIconButton,
    RibbonToolButton,
    RibbonButtonGroup,
    RibbonDropdown,
    RibbonDropdownMenu,
    RibbonDropdownItem,
    RibbonDropdownCheckItem,
    RibbonDropdownDivider,
    RibbonSplitButton,
    RibbonMinimize
} from "../src/index";

import {MinProvider} from "../src/context/MinContext";

import "./index.less"
import { useRef } from "react";

const App = () => {
    
     const [min,setMin] = useState(false);
    //  const [lim,setLim] = useState(-100);
    //  window.addEventListener('resize',()=>{
    //     setLim(window.innerWidth-276);
    //  })
    
    return (
        <section className={`container-fluid`}>
            
            <div className={`container window no-overflow`}>
                <div style={{overflow: "auto"}}>
                    <div>
                
                    <MinProvider>

                        <RibbonMenu>
                            <RibbonTab   mode="static" label="Home"></RibbonTab>
                            <RibbonTab  label="File"  >
                                <RibbonTabGroup title="Push Buttons" >
                                    <RibbonButton caption="Mail" icon="mif-envelop" title="Write Mail" onClick={()=>{alert('Mail Button was Clicked!')}}/>
                                    <RibbonButton caption="Share" icon="mif-share"/>
                                    <RibbonDropdown>
                                        <RibbonButton caption="Apps" icon="mif-apps" title="Applications"/>
                                        <RibbonDropdownMenu>
                                            <RibbonDropdownItem caption="Windows 10" onClick={(e)=>{console.log(e)}}/>
                                            <RibbonDropdownItem caption="Windows 11"/>
                                            <RibbonDropdownItem caption="Office 365"/>
                                            <RibbonDropdownDivider/>
                                            <RibbonButtonGroup active={2}>
                                                <RibbonDropdownItem caption="Windows 10" onClick={(e)=>{console.log(e)}}/>
                                                <RibbonDropdownItem caption="Windows 11"/>
                                                <RibbonDropdownItem caption="Office 365"/>
                                            </RibbonButtonGroup>
                                            <RibbonDropdownDivider/>
                                            <RibbonDropdownDivider/>
                                            <RibbonButtonGroup active={[2]} radio>
                                                <RibbonDropdownItem caption="Windows 10"/>
                                                <RibbonDropdownItem caption="Windows 11"/>
                                                <RibbonDropdownItem caption="Office 365"/>
                                            </RibbonButtonGroup>
                                            <RibbonDropdownDivider/>
                                        </RibbonDropdownMenu>
                                    </RibbonDropdown>
                                </RibbonTabGroup>

                                <RibbonTabGroup title="Icon and Tool buttons">
                                    <RibbonTabSubGroup   style={{width: '70px'}}>
                                        <RibbonIconButton  caption="Mail" icon="mif-envelop"/>
                                        <RibbonIconButton caption="Share" icon="mif-share"/>
                                        <RibbonDropdown>
                                            <RibbonIconButton  caption="Rocket" icon="mif-rocket"/>
                                            <RibbonDropdownMenu>
                                                <RibbonDropdownItem caption="Windows 10"/>
                                                <RibbonDropdownItem caption="Windows 11"/>
                                                <RibbonDropdownItem caption="Office 365"/>
                                            </RibbonDropdownMenu>
                                        </RibbonDropdown>
                                    </RibbonTabSubGroup>

                                    {/* <RibbonTabDivider/> */}

                                    <RibbonTabSubGroup  style={{display: "flex", flexFlow: "row wrap", width: "74px"}}>
                                        <RibbonToolButton caption="Mail" icon="mif-mail" >
                                        </RibbonToolButton>
                                        <RibbonToolButton caption="Share" icon="mif-share"/>
                                        <RibbonToolButton caption="Rocket" icon="mif-rocket"/>
                                        <RibbonToolButton caption="Settings" icon="mif-cogs"/>
                                        <RibbonToolButton caption="Bell" icon="mif-bell"/>
                                        <RibbonToolButton caption="Alarm" icon="mif-alarm"/>
                                        <RibbonDropdown>
                                            <RibbonToolButton caption="Apps" icon="mif-apps"/>
                                            <RibbonDropdownMenu>
                                                <RibbonDropdownItem caption="Windows 10"/>
                                                <RibbonDropdownItem caption="Windows 11"/>
                                                <RibbonDropdownItem caption="Office 365"/>
                                            </RibbonDropdownMenu>
                                        </RibbonDropdown>
                                    </RibbonTabSubGroup>
                                </RibbonTabGroup>

                                <RibbonTabGroup title="Button Groups">

                                    <RibbonButtonGroup notDropdownGroup radio   style={{width: "200px", maxHeight: "88px", }}>
                                        <RibbonIconButton caption="List" icon="mif-list" />
                                        <RibbonIconButton caption="Gear" icon="mif-cog"/>
                                        <RibbonIconButton caption="Barcode" icon="mif-barcode"/>
                                        <RibbonIconButton caption="Bell" icon="mif-bell"/>
                                        <RibbonIconButton caption="Cast" icon="mif-cast"/>
                                        <RibbonIconButton caption="Calculator" icon="mif-calculator2"/>
                                    </RibbonButtonGroup>
                                    
                                    <RibbonButtonGroup notDropdownGroup active={[1, 3]} style={{width: "74px", display: "flex", flexFlow: "row", justifyContent: "center"}}>
                                        <RibbonToolButton  caption="Italic" icon="mif-italic" title="Set italic text"/>
                                        <RibbonToolButton onClick={()=>alert("his")} caption="Bold" icon="mif-bold"/>
                                        <RibbonToolButton caption="Underline" icon="mif-underline" hotkey="ctrl+h"/>
                                    </RibbonButtonGroup>

                                    <RibbonIconButton caption="Gear" icon="mif-cog" onClick={()=>alert("hi")}/>
                                    <RibbonDropdown>
                                            <RibbonIconButton caption="Apps" icon="mif-apps"/>
                                            <RibbonDropdownMenu>
                                                <RibbonButtonGroup active={[2]} radio>
                                                    <RibbonDropdownItem caption="Windows 10"/>
                                                    <RibbonDropdownItem caption="Windows 11"/>
                                                    <RibbonDropdownItem caption="Office 365"/>
                                                </RibbonButtonGroup>
                                                <RibbonDropdownDivider />
                                                <RibbonButtonGroup active={[2]} >
                                                    <RibbonDropdownItem caption="Windows 10"/>
                                                    <RibbonDropdownItem caption="Windows 11"/>
                                                    <RibbonDropdownItem caption="Office 365"/>
                                                </RibbonButtonGroup>
                                                <RibbonDropdownDivider />
                                                <RibbonDropdownItem caption="sasd" />
                                            </RibbonDropdownMenu>
                                    </RibbonDropdown>
                                </RibbonTabGroup>
                                <RibbonTabGroup title="Icon and Tool buttons">
                                    <RibbonTabSubGroup  style={{width: '70px'}}>
                                        <RibbonIconButton  caption="Mail" icon="mif-envelop"/>
                                        <RibbonIconButton caption="Share" icon="mif-share"/>
                                        <RibbonDropdown>
                                            <RibbonIconButton  caption="Rocket" icon="mif-rocket"/>
                                            <RibbonDropdownMenu>
                                                <RibbonDropdownItem caption="Windows 10"/>
                                                <RibbonDropdownItem caption="Windows 11"/>
                                                <RibbonDropdownItem caption="Office 365"/>
                                            </RibbonDropdownMenu>
                                        </RibbonDropdown>
                                    </RibbonTabSubGroup>

                                    {/* <RibbonTabDivider/> */}

                                    <RibbonTabSubGroup  style={{display: "flex", flexFlow: "row wrap", width: "74px"}}>
                                        <RibbonToolButton caption="Mail" icon="mif-mail" >
                                        </RibbonToolButton>
                                        <RibbonToolButton caption="Share" icon="mif-share"/>
                                        <RibbonToolButton caption="Rocket" icon="mif-rocket"/>
                                        <RibbonToolButton caption="Settings" icon="mif-cogs"/>
                                        <RibbonToolButton caption="Bell" icon="mif-bell"/>
                                        <RibbonToolButton caption="Alarm" icon="mif-alarm"/>
                                        <RibbonDropdown>
                                            <RibbonToolButton caption="Apps" icon="mif-apps"/>
                                            <RibbonDropdownMenu>
                                                <RibbonDropdownItem caption="Windows 10"/>
                                                <RibbonDropdownItem caption="Windows 11"/>
                                                <RibbonDropdownItem caption="Office 365"/>
                                            </RibbonDropdownMenu>
                                        </RibbonDropdown>
                                    </RibbonTabSubGroup>
                                    <RibbonButton  caption="Mail" icon="mif-envelop" title="Write Mail" onClick={()=>{alert('Mail Button was Clicked!')}}/>

                                </RibbonTabGroup>
                                    <RibbonMinimize />
                            </RibbonTab>
                            <RibbonTab label="Edit">

                                <RibbonButton caption="sa" />
                            </RibbonTab>
                            <RibbonTab label="View"></RibbonTab>
                        </RibbonMenu>
                        </MinProvider>
                    

                    </div>
                </div>
            </div>
        </section>
    )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />, );