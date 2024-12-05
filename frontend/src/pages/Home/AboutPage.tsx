import NavBar from "../../components/NavBar/NavBar";

import './AboutPage.css'

const AboutPage = () => {
    return (
        <main>
            <NavBar/>
            <div className="AboutInfo">
                <h3 className="AboutSubTitle">
                    How to Play
                </h3>
                <p className="AboutText">
                Connect 4 is a two-player game where the goal is to be the first
                to connect four of your discs in a row, either horizontally,
                vertically, or diagonally. Players take turns dropping a disc into
                one of the columns, and the disc will fall to the lowest 
                available space in that column. The game continues until one player
                forms a line of four discs or the board is full, resulting in a draw.
                Players must strategically block their opponent while working to create
                their own line of four.
                </p>
                <h3 className="AboutSubTitle">
                    What is new about this application?
                </h3>
                <p className="AboutText">
                We allows not only players to enjoy the game but also provides a
                unique experience for spectators. Spectators can watch live matches
                between players, observing the strategy and moves in real-time.
                Additionally, they have the option to provide tips or suggestions
                to the players during the game. This creates a dynamic, community-driven
                environment, where spectators can interact, offer advice, and even influence
                the gameplay in a fun and supportive way. Whether you're playing or spectating,
                the app ensures an engaging and interactive Connect 4 experience for all!
                </p>
                <h3 className="AboutSubTitle">
                    ABOUT ME
                </h3>
                <p className="AboutText">
                My name is Victor Prates, and I am currently in the 7th semester of Computer 
                Science at UFMG. Throughout my academic journey, I have developed a solid 
                foundation in both the theory and practice of computing, and I am constantly 
                seeking to apply my knowledge to real-world challenges. I am interning at IN3 
                Inteligencia de Mercado, where I have the opportunity to work on system 
                development projects, focusing mainly on data extraction and processing.
                </p>
                <p className="AboutText">
                In my internship, I developed a desktop application for internal use within the
                company and am responsible for creating automation scripts for processes, always
                aiming to optimize workflows and increase operational efficiency. These 
                experiences have provided me with deep insights into the importance of scalable,
                robust, and well-structured solutions, as well as allowing me to improve my ability
                to work with different programming languages, such as Python, JavaScript, TypeScript,
                C, and C++.
                </p>
                <p className="AboutText">
                I have a strong interest in the field of software engineering, especially in back-end
                development, where I can apply my passion for creating solutions that are efficient,
                scalable, and sustainable. Although I also enjoy working with front-end, my focus is
                on building the logic and infrastructure that support applications and make products
                functional and effective.
                </p>
                <a id='GitHubLink' href="https://github.com/vprates-22" target="_blank">
                Click here to see more of my projects.
                </a>
            </div>
        </main>
    );
}

export default AboutPage;