import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from 'react-router-dom'
import jwtDecode from "jwt-decode"

const CONNECTION_PORT = "localhost:8000";
let socket = io(CONNECTION_PORT);


function UploadFile() {

    let { uuid } = useParams(); // get uuid
    const tokenDecode = jwtDecode(localStorage.getItem("jwt_token"));

    const [room] = useState(uuid);

    const [messageList, setMessageList] = useState([]);

    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);

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
                return response.json()
            })
            .then((response) => {
                sendMessage(response.path)
            })
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList([...messageList, data]);
        });
        connectToRoom()
        // GetFileRoomApi(uuid, (response) => setFileList(response.success))
    });

    const connectToRoom = () => {
        socket.emit("join_room", room);
    };

    const sendMessage = async (data) => {
        let messageContent = {
            room: room,
            content: {
                author: tokenDecode.email,
                message: data,
            },
        };

        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
    };

    return (
        <div>
            <h2>Room code: {uuid}</h2>
            <div>
                {messageList.map((data, key) => {
                    return (
                        <div key={key}>
                            <div>
                                {data.author}: <a href={`http://localhost:8000/uploads/${data.message}`} download>Download</a>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div>
                <input type="file" name="file" onChange={changeHandler} />
                {/* {isSelected ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )} */}
                <button onClick={handleSubmission}>Send file</button>
            </div>

            {/* <div className="mt-5">
                <h2>History file</h2>
                {fileList.length > 0 ?
                    fileList.map((data, index) => {
                        return (
                            <div className="row" key={index}>
                                <a href={`http://localhost:8000/uploads/${data.path}`}>Download</a>
                            </div>
                        )
                    }) :
                    <p>No file history</p>}
            </div> */}
        </div>
    );
}

export default UploadFile;
