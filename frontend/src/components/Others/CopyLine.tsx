import "./CopyLine.css";

interface CopyLineParams{
    info:string;
}

const CopyLine = (props:CopyLineParams) => {
    const copyInfo = () => {
        navigator.clipboard.writeText(props.info);
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
        </div>
        </>
    );
}

export default CopyLine;