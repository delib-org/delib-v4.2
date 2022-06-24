export function updateArray(currentArray:Array<any>, newItem:any):Array<any>{
    try {
        const arrayTemp = [...currentArray];
        if(!newItem._id){
            arrayTemp.push(newItem);
        } else{
            //find arry;
            const index = arrayTemp.findIndex(item=>item._id === newItem._id);
            arrayTemp[index] =  newItem;
        }

        return arrayTemp;
       

    } catch (error) {
        console.error(error)
        return currentArray
    }
}