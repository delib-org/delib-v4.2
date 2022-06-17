declare class Prefernce {
    id?: string;
    userId: string;
    optionId: string;
    value: number;
    constructor(userId: string, optionId: string, value: number, id?: string);
}
export default Prefernce;
