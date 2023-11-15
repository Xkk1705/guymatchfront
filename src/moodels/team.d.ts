import {UserType} from "./user";

/**
 * 用户类别
 */
export type teamType = {
    "id": number,
    "teamName": string,
    "description": string,
    "teamMaxNum": number,
    "expireTime": Date,
    "userid": number,
    "count": number,
    "hasJoinTeam": boolean,
    "teamStatus": number,
    "createTime": Date,
    "createUser": UserType,
    "teamUserList": UserType[],
};
