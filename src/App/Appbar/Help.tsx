//2.1 is voor wat de feedback betreft//2.2 de file er terug uit voor vlot offline gebruik
//2.3 regionview met kaart en klikken

import { Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useEffect } from 'react'

/**
 * A short explanation of the purpose of the Mastitis application.
 *
 * @returns React component
 */
export const Help = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Paper
      sx={{
        p: 3,
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
    >
      <h1>Help for the mastitis applet</h1>
      {/* <Box sx={{ height: 5 }} /> */}

      <h1>The purpose of the mastitis applet</h1>

      <Typography paragraph={true} variant="body1">
        E. coli mastitis (udder infection by <i>Escherichia coli</i>) is one of
        the most important diseases in dairy cattle, especially in cows in early
        lactation. A vaccine has been developed and its effect needs to be
        assessed in a vaccination trial before it can be registered. Therefore
        cows are randomly assigned to receive either vaccine or a placebo
        injection. After one month, both groups of cows are challenged with an
        infusion of an E. coli dose in the udder. Severity of the response to
        this challenge is evaluated by the reduction in milk production 48 hours
        after the infusion.
      </Typography>

      <Typography paragraph={true} variant="body1">
        The objective of a vaccination trial is to prove that the milk
        production reduction is less in vaccinated animals than in control
        animals. The investigator, however, needs to take into account that
        there are important factors that influence both the reduction and the
        vaccination effect. These factors consist of factors inherent to the
        animal, such as the parity and the initial milk production, but also
        environmental factors that vary from farm to farm.
      </Typography>

      <Typography paragraph={true} variant="body1">
        Furthermore, in the study presented in this application, also the effect
        of the challenging dose was studied, comparing a low dose (10
        <sup>4</sup>
        colony forming units E. coli) with a high dose (10<sup>6</sup> colony
        forming units E. coli).
      </Typography>

      <Typography paragraph={true} variant="body1">
        Two basic statistical concepts are essential in this trial.
      </Typography>

      <Typography paragraph={true} variant="body1">
        First, treatment factors need to be randomly assigned to either farms or
        cows in order to draw valid conclusions. Especially if variability
        between cows and farms is large due to particular factors, failure to
        randomise the treatment might lead to significant results due to cow
        differences and not treatment differences.
      </Typography>

      <Typography paragraph={true} variant="body1">
        Second, efficient experimental design can explain part of the
        variability in the data and thus reduce the error variability against
        which the treatment factors need to be assessed leading to more powerful
        testing.
      </Typography>

      <Typography paragraph={true} variant="body1">
        The user is invited to randomise the treatment factors in an efficient
        experimental design to assess both the effect of the vaccination, the
        challenging dose and the interaction between these two factors.
      </Typography>

      <h1>How to use the mastitis applet?</h1>

      <h2>Region view</h2>

      <Typography paragraph={true} variant="body1">
        When opening the applet, you will see the region view with the different
        locations of the farms on a map. On top of the screen, there is a
        description of the current trial with number of animals assigned to
        vaccination/control and low/high dose.
      </Typography>

      <h2>Farm view</h2>

      <Typography paragraph={true} variant="body1">
        When clicking on a particular farm on the map or on the region view
        symbol on the left panel, the farm view opens. When clicking once on a
        farm, information of the farm will be shown. Clicking twice on the farm
        will also show the cows available in that farm. The farm can not yet be
        selected to either put it in the randomisation urn or to select a
        treatment factor level for it as no cows have been selected yet in the
        farm. Once cows have been selected in a farm, it can be given a
        particular treatment factor level or be put in the randomisation urn to
        receive a treatment factor level at random.
      </Typography>

      <h2>Cow view</h2>

      <Typography paragraph={true} variant="body1">
        Once a particular farm has been double clicked, the cows available in
        the farm appear. When clicking on a particular cow, the properties of
        the cow are then shown in the upper right window. A cow then first needs
        to be added to the experiment by clicking on the first button. Next, a
        cow can either be assigned to a vaccine and/or challenge level, or can
        be put in the randomisation urn. When a cows is added to the experiment,
        a ‘v’ will appear next to the cow in the left panel. When it is also put
        in the randomisation urn, the ‘v’ is replaced by the urn sign. Once a
        cow has been assigned treatment factor levels, they will appear next to
        the cow symbol.
      </Typography>

      <h2>Randomiser view</h2>

      <Typography paragraph={true} variant="body1">
        The randomisation urn can be entered by choosing the randomizer item on
        the view ‘balk’. The top panel of the randomisation view shows how many
        cows or farms are currently in the randomisation urn. You can then chose
        to randomly assign either vaccine, challenge or both together. Next, a
        choice has to be made how many cows or farms will receive a particular
        level of the treatment factor. Once the treatment factors have been
        randomly assigned, a message will open showing which cows or farms
        receive which treatment levels. Also the treatment factor level symbols
        next to the cows will be updated.
      </Typography>

      <h2>Running the experiment</h2>

      <Typography paragraph={true} variant="body1">
        Once each animal that has been selected to participate in the trial has
        been assigned to a level of vaccination and challenge, the data can be
        generated by choosing the run item on the experiment ‘balk’. The data
        set can then be viewed (and copied (Ctrl-c) and pasted (Ctrl-v) into
        another program) by choosing the dataset item on the view ‘balk’.
      </Typography>

      <h1>Demo</h1>

      <Typography paragraph={true} variant="body1">
        -not implemented yet-
      </Typography>

      <h1>Different parts</h1>

      <Typography paragraph={true} variant="body1">
        -not implemented yet-
      </Typography>
    </Paper>
  )
}
