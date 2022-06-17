//prefernce, is the prefernce of a user twoard some option.
import {uid} from '../controls/helpers/general';


class Prefernce{
    id?: string;
    userId: string;
    optionId: string;
    value: number;

    constructor(userId: string, optionId: string, value: number, id?: string){
        this.id = this.id || uid();
        this.userId = userId;
        this.optionId = optionId;
        this.value = value;
    }
}

export default Prefernce;