import { myFetch } from "../utils/myFetch"

export const UploadFileApi = (data, callback, errorCallback) => {
    myFetch(
        "http://localhost:8000/api/room/upload",
        callback,
        errorCallback,
        {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('jwt_token'),
            },
            body: data
        }
    )
}

export const GetFileRoomApi = (data, callback, errorCallback) => {
    myFetch(
        `http://localhost:8000/api/upload/${data}`,
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
