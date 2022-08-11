import { min } from 'cypress/types/lodash'
import { useRecoilState } from 'recoil'
import { experimentState } from '../dataStructure'
import { Challenge } from './Challenge'
import { Experiment } from './Experiment'
import { Farm } from './Farm'
import { Randomization } from './Randomization'
import { Vaccin } from './Vaccin'

/**
 * The class who represents the properties of the animal.
 */
export class Cow {
  /******************************  attributes  *********************/
  private ID: number
  private parity: number
  private nrDays: number
  /*de volgende 3 attributen zijn public zodat we deze rechtstreeks kunnen gebruiken
  in onze berekeningen (klasse: Experiment) en in de resultaten (klasse: DatasetDialog)*/
  initproduction: number
  productionafter: number = 0
  random: number = 0 // this factor is needed to add a random factor in the calculation, and it has to be done only 1 time
  private static varcow: number = 0.008 //de variantie waarmee de randomfactor van de koe bepaald wordt
  //static final #r:Random = new Random();// moet hier staan anders krijgen we dikwijls hetzelfde random getal

  participates: boolean //if the cow participates in the experiment
  /* staan public om in buttonpanel aan te kunnen, om te zien of er een randomisatie achter zit */
  vaccin?: Vaccin //als vaccin toegekend is, is deze link niet meer null
  challenge?: Challenge //als er een challenge is toegekend, is deze link niet null

  /****************************  constructors **********************/
  /**
   * @param id The earnumber of the cow
   * @param par The number of offspring the cow has
   * @param dim Number of days in lactation
   * @param prod milk production
   * @param Farm the farm where the cow resides,
   *  (we need it for it's random factor)
   */
  constructor(
    id: number,
    par: number,
    dim: number,
    prod: number,
    boerderij?: Farm,
    random?: number
  ) {
    this.ID = id
    this.parity = par
    this.nrDays = dim
    this.initproduction = prod
    const rando = nextGaussian(-100, 100, 1)
    if (random) this.random = random
    else if (boerderij)
      this.random = rando * Math.sqrt(Cow.varcow) + boerderij!.ran
    else throw 'Error, constructor not valid'
    this.participates = false
  }

  /*******************************   methods  **********************/
  /**
   * This method returns a String representation of the Cow
   * (Consisting of the letters BE and the rest of the earnumber.)
   */
  //moet zo noemen voor Jtree
  toString(): string {
    return 'BE' + this.ID.toString()
  } //end toString

  /**
   * This method returns a String representation of ID off the Cow
   */
  //nodig voor in datasetDialog daar kunnen we de tostring niet gebruiken door die BE
  getCowID(): string {
    return this.ID.toString()
  } //end getCowID

  /**
   * This method returns a String representation of the parity off the Cow
   */
  //nodig voor in datasetDialog
  getParity(): string {
    return this.parity.toString()
  } //end getParity

  /**
   * This method returns a String representation of the number of days
   * the Cow is allready in lactation
   */
  //nodig voor in datasetDialog
  getDays(): string {
    return this.nrDays.toString()
  } //end getDays

  /**
   * This method returns the details in html format
   * ready to use in a JLabel
   */
  getHTMLDetails(): string {
    var first =
      '<html>Earnumber:  ' +
      toString() +
      '<br>Production:  +' +
      this.initproduction.toString() +
      'ml/day <br>Parity:  ' +
      this.getParity() +
      '<br>Days in lactation:   +' +
      this.getDays() +
      '<br>'
    var second = ''
    if (this.isParticipating()) {
      second += 'Participates !<br>'
      if (this.getsVaccin()) {
        second += 'Gets the vaccin<br>'
      } else {
        if (this.getsNOVaccin()) {
          second += 'Gets NO vaccin<br>'
        } else {
          second += 'Vaccin not assigned yet<br>'
        }
      }
      if (this.hasHighChallenge()) {
        second += 'High Challenge\n'
      } else {
        if (this.hasLowChallenge()) {
          second += 'Low Challenge<br>'
        } else {
          second += 'Challenge not assigned yet<br>'
        }
      }
    } else {
      second += 'Does NOT participate !<br>'
    }
    return first.concat(second)
  } // end getHTMLDetails

