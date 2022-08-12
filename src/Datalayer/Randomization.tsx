import { Cow } from './Cow'
import { Experiment } from './Experiment'
import { Farm } from './Farm'

/**
 * This class takes care of the randomization proces.
 * Everytime a randomization is done, we start a new one.
 * In this way, we can later retrieve the randomizations done.
 */
export class Randomization {
  /******************************  attributes  ******************************************/
  private cows?: Cow[] //minstens één van deze 2 moet steeds null zijn !!
  private farms?: Farm[]
  private status: number = -1 //1=randomizeV,2=randomizeC,3=randomizeBoth,0=allreay undone
  /****************************  constructors *******************************************/
  /**
   * At construction time we don' need to know which kind of Randomization it shall be.
   */
  constructor() {}

  /*******************************   methods  *******************************************/
  /**
   * Selects a cow, when there was allready at least one farm selected,
   * this method returns false.
   */
  /**
   * Selects a farm, when there was allready at least one cow selected,
   * this method returns false.
   */
  addToSelection(val: Cow | Farm): boolean {
    // TODO: schrijven zoals het moet in typescript
    if (val instanceof Cow) {
      if (this.farms == null) {
        //we zitten in koemode
        if (this.cows == null) this.cows = [] //om de eerste koe in de koemode te steken
        this.cows.push(val) //
        return true
      }
      return false
    } else if (val instanceof Farm) {
      if (this.cows == null) {
        //we zitten in farm mode
        if (this.farms == null) this.farms = [] //om de eerste boerderij te kunnen toevoegen
        this.farms.push(val)
        return true
      }
      return false
    }
    return false
  } //end addToSelection(Cow koe)

  /**
   * Returns if the cow is selected.
   */
  /**
   * Returns if the farm is selected.
   */
  hasThis(val: Cow | Farm): boolean {
    if (val instanceof Cow) {
      if (this.cows != null)
        for (let i = 0; i < this.cows.length; i++)
          if (this.cows[i].getCowID() === val.getCowID()) return true
      return false
    } else if (val instanceof Farm) {
      if (this.farms != null)
        for (let i = 0; i < this.farms.length; i++)
          if (this.farms[i].ID == val.ID) return true
      return false
    }
    return false
  } //end hasThis

  getRandomValues(amount: number) {
    let getallen: number[] = []
    while (getallen.length < amount) {
      let getal = Math.round(Math.random() * (this.size() - 1))
      if (getallen.indexOf(getal) == -1) getallen.push(getal)
    }
    return getallen
  }

  /**
   * Randomizes the vaccin:
   * of all the selected cows/farms, the computer ramdomly
   * chooses the desired number and gives them the vaccin.
   * It doesn't matter if they allready had one or not,
   * all the other selected cows/farms will get a 'NO vaccin'.
   * the properties of the NOT selected cows/farms doesn't change.
   *
   * It allso shows a dialog(with the results) to warn the user ! If he clicks cancel nothing happens.
   * @param aantal has to be between 0 and the number of selected farms/cows
   */
  randomizeV(aantal: number, exp: Experiment): boolean {
    //eerst stellen we een vector op met 'aantal' verschillende random getalen tussen 0 en size

    let getallen = this.getRandomValues(aantal)
    /*sorry dat ik hier de GUI oproep, maar het moet tussen deze 2 in gebeuren dus ja ... */
    if (this.showVaccinWarning(getallen)) {
      //gaat door ! user zei yes
      //al de geselecteerden niet-vaccineren: //manuele toekenningen worden zo teniet gedaan // toekenneningen via een vroegere randomizatie wordne 'undo' gedaan, in set Vaccin!
      if (this.farms != null) {
        //welke mode
        for (let i = 0; i < this.farms.length; i++) {
          let boe = this.farms[i]
          boe.setVaccin(false, this, exp)
        }
      }
      if (this.cows != null) {
        //welke mode
        for (let i = 0; i < this.cows.length; i++) {
          let koe = this.cows[i]
          koe.setVaccin(false, this, exp)
        }
      }
      //nu gaan we de gerandomiseerden vaccineren:
      for (let i = 0; i < aantal; i++) {
        let get = getallen[i]
        if (this.farms != null) {
          //welke mode
          let boe = this.farms[get]
          boe.setVaccin(true, this, exp)
        }
        if (this.cows != null) {
          //welke mode
          let koe = this.cows[get]
          koe.setVaccin(true, this, exp)
        }
      } //end for
      this.status = 1
      return true
    } //gaat niet door, gebruiker heeft ge "NO't"
    return false
  } //end randomizeVaccin

