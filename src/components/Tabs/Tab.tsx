import React, { Children, forwardRef, useImperativeHandle ,useEffect, useLayoutEffect} from 'react';
import classNames from 'classnames';
import useMinimization from '../../hooks/useMinimization';
import { IRibbonTabGroupProps } from './TabGroup';
import { RibbonDropdown, RibbonDropdownDivider, RibbonDropdownItem, RibbonDropdownMenu, RibbonIconButton } from '..';
import RibbonExpandView from '../Expanded/RibbonExpandView';

export interface IRibbonTabProps {
  active?: boolean;
  className?: string;
  mode?: 'static' | 'default';
  label?: string;
  children?: React.ReactNode;
  ismin?: boolean;
  limit?:number;
}

function revert(element:any){
    // console.log(element,'as');
    if(element.dataset.original==='tabSubGroup'){
        if(element.classList.contains('tabSubGroup-min')){
            element.classList.remove('tabSubGroup-min');
            element.classList.add('ribbon-sub-group');
        }
        let arr=element.children;
        let n= element.childElementCount;
        for(let i=0;i<n;i++){
            revert(arr[i]);
        }
    }
    else if(element.dataset.original==='button'){
        if(element.classList.contains('ribbon-icon-button')){
            element.classList.remove('ribbon-icon-button');
            element.classList.add('ribbon-button');
        }
    }
    else if(element.classList.contains('dropdown')){
        let firstEle = element.firstChild;
        if(firstEle.dataset.original==='button'){
            if(firstEle.classList.contains('ribbon-icon-button')){
                firstEle.classList.remove('ribbon-icon-button');
                firstEle.classList.add('ribbon-button');
            }
        }
    }
    else if(element.classList.contains('ribbon-icon-button') || element.classList.contains('ribbon-tool-button') || element.classList.contains('check-group') || element.classList.contains('radio-group') || element.classList.contains('title')){

    }
    else{
        let n=element.childElementCount;
        let arr=element.children;
        for(let i=0;i<n;i++){
            revert(arr[i]);
        }
    }
}

const RibbonTab = forwardRef<HTMLDivElement, IRibbonTabProps>(
  ({ active, className, children, ismin = false,limit }, ref) => {
      
    const [menuRef,extraElements, hiddenEls, isExpanderReq,needed] = useMinimization(ismin);
    
    useImperativeHandle(ref, () => menuRef.current!);
    const classes = classNames('ribbon-section', className, { active });
    console.log(menuRef.current,'fa');
    useLayoutEffect(() => {
        if(!ismin){
            console.log(extraElements,hiddenEls,'ss');
        }
        if(!ismin && extraElements.length>0){
            extraElements.forEach((ele:any)=>{
                revert(ele);
            })
            console.log(menuRef.current.children,"cc");
          extraElements.forEach((el: any) => {
            console.log(menuRef.current?.children[menuRef.current.childElementCount - 2 -1],"ina");
            if (menuRef.current?.children[menuRef.current.childElementCount  - 2 -1]) {
              menuRef.current.children[menuRef.current.childElementCount - 2-1].appendChild(el);
            }
           
          });
          console.log(menuRef.current,"cur");
        }
        if (!ismin && hiddenEls.length > 0) {
            hiddenEls.forEach((ele:any)=>{
                revert(ele);
            })
          let minus=-2;
          if(menuRef.current.children[menuRef.current.childElementCount-2].classList.contains('group')){
            minus=-1;
          }
          console.log(menuRef.current,menuRef.current.children[menuRef.current.childElementCount+minus],'gx');
          hiddenEls.forEach((el: any) => {
            if (menuRef.current) {
              menuRef.current.insertBefore(el,menuRef.current.children[menuRef.current.childElementCount+minus]);
            }
          }); 
          
        }
     
    }, [ismin, hiddenEls,extraElements,isExpanderReq]);
    // console.log(needed,"req");
    // useLayoutEffect(()=>{
    //     if(needed!==null && !ismin && (menuRef.current!==null || menuRef.current!==undefined)){
    //         console.log(needed,'z');
    //         while (menuRef.current.firstChild) {
    //             menuRef.current.removeChild(menuRef.current.firstChild);
    //           }
    //         menuRef.current.appendChild(needed);
    //         console.log(menuRef.current,'z2');
    //     }
    // },[needed,ismin])

    // useEffect(()=>{
    //   if(!ismin){
    //     let sum=0;
    //     if(menuRef.current!==null || menuRef.current!==undefined){
    //       let arr= menuRef.current.children;
    //       let n=menuRef.current.childElementCount;
    //       for(let i=0;i<n;i++){

    //       }
    //     }
    //   }
    // },[ismin])

    const newDiv= document.createElement('div');
    extraElements.forEach((element:any)=>{
      newDiv.appendChild(element);
    })
    return (
      <div ref={menuRef} className={classes}>
        {children}

        {isExpanderReq &&
            <RibbonDropdown>
              <RibbonIconButton caption='expand' />
              <RibbonDropdownMenu>
                {
                  extraElements.length>0 && 
                  <>
                  <RibbonExpandView elements={newDiv} partial_element={true} />
                  <RibbonDropdownDivider />
                  </>
                }
              {hiddenEls.map((element:any,ind:number)=>(
                  <RibbonExpandView elements={element} key={ind} />
              ))}
              </RibbonDropdownMenu>
            </RibbonDropdown>
    }
      </div>
    );
  }
);
export default RibbonTab;