import { useLayoutEffect, useState, RefObject,useRef } from "react";
import React from "react";
interface IUseMinimizationProps {
  ismin: boolean;
  limit:number;
}


const traverse = (child:any,arr:any[])=>{
    if(child.classList.contains('radio-group')){
        arr.push(child);
    }
    else if(child.classList.contains('check-group')){
        arr.push(child);
    }
    else if(child.classList.contains('ribbon-icon-button')){
        arr.push(child);
    }
    else if(child.classList.contains('dropdown')){
        arr.push(child);
    }
    else if(child.classList.contains('ribbon-tool-button')){
      arr.push(child);
  }
    else if(child.classList.contains('title')){
        //nothing
    }
    else if(child.classList.contains('tabSubGroup-min')){
        arr.push(child);
    }
    else{
        const cur_arr=child.children;
        let n=child.childElementCount;
        for(let i=0;i<n;i++){
            traverse(cur_arr[i],arr);
        }
    }
}


const useMinimization = (ismin: boolean,limit:number):any[]  => {
  const menuRef = useRef<HTMLDivElement>(null);
  
    const [hiddenEls, setHiddenEles] = useState<any[]>([]);
    const [extraElements,setExtraElements]= useState<any[]>([]);
    const [isExpanderReq, setIsExpReg] = useState<boolean>(false);
    const [needed,setNeeded] = useState<any>(null);
    const cnt=useRef(1);

    const changeClass=(element:any)=>{
      if(element.classList.contains('radio-group')){
        for(let i=element.classList.length-1;i>=0;i--){
          if(element.classList[i].startsWith('dis-')){
            element.classList.remove(element.classList[i]);
          }
        }
        element.classList.add(`dis-${cnt.current}`);
        cnt.current++;
      }
      else if(element.classList.contains('check-group')){
        for(let i=element.classList.length-1;i>=0;i--){
          if(element.classList[i].startsWith('dis-')){
            element.classList.remove(element.classList[i]);
          }
        }
        element.classList.add(`dis-${cnt.current}`);
        cnt.current++;
      } 
      else if(element.classList.contains('ribbon-sub-group')){
        let n=element.childElementCount;
        let arr=element.children;
        for(let i=0;i<n;i++){
            changeClass(arr[i]);
        }
      }
      else if(element.classList.contains('group')){
        let n=element.childElementCount;
        let arr=element.children;
        for(let i=0;i<n;i++){
            changeClass(arr[i]);
        }
      }
    }

    useLayoutEffect(() => {
      if (menuRef.current && ismin) {
        let aggWidth = 0;
        let portalElements: HTMLElement[] = [];
        let indiv_ele:any[] =[];
        const screenWidth = (document.querySelector('.content-holder') as HTMLElement).offsetWidth;
        let range=screenWidth-100;
        let temp =menuRef.current.cloneNode(true);
        // if(limit>=0){
        //   range=limit;
        // }

        // const arr=menuRef.current.children;
        // React.Children.map(menuRef.current,(ele:any,idx:any)=>{
        // })
        
        menuRef.current.childNodes.forEach((childeNode: ChildNode) => {
          
          if (childeNode instanceof HTMLElement) {
            let excess= childeNode.querySelector('.excess-dropdown');
            if(excess!==null ){
                    // means it has dropdown element for expand , so we should not remove it 
            }
            else{
              const nodeWidth = childeNode.offsetWidth;
              
              let ele= childeNode.children[0] as HTMLElement;  // first element of parent
              if(aggWidth>19000 || (aggWidth+ele.offsetWidth>range) ){
                  portalElements.push(childeNode);
                  // childeNode.remove();
                  aggWidth=20000;
                  changeClass(childeNode);
                  setIsExpReg(true);
              }
              else if (aggWidth + nodeWidth > range) {
                  let temp:any[]=[];
                  traverse(childeNode,temp);
                  changeClass(childeNode);

                  for(let i=0;i<temp.length;i++){
                      aggWidth+=temp[i].offsetWidth;
                      if(aggWidth>range){
                          temp[i].remove();
                          indiv_ele.push(temp[i]);
                      }
                  }
                  indiv_ele.push(childeNode.children[childeNode.childElementCount-1]);
                  // portalElements.push(childeNode);

                  // childeNode.remove();
                  setIsExpReg(true);
                  aggWidth=20000;
              } else {
                  setIsExpReg(false);
              }
              aggWidth = aggWidth + nodeWidth;
          }
          }
        });
        portalElements.forEach((to_remove:any)=>{
            to_remove.remove();
        })
        setHiddenEles(portalElements);
        setExtraElements(indiv_ele);
      }
      else{
        const clonedElement = menuRef.current?.cloneNode(true);   
        setNeeded(clonedElement);    // tried for copying all elements for the maximized screen , but not working
        setHiddenEles([]);
        setExtraElements([]);
        setIsExpReg(false);
      }
    }, [ismin, menuRef,limit]);
    return [menuRef, extraElements,hiddenEls, isExpanderReq,needed ];
  };
  
  export default useMinimization;