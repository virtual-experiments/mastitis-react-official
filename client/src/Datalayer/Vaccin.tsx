import { Randomization } from './Randomization'

/**
 * The class who represents the Vaccin in this Experiment.
 * A Cow can have a Vaccin or a non-Vaccin,
 * even if it doesn't participate in the experiment.
 */
export class Vaccin {
  /******************************  attributes  ***********************/
  private getsvaccin: boolean //true when vaccin, false when non-vaccin
  private ran: Randomization | null //when the vaccin is randomized,
  //this links back to the randomization, else this is null

  /****************************  constructors ************************/
  /**
   * @param vaccin indicates a vaccin or a 'non-vaccin'
   * @param random links back to the randomization
   * (when the vaccin is randomized) else null
   */
  constructor(vaccin: boolean, random: Randomization | null) {
    this.getsvaccin = vaccin
    this.ran = random
  }

  /****************************   methods  ****************************/
  /**
   * This method indicates if the vaccin is given or the non-vaccin.
   */
  istrue(): boolean {
    return this.getsvaccin
  } // end istrue

  /**
   * This method indicates if the vaccin is automatically assigned (by a randomization).
   */
  randomized(): boolean {
    return this.ran != null
  } // end randomized

  /**
   * When the vaccin is automatically assigned by a randomization,
   * this randomization is returned,
   * else result is null.
   */
  getRandomization(): Randomization | null {
    return this.ran
  } // end getRandomization
}
