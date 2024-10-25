import "./BasePopUpHeader.css";

interface PopUpHeaderParam {
    closeButton:boolean;
    title:string;
    onClose:() => void;
}

const BasePopUpHeader = (props:PopUpHeaderParam) => {
    return (
        <div className='PopUpHeader'>
            <h1 className='Title'>{props.title}</h1>
            {
                props.closeButton? 
                <button className='CloseButton' onClick={props.onClose}>
                    &times;
                </button> :
                ""
            }
        </div>
    );
}

export default BasePopUpHeader;