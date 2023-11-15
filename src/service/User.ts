import myAxios from "../plugins/myAxios.ts";
import {setCurrentUserStatus} from "../status/user.ts";

export const getCurrentUser = async () =>{
    const userInfo = await myAxios.get('/user/current')
    if (userInfo.code === 0) {
        setCurrentUserStatus(userInfo.data)
        return userInfo.data
    }
    return null;
}
