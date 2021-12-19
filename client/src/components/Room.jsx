import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GetRoomApi } from '../api/room'

export default function Room() {

    const getMyRooms = () => {
        GetRoomApi((response) => setMyRooms(response))
    }

    useEffect(() => {
        getMyRooms()
    }, [])

    const [myRooms, setMyRooms] = useState("")

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="display-5 fw-bold">Room page</h1>
                        <p className="col-md-8 fs-4">
                            You can see your room.</p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <p>My rooms</p>
                            {myRooms.length >= 1 ?
                                myRooms.map((data, index) => {
                                    return (
                                        <div key={index} className="row">
                                            <Link to={`/transfert/${data.room_uuid}`}>{data.room_uuid}</Link>
                                        </div>
                                    )
                                }) :
                                <p>You dont have room</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
