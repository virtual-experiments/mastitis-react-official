import React, { useEffect, useState } from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import { Link } from '@reach/router'

import { farmState, Routes } from '../dataStructure'
import Navigation, { NavItemProps } from './Navigationbar/Navigationbar'
import { useRecoilValue } from 'recoil'
import { Cow } from '../Datalayer/Cow'
import { Farm } from '../Datalayer/Farm'
import { AppProps } from '..'

interface Props {
  path: string
}

interface StyleProp {
  active: boolean
}

const Sidebar: React.FC<AppProps> = (props) => {
  function getNavigationList(): NavItemProps[] {
    let FState = useRecoilValue(farmState)
    let tree: NavItemProps[] = [{ title: 'Region view', itemId: '/' }]

    let data = FState.map((f: Farm) => {
      let id = 'farm' + f.getFarmID()
      return {
        title: id,
        itemId: '/' + id,
        subNav: cowsToNavbar(id, f.getCows()),
      }
    })
    return tree.concat(data)
  }
  return (
    <>
      <Navigation
        activeItemId={props.path}
        items={getNavigationList()}
      ></Navigation>
    </>
  )
}

function cowsToNavbar(prevId: string, cows: Cow[]): NavItemProps[] {
  return cows.map((c: Cow) => {
    return {
      title: c.getCowID(),
      itemId: '/' + prevId + '/' + c.getCowID(),
    }
  })
}

const NewSidebarItems: NavItemProps[] = [
  {
    title: 'Region view',
    itemId: '/',
  },
  {
    title: 'Dashboard',
    itemId: '/dashboard',
  },
  {
    title: 'Page 1',
    itemId: '/page-1',
    subNav: [
      {
        title: 'Cow 1',
        itemId: 'Cow-1',
      },
    ],
  },
  {
    title: 'Page 2',
    itemId: '/page-2',
  },
  {
    title: 'Page 3',
    itemId: 'page-3',
  },
]

const SidebarItems = [
  {
    name: 'Region view',
    route: '/',
  },
  {
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    name: 'Page 1',
    route: '/page-1',
  },
  {
    name: 'Page 2',
    route: '/page-2',
  },
  {
    name: 'Page 3',
    route: 'page-3',
  },
]

export default Sidebar
