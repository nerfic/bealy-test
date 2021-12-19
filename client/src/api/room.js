import { myFetch } from "../utils/myFetch"

export const CreateRoomApi = (callback, errorCallback) => {
    myFetch(
        "http://localhost:8000/api/room/create",
        callback,
        errorCallback,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('jwt_token'),
            },
        }
    )
}

export const JoinRoomApi = (data, callback, errorCallback) => {
    myFetch(
        "http://localhost:8000/api/room/join",
        callback,
        errorCallback,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('jwt_token'),
            },
            body: JSON.stringify({
                room_uuid: data,
            })
        }
    )
}

export const GetRoomApi = (callback, errorCallback) => {
    myFetch(
        "http://localhost:8000/api/room/",
        callback,
        errorCallback,
        {
            method: "GET",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('jwt_token'),
            },
        }
    )
}
