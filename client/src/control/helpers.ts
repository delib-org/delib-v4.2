export function updateArray(
  currentArray: Array<any>,
  newItem: any
): Array<any> {
  try {
    const arrayTemp = [...currentArray];

    if (!newItem._id) {
      arrayTemp.push(newItem);
    } else {
      //find arry;
      const index = arrayTemp.findIndex((item) => item._id === newItem._id);
      if (index === -1) arrayTemp.push(newItem);
      else arrayTemp[index] = newItem;
    }

    return arrayTemp;
  } catch (error) {
    console.error(error);
    return currentArray;
  }
}

export function reomveFromArray(
  currentArray: Array<any>,
  newItem: any
): Array<any> {
  try {
    let arrayTemp = [...currentArray];
 

    //find arry;
    const index = arrayTemp.findIndex((item) => item._id === newItem._id);
    console.log( JSON.stringify(arrayTemp))
    if (index !== -1) arrayTemp.splice(index, 1);
    else throw new Error('couldnt find item in array')
    console.log( JSON.stringify(arrayTemp))
  

    return arrayTemp;
  } catch (error) {
    console.error(error);
    return currentArray;
  }
}
