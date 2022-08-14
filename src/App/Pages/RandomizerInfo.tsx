import { useRecoilValue } from 'recoil'
import { Cow } from '../../Datalayer/Cow'
import { randomizationsState } from '../../dataStructure'

export const RandomizerInfo: React.FC = () => {
  let randomization = useRecoilValue(randomizationsState)[0]
  let str = '' //hier ook terug wegdoenzonder Jpanel
  str +=
    "You've selected " +
    randomization.size().toString() +
    ' ' +
    randomization.mode()

  let data = randomization.getData()
  let res: string[] = []
  if (data.length != 0) {
    for (var koeOrfarm of data) {
      let tempStr = ''
      //welke mode
      if (koeOrfarm instanceof Cow) {
        tempStr += koeOrfarm.toString()
        if (
          koeOrfarm.getsVaccin() ||
          koeOrfarm.getsNOVaccin() ||
          koeOrfarm.hasHighChallenge() ||
          koeOrfarm.hasLowChallenge()
        ) {
          tempStr += ' !!! WARNING !! already assigned some properties'
        }
      } else {
        //welke mode
        tempStr += koeOrfarm.toString()
        //hier moeten dus eventueel de andere details ook afgeprint worden
      }
      //hier moeten dus eventueel de andere details ook afgeprint worden
      res.push(tempStr)
    }
  }
  return (
    <>
      <div>{str}</div>
      {res.map((val: string) => {
        return <div>{val}</div>
      })}
    </>
  )
}
