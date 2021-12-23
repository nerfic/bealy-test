import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { CreateRoomApi, JoinRoomApi } from '../api/room'

export default function CreateRoom() {

    const [roomUuid, setRoomUuid] = useState("")
    const [newRoom, setNewRoom] = useState()
    const [roomJoin, setRoomJoin] = useState(roomUuid)
    const [error, setError] = useState()

    const handleCreateRoom = () => {
        CreateRoomApi((response) => setNewRoom(response.success))
    }

    const handleJoinRoom = () => {
        if (roomUuid.length > 1) {
            JoinRoomApi(roomUuid, (response) => setRoomJoin(response.success), (response) => setError(response.error))
        } else {
            setError("Room code can't be empty")
        }
    }

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="display-5 fw-bold">Welcom to File Exchange!</h1>
                        <p className="col-md-8 fs-4">
                            Create a room and share the code with your friends or join a room.</p>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {newRoom &&
                                <div className="w-100">
                                    <p className="text-success">Room create! <Link to={`/transfert/${newRoom}`}>Join my room</Link></p>

                                </div>
                            }
                            <button id="createroom" className="btn btn-primary btn-lg" type="button" onClick={handleCreateRoom}>Create room</button>
                        </div>
                        <div className="col-6">
                            {roomJoin &&
                                <>
                                    <p className="text-success">Room join!</p>
                                    <Link to={`/transfert/${roomJoin}`}>Join room</Link>
                                </>
                            }
                            {error &&
                                <p className="text-danger">{error}!</p>
                            }
                            <input className="form-control mb-2" id="roomcode" placeholder="Room code" onChange={(event) => setRoomUuid(event.target.value)} />
                            <button id="joinroom" className="btn btn-primary w-100" type="button" onClick={handleJoinRoom}>Join room</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
