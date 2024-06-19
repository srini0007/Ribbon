import { useLayoutEffect, useState, RefObject,useRef, useEffect } from "react";
import React from "react";


// interface IReturnUseMinimization{
//   menuRef:
// }


const OVERFLOWED = 20000;

const traverse = (child:any,arr:any[])=>{
    if(child.classList.contains('radio-group') || child.classList.contains('tabSubGroup-min') || child.classList.contains('check-group') || child.classList.contains('ribbon-icon-button') || child.classList.contains('dropdown') || child.classList.contains('ribbon-tool-button')){
        arr.push(child);
    }
    else if(!child.classList.contains('title')){
        const cur_arr=child.children;
        let n=child.childElementCount;
        for(let i=0;i<n;i++){
            traverse(cur_arr[i],arr);
        }
    }
}

const addNewUniqClass = (element:HTMLElement,uniqNumber:number)=>{
  for(let i=element.classList.length-1;i>=0;i--){
    if(element.classList[i].startsWith('dis-')){
      element.classList.remove(element.classList[i]);
    }
  }
  element.classList.add(`dis-${uniqNumber}`);
}

const useMinimization = (ismin: boolean,limit:number,menuWidth:number):any[]  => {
  const menuRef = useRef<HTMLDivElement>(null);
  
    const [overflowedEls, setOverflowedEls] = useState<HTMLElement[]>([]);
    const [partialOverflowed,setPartialOverflowed]= useState<HTMLElement[]>([]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [needed,setNeeded] = useState<any>(null);
    const countForUniqClass=useRef<number>(1);
    
    const changeClass=(element:HTMLElement)=>{
      if(element.classList.contains('radio-group') || element.classList.contains('check-group')){
        addNewUniqClass(element,countForUniqClass.current);
        countForUniqClass.current++;
      }
      else if(element.classList.contains('ribbon-sub-group') || element.classList.contains('group')){
        let n=element.childElementCount;
        let arr=element.children;
        for(let i=0;i<n;i++){
            changeClass(arr[i] as HTMLElement);
        }
      }
 
    }

    useLayoutEffect(() => {
      if (menuRef.current && ismin) {
        let aggWidth = 0;
        let portalElements: HTMLElement[] = [];    // these are grouped elements that are removed from dom
        let partialOver:HTMLElement[] =[];          // these are partial elements from a group that are removed from dom
        // const screenWidth = (document.querySelector('.content-holder') as HTMLElement).offsetWidth;
        let range=menuWidth-100;
        if(limit>=0){
          range=limit;
        }

        menuRef.current.childNodes.forEach((childeNode: ChildNode) => {
          
          if (childeNode instanceof HTMLElement) {
            let excess= childeNode.querySelector('.excess-dropdown');
            if(excess===null){
              // console.log('travesing');
              const nodeWidth = childeNode.offsetWidth;
              
              let ele= childeNode.children[0] as HTMLElement;  // first element of parent
              if(aggWidth>=OVERFLOWED-1000 || (aggWidth+ele.offsetWidth>range) ){
                  portalElements.push(childeNode);
                  // childeNode.remove();
                  aggWidth=OVERFLOWED;
                  changeClass(childeNode);
                  setIsExpanded(true);
              }
              else if (aggWidth + nodeWidth > range) {
                  let htmlElements:any[]=[];
                  traverse(childeNode,htmlElements);
                  changeClass(childeNode);
                  let hasElement:boolean=false;
                  for(let i=0;i<htmlElements.length;i++){
                      aggWidth+=htmlElements[i].offsetWidth;
                      if(aggWidth>range){
                          htmlElements[i].remove();
                          partialOver.push(htmlElements[i]);
                          hasElement=true;
                      }
                  }
                  if(hasElement){  // if its true then there is one element that has been overflowed

                    partialOver.push(childeNode.children[childeNode.childElementCount-1] as HTMLElement);  // adding tab group title
                  }
                  // portalElements.push(childeNode);

                  // childeNode.remove();
                  setIsExpanded(true);
                  aggWidth=OVERFLOWED;
              } 
              else{
                setIsExpanded(false);
              }
              aggWidth = aggWidth + nodeWidth;
          }
          }
        });
        portalElements.forEach((to_remove:any)=>{
            to_remove.remove();
        })
        setOverflowedEls(portalElements);
        setPartialOverflowed(partialOver);
      }
      else{
        const clonedElement = menuRef.current?.cloneNode(true);   
        setNeeded(clonedElement);    // tried for copying all elements for the maximized screen , but not working
        setOverflowedEls([]);
        setPartialOverflowed([]);
        setIsExpanded(false);
      }
      
    }, [ismin, menuRef.current,menuWidth,limit]);
    return [menuRef, partialOverflowed,overflowedEls, isExpanded,needed ];
  };
  
  export default useMinimization;