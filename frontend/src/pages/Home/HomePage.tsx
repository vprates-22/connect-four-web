import HomeButtons from "../../components/Home/HomeButtons";
import HomeText from "../../components/Home/HomeText";
import NavBar from "../../components/NavBar/NavBar";

import './HomePage.css'


const HomePage = () => {
    return (
        <>
        <div className="HomeDiv">
            <NavBar/>
            <HomeText/>
            <HomeButtons/>
        </div>
        </>
    );
}

export default HomePage;