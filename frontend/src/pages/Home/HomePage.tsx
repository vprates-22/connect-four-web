import HomeButtons from "../../components/Home/HomeButtons";
import HomeText from "../../components/Home/HomeText";
import NavBar from "../../components/NavBar/NavBar";

import './HomePage.css'


const HomePage = () => {
    return (
        <>
        <main>
            <div className="HomeDiv">
                <NavBar/>
                <HomeText/>
                <HomeButtons/>
            </div>
        </main>

        <div>
            
        </div>
        </>
    );
}

export default HomePage;