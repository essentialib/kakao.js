import { Type } from "./typing";
import { User } from "../db-manager/classes";

export class UserType extends Type<User> {
    constructor() {
        super();
    }

    copy() {
        const instance = new UserType();
        instance.checkList = this.checkList.slice();
        return instance;
    }
    
    test(value: any): value is User {
        return value instanceof User;
    }
}

const userType = new UserType();

export {
    userType as user
}