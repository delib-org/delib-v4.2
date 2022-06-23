
import { uid } from "../controls/helpers/general";

class User {
    public id: number;
    public name: string;
    public email: string;
    public created_at: Date;
    public updated_at: Date;
    
    constructor ({id, name, email}) {
        this.id = id || uid();
        this.name = name;
        this.email = email;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}



export default User;