  /**
   * Randomizes the High Challenge:
   * of all the selected cows/farms, the computer ramdomly
   * chooses the desired number and gives them a HIGH Challenge.
   * It doesn't matter if they allready had a low or high,.
   * All the other selected cows/farms will get a LOW challenge.
   * The properties of the NOT selected cows/farms doesn't change.
   *
   * It allso shows a dialog(with the results) to warn the user ! If he clicks cancel nothing happens.
   * @param aantal has to be between 0 and the number of selected farms/cows
   * @result indicates if a randomization has been done
   */
  randomizeC(aantal: number, exp: Experiment): boolean {
    //eerst stellen we een vector op met 'aantal' verschillende random getalen tussen 0 en size
    let getallen = this.getRandomValues(aantal)

    /*sorry dat ik hier de GUI oproep, maar het moet tussen deze 2 in gebeuren dus ja ... */
    if (this.showChallengeWarning(getallen)) {
      //gaat door !
      //al de geselecteerden een low Challenge geven //manuele toekenningen worden zo teniet gedaan // toekenneningen via een vroegere randomizatie wordne 'undo' gedaan, in setChallenge!
      if (this.farms != null) {
        //welke mode
        for (let i = 0; i < this.farms.length; i++) {
          let boe = this.farms[i]
          boe.setChallenge(false, this, exp)
        }
      }
      if (this.cows != null) {
        //welke mode
        for (let i = 0; i < this.cows.length; i++) {
          let koe = this.cows[i]
          koe.setChallenge(false, this, exp)
        }
      }
      //nu gaan we de gerandomiseerden vaccineren:
      for (let i = 0; i < aantal; i++) {
        let get = getallen[i]
        if (this.farms != null) {
          //welke mode
          let boe = this.farms[get]
          boe.setChallenge(true, this, exp)
        }
        if (this.cows != null) {
          //welke mode
          let koe = this.cows[get]
          koe.setChallenge(true, this, exp)
        }
      } //end for
      this.status = 2
      return true
    } //gaat niet door, gebruiker heeft ge "NO't"
    return false
  } //end randomizeChallenge

