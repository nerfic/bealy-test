import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { GetFileRoomApi } from "../api/uploadFile";
import { useParams } from 'react-router-dom'
import jwtDecode from "jwt-decode"


const CONNECTION_PORT = "localhost:8000";
let socket = io(CONNECTION_PORT);


function UploadFile() {

    let { uuid } = useParams();
    const tokenDecode = jwtDecode(localStorage.getItem("jwt_token"));

    const [messageList, setMessageList] = useState([]);
    const [fileList, setFileList] = useState([])

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

    const [error, setError] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('file', selectedFile);

        fetch(`http://localhost:8000/api/upload/${uuid}`, {
            method: "POST",
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('jwt_token'),
            },
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    return setError(true)
                }
            })
            .then((response) => {
                sendMessage(response, response.path, response.name)
            })
    }


    const getHistoryFile = () => {
        GetFileRoomApi(uuid, (response) => setFileList(response.success), (response) => setError(response.error))
    }

    const connectToRoom = () => {
        socket.emit("join_room", uuid);
    };

    const sendMessage = async (response, path, name) => {
        let messageContent = {
            room: uuid,
            content: {
                author: tokenDecode.email,
                message: path,
                filename: name,
            },
        };

        socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        getHistoryFile()
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList([...messageList, data]);
        });
        connectToRoom()
    });

    useEffect(() => {
        getHistoryFile()
    }, [messageList])

    return (
        <div>
            <div className="row mb-3">
                <div className="col-12">
                    <h2>Room code: {uuid} <button className="btn btn-info btn-sm" onClick={() => { navigator.clipboard.writeText(uuid) }}>Copy to clipboard</button></h2>
                    {error ? <p className="text-danger">{error}</p> : null}
                </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h3>Send a file</h3>
                            <input type="file" name="file" className="form-control-file mb-2" onChange={changeHandler} />
                            {isSelected && selectedFile ? (
                                <div>
                                    <p>Filename: {selectedFile.name}</p>
                                    <p>Filetype: {selectedFile.type ? selectedFile.type : "unknown"}</p>
                                    <p>Size in bytes: {selectedFile.size}</p>
                                    <p>Last Modified Date: {selectedFile.lastModifiedDate.toLocaleDateString()}</p>
                                    <button onClick={handleSubmission} className="btn btn-success">Send file</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Live file</h3>
                            {messageList.map((data, key) => {
                                return (
                                    <div key={key}>
                                        <div>
                                            {data.author}: <a href={`http://localhost:8000/uploads/${data.message}`} download>Download</a> <span>{data.filename}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h2>History file</h2>
                <div className="row">
                    {fileList.length > 0 ?
                        fileList.map((data, index) => {
                            return (
                                <div className="col-4 mb-2" key={index}>
                                    <div className="card">
                                        <div className="card-body">
                                            <p>{data.original_name}</p>
                                            <a href={`http://localhost:8000/uploads/${data.path}`}>Download</a>
                                        </div>
                                    </div>

                                </div>
                            )
                        }) :
                        error ? <p className="text-danger">{error}</p> : <p>No file history</p>
                    }
                </div>

            </div>
        </div>
    );
}

export default UploadFile;
