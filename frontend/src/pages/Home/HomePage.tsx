import { useState } from "react";

import CreatePopUp from "../../components/PopUp/CreatePopUp";
import OpenPopUpButton from "../../components/Button/OpenPopUpButton";
import NavBar from "../../components/NavBar/NavBar";
import WatchPopUp from "../../components/PopUp/WatchPopUp";

import './HomePage.css'


const HomePage = () => {
    const [createPopUpOpen, setCreatePopUpOpen] = useState<boolean>(false)
    const [watchPopUpOpen, setWatchPopUpOpen] = useState<boolean>(false)

    return (
        <>
        <main>
            <NavBar/>
            <div className={(createPopUpOpen || watchPopUpOpen) ? 'HomeDivBlur' : 'HomeDiv'}>
                <h1 className='WelcomeMsg'>
                    Welcome
                </h1>
                <h3 className='IntroMsg'>
                    This is a new and exciting way to play Connect4<br/>
                    here you are able to play against your friends,<br/>
                    watch then play and send advices to the players
                </h3>
                <div className='HomeButtons'>
                    <OpenPopUpButton idName="Play" insideText="Play" setPopUpOpen={() => setCreatePopUpOpen(true)}/>
                    <div className='divider'></div>
                    <OpenPopUpButton idName="Watch" insideText="Watch" setPopUpOpen={() => setWatchPopUpOpen(true)}/>
                </div>
            </div>
            <CreatePopUp open={createPopUpOpen} onClose={() => setCreatePopUpOpen(false)}/>
            <WatchPopUp open={watchPopUpOpen} onClose={() => setWatchPopUpOpen(false)}/>
        </main>
        </>
    );
}

export default HomePage;