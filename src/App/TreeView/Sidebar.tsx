import React from 'react'
import { farmState, randomizationsState, Routes } from '../../dataStructure'
import Navigation, { NavItemProps } from './Navigationbar'
import { useRecoilValue } from 'recoil'
import { Cow } from '../../Datalayer/Cow'
import { Farm } from '../../Datalayer/Farm'
import { AppProps } from '../..'

const Sidebar: React.FC<AppProps> = (props) => {
  function getNavigationList(): NavItemProps[] {
    let FState = useRecoilValue(farmState)
    let tree: NavItemProps[] = [
      {
        title: 'Region view',
        itemId: '/',
        elemBefore: () => <img src=".././images/kaart.gif" height="40px" />,
      },
    ]

    let data = FState.map((f: Farm) => {
      return {
        title: 'Farm nr ' + f.getFarmID(),
        itemId: '/' + f.getFarmID(),
        subNav: cowsToNavbar(f.getFarmID(), f.getCows()),
        elemBefore: () => <img src=".././images/koefarm.gif" height="35px" />,
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
  let randomization = useRecoilValue(randomizationsState)[0]

  return cows.map((c: Cow) => {
    let icon = 'icon'
    if (c.isParticipating()) {
      //de koe DOET MEE aan experiment
      if (randomization.hasThis(c))
        //koe zit in randomizer:
        icon += 'R'
      //koe zit niet in randomizer
      else icon += 'S'
      if (c.getsVaccin())
        //koe krijgt WEL vaccin
        icon += 'V'
      if (c.getsNOVaccin())
        // de koe krijgt GEEN vaccin
        icon += 'N'
      if (c.hasHighChallenge())
        //HOOG
        icon += 'H'
      if (c.hasLowChallenge())
        //LAAG
        icon += 'L'
    }

    icon += '.gif'
    return {
      title: 'BE' + c.getCowID(),
      itemId: '/' + prevId + '/' + c.getCowID(),
      elemBefore: () => <img src={'.././images/' + icon} height="30px" />,
    }
  })
}

export default Sidebar
