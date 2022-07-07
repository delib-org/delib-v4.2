export function updateArray(currentArray:Array<any>, newItem:any):Array<any>{
    try {
        const arrayTemp = [...currentArray];
      
        if(!newItem._id){
            console.log(newItem)
            arrayTemp.push(newItem);
        } else{
            //find arry;
            const index = arrayTemp.findIndex(item=>item._id === newItem._id);
            if(index === -1) arrayTemp.push(newItem);
            else arrayTemp[index] =  newItem;

        }

        return arrayTemp;
       

    } catch (error) {
        console.error(error)
        return currentArray
    }
}