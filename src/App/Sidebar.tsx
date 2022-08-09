import React, {useEffect, useState} from "react";
import styled, { createGlobalStyle, css } from 'styled-components'
import { Link } from '@reach/router'

import type { Routes } from '../dataStructure'
import Navigation, { NavItemProps } from "./Navigationbar/Navigationbar";

interface Props {
    path: Routes
  }

  interface StyleProp {
    active: boolean
  }

  const SidebarParent = styled.div`
  background: #e6e6e6; //#cf3d2a;
  flex:1;
  
  a {
    text-decoration: none;
  }
  
  & > div {
    width: 250px;
    height: 100vh;
  }
  
  .behind-the-scenes {
    width: 250px;
    
  }
`;

const SidebarItem = styled.div`
  padding: 16px 24px;
  transition: all 0.25s ease-in-out;
  background: ${(res:StyleProp) => res.active ? "#b3b3b3" : ""};
  margin: 4px 12px;
  border-radius: 4px;
  p {
    color: black;
    font-weight: bold;
    text-decoration: none;
  }
  
  &:hover {
    cursor:pointer;
    text-decoration: underline;
    text-decoration-color:black;
    background: #cccccc;
  }
  
  &:hover:not(:first-child) {
    background: #c34a36;
  }
`;

const Sidebar: React.FC<Props> = ({path}) => {
    // const location = history.location;
    // const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
    // const lastActiveIndex = Number(lastActiveIndexString);
    // const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);

    function changeActiveIndex(newIndex: number) {
        // localStorage.setItem("lastActiveIndex", newIndex.toString())
        // setActiveIndex(newIndex)
    }

    function getPath(path: string) {
        if (path.charAt(0) !== "/") {
            return  "/" + path;
        }
        return path;
    }

    useEffect(()=> {
        const activeItem = SidebarItems.findIndex(item=> getPath(item.route) === getPath(location.pathname))
        changeActiveIndex(activeItem);
    }, [location])

    const func = (rt:string):boolean => {
        console.log(rt + ' =>' + (path === rt) as string);
        return path === rt;
    }

    // const changeNav = ({itemId}: {itemId: string}):void => {
    //     path= itemId as Routes;
    // }

    return (
        <>
            {/* <SidebarParent>
                <div style={{position: 'fixed'}}>
                    {
                        SidebarItems.map((item, index)=> {
                            return (
                                <Link to={item.route}>
                                    <SidebarItem key={item.name} active={func(item.route)
                                    }
                                    >
                                        <p>{item.name}</p>
                                    </SidebarItem>
                                </Link>
                            );
                        })
                    }

                </div>
                <div className="behind-the-scenes"/>
            </SidebarParent> */}
            <Navigation activeItemId={path} 
            items={NewSidebarItems}></Navigation>
        </>
    );
}



const NewSidebarItems: NavItemProps[] = [
        {
            title: "Region view",
            itemId: '/'
        },
        {
            title: "Dashboard",
            itemId: '/dashboard',
        },
        {
            title: "Page 1",
            itemId: '/page-1',
            subNav: [
                {
                    title: "Cow 1",
                    itemId: "Cow-1",
                }
            ]
        },
        {
            title: "Page 2",
            itemId: '/page-2'
        },
        {
            title: "Page 3",
            itemId: 'page-3'
        },
]

const SidebarItems = [
    {
        name: "Region view",
        route: '/'
    },
    {
        name: "Dashboard",
        route: '/dashboard',
    },
    {
        name: "Page 1",
        route: '/page-1'
    },
    {
        name: "Page 2",
        route: '/page-2'
    },
    {
        name: "Page 3",
        route: 'page-3'
    },
];

export default Sidebar;
