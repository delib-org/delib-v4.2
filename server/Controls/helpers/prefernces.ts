export function arcosPrefernce(linearPrefernce: number): number | false {
    try {
        if (linearPrefernce < -1 || linearPrefernce > 1) {
            throw new Error('linearPrefernce must be greater than between -1 and 1');
        }
        return ((((Math.acos(linearPrefernce*-1) )/ Math.PI))*2)-1;
    } catch (error) {
        console.error(error);
        return false
    }

}