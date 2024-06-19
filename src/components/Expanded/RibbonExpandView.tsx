

import RibbonButtonGroup from '../ButtonGroup/ButtonGroup';
import RibbonDropdown from '../Dropdown/Dropdown';
import { RibbonDropdownDivider ,RibbonDropdownItem,RibbonDropdownMenu} from '../DropdownMenu';

import React, { ReactNode, useEffect, useRef ,useCallback, createElement} from 'react'
import ExpandMore from './ExpandMore';


import "./Expanded.less"
export interface IRibbonExpandView {
  elements:HTMLElement,
  partial_element?:boolean,
  handleChange?:any
};

var mappedElement:any=[];
function rec(element:HTMLElement){
  let jsxElement;
  if(element.classList.contains('radio-group')){
    let n=element.childElementCount;
   
    let active:number[]=[];
    let curElements=[]
    let funcElements:any=[];
    let uniqueClass :string | undefined=undefined;

    for (let i = 0; i < element.classList.length; i++) {
      if (element.classList[i].startsWith('dis-')) {
        uniqueClass=element.classList[i];
      }
    }
    for(let i=0;i<n;i++){
      if(element.children[i].classList.contains('active')){
        active.push(i+1);
      }
      
      let onClick:any = undefined;
      if((element.children[i] as HTMLElement).dataset.onclick!=='' && (element.children[i] as HTMLElement).dataset.onclick!=='function () { [native code] }'){
        let htmlEle=(element.children[i] as HTMLElement);

        onClick=eval(htmlEle.dataset.onclick as string);

      }
      funcElements.push(onClick);
      curElements.push(element.children[i]);
    }
 

    let onButtonClick=undefined;
    if(element.dataset.onclick!==''){
      onButtonClick=eval(element.dataset.onclick as string);
    }  
   

    jsxElement = (
      <>
    <RibbonButtonGroup className={uniqueClass as string} active={active} onButtonClick={onButtonClick} radio>
        {curElements.map((cur,ind)=>(
          <RibbonDropdownItem caption={(cur.querySelector('.caption') as HTMLElement).innerText as string} key={ind} onClick={funcElements[ind]}/>
        ))}
      </RibbonButtonGroup>
      <RibbonDropdownDivider />
        </>
    )
   
  }
  else if(element.classList.contains('check-group')){
    let n=element.childElementCount;
   
  
    let active=[];
    let curElements=[]
    let funcElements:any[]=[];
    let uniqueClass=null;
    for (let i = 0; i < element.classList.length; i++) {
      if (element.classList[i].startsWith('dis-')) {
        uniqueClass=element.classList[i];
      }
    }
    for(let i=0;i<n;i++){
      if(element.children[i].classList.contains('active')){
        active.push(i+1);
      }
     
      let onClick:any = undefined;
      if((element.children[i] as HTMLElement).dataset.onclick !=='' && (element.children[i] as HTMLElement).dataset.onclick!=='function () { [native code] }'){
        onClick=eval((element.children[i] as HTMLElement).dataset.onclick as string);
        // onClick=new Function('return '+element.children[i].dataset.onclick)();
      }
      funcElements.push(onClick);
      curElements.push(element.children[i]);
    }
    let onButtonClick=undefined;
    if(element.dataset.onclick!==''){
      onButtonClick=eval(element.dataset.onclick as string);
    }  

   jsxElement = (<>
   <RibbonButtonGroup className={uniqueClass as string} active={active} onButtonClick={onButtonClick}>
        {curElements.map((cur,ind)=>(
          
          <RibbonDropdownItem caption={(cur.querySelector('.caption') as HTMLElement).innerText} key={ind} onClick={funcElements[ind]}/>
          
        ))}
      </RibbonButtonGroup>
      <RibbonDropdownDivider />
        </>
   )
  //  console.log(curElements,"fa");

  }
  else if(element.classList.contains('ribbon-icon-button')){
    let func:any= undefined;
    if(element.dataset.onclick!=='' && element.dataset.onclick!=='function () { [native code] }'){
      func=eval(element.dataset.onclick as string);
    }
    jsxElement= <RibbonDropdownItem caption={(element.querySelector('.caption') as HTMLElement).innerText} onClick={func} />
  }
  else if(element.classList.contains('ribbon-tool-button')){
    let func:any=undefined;
    if(element.dataset.onclick!=='' && element.dataset.onclick!=='function () { [native code] }'){
      func=eval(element.dataset.onclick as string);
    }
    jsxElement= <RibbonDropdownItem caption={(element.querySelector('.caption') as HTMLElement).innerText} onClick={func} />
  }
  else if(element.classList.contains('dropdown')){
    const src= element.children[0];
    const drop=element.children[1].children[0] ;
    const dropText = drop.innerHTML;
    let n=drop.childElementCount;
    let forTraverse=[]
    for(let i=0;i<n;i++){
      forTraverse.push(drop.children[i]);
    }
    
    jsxElement= (<RibbonDropdown>
      <RibbonDropdownItem caption={(src.querySelector('.caption') as HTMLElement).innerText}  />
      <RibbonDropdownMenu className='dropdown-left'>
        {
          forTraverse.map((dropItem:any,ind:number)=>(
            <ExpandMore item={dropItem} key={ind} />
          ))
        }
      </RibbonDropdownMenu>
    </RibbonDropdown>
    )
  }
  else if(element.classList.contains('tabSubGroup-min')){
    let n=element.childElementCount;
    for(let i=0;i<n;i++){
      rec(element.children[i] as HTMLElement);
    }
  }
  mappedElement.push(jsxElement);
}




function RibbonExpandView({elements,partial_element=false,handleChange}:IRibbonExpandView) {

  useEffect(() => {
    document.addEventListener('click', handleChange);
    return () => {
      document.removeEventListener('click', handleChange);
    };
  }, []); 

  mappedElement=[];
  let n = elements.childElementCount ;

  for(let i=0;i<n-1;i++){
    rec(elements.children[i] as HTMLElement);
  }


  return (
    <>
        <RibbonDropdownItem className='bold remove-hover' caption={`${partial_element?'More':''} ${(elements.children[elements.childElementCount-1] as HTMLElement).innerText}`} />
        {mappedElement.map((ele:any,ind:number)=>(
          <React.Fragment key={ind} >
            {ele}
          </React.Fragment>
        ))}
    
    </>
  )
}

export default RibbonExpandView