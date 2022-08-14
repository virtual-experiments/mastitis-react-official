import { useRecoilValue } from 'recoil'
import { Cow } from '../../Datalayer/Cow'
import { Farm } from '../../Datalayer/Farm'
import { farmState } from '../../dataStructure'

interface CowProps {
  farmId?: string
  cowId?: string
}

export const CowInfo: React.FC<CowProps> = (props: CowProps) => {
  // const [appState, setAppState] = useRecoilState<AppState>(recoilState)
  let farms = useRecoilValue(farmState)
  let selectedFarm = farms.find((f: Farm) =>
    props.farmId?.includes(f.getFarmID())
  )

  let selectedCow = selectedFarm
    ?.getCows()
    .find((c: Cow) => c.getCowID() === props.cowId)

  const getVaccinationInfo = (c: Cow): string => {
    if (c.getsVaccin()) {
      //Gets the vaccin
      return 'Gets the vaccin'
    } else if (c.getsNOVaccin()) {
      //Gets NO vaccin
      return 'Gets NO vaccin'
    } else {
      //Vaccin not assigned yet
      return 'Vaccin not assigned yet'
    }
  }

  const getChallengeInfo = (c: Cow): string => {
    if (c.hasHighChallenge()) {
      return 'High Challenge'
    } else {
      if (c.hasLowChallenge()) {
        return 'Low Challenge'
      } else {
        return 'Challenge not assigned yet'
      }
    }
  }

  return (
    <>
      <div>Earnumber: BE{selectedCow?.getCowID()}</div>
      <div>Production: {selectedCow?.initproduction} ml/day</div>
      <div>Parity: {selectedCow?.getParity()}</div>
      <div>Days in lactation: {selectedCow?.getDays()}</div>
      {selectedCow?.isParticipating() ? (
        <>
          <div>Participates !</div>
          <div>{getVaccinationInfo(selectedCow)}</div>
          <div>{getChallengeInfo(selectedCow)}</div>
        </>
      ) : (
        <div>Does NOT participate!</div>
      )}
    </>
  )
}
