import {UserType} from "../moodels/user";

let currentUser: UserType;
const setCurrentUserStatus = (usr: UserType) => {
    currentUser = usr;
}
const getCurrentStatus = () => {
    return currentUser;
}
export {
    setCurrentUserStatus,
    getCurrentStatus,
}