  /**
   * Randomizes combinations of challenges and vaccins
   * of all the selected cows/farms, the computer ramdomly
   * chooses the desired number and gives them the combination.
   * It doesn't matter if they allready had properties.
   * All the other selected cows/farms will get the default combination.
   * (Low Challenge-Vaccin)
   * The properties of the NOT selected cows/farms doesn't change.
   *
   * It allso shows a dialog(with the results) to warn the user ! If he clicks cancel nothing happens.
   * @param HiNo: number of High Challenges and No Vaccins
   * @param HiYe: number of High Challenges and Vaccins
   * @param LoNo : number of Low Challenges and No Vaccins
   * the sum of the 3 arguments has to be between 0 and the number of selected farms/cows
   * @result indicates if a randomization has been done
   */
  randomizeVC(
    HiNo: number,
    HiYe: number,
    LoNo: number,
    exp: Experiment
  ): boolean {
    let LoYe = this.size() - HiNo - HiYe - LoNo
    //eerst stellen we 3 vectoren op met 'hino','hiye' en 'lono' verschillende random getalen tussen 0 en size
    let getallenhino: number[] = []
    let getallenhiye: number[] = []
    let getallenlono: number[] = []
    let getallenloye: number[] = []

    while (getallenhino.length < HiNo) {
      let getal = Math.round(Math.random() * (this.size() - 1))
      if (getallenhino.indexOf(getal) == -1) getallenhino.push(getal)
    }

    while (getallenhiye.length < HiYe) {
      let getal = Math.round(Math.random() * (this.size() - 1))
      if (
        getallenhiye.indexOf(getal) == -1 &&
        getallenhino.indexOf(getal) == -1
      )
        getallenhiye.push(getal)
    }

    while (getallenlono.length < LoNo) {
      let getal = Math.round(Math.random() * (this.size() - 1))
      if (
        getallenhiye.indexOf(getal) == -1 &&
        getallenhino.indexOf(getal) == -1 &&
        getallenlono.indexOf(getal) == -1
      )
        getallenlono.push(getal)
    }

    for (let i = 0; i < this.size(); i++) {
      //de resterende koeein/farms komen hier in !
      if (
        getallenhiye.indexOf(i) == -1 &&
        getallenhino.indexOf(i) == -1 &&
        getallenlono.indexOf(i) == -1
      )
        getallenloye.push(i)
    }
    if (getallenloye.length != LoYe) console.log('Foute randomizatie !!')

    /*sorry dat ik hier de GUI oproep, maar het moet tussen deze 2 in gebeuren dus ja ... */
    if (
      this.showCombinationWarning(
        getallenhino,
        getallenhiye,
        getallenlono,
        getallenloye
      )
    ) {
      //gaat door !
      //nu gaan we de combinaties toekennen
      for (let i = 0; i < HiNo; i++) {
        let get = getallenhino[i]
        if (this.farms != null) {
          //welke mode
          let boe = this.farms[get]
          boe.setChallenge(true, this, exp)
          boe.setVaccin(false, this, exp)
        }
        if (this.cows != null) {
          //welke mode
          let koe = this.cows[get]
          koe.setChallenge(true, this, exp)
          koe.setVaccin(false, this, exp)
        }
      } //end HINO

      for (let i = 0; i < HiYe; i++) {
        let get = getallenhiye[i]
        if (this.farms != null) {
          //welke mode
          let boe = this.farms[get]
          boe.setChallenge(true, this, exp)
          boe.setVaccin(true, this, exp)
        }
        if (this.cows != null) {
          //welke mode
          let koe = this.cows[get]
          koe.setChallenge(true, this, exp)
          koe.setVaccin(true, this, exp)
        }
      } //end HIYES

      for (let i = 0; i < LoNo; i++) {
        let get = getallenlono[i]
        if (this.farms != null) {
          //welke mode
          let boe = this.farms[get]
          boe.setChallenge(false, this, exp)
          boe.setVaccin(false, this, exp)
        }
        if (this.cows != null) {
          //welke mode
          let koe = this.cows[get]
          koe.setChallenge(false, this, exp)
          koe.setVaccin(false, this, exp)
        }
      } //end LONO

      for (let i = 0; i < LoYe; i++) {
        let get = getallenloye[i]
        if (this.farms != null) {
          //welke mode
          let boe = this.farms[get]
          boe.setChallenge(false, this, exp)
          boe.setVaccin(true, this, exp)
        }
        if (this.cows != null) {
          //welke mode
          let koe = this.cows[get]
          koe.setChallenge(false, this, exp)
          koe.setVaccin(true, this, exp)
        }
      } //end LoYe
      this.status = 3
      return true
    } //gaat niet door, gebruiker heeft ge "NO't"
    return false
  } //end randomizeVC

