/**
 * The class who represents the Experiment with all its properties.
 */

import { Cow } from './Cow'

//singleton
export class Experiment {
  /****************************  attributes  *************************/
  private cows: Cow[] = []
  private static exp: Experiment //singleton
  private mean = 0.6 //gemiddelde vermindering van melk productie
  private parity = -0.3 //deze factor geeft het verschil aan tussen heifer en multiparen
  //bij heifer is de vermindering van melk niet zo erg
  private heifervaccin = -0.15 //effect van het vaccin op een heifer
  private multivaccin = -0.3 //effect van het vaccin op een multipare koe

  /**************************  constructors **************************/
  /**
   * Because in each applet there will be only one Experiment,
   * we used the singleton pattern.
   */
  constructor() {}

  /*****************************   methods  **************************/
  /**
   * singleton pattern
   */
  public static getTheExperiment(): Experiment {
    if (this.exp == null) this.exp = new Experiment()
    return this.exp
  } //end getTheExperiment

  /**
   * Adds a cow to the experiment
   */
  //één richting
  //protected want nodig in klasse Cow
  addCow(cow: Cow): void {
    this.cows = [...this.cows, cow]
    // this.cows.push(cow)
  } //end addCow

  updateCow(cow: Cow): void {
    let index = this.cows.findIndex((c: Cow) => c.getCowID() === cow.getCowID())
    let newCows = [...this.cows]
    newCows[index] = cow

    this.cows = newCows
  }

  /**
   * Removes a cow in the experiment
   */
  //één richting
  //protected want nodig in klasse Cow
  removeCow(cow: Cow): void {
    this.cows = this.cows.filter((element) => {
      return element !== cow
    })
  } //end removeCow

  /**
   * This method creates for every cow in the experiment, a final milk production
   * in function of his properties. (For the rule see code)
   * Every Participating Cow has to have a Vaccin or NO vaccin, a high or a low Challenge before this can take place.
   * So an ERRORdialog is showed when it can't proceed.
   */
  run(): void {
    //const options:any = { "OK" };
    //TODO: options dialog
    // geen parenframe, tekst in venster, titel venster, ..., soortMSG, standaard icoon, titels van keuzes, geselecteerde keuze
    if (!this.everybodyAssigned())
      //JOptionPane.showOptionDialog(null, "To be able to run the experiment, every cow that's in the experiment must be assigned a low or a high challenge, a vaccin or no vaccin. ", "Error", JOptionPane.DEFAULT_OPTION, JOptionPane.ERROR_MESSAGE,null, options, options[0]);
      for (var i = 0; i < this.cows.length; i++) {
        var koe = this.cows[i]
        //      System.out.println(koe.random);
        //      koe.random=0;
        if (koe.isHeifer()) {
          //heifer
          if (koe.getsVaccin()) {
            //heifer met trt
            koe.productionafter = Math.round(
              koe.initproduction *
                (1 - this.mean - this.parity - this.heifervaccin - koe.random)
            )
            //          System.out.println("effect voor een koe: " +koe.random+koe.toString());
            //          System.out.println(1 - mean - parity - heifervaccin - koe.random);
          } else {
            //heifer zonder trt
            koe.productionafter = Math.round(
              koe.initproduction * (1 - this.mean - this.parity - koe.random)
            )
          }
        } //endheifer
        else {
          //multiparen
          if (koe.getsVaccin()) {
            //multipare met trt
            koe.productionafter = Math.round(
              koe.initproduction *
                (1 - this.mean - this.multivaccin - koe.random)
            )
          } else {
            //multipare zonder trt
            koe.productionafter = Math.round(
              koe.initproduction * (1 - this.mean - koe.random)
            )
          }
        } //end multi
      } //end for
  } //end run

  /**
   * Controles if every Cow that participates, has a vaccin and a challenge.
   */
  private everybodyAssigned(): boolean {
    for (var i = 0; i < this.cows.length; i++) {
      var koe = this.cows[i]
      if (!koe.getsVaccin() && !koe.getsNOVaccin()) {
        return false
      }
      if (!koe.hasHighChallenge() && !koe.hasLowChallenge()) {
        return false
      }
    }
    return true
  }

  /**
   * Gives the number of cows, who're participating in the experiment.
   */
  numberOfParticipatingCows(): number {
    return this.cows.length
  }

  /**
   * This method returns the details of the experiment:
   * How many cows are participating and a crosstable of their properties.
   * The layout is ready to use in a JLabel. (it uses HTML)
   */
  getHTMLDetails(): string {
    return (
      '<html>The number of cows in the experiment: \t' +
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
  numberOfVacinatedHighChallengeCows(): number {
    var tel = 0
    for (var i = 0; i < this.cows.length; i++) {
      var koe = this.cows[i]
      if (koe.getsVaccin() && koe.hasHighChallenge()) tel++
    }
    return tel
  }

  /**
   * Gives the number of cows, who're participating in the experiment,
   * get the Vaccin and get a Low Challenge.
   */
  numberOfVacinatedLowChallengeCows(): number {
    var tel = 0
    for (var i = 0; i < this.cows.length; i++) {
      var koe = this.cows[i]
      if (koe.getsVaccin() && koe.hasLowChallenge()) tel++
    }
    return tel
  }

  /**
   * Gives the number of cows, who're participating in the experiment,
   * get NO Vaccin and get a Low Challenge.
   */
  numberOfNOTVacinatedLowChallengeCows(): number {
    var tel = 0
    for (var i = 0; i < this.cows.length; i++) {
      var koe = this.cows[i]
      if (koe.getsNOVaccin() && koe.hasLowChallenge()) tel++
    }
    return tel
  }

  /**
   * Gives the number of cows, who're participating in the experiment,
   * get NO Vaccin and get a High Challenge.
   */
  numberOfNOTVacinatedHighChallengeCows(): number {
    var tel = 0
    for (var i = 0; i < this.cows.length; i++) {
      var koe = this.cows[i]
      if (koe.getsNOVaccin() && koe.hasHighChallenge()) tel++
    }
    return tel
  }

  copy(): Experiment {
    let newExperiment = new Experiment()

    newExperiment.cows = [...this.cows]
    newExperiment.mean = this.mean
    newExperiment.parity = this.parity
    newExperiment.heifervaccin = this.heifervaccin
    newExperiment.multivaccin = this.multivaccin

    return newExperiment
  }
}
