import React from 'react'
import RibbonButtonGroup  from '../ButtonGroup/ButtonGroup';
import { RibbonDropdownItem } from '../DropdownMenu';
import { RibbonDropdownDivider } from '../DropdownMenu';


interface IExpandMore{
    item:HTMLElement,
}

function ExpandMore({item}:IExpandMore) {
    let jsxElement;
    if(item.classList.contains('radio-group')){
        // console.log(item.children);
        let active=[];
        let curElements=[];
        let funcElements:any[]=[];

        // console.log(item.children,item,"ga")
        for(let i=0;i<item.childElementCount;i++){
          if(item.children[i].classList.contains('active')){
            active.push(i+1);
          }
          curElements.push(item.children[i]);
          let onClick:any = undefined;
          if((item.children[i] as HTMLElement).dataset.onclick!=='' && (item.children[i] as HTMLElement).dataset.onclick!=='function () { [native code] }'){
            // onClick=new Function('return '+item.children[i].dataset.onclick)();
            onClick=eval((item.children[i] as HTMLElement).dataset.onclick as string);

          }
          funcElements.push(onClick);
          curElements.push(item.children[i]);
        }
        
        let onButtonClick=undefined;
        if(item.dataset.onclick!==''){
          onButtonClick=eval(item.dataset.onclick as string);
        }  
        jsxElement = (
          <>
        <RibbonButtonGroup active={active} radio onButtonClick={onButtonClick}>
            {curElements.map((cur,ind)=>(
              <RibbonDropdownItem caption={(cur.children[0] as HTMLElement).innerText} key={ind} onClick={funcElements[ind]}/>
            ))}
          </RibbonButtonGroup>
          
            </>
        )
        return jsxElement;
      }
      else if(item.classList.contains('check-group')){
        let active=[];
        let curElements=[]
        let funcElements:any[]=[];

        for(let i=0;i<item.childElementCount;i++){
          if(item.children[i].classList.contains('active')){
            active.push(i+1);
          }
          let onClick:any = undefined;
          if((item.children[i] as HTMLElement).dataset.onclick!=='' && (item.children[i] as HTMLElement).dataset.onclick!=='function () { [native code] }'){
            // onClick=new Function('return '+item.children[i].dataset.onclick)();
            onClick=eval((item.children[i] as HTMLElement).dataset.onclick as string);

          }
          funcElements.push(onClick);
          curElements.push(item.children[i]);
          
        }
        let onButtonClick=undefined;
        if(item.dataset.onclick!==''){
          onButtonClick=eval(item.dataset.onclick as string);
        }  
        
       jsxElement = (<>
       <RibbonButtonGroup active={active} onButtonClick={onButtonClick}>
            {curElements.map((cur,ind)=>(
              <RibbonDropdownItem caption={(cur.children[0] as HTMLElement).innerText} key={ind} onClick={funcElements[ind]}/>
            ))}
        </RibbonButtonGroup>
            </>
       )
       return jsxElement;
    
      }
      else if(item.classList.contains('divider')){
        jsxElement=<RibbonDropdownDivider />
        return jsxElement;
      }
      else{
        let func:any= undefined;
        if(item.dataset.onclick!==''){
          func=eval(item.dataset.onclick as string);
        }
        return <RibbonDropdownItem caption={(item.children[0] as HTMLElement).innerText} onClick={func} />
      }
  return (
    <></>
  )
}

export default ExpandMore