  /**
   * This method displays the results of the randomization to ask the user if he's really sure.
   * The result is the answer of the user. This all is done by an option dialog.
   * (When there are older randomizations involved, they have to be undone.)
   * The parameter vaccin consists of all the indexes of cows/farms who are gonna get the vaccin.
   */
  private showVaccinWarning(vaccin: number[]): boolean {
    let msg = ''
    if (this.farms != null) {
      //welke mode
      for (let i = 0; i < this.farms.length; i++) {
        let boe = this.farms[i]
        msg += boe.toString()
        msg += ': '
        if (vaccin.includes(i)) msg += 'wil get a vaccin. '
        else msg += 'wil get NO vaccin. '
        if (boe.numberOfVaccins() != 0) {
          msg +=
            'Warning at least one cow in this farm has allready been assigned a vaccin or NO vaccin!\n When you proceed this property will be lost.'
          if (boe.hasVaccinRandomizations() != 0) {
            msg +=
              '\n This property is set by (an) earlier randomization(s), the whole randomization(s) will be undone !'
          }
        }
        msg += '\n'
      } //end for
    }
    if (this.cows != null) {
      //welke mode
      for (let i = 0; i < this.cows.length; i++) {
        let koe = this.cows[i]
        msg += koe.toString()
        msg += ': '
        if (vaccin.includes(i)) msg += 'wil get a vaccin. '
        else msg += 'wil get NO vaccin. '
        if (koe.getsVaccin()) {
          msg +=
            'Warning this cow has allready a vaccin !\n When you proceed this property will be lost.'
          if (koe.vaccin!.randomized()) {
            msg +=
              '\n This property is set by an earlier randomization, the whole randomization will be undone !'
          }
        }
        if (koe.getsNOVaccin()) {
          msg +=
            'Warning this cow has allready NO vaccin !\n When you proceed this property will be lost.'
          if (koe.vaccin!.randomized()) {
            msg +=
              '\n This property is set by an earlier randomization, the whole randomization will be undone !'
          }
        }
        msg += '\n'
      } //end for
    }
    if (msg !== '') {
      //er is een warning
      // TODO: handle JoptionPane
      //   Object[] options = { "OK", "CANCEL" };
      //   int result = JOptionPane.showOptionDialog(null, msg, "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0]);// geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
      //   if (result==JOptionPane.YES_OPTION) return true;
      //   else return false;
      return false
    } else return true //er is geen warning, is er altijd als er iets inzit :-)
  } //end showvaccinwarning

  /**
   * This method displays the results of the randomization to ask the user if he's really sure.
   * The result is the answer of the user. This all is done by an option dialog.
   * (When there are older randomizations involved, they have to be undone.)
   * The parameter challenge consists of all the indexes of cows/farms who are gonna get a High Challenge.
   */
  private showChallengeWarning(challenge: number[]): boolean {
    let msg = ''
    if (this.farms != null) {
      //welke mode
      for (let i = 0; i < this.farms.length; i++) {
        let boe = this.farms[i]
        msg += boe.toString()
        msg += ': '
        if (challenge.includes(i)) msg += 'wil get a HIGH challenge. '
        else msg += 'wil get a LOW challenge. '
        if (boe.numberOfChallenges() != 0) {
          msg +=
            'Warning at least one cow in this farm has allready a High or Low challenge !\n When you proceed this property will be lost.'
          if (boe.hasChallengeRandomizations() != 0) {
            msg +=
              '\n This property is set by (an) earlier randomization(s), the whole randomization(s) will be undone !'
          }
        }
        msg += '\n'
      } //end for
    }
    if (this.cows != null) {
      //welke mode
      for (let i = 0; i < this.cows.length; i++) {
        let koe = this.cows[i]
        msg += koe.toString()
        msg += ': '
        if (challenge.includes(i)) msg += 'wil get a HIGH challenge.. '
        else msg += 'wil get a LOW challenge. '
        if (koe.hasHighChallenge()) {
          msg +=
            'Warning this cow has allready a HIGH challenge !\n When you proceed this property will be lost.'
          if (koe.challenge!.randomized()) {
            msg +=
              '\n This property is set by an earlier randomization, the whole randomization will be undone !'
          }
        }
        if (koe.hasLowChallenge()) {
          msg +=
            'Warning this cow has allready a LOW Challenge !\n When you proceed this property will be lost.'
          if (koe.challenge!.randomized()) {
            msg +=
              '\n This property is set by an earlier randomization, the whole randomization will be undone !'
          }
        }
        msg += '\n'
      } //end for
    }
    if (msg !== '') {
      //er is een warning
      //TODO: handle JOptions
      return false
      //   Object[] options = { "OK", "CANCEL" };
      //   int result = JOptionPane.showOptionDialog(null, msg, "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0]);// geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
      //   if (result==JOptionPane.YES_OPTION) return true;
      //   else return false;
    } else return true //er is geen warning, is er altijd als er iets inzit :-)
  } //end showchallengewarning

