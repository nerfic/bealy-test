import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { CreateRoomApi, JoinRoomApi } from '../api/room'

export default function CreateRoom() {

    const [roomUuid, setRoomUuid] = useState("")
    const [newRoom, setNewRoom] = useState()
    const [roomJoin, setRoomJoin] = useState(roomUuid)

    const handleCreateRoom = () => {
        CreateRoomApi((response) => setNewRoom(response.success))
    }

    const handleJoinRoom = () => {
        JoinRoomApi(roomUuid, (response) => setRoomJoin(response.success) & console.log(response.success))
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
                            <button id="createroom" className="btn btn-primary btn-lg" type="button" onClick={handleCreateRoom}>Create room</button>
                            {newRoom &&
                                <>
                                    <p className="text-success">Room create!</p>
                                    <Link to={`/transfert/${newRoom}`}>Join my room</Link>
                                </>
                            }
                        </div>
                        <div className="col-6">
                            <input className="form-control" id="roomcode" placeholder="Room code" onChange={(event) => setRoomUuid(event.target.value)} />
                            <button id="joinroom" className="btn btn-primary btn-lg" type="button" onClick={handleJoinRoom}>Join room</button>
                            {roomJoin &&
                                <>
                                    <p className="text-success">Room join!</p>
                                    <Link to={`/transfert/${roomJoin}`}>Join room</Link>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