  /**
   * This method indicates if the cow participates in the experiment.
   */
  isParticipating(): boolean {
    return this.participates
  } // end isParticipating

  /**
   * This method indicates if the cow has a High Challenge
   * in the Experiment. When the cow isn't assigned a challenge yet
   * the result is allso false.
   */
  hasHighChallenge(): boolean {
    if (this.challenge == null) return false
    else return this.challenge.isHigh()
  } // end hasHighChallenge

  /**
   * This method indicates if the cow has a Low Challenge
   * in the Experiment. When the cow isn't assigned a challenge yet
   * the result is allso false.
   */
  hasLowChallenge(): boolean {
    if (this.challenge == null) return false
    else return !this.challenge.isHigh()
  } // end hasLowChallenge

  /**
   * This method indicates if the cow gets the vaccin in the Experiment
   * When the cow isn't assigned a vaccin yet,
   * the result is allso false.
   */
  getsVaccin(): boolean {
    if (this.vaccin == null) return false
    else return this.vaccin.istrue()
  } // end getsVaccin

  /**
   * This method indicates if the cow gets NO vaccin in the Experiment
   * When the cow isn't assigned a vaccin yet,
   * the result is allso false.
   */
  getsNOVaccin(): boolean {
    if (this.vaccin == null) return false
    else return !this.vaccin.istrue()
  } // end getsNOVaccin

  /**
   * This method links the experiment to this cow and vice versa.
   */
  //2 richtingen
  addToExperiment(oldExperiment: Experiment): void {
    this.participates = true
    oldExperiment.addCow(this)
  } // end addToExperiment

  /**
   * This method destroys the participation
   * and the cow will no longer be in the experiment.
   */
  //2 richtingen
  removeOutOfExperiment(exp: Experiment): void {
    exp.removeCow(this)
    this.participates = false
  } // end removeOutOfExperiment

  /**
   * This method sets the Challenge of the cow in the Experiment.
   * If the Cow allready had a high or a low Challenge that is assigned in a earlier randomization,
   * this old randomization IS GOING TO BE UNDONE !!!
   * @param high is true when the cow gets a hign vaccin, false if it gets a low
   * @param ran is the link to the randomization, when this challenge is manually set, this is null
   */
  setChallenge(high: boolean, ran: Randomization | null): void {
    if (this.challenge != null && this.challenge.randomized()) {
      this.challenge.getRandomization()!.undo()
    }
    this.challenge = new Challenge(high, ran)
  } // end setChallenge

  /**
   * This method sets if the cow is given the vaccin in the Experiment.
   * If the Cow allready had a vaccin or a non-vaccin that is assigned in a earlier randomization,
   * this old randomization IS GOING TO BE UNDONE !!!
   * @param vac the boolean that indicates if the cow gets the vaccin
   * @param ran is the link to the randomization, when this vaccin is manually set, pass null
   */
  setVaccin(vac: boolean, ran: Randomization | null): void {
    if (this.vaccin != null && this.vaccin.randomized()) {
      this.vaccin.getRandomization()!.undo()
    }
    this.vaccin = new Vaccin(vac, ran)
  } // end setVaccin

  /**
   * This method returns if the cow is a heifer.
   */
  isHeifer(): boolean {
    return this.parity == 1
  }

  copy(): Cow {
    let newCow = new Cow(
      this.ID,
      this.parity,
      this.nrDays,
      this.initproduction,
      undefined,
      this.random
    )

    newCow.participates = this.participates
    newCow.vaccin = this.vaccin
    newCow.challenge = this.challenge

    return newCow
  }
}

function nextGaussian(min: number, max: number, skew: number): number {
  let u = 0,
    v = 0
  while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) num = nextGaussian(min, max, skew)
  // resample between 0 and 1 if out of range
  else {
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
}
