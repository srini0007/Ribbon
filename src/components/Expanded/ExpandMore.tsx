import React from 'react'
import RibbonButtonGroup  from '../ButtonGroup/ButtonGroup';
import { RibbonDropdownItem } from '../DropdownMenu';
import { RibbonDropdownDivider } from '../DropdownMenu';


interface IExpandMore{
    item:any
}

function ExpandMore({item}:IExpandMore) {
    let temp;
    if(item.classList.contains('radio-group')){
        let n=item.childElementCount;
        let arr=item.children;
        // console.log(arr);
        let active=[];
        let cur_elements=[];
        let func_elements:any[]=[];

        // console.log(arr,item,"ga")
        for(let i=0;i<n;i++){
          if(arr[i].classList.contains('active')){
            active.push(i+1);
          }
          cur_elements.push(arr[i]);
          let x:any = undefined;
          if(arr[i].dataset.onclick!=='' && arr[i].dataset.onclick!=='function () { [native code] }'){
            // x=new Function('return '+arr[i].dataset.onclick)();
            x=eval(arr[i].dataset.onclick);

          }
          func_elements.push(x);
          cur_elements.push(arr[i]);
        }
        
        let onButtonClick=undefined;
        if(item.dataset.onclick!==''){
          onButtonClick=eval(item.dataset.onclick);
        }  
        temp = (
          <>
        <RibbonButtonGroup active={active} radio onButtonClick={onButtonClick}>
            {cur_elements.map((cur,ind)=>(
              <RibbonDropdownItem caption={cur.children[0].innerText} key={ind} onClick={func_elements[ind]}/>
            ))}
          </RibbonButtonGroup>
          
            </>
        )
        return temp;
      }
      else if(item.classList.contains('check-group')){
        let n=item.childElementCount;
        let arr=item.children;
        // console.log(arr);
        let active=[];
        let cur_elements=[]
        let func_elements:any[]=[];

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
        let onButtonClick=undefined;
        if(item.dataset.onclick!==''){
          onButtonClick=eval(item.dataset.onclick);
        }  
        
       temp = (<>
       <RibbonButtonGroup active={active} onButtonClick={onButtonClick}>
            {cur_elements.map((cur,ind)=>(
              <RibbonDropdownItem caption={cur.children[0].innerText} key={ind} onClick={func_elements[ind]}/>
            ))}
        </RibbonButtonGroup>
            </>
       )
       return temp;
    
      }
      else if(item.classList.contains('divider')){
        temp=<RibbonDropdownDivider />
        return temp;
      }
      else{
        let func:any= undefined;
        if(item.dataset.onclick!==''){
          func=eval(item.dataset.onclick);
        }
        return <RibbonDropdownItem caption={item.children[0].innerText} onClick={func} />
      }
  return (
    <></>
  )
}

export default ExpandMore