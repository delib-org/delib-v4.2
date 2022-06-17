declare class Option {
    id: string;
    name: string;
    description: string;
    preferencesAggragation: Array<PreferencesAggragation>;
    constructor(name: string, description: string, id?: string);
}
interface PreferencesAggragation {
    type: string;
    value: number;
}
export default Option;
