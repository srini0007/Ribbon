import { useLayoutEffect, useState, RefObject,useRef } from "react";
import React from "react";
interface UseMinimizationProps {
  ismin: boolean;

}


function traverse(child:any,arr:any[]){
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


const useMinimization = (ismin: boolean): any => {
  const menuRef = useRef<HTMLDivElement>(null);

    const [hiddenEls, setHiddenEles] = useState<any[]>([]);
    const [extraElements,setExtraElements]= useState<any[]>([]);
    const [isExpanderReq, setIsExpReg] = useState<boolean>(false);
    const [needed,setNeeded] = useState<any>(null);
    useLayoutEffect(() => {
        let c=0;
      if (menuRef.current && ismin) {
        let aggWidth = 0;
        let portalElements: HTMLElement[] = [];
        let indiv_ele:any[] =[];
        const screenWidth = (document.querySelector('.content-holder') as HTMLElement).offsetWidth;
        const limit=screenWidth-100;
        // const arr=menuRef.current.children;
        // React.Children.map(menuRef.current,(ele:any,idx:any)=>{
        //   console.log(ele,idx,"cxz");
        // })
        
        menuRef.current.childNodes.forEach((childeNode: ChildNode) => {
            console.log(childeNode,'child');
          if (childeNode instanceof HTMLElement) {
            const nodeWidth = childeNode.offsetWidth;
            let ele= childeNode.children[0] as HTMLElement;  // first element of parent
            console.log(ele,ele.onclick,"as");
            if(aggWidth>19000 || (aggWidth+ele.offsetWidth>limit) ){
                // console.log(childeNode,"childnode");
                portalElements.push(childeNode);
                c++;
                // childeNode.remove();
                aggWidth=20000;
                setIsExpReg(true);
            }
            else if (aggWidth + nodeWidth > limit) {
              console.log(childeNode,"childnode2");
                c++;
                
                let temp:any[]=[];
                traverse(childeNode,temp);
                console.log('aq',childeNode);
                for(let i=0;i<temp.length;i++){
                    aggWidth+=temp[i].offsetWidth;
                    if(aggWidth>limit){
                      console.log(temp[i],"childnode3")
                        temp[i].remove();
                        indiv_ele.push(temp[i]);
                    }
                }
                console.log('wq',childeNode);
                console.log(childeNode.children[childeNode.childElementCount-1],"kl")
                indiv_ele.push(childeNode.children[childeNode.childElementCount-1]);
                // portalElements.push(childeNode);

                // childeNode.remove();
                setIsExpReg(true);
                aggWidth=20000;
            } else {
                setIsExpReg(false);
            }
            aggWidth = aggWidth + nodeWidth;
            // console.log(aggWidth,"a");
          }
        });
        console.log('protal',portalElements,menuRef.current.children,c);
        portalElements.forEach((to_remove:any)=>{
            to_remove.remove();
        })
        setHiddenEles(portalElements);
        setExtraElements(indiv_ele);
      }
      else{
        console.log('occuring');
        const clonedElement = menuRef.current?.cloneNode(true);
        setNeeded(clonedElement);
        setHiddenEles([]);
        setExtraElements([]);
        setIsExpReg(false);
      }
    }, [ismin, menuRef]);
    console.log(needed,'x');
    return [menuRef, extraElements,hiddenEls, isExpanderReq,needed ];
  };
  
  export default useMinimization;