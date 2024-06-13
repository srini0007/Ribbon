

import RibbonButtonGroup from '../ButtonGroup/ButtonGroup';
import RibbonDropdown from '../Dropdown/Dropdown';
import { RibbonDropdownDivider ,RibbonDropdownItem,RibbonDropdownMenu} from '../DropdownMenu';

import RibbonIconButton from '../IconButton/IconButton';
import React, { ReactNode, useEffect, useRef } from 'react'
import ExpandMore from './ExpandMore';
import classNames from 'classnames';

import "./Expanded.less"
export interface IRibbonExpandView {
  elements:any,
  partial_element?:boolean,
};

var cur:any=[];
function rec(element:any){
  let temp;
  if(element.classList.contains('radio-group')){
    let n=element.childElementCount;
    let arr=element.children;
    // console.log(arr);
    let active=[];
    let cur_elements=[]
    let func_elements=[]
    for(let i=0;i<n;i++){
      if(arr[i].classList.contains('active')){
        active.push(i+1);
      }
      let x:any = undefined;
      if(arr[i].dataset.onclick!=='' && arr[i].dataset.onclick!=='function () { [native code] }'){
        // x=new Function('return '+arr[i].dataset.onclick)();
        x=eval(arr[i].dataset.onclick);

      }
      func_elements.push(x);
      cur_elements.push(arr[i]);
    }
    // console.log(func_elements);
    temp = (
      <>
    <RibbonButtonGroup active={active} radio>
        {cur_elements.map((cur,ind)=>(
          <RibbonDropdownItem caption={cur.querySelector('.caption').innerText} key={ind} onClick={func_elements[ind]}/>
        ))}
      </RibbonButtonGroup>
      <RibbonDropdownDivider />
        </>
    )
    // console.log(cur_elements,"fa");
  }
  else if(element.classList.contains('check-group')){
    let n=element.childElementCount;
    let arr=element.children;
    // console.log(arr);
    let active=[];
    let cur_elements=[]
    let func_elements=[];

    for(let i=0;i<n;i++){
      if(arr[i].classList.contains('active')){
        active.push(i+1);
      }
      let x:any = undefined;
      if(arr[i].dataset.onclick!=='' && arr[i].dataset.onclick!=='function () { [native code] }'){
        x=eval(arr[i].dataset.onclick);
        // x=new Function('return '+arr[i].dataset.onclick)();
      }
      func_elements.push(x);
      cur_elements.push(arr[i]);
    }
    // console.log(func_elements);
   temp = (<>
   <RibbonButtonGroup active={active} >
        {cur_elements.map((cur,ind)=>(
          
          <RibbonDropdownItem caption={cur.querySelector('.caption').innerText} key={ind} onClick={func_elements[ind]}/>
          
        ))}
      </RibbonButtonGroup>
      <RibbonDropdownDivider />
        </>
   )
  //  console.log(cur_elements,"fa");

  }
  else if(element.classList.contains('ribbon-icon-button')){
    let func:any= undefined;
    if(element.dataset.onclick!==''){
      func=eval(element.dataset.onclick);
    }
    temp= <RibbonDropdownItem caption={element.querySelector('.caption').innerText} onClick={func} />
  }
  else if(element.classList.contains('ribbon-tool-button')){
    let func:any=undefined;
    if(element.dataset.onclick.length>0){
      func=eval(element.dataset.onclick);
    }
    temp= <RibbonDropdownItem caption={element.querySelector('.caption').innerText} onClick={func} />
  }
  else if(element.classList.contains('dropdown')){
    const src= element.children[0];
    const drop=element.children[1].children[0] ;
    const dropText = drop.innerHTML;
    let n=drop.childElementCount;
    // console.log(drop,n);
    let forTraverse=[]
    for(let i=0;i<n;i++){
      forTraverse.push(drop.children[i]);
    }
    
    temp= (<RibbonDropdown>
      <RibbonDropdownItem caption={src.querySelector('.caption').innerText}  />
      <RibbonDropdownMenu>
        {
          forTraverse.map((dropItem:any,ind:number)=>(
            <ExpandMore item={dropItem} key={ind} />
          ))
        }
      </RibbonDropdownMenu>
    </RibbonDropdown>
    )
    // console.log(temp,"a");
    // return;
  }
  else if(element.classList.contains('tabSubGroup-min')){
    let n=element.childElementCount;
    for(let i=0;i<n;i++){
      rec(element.children[i]);
    }
  }
  cur.push(temp);
}

function RibbonExpandView({elements,partial_element=false}:IRibbonExpandView) {
  cur=[];
  let n = elements.childElementCount;
  for(let i=0;i<n-1;i++){
    rec(elements.children[i]);
  }
  
    // console.log(elements[elements.childElementCount-1],"as");
  return (
    <>
        <RibbonDropdownItem className='bold remove-hover' caption={`${partial_element?'More':''} ${elements.children[elements.childElementCount-1].innerText}`} />
        {cur.map((ele:any)=>(
          ele
        ))}
    
    </>
  )
}

export default RibbonExpandView