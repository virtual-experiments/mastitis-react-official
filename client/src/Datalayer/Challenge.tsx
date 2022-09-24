import { Randomization } from './Randomization'
/**
 * The class who represents the Challenge in this Experiment.
 * A Cow can have a low or a high, even if it doesn't participate in the experiment.
 */
export class Challenge {
  /**************************  attributes    ***************************/
  #hi: boolean //this variabele indicates if it's a low or a high challenge
  #rand: Randomization | null = null //when the challenge is randomized, this links back to the randomization, else this is null

  /**************************  constructors ***************************/
  /**
   * @param high indicates if it's a high or a low challenge
   * @param random : when the challenge is randomized, this links back to the randomization, else null
   */
  constructor(high: boolean, random: Randomization | null) {
    this.#hi = high
    this.#rand = random
  }

  /*****************************   methods  ****************************/
  /**
   * This method indicates if it is a High Challenge.
   */
  isHigh(): boolean {
    return this.#hi
  }
  // end isHigh

  /**
   * This method indicates if the challenge is automatically assigned (by a randomization).
   */
  randomized(): boolean {
    return this.#rand != null
  } // end randomized

  /**
   * When the challenge is automatically assigned by a randomization, this randomization is returned,
   * else result is null.
   */
  getRandomization(): Randomization | null {
    return this.#rand
  } // end getRandomization
}
