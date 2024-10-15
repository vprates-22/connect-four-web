import "./BasePopUp.css";

export type PopUpOpenParams = {
    open:boolean;
    onClose:() => void;
}

type PopUpDataParams = {
    id:string;
    title:string;
    children:React.ReactNode;
};

type PopUpParams = PopUpDataParams & PopUpOpenParams

const PopUp = (props:PopUpParams) => {
    return props.open ? (
        <div className='PopUpBox' id={props.id}>
            <div className='PopUpHeader'>
                <h1 className='Title'>{props.title}</h1>
                <button className='CloseButton' onClick={props.onClose}>
                    &times;
                </button>
            </div>
            { props.children }
        </div>
    ) : "";
}

export default PopUp;