  /**
   * This method displays the results of the randomization to ask the user if he's really sure.
   * The result is the answer of the user. This all is done by an option dialog.
   * (When there are older randomizations involved, they have to be undone.)
   * The parameters consists of all the indexes of cows/farms who are gonna get a hi(challenge)no(vaccin) etc.
   */
  private showCombinationWarning(
    hino: number[],
    hiye: number[],
    lono: number[],
    loye: number[]
  ): boolean {
    let msg = ''
    if (this.farms != null) {
      //welke mode
      for (let i = 0; i < this.farms.length; i++) {
        let boe = this.farms[i]
        msg += boe.toString()
        msg += ': '
        if (hino.includes(i)) msg += 'wil get NO vaccin and a HIGH challenge. '
        else if (hiye.includes(i))
          msg += 'wil get a vaccin and a HIGH challenge. '
        else if (lono.includes(i))
          msg += 'wil get NO vaccin and a LOW challenge. '
        else if (loye.includes(i))
          msg += 'wil get a vaccin and a LOW challenge. '
        else msg += "ERROR THIS ISN'T SUPPOSED TO HAPPEN"
        if (boe.numberOfChallenges() != 0) {
          msg +=
            '\n Warning at least one cow in this farm has allready a High or Low challenge !\n When you proceed this property will be lost.'
          if (boe.hasChallengeRandomizations() != 0) {
            msg +=
              '\n This property is set by (an) earlier randomization(s), the whole randomization(s) will be undone !'
          }
        }
        if (boe.numberOfVaccins() != 0) {
          msg +=
            '\n Warning at least one cow in this farm has allready been assigned a of NO vaccin !\n When you proceed this property will be lost.'
          if (boe.hasVaccinRandomizations() != 0) {
            msg +=
              '\n This property is set by (an) earlier randomization(s), the whole randomization(s) will be undone !'
          }
        }
        msg += '\n'
      } //end for
    }
    if (this.cows != null) {
      //welke mode
      for (let i = 0; i < this.cows.length; i++) {
        let koe = this.cows[i]
        msg += koe.toString()
        msg += ': '
        if (hino.includes(i)) msg += 'wil get NO vaccin and a HIGH challenge. '
        else if (hiye.includes(i))
          msg += 'wil get a vaccin and a HIGH challenge. '
        else if (lono.includes(i))
          msg += 'wil get NO vaccin and a LOW challenge. '
        else if (loye.includes(i))
          msg += 'wil get a vaccin and a LOW challenge. '
        else msg += "ERROR THIS ISN'T SUPPOSED TO HAPPEN"
        if (koe.hasHighChallenge()) {
          msg +=
            '\n Warning this cow has allready a HIGH challenge !\n When you proceed this property will be lost.'
          if (koe.challenge!.randomized()) {
            msg +=
              '\n This property is set by an earlier randomization, the whole randomization will be undone !'
          }
        }
        if (koe.hasLowChallenge()) {
          msg +=
            '\n Warning this cow has allready a LOW Challenge !\n When you proceed this property will be lost.'
          if (koe.challenge!.randomized()) {
            msg +=
              '\n This property is set by an earlier randomization, the whole randomization will be undone !'
          }
        }
        if (koe.getsVaccin()) {
          msg +=
            '\n Warning this cow has allready a Vaccin !\n When you proceed this property will be lost.'
          if (koe.vaccin!.randomized()) {
            msg +=
              '\n This property is set by an earlier randomization, the whole randomization will be undone !'
          }
        }
        if (koe.getsNOVaccin()) {
          msg +=
            '\n Warning this cow has allready NO vaccin !\n When you proceed this property will be lost.'
          if (koe.vaccin!.randomized()) {
            msg +=
              '\n This property is set by an earlier randomization, the whole randomization will be undone !'
          }
        }
        msg += '\n'
      } //end for
    }
    if (msg !== '') {
      //er is een warning
      //TODO: handle Joptions
      return false
      //   Object[] options = { "OK", "CANCEL" };
      //   int result = JOptionPane.showOptionDialog(null, msg, "Warning", JOptionPane.DEFAULT_OPTION, JOptionPane.WARNING_MESSAGE,null, options, options[0]);// geen parenframe, tekst in venster, titel venster,...,soortMSG,standaard icoon,titels van keuzes, geselecteerde keuze
      //   if (result==JOptionPane.YES_OPTION) return true;
      //   else return false;
    } else return true //er is geen warning, is er altijd als er iets inzit :-)
  } //end showCOMBINATIONwarning

  /**
   * This method is used to 'undo' all the consequences of the randomize methods.
   * All the selected farms/cows will get the involved property set null.
   * If it was manuelly set before this old randomization, this property was allready lost.
   */
  undo(): void {
    if (this.status != 0) {
      //nog niet erder undo?
      if (this.status != 2) {
        // het is geen randomize Challenge(2) , dus both(3) of vaccin(1)
        //al de geselecteerden krijgen geen vaccin object !
        if (this.farms != null) {
          //welke mode
          for (let i = 0; i < this.farms.length; i++) {
            let boe = this.farms[i]
            for (let j = 0; j < boe.getCows().length; j++) {
              let koe = boe.getCows()[j]
              koe.vaccin = undefined
            }
          }
        }
        if (this.cows != null) {
          //welke mode
          for (let i = 0; i < this.cows.length; i++) {
            let koe = this.cows[i]
            koe.vaccin = undefined
          }
        }
      }
      if (this.status != 1) {
        // het is geen randomize vaccin(1) , dus both(3) of Challenge(2)
        //al de geselecteerden krijgen geen challenge object !
        if (this.farms != null) {
          //welke mode
          for (let i = 0; i < this.farms.length; i++) {
            let boe = this.farms[i]
            for (let j = 0; j < boe.getCows().length; j++) {
              let koe = boe.getCows()[j]
              koe.challenge = undefined
            }
          }
        }
        if (this.cows != null) {
          //welke mode
          for (let i = 0; i < this.cows.length; i++) {
            let koe = this.cows[i]
            koe.challenge = undefined
          }
        }
      }
      this.status = 0
    } //hij is al eens ge-undo't
  } //end undo

  /**
   * Returns the number of selected objects.
   */
  size(): number {
    //TODO: mooier schrijven
    if (this.cows == null && this.farms == null) return 0
    if (this.cows == null) return this.farms!.length
    return this.cows.length
  } //end size

  /**
   * Returns a String
   * with all the elements of the selection. (In HTML format-ready to put in a Jlabel)
   */
  getInfo(): string {
    let str = '<html>' //hier ook terug wegdoenzonder Jpanel
    str +=
      "You've allready selected " +
      this.size().toString +
      ' ' +
      this.mode() +
      ' <br>'
    for (let i = 0; i < this.size(); i++) {
      if (this.farms != null) {
        //welke mode
        let boe = this.farms[i]
        str += boe.toString()
        //hier moeten dus eventueel de andere details ook afgeprint worden
        str += '<br>'
      }
      if (this.cows != null) {
        //welke mode
        let koe = this.cows[i]
        str += koe.toString()
        if (
          koe.getsVaccin() ||
          koe.getsNOVaccin() ||
          koe.hasHighChallenge() ||
          koe.hasLowChallenge()
        ) {
          str += ' !!! WARNING !! allready assigned some properties'
        }
        //hier moeten dus eventueel de andere details ook afgeprint worden
        str += '<br>'
      }
    }
    return str
  } //end method getInfo

  /**
   * Returns the status of the randomization
   *  1=randomizeVaccin,2=randomizeChallenge,3=randomizeBoth,0=allreay undone
   */
  //nodig voor feedback
  getStatus(): number {
    return this.status
  } //end getSTatus

  /**
   * Returns the String "COWS" or "FARMS".
   * When there isn't selected anything, a "  " is returned.
   */
  mode(): String {
    if (this.cows != null) return 'COWS'
    if (this.farms != null) return 'FARMS'
    return '  '
  } //end mode

  copy(): Randomization {
    let newR = new Randomization()

    if (this.cows) newR.cows = [...this.cows]
    if (this.farms) newR.farms = [...this.farms]
    return newR
  }
} //end class Randomization
