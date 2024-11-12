import { useState } from "react";
import "./CopyLine.css";

interface CopyLineParams{
    info:string;
}

const CopyLine = (props:CopyLineParams) => {
    const [message, setMessage] = useState<string>("");
    
    const copyInfo = () => {
        const result = navigator.clipboard.writeText(props.info);

        result.then(() => {
            setMessage("Copied");
        }).finally(() => {
            setTimeout(() => {
                setMessage("");
            }, 1000);
        })
    }    

    return(
        <>
        <div className="LineInfo">
            <div id='Info'>
                {props.info}
            </div>
            <div className="CopyImg">
                <img id='copyIcon' src='/Copy.png' onClick={copyInfo}/>
            </div>
            <div className="CopiedMessage">
            {message}
            </div>
        </div>
        </>
    );
}

export default CopyLine;