import { uid } from "../controls/helpers/general";

class Option {
    id: string;
    name: string;
    description: string;
    preferencesAggragation: Array<PreferencesAggragation> = [];

    constructor(name: string, description: string, id?: string) {
        try {
            this.id = id || uid();
            this.name = name;
            this.description = description;
        } catch (error) {
            console.error(error);
        }

    }

}



interface PreferencesAggragation {
    type: string,
    value: number
}

export default Option;