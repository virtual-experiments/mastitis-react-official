import { Cow } from './Cow'
import { Randomization } from './Randomization'

/**
 * The class who represents the properties of the farm.
 */
export class Farm {
  /****************************  attributes  *************************/
  //name: String
  ID: number //public voor foto's op te halen
  private static letfarm = 0.006 //de letiantie waarmee de randomfactor van de boerderij bepaald wordt
  //private static final Random r = new Random();// moet hier staan anders krijgen we dikwijls hetzelfde random getal
  //nodig in klasse cow om de totale randomfactor per koe te bepalen
  ran: number //this factor is needed to add a random factor in the calculation, and it has to be done only 1 time
  private BNO: number
  private AAmilk: boolean

  private cows: Cow[] = []

  /**************************  constructors **************************/
  /**
   * @param id The unique identification-number of the farm
   * @param AA Produces this farm AAmilk?
   * @param prod the milk production in a year
   */
  //this method is adapted after the API's are generated !! (and hence this is newer than all the docs)
  //because some changes had to been done the very last minute:
  //the random factor of the farm is constant see "//ranweg" in comment
  constructor(id: number, AA: boolean, prod: number, r: number) {
    //ranweg
    this.ID = id
    this.AAmilk = AA
    this.BNO = prod
    this.ran = r
    //ranweg  ran = r.nextGaussian();
    //ranweg  ran = ran * Math.sqrt(letfarm);
  }

  /*****************************   methods  **************************/
  /**
   * This method returns a String representation of the farm.
   */
  //moet zo noemen voor Jtree
  toString(): String {
    return 'Farm nr ' + this.getFarmID()
  } // end toString

  /**
   * This method returns a String representation of ID off the Farm
   */
  //nodig voor in datasetDialog daar kunnen we de tostring niet gebruiken door die farm nr...
  getFarmID(): String {
    return this.ID.toString()
  } //end getFarmID

  /**
   * This method returns a String representation of the BNO off the farm
   */
  //nodig voor in datasetDialog
  getBNO(): String {
    return this.BNO.toString()
  } //end getBNO

  /**
   * This method returns a boolean if the farm produces AAmilk
   */
  //nodig voor in datasetDialog
  getAAmilk(): boolean {
    return this.AAmilk
  } //end getAAmilk
  /**
   * This method returns the existing cows.
   * @return in a Vector
   */
  getCows(): Cow[] {
    return this.cows
  } // end getCows

  /**
   * This method adds a cow to the farm.
   */
  addCow(koe: Cow): void {
    this.cows.push(koe)
  } //end addCow

  /**
   * This method counts the cows of this farm that are participating !
   * @return the number of cows that are participating
   */
  numberOfParticipatingCows(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.isParticipating()) tel++
    }
    return tel
  }

  /**
   * Gives the number of cows, who're not necesarry participating in the experiment,
   * but allready have a vaccin, or NO vaccin.
   */
  //nodig in showVaccinWarning (klasse:Randomization)
  numberOfVaccins(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.getsVaccin() || koe.getsNOVaccin()) tel++
    }
    return tel
  }

  /**
   * Gives the number of cows, who're not necesarry participating in the experiment,
   * but allready get a high or a low Challenge.
   */
  //nodig in showChallengeWarning (klasse:Randomization)
  numberOfChallenges(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.hasLowChallenge() || koe.hasHighChallenge()) tel++
    }
    return tel
  }

  /**
   * This method returns the details of the farm.
   * Th farm ID , total milk production, if they produce AA-Milk.
   * How many cows are participating and a crosstable of their properties.
   * The layout is ready to use in a JLabel.
   */
  getHTMLDetails(): String {
    return (
      "<html><body align='center'>" +
      toString() +
      '<br>BNO:  ' +
      this.getBNO() +
      '<br>AAmilk?:    +' +
      this.AAmilk +
      '<br>' + //?"True":"False"
      'The number of cows participating in the experiment:   ' +
      this.numberOfParticipatingCows() +
      '<table><tr><td></td><td>Number of Vaccinated Cows:</td><td>Number of NOT Vaccinated Cows:</td></tr>' +
      "<tr><td>Number of High Challenges:</td><td align='center'>" +
      this.numberOfVacinatedHighChallengeCows() +
      "</td><td align='center'>" +
      this.numberOfNOTVacinatedHighChallengeCows() +
      "</td></tr><td>Number of Low Challenges:</td><td align='center'>" +
      this.numberOfVacinatedLowChallengeCows() +
      "</td><td align='center'>" +
      this.numberOfNOTVacinatedLowChallengeCows() +
      '</td></tr></table>'
    )
  } // end getHTMLDetails

  /**
   * Gives the number of cows, who're participating in the experiment,
   * get the Vaccin and get a High Challenge.
   */
  private numberOfVacinatedHighChallengeCows(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.getsVaccin() && koe.hasHighChallenge() && koe.isParticipating())
        tel++
    }
    return tel
  }

  /**
   * Gives the number of cows, who're participating in the experiment,
   * get the Vaccin and get a Low Challenge.
   */
  private numberOfVacinatedLowChallengeCows(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.getsVaccin() && koe.hasLowChallenge() && koe.isParticipating())
        tel++
    }
    return tel
  }

  /**
   * Gives the number of cows, who're participating in the experiment,
   * get NO Vaccin and get a Low Challenge.
   */
  private numberOfNOTVacinatedLowChallengeCows(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.getsNOVaccin() && koe.hasLowChallenge() && koe.isParticipating())
        tel++
    }
    return tel
  }

  /**
   * Gives the number of cows, who're participating in the experiment,
   * get NO Vaccin and get a High Challenge.
   */
  private numberOfNOTVacinatedHighChallengeCows(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.getsNOVaccin() && koe.hasHighChallenge() && koe.isParticipating())
        tel++
    }
    return tel
  }

  /**
   * Indicates if every cow in this farm allready has a high Challenge.
   * (The cows must not necessary be in the experiment.)
   */
  //nodig voor het enablen van de buttons op farm niveau
  allHighChallenge(): boolean {
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (!koe.hasHighChallenge()) return false
    }
    return true
  }

  /**
   * Indicates if every cow in this farm allready has a low Challenge.
   * (The cows must not necessary be in the experiment.)
   */
  //nodig voor het enablen van de buttons op farm niveau
  allLowChallenge(): boolean {
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (!koe.hasLowChallenge()) return false
    }
    return true
  }
  /**
   * Indicates if every cow in this farm allready gets a vaccin.
   * (The cows must not necessary be in the experiment.)
   */
  //nodig voor het enablen van de buttons op farm niveau
  allVaccin(): boolean {
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (!koe.getsVaccin()) return false
    }
    return true
  }

  /**
   * Indicates if every cow in this farm allready gets NO Vaccin.
   * (The cows must not necessary be in the experiment.)
   */
  //nodig voor het enablen van de buttons op farm niveau
  allNOVaccin(): boolean {
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (!koe.getsNOVaccin()) return false
    }
    return true
  }

  /**
   * Gives the number of randomizations of vaccins in which cows of this farm are involved.
   */
  //voor feedback
  hasVaccinRandomizations(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.getsNOVaccin() || koe.getsVaccin()) {
        if (koe.vaccin!.randomized()) tel++
      }
    }
    return tel
  }

  /**
   * Gives the number of randomizations of challenges in which cows of this farm are involved.
   */
  //voor feedback
  hasChallengeRandomizations(): number {
    let tel = 0
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (koe.hasHighChallenge() || koe.hasLowChallenge()) {
        if (koe.challenge!.randomized()) tel++
      }
    }
    return tel
  }

  /**
   * This method sets the Challenge of EVERY cow in this farm.(even if it isn't participating yet)
   * @param chal true is high challenge, low is false
   * @param ran is the link to the randomization (when this property is manually set, null has to be passed)
   */
  setChallenge(chal: boolean, ran: Randomization): void {
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      koe.setChallenge(chal, ran)
    }
  } // end setChallenge

  /**
   * This method adds all the cows of the farm to the experiment.
   * @result When some cow (not in experiment)allready had a property assigned, the value true is returned
   */
  //nieuw liesbeth, laatste wijziging for warning als je remove en add doet!
  addAllToExperiment(): boolean {
    let result = false
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      if (!koe.isParticipating()) {
        //anders dan krijgen de reeds toegevoegde ook warning
        if (
          koe.getsNOVaccin() ||
          koe.getsVaccin() ||
          koe.hasLowChallenge() ||
          koe.hasHighChallenge()
        ) {
          result = true
        } //warning
        koe.addToExperiment()
      }
    }
    return result
  } // end addALLtoexp

  /**
   * This method removes all the cows of this farm out of the experiment.
   *(even if they weren't in the experiment)
   */
  removeAllOutOfExperiment(): void {
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      koe.removeOutOfExperiment()
    }
  } // end removeALL

  /**
   * This method sets the Vaccin of EVERY cow in this farm.(even if it isn't participating yet)
   * @param ja : true if vaccin, else false
   * @param ran is the link to the randomization (when this property is manually set, null has to be passed)
   */
  setVaccin(ja: boolean, ran: Randomization): void {
    for (let i = 0; i < this.cows.length; i++) {
      let koe = this.cows[i]
      koe.setVaccin(ja, ran)
    }
  } // end setVaccin

  //   /**
  // 	 * This method tests if the two farms are equal.
  // 	 * Farms are equal if and only if their ID is the same.
  // 	 */
  //    //nodig bij het aanmaken van boerderijen
  // 	equals(Object obj):boolean{
  // 		try
  // 			{Farm other = (Farm)obj;
  // 			return (this.ID==other.ID);}
  //  		catch (Exception e)
  //  			{return false;}
  // 	}//end equals
}