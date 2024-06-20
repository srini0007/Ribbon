import React, {
  Children,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import classNames from "classnames";
import useMinimization from "../../hooks/useMinimization";
import { IRibbonTabGroupProps } from "./TabGroup";
import {
  RibbonDropdown,
  RibbonDropdownDivider,
  RibbonDropdownItem,
  RibbonDropdownMenu,
  RibbonIconButton,
} from "..";
import RibbonExpandView from "../Expanded/RibbonExpandView";
import { FC } from "react";
import react from "@vitejs/plugin-react";
import parse from "html-react-parser";
import useMin from "../../hooks/useMin";
export interface IRibbonTabProps {
  active?: boolean;
  className?: string;
  mode?: "static" | "default";
  label?: string;
  children?: React.ReactNode;
  ismin?: boolean;
  limit?: number;
  menuWidth: number;
}

enum Dropdown {
  Dropdown = 2,
  noDropdown = 1,
}

const revertClassName = (element: HTMLElement) => {
  // console.log(element,'as');
  if (element.dataset.original === "tabSubGroup") {
    if (element.classList.contains("tabSubGroup-min")) {
      element.classList.remove("tabSubGroup-min");
      element.classList.add("ribbon-sub-group");
    }
    let arr = element.children;
    let n = element.childElementCount;
    for (let i = 0; i < n; i++) {
      revertClassName(arr[i] as HTMLElement);
    }
  } else if (element.dataset.original === "button") {
    if (element.classList.contains("ribbon-icon-button")) {
      element.classList.remove("ribbon-icon-button");
      element.classList.add("ribbon-button");
    }
  } else if (element.classList.contains("dropdown")) {
    let firstEle = element.firstChild as HTMLElement;
    if (firstEle.dataset.original === "button") {
      if (firstEle.classList.contains("ribbon-icon-button")) {
        firstEle.classList.remove("ribbon-icon-button");
        firstEle.classList.add("ribbon-button");
      }
    }
  } else if (
    element.classList.contains("ribbon-icon-button") ||
    element.classList.contains("ribbon-tool-button") ||
    element.classList.contains("check-group") ||
    element.classList.contains("radio-group") ||
    element.classList.contains("title")
  ) {
    // nothing
  } else {
    let n = element.childElementCount;
    let arr = element.children;
    for (let i = 0; i < n; i++) {
      revertClassName(arr[i] as HTMLElement);
    }
  }
};

const reAddition = (
  partialOverflowed: any[],
  overflowedEls: any[],
  menuRef: any
) => {
  partialOverflowed.forEach((el: any) => {
    // console.log(d,d.children[menuRef.current.childElementCount -hasDropdown - 2 -1],"deb");
    if (menuRef.current?.children[menuRef.current.childElementCount - 2 - 1]) {
      menuRef.current.children[
        menuRef.current.childElementCount - 2 - 1
      ].appendChild(el);
    }
  });
  let val = Dropdown.Dropdown;
  if (
    menuRef.current.children[
      menuRef.current.childElementCount - 2
    ]?.classList.contains("group")
  ) {
    // if its true , its not having dropdown
    val = Dropdown.noDropdown;
  }
  overflowedEls.forEach((el: any) => {
    if (menuRef.current) {
      menuRef.current.insertBefore(
        el,
        menuRef.current.children[menuRef.current.childElementCount - val]
      );
    }
  });
};

const modifyOptionsUsingUniqClass = (
  element: any,
  matchClass: string,
  index: number
) => {
  if (element.classList.contains("radio-group")) {
    if (element.classList.contains(matchClass)) {
      let removeClass: HTMLElement[] = Array.from(element.children);
      for (let i = 0; i < removeClass.length; i++) {
        let cur = removeClass[i];
        if (cur.classList.contains("active")) {
          cur.classList.remove("active");
        }
      }
      element.children[index - 1].classList.add("active");
    }
  } else if (element.classList.contains("check-group")) {
    if (element.classList.contains(matchClass)) {
      if (element.children[index - 1].classList.contains("active")) {
        element.children[index - 1].classList.remove("active");
      } else {
        element.children[index - 1].classList.add("active");
      }
    }
  } else if (
    element.classList.contains("ribbon-sub-group") ||
    element.classList.contains("group")
  ) {
    for (let i = 0; i < element.childElementCount; i++) {
      modifyOptionsUsingUniqClass(element.children[i], matchClass, index);
    }
  }
};

const RibbonTab: FC<IRibbonTabProps> = ({
  active,
  className,
  children,
  limit = -1,
  menuWidth,
}) => {
  const classes = classNames("ribbon-section", className, { active });
  const { ismin } = useMin();
  useLayoutEffect(() => {
    if (ismin) {
      reAddition(partialOverflowed, overflowedEls, menuRef);
    }
  }, [limit, ismin, menuWidth]);
  const [menuRef, partialOverflowed, overflowedEls, isExpanded] =
    useMinimization(ismin, limit, menuWidth);

  useLayoutEffect(() => {
    if (!ismin) {
      partialOverflowed.forEach((ele: any) => {
        revertClassName(ele);
      });
      overflowedEls.forEach((ele: any) => {
        revertClassName(ele);
      });
    }
    if (!ismin) {
      reAddition(partialOverflowed, overflowedEls, menuRef);
    }
  }, [ismin, overflowedEls, partialOverflowed, isExpanded]);

  const parentWrap = document.createElement("div"); // for conversion , we need to have a parent element at atleast one level
  partialOverflowed.forEach((element: any) => {
    parentWrap.appendChild(element);
  });

  const handleChange = (e: any) => {
    if (e.target.nodeName === "A") {
      // tag name
      let parentEle = e.target.parentElement.parentElement;
      let uniqueClass = null;
      for (let i = 0; i < parentEle.classList.length; i++) {
        if (parentEle.classList[i].startsWith("dis-")) {
          uniqueClass = parentEle.classList[i];
        }
      }
      let index = e.target.parentElement.getAttribute("index");
      if (uniqueClass === null) {
        return;
      }
      partialOverflowed.forEach((ele: any) => {
        modifyOptionsUsingUniqClass(ele, uniqueClass, index);
      });
      overflowedEls.forEach((ele: any) => {
        modifyOptionsUsingUniqClass(ele, uniqueClass, index);
      });
    }
  };

  return (
    <div ref={menuRef} className={classes}>
      {children}

      {isExpanded && (
        <RibbonDropdown>
          <RibbonIconButton className="excess-dropdown" caption="expand" />
          <RibbonDropdownMenu>
            {partialOverflowed.length > 0 && (
              <>
                <RibbonExpandView
                  elements={parentWrap}
                  partial_element={true}
                  handleChange={handleChange}
                />
                <RibbonDropdownDivider />
              </>
            )}
            {overflowedEls.map((element: any, ind: number) => (
              <RibbonExpandView
                elements={element}
                partial_element={false}
                key={ind}
                handleChange={handleChange}
              />
            ))}
          </RibbonDropdownMenu>
        </RibbonDropdown>
      )}
    </div>
  );
};

export default RibbonTab;
