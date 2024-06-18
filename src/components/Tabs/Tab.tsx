import React, { Children, forwardRef, useImperativeHandle ,useEffect, useLayoutEffect, useRef} from 'react';
import classNames from 'classnames';
import useMinimization from '../../hooks/useMinimization';
import { IRibbonTabGroupProps } from './TabGroup';
import { RibbonDropdown, RibbonDropdownDivider, RibbonDropdownItem, RibbonDropdownMenu, RibbonIconButton } from '..';
import RibbonExpandView from '../Expanded/RibbonExpandView';
import { FC } from 'react';
export interface IRibbonTabProps {
  active?: boolean;
  className?: string;
  mode?: 'static' | 'default';
  label?: string;
  children?: React.ReactNode;
  ismin?: boolean;
  limit?:number;
}

const revert=(element:any)=>{
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
        // nothing
    }
    else{
        let n=element.childElementCount;
        let arr=element.children;
        for(let i=0;i<n;i++){
            revert(arr[i]);
        }
    }
}


const reAddition = (extraElements:any[],hiddenEls:any[],menuRef:any)=>{

    extraElements.forEach((el: any) => {
        // console.log(d,d.children[menuRef.current.childElementCount -hasDropdown - 2 -1],"deb");
        if (menuRef.current?.children[menuRef.current.childElementCount  - 2 -1]) {
          menuRef.current.children[menuRef.current.childElementCount  - 2-1].appendChild(el);
        }
    });
    let hasDropdown=2;
    if(menuRef.current.children[menuRef.current.childElementCount-2]?.classList.contains('group')){  // if its true , its not having dropdown
      hasDropdown=1;
    }
    hiddenEls.forEach((el: any) => {
      if (menuRef.current) {
        menuRef.current.insertBefore(el,menuRef.current.children[menuRef.current.childElementCount  -hasDropdown ]);
      }
    }); 
}

const findUniqClass=(element:any,match_class:string,ind:number)=>{
  if(element.classList.contains('radio-group')){
    if(element.classList.contains(match_class)){
      let arr:HTMLElement[]=Array.from(element.children);
      for(let i=0;i<arr.length;i++){
        let cur= arr[i];
        if(cur.classList.contains('active')){
          cur.classList.remove('active');
        }
      }
      element.children[ind-1].classList.add('active');
    }
  }
  else if(element.classList.contains('check-group')){
    if(element.classList.contains(match_class)){
      
      if(element.children[ind-1].classList.contains('active')){
        element.children[ind-1].classList.remove('active')
      }
      else{
        element.children[ind-1].classList.add('active')

      }
    }
  } 
  else if(element.classList.contains('ribbon-sub-group')){
    let n=element.childElementCount;
    let arr=element.children;
    for(let i=0;i<n;i++){
        findUniqClass(arr[i],match_class,ind);
    }
  }
  else if(element.classList.contains('group')){
    let n=element.childElementCount;
        let arr=element.children;
        for(let i=0;i<n;i++){
            findUniqClass(arr[i],match_class,ind);
        }
  }
}

const RibbonTab: FC< IRibbonTabProps>=({ active, className, children, ismin = false,limit =-1} )=> {
    const classes = classNames('ribbon-section', className, { active });
      useLayoutEffect(()=>{
        if(ismin){
            reAddition(extraElements,hiddenEls,menuRef);
        }
      },[limit,ismin])
    const [menuRef,extraElements, hiddenEls, isExpanderReq] = useMinimization(ismin,limit);
    
    useLayoutEffect(() => {
       
        if(!ismin ){
            extraElements.forEach((ele:any)=>{
                revert(ele);
            })
            hiddenEls.forEach((ele:any)=>{
                revert(ele);
            })
        }
        if (!ismin) {
            reAddition(extraElements,hiddenEls,menuRef);
        }
        
      }, [ismin, hiddenEls,extraElements,isExpanderReq]);
     
    const newDiv= document.createElement('div');   // for conversion , i need to have a parent element at atleast one level
    extraElements.forEach((element:any)=>{
      newDiv.appendChild(element);
    })
    const handleChange=(e:any)=>{
      if(e.target.nodeName==='A'){
        let parentEle = e.target.parentElement.parentElement;
        let unique_class=null;
        for(let i=0;i<parentEle.classList.length;i++){
          if(parentEle.classList[i].startsWith('dis-')){
            unique_class=parentEle.classList[i];
          }
        }
        let index = e.target.parentElement.getAttribute('index');
        if(unique_class===null){
          return;
        }
        extraElements.forEach((ele:any)=>{
          findUniqClass(ele,unique_class,index);

        })
        hiddenEls.forEach((ele:any)=>{
          findUniqClass(ele,unique_class,index);
        })
      }
      
    }
    
    return (
      <div ref={menuRef} className={classes}>
        {children}

        {isExpanderReq &&
            <RibbonDropdown >
              <RibbonIconButton className='excess-dropdown' caption='expand' />
              <RibbonDropdownMenu>
                {
                  extraElements.length>0 && 
                  <>
                  <RibbonExpandView elements={newDiv} partial_element={true} handleChange={handleChange}/>
                  <RibbonDropdownDivider />
                  </>
                }
              {hiddenEls.map((element:any,ind:number)=>(
                  <RibbonExpandView elements={element} partial_element={false} key={ind} handleChange={handleChange}/>
              ))}
              </RibbonDropdownMenu>
            </RibbonDropdown>
    }
      </div>
    );
  }

export default RibbonTab;