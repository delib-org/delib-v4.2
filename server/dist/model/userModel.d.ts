declare class User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    constructor({ id, name, email }: {
        id: any;
        name: any;
        email: any;
    });
}
export default User;
