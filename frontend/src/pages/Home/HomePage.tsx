import { useState } from "react";

import CreatePopUp from "../../components/PopUp/CreatePopUp";
import HomeButtons from "../../components/Home/HomeButtons";
import HomeText from "../../components/Home/HomeText";
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
                <HomeText/>
                <HomeButtons setCreatePopUpOpen={() => setCreatePopUpOpen(true)}
                             setWatchPopUpOpen={() => setWatchPopUpOpen(true)}/>
            </div>
            <CreatePopUp open={createPopUpOpen} onClose={() => setCreatePopUpOpen(false)}/>
            <WatchPopUp open={watchPopUpOpen} onClose={() => setWatchPopUpOpen(false)}/>
        </main>
        </>
    );
}

export default HomePage;