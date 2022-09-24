import { Farm } from '../../Datalayer/Farm'

interface RequestFormat {
  method: string
  headers: object
  body: string
}

interface DataFormat {
  headers: string[]
  data: (string | number | boolean)[][]
}

export const postFarmsToServer = (farms: Farm[]) => {
  const Json: DataFormat = {
    headers: [
      'FarmID',
      'CowID',
      'AAmilk',
      'BNO',
      'nDayLact',
      'Parity',
      'Challenge',
      'Vaccine',
      'Initmilk',
      'Finalmilk',
    ],
    data: [],
  }

  let dat = []
  for (var farm of farms) {
    for (var cow of farm.getCows()) {
      if (cow.participates) {
        dat.push({
          FarmID: farm.getFarmID(),
          CowID: cow.getCowID(),
          AAmilk: farm.getAAmilk(),
          BNO: farm.getBNO(),
          nDayLact: cow.getDays(),
          Parity: cow.getParity(),
          Challenge: cow.hasHighChallenge() ? 'HIGH' : 'LOW',
          Vaccine: cow.getsVaccin() ? 'YES' : 'NO',
          Initmilk: cow.initproduction,
          Finalmilk: cow.productionafter,
        })
      }
    }
  }

  //   Json.data = dat

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dat),
  }
  fetch('http://localhost:9000/api', requestOptions).then((response) =>
    response.json()
  )
  // .then(data => this.setState({ postId: data.id }));
}
