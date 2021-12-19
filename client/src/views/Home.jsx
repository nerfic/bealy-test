import React from 'react'
import Navbar from '../components/Navbar'
import CreateRoom from '../components/CreateRoom'

export default function Home() {
    return (
        <div className="container">
            <Navbar />
            <CreateRoom />
        </div>
    )
}
