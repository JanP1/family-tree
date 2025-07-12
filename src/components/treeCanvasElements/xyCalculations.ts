type PersonInput = {
  id: string;
  name: string;
  spouse_id?: string;
  children_ids?: string[];
  parents_ids?: string[];
};

export type Person = {
  person: PersonInput;
  x: number;
  y: number;
};


type Coordinates = {
  x: number;
  y: number;
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

export function generateCoordinates(family: PersonInput[], rootID: string, spacing: number) {
  const peopleWithCoordinates: Person[] = [];
  const inputMap = new Map(family.map(p => [p.id, p]));
  let currentPotentialChildren: PersonInput[] = [];
  let dummyNextPotentialChildren: PersonInput[] = [];



  // Get the root person of the whole tree
  const rootPerson = inputMap.get(rootID);

  // Apply only if the person exists
  if (rootPerson) {

    // Checking if parents exist on the curent root
    currentPotentialChildren.push(rootPerson);

    // We give the root coordinates 0, 0 placing him in the middle of the canvas (after applyin offset)
    peopleWithCoordinates.push({person: rootPerson, x: 0, y:0})

    // we have to give 2 ^ n spaces for every iteration
    // the spaces are filled with blocks or empty fields based
    // on the parents of the person currently being checked 
    /*
        []    []    []    []    []    []    []    []



                    []    []    []    []


                          []    []

                             []



    */
    let currentIteration = 1;

    // as long as there are people that can potentialy have parents check for the parents
    while (currentPotentialChildren.length > 0){
      let count = 2 ** currentIteration;
      let y = -300 * currentIteration - currentIteration*currentIteration*100;
      console.log(y)

      const fullWidth = spacing * (count - 1);

      const coordinatesList: Coordinates[] = []; // Reset coordinates list per iteration
      for (let i = 0; i < count; i++) {
        const x = -fullWidth / 2 + i * spacing;
        coordinatesList.push({ x, y });
      }

      let currentSpot = 0; // The spot (index of coordinate list) to which the next person will be located


      // we check for every person that was a parent in the previous iteration if they have parents
      for (const person of currentPotentialChildren) {

        let spotsTaken = 0; // 2 spots for every persons parent if we didnt take up 2 spots we have to shift the untaken spots to space the blocks evenly

        // If there exists a parent of those parents we add them to the dummy list -- Has to check and even if doesn t exist has to shift spot for parent
        if (person.parents_ids && person.parents_ids.length > 0) {
          person.parents_ids.forEach(parentId => {
            const parent = inputMap.get(parentId);
            if (parent) {
              dummyNextPotentialChildren.push(parent);
              
              peopleWithCoordinates.push({
                person: parent, 
                x: coordinatesList[currentSpot].x, 
                y: coordinatesList[currentSpot].y
              })

              currentSpot += 1;
              spotsTaken += 1;
            }
          });
        }
        currentSpot += (2 - spotsTaken); // If none were taken we have to shift 2 spots, if 1 then 1 if 2 then we dont shift
      }
      currentPotentialChildren = dummyNextPotentialChildren;
      dummyNextPotentialChildren = [];

      currentIteration += 1;

    }

  }
  return peopleWithCoordinates

}
