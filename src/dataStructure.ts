import { RecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { atom, selector } from 'recoil'
import internal from 'stream';
import { Cow } from './Datalayer/Cow';
import { Farm } from './Datalayer/Farm';
import { Randomization } from './Datalayer/Randomization';

export type Routes = '/' | '/page-1' | '/page-2' | '/page-3'

export interface AppState {
  farms: Farm[],
  selection: Randomization,
  oldRandomizations: Randomization[],
  randoms: number[],
}
let randoms = [-0.07022498184960764,0.04796494933433866,-0.010072486586236397,0.019132378278865957,-0.03412289532774289,0.1388998953162051,-0.1428124937849067,0.14101729409651317,-0.11846248571855009,0.16621409399264014];

export enum LocalStorageKey {
  APP_STATE = 'APP_STATE',
}

// function LoadAppStateFromLocalStorage(): AppState {
//   // const stringifiedJSON: string | null = window.localStorage.getItem(
//   //   LocalStorageKey.APP_STATE
//   // )
//   // if (typeof stringifiedJSON === 'string') {
//   //   const Loaded: AppState = JSON.parse(stringifiedJSON)
//   //   return Loaded
//   // }

//   //      this.loadData();


//   const BlankAppState: AppState = {
//     farms: [],
//     selection: new Randomization(),
//     oldRandomizations: [],
//     randoms: []
//   }

//   return BlankAppState
// }

// export const recoilState: RecoilState<AppState> = atom({
//   default: LoadAppStateFromLocalStorage(),
//   key: 'initialAppState',
// })

export const farmState: RecoilState<Farm[]> = atom({
  default: [] as Farm[],
  key: 'farmState',
})
export const randomizationsState: RecoilState<Randomization[]> = atom({
  default: [new Randomization],
  key: 'randomizationsState',
})
export const selectionState: RecoilState<Randomization> = selector({
  key: 'selectionState',
  get: ({get}) => get(randomizationsState)[0],
  set: ({set}, dum) => set(randomizationsState, prevState => [new Randomization, ...prevState])
})

  /**
  * Loads the data without file. (for offline work) 
  */
  const loadData = ():void => {  
    let [FState, setFState] = useRecoilState(farmState)

    let ra=0;
    let farmIDs = [1342,1342,1342,1342,1342,1342,1342,1342,1342,1342,1342,1342,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,6605,4000,4000,4000,4000,4000,4000,4363,4363,4363,4363,4363,4363,4363,4363,6490,6490,6490,6490,6490,6490,6490,6490,6490,6490,1684,1684,1684,1684,1684,1684,    1684,1684,1684,1684,1684,1684,1684,2240,2240,2240,2240,2240,2240,2240,2240,2240,2240,2240,2240,2240,2240,2240,2240,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,6348,3370,
    3370,3370,3370,3370,3370,3370,3370,3370,3370,4517,4517,4517,4517,4517,4517,4517,4517,4517];
    let farmBNOs = [79575,79575,79575,79575,79575,79575,79575,79575,79575,79575,79575,79575,76991,76991,76991,    76991,76991,76991,76991,76991,76991,76991,
    76991,76991,76991,76991,76991,76991,76991,76991,66331,66331,66331,66331,
    66331,66331,87017,87017,87017,87017,87017,87017,87017,87017,73932,73932,73932,73932,73932,73932,73932,73932,
    73932,73932,82570,82570,82570,82570,82570,82570,82570,82570,82570,82570,82570,82570,82570,71336,71336,71336,71336,71336,71336,71336,71336,71336,71336,71336,71336,1336,
    71336,71336,71336,77008,77008,77008,77008,77008,77008,77008,77008,77008,77008,77008,77008,77008,77008,77008,7008,77008,
    77008,77008,77008,91363,91363,91363,91363,91363,91363,91363,91363,91363,91363,86362,86362,86362,86362,86362,86362,86362,86362,86362];
    let cowData = [[1,30,6990],[1,60,14996],[1,38,12616],[1,44,11440],[11,53,15166],[8,50,14273],
    [6,57,20763],[7,52,14832],[6,54,20844],[5,55,17299],[4,41,16154],[4,39,15483],[1,42,5880],[1,40,11880],[1,59,17340],[1,32,8448],[1,59,9391],
    [1,54,13656],[9,37,13579],[7,57,9633],[6,35,7280],[6,50,17299],[6,36,11412],[5,41,9635],[6,56,15208],[5,49,17521],
    [6,52,11364],[5,46,7820],[5,54,18468],[5,38,15466],[1,52,12696],[1,53,12084],[5,40,11840],[5,38,11172],[6,30,7200],
    [5,32,9792],[1,52,15132],[1,48,18336],[1,50,17750],[7,54,25568],[7,46,18474],[5,33,13596],[5,58,27235],[5,31,11873],
    [1,60,13547],[1,40,15080],[1,42,10962],[2,57,17484],[2,53,12243],[2,49,15813],[2,37,13727],[2,43,11524],[2,35,10465],
    [2,34,12478],[1,49,9079],[1,50,11050],[1,57,15276],[1,54,8228],[7,45,12915],[7,43,8772],[5,33,9240],
    [5,60,18835],[6,54,16092],[4,30,7560],[5,53,16377],[5,52,16693],[7,41,14678],[1,43,11094],[1,49,12152],[1,38,7942],[1,54,12096],[1,60,17160],
    [8,53,24380],[6,60,21180],[5,53,22485],[6,45,16920],[5,60,16200],[6,50,18200],[5,41,15088],[5,48,19392],[6,39,12246],
    [6,47,16309],[6,45,13455],[1,40,11920],[1,50,14500],[1,57,15132],[1,35,10080],[1,41,10906],[1,53,10814],[8,55,11000],[7,36,6840],
    [6,36,12096],[6,58,14870],[5,33,10890],[5,35,9450],[4,40,11520],[4,30,7740],[5,45,17190],[4,39,10062],[4,36,12744],[5,50,16400],
    [4,42,20412],[5,38,16188],[1,59,17968],[1,53,13992],[1,54,11988],[6,44,19360],[6,42,13608],[5,58,24108],[4,46,20332],
    [5,44,20680],[4,43,16684],[4,58,25288],[1,55,17050],[1,52,13728],[1,57,13778],[9,30,10680],[9,59,21631],[8,31,11594],[7,56,16128],
    [10,43,11266],[7,52,16023]];

    for (let i=0; i<122;i++){
        let cowID = i+1;
        let farmID = farmIDs[i];
        let boerderij = searchFarm(farmID);
				if (boerderij==undefined){//als de boerderij nog niet bestaat inlezen
  				 let farmAA = false; 
          if (farmID!=1684) farmAA = true; else farmAA=false;	
          let farmBNO = farmBNOs[i];
      		boerderij = new Farm(farmID,farmAA,farmBNO,randoms[ra++]);
        //	boerderij.AAmilk=farmAA;boerderij.BNO=farmBNO;//??

          setFState([boerderij, ...FState])
				}

        let cowpar = cowData[i][0];
        let cowdim  = cowData[i][1];
				let cowprod  = cowData[i][2];
        let earnr = farmID*10000+cowID;
				let koe = new Cow(earnr,cowpar,cowdim,cowprod,boerderij); 	
        boerderij.addCow(koe);
			} //end for
   }//end loadData

	/**
	 * Give the number of farms, who're allready participating in the experiment.
	 */
	const numberOfParticipatingFarms = ():number =>{
    let FState = useRecoilValue(farmState)
		let tel=0;

    for (let boer of FState) {
      if (boer.numberOfParticipatingCows()>0) tel++;
    }
		return tel;
	}

  	/**
	 * This method tests if there is a farm with this ID,
	 * then it returns the existing farm out of the Vector.
	 * When there isn't one , returns null.
	 * @return the existing farm with the required ID, null when there wasn't one 
	 */
	 const searchFarm= (ID:number):Farm|undefined =>{
    // TODO: mogelijks fout, idk
    let FState = useRecoilValue(farmState)
    return FState.find( (f:Farm) => f.ID==ID);
		// let boerderij = new Farm(ID,false,0,1);
		// try {
		// 	return ((Farm)farms.elementAt(farms.indexOf(boerderij)));
		// 	}
		// catch (ArrayIndexOutOfBoundsException aioe)//als de boerderij niet bestaat geeft indexOF -1 terug en dan gooit elementAt een exception
		// 	{return null;}
	}// end searchFarm	

loadData()