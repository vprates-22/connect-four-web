import "./BasePopUp.css";

export interface PopUpOpenParams{
    open:boolean;
    closeButton:boolean;
    onClose():void;
}

export interface PopUpParams{
    id:string;
    open:boolean;
    children:React.ReactNode;
};

const PopUp = (props:PopUpParams) => {
    return props.open ? (
        <div className='PopUpBox' id={props.id}>
            { props.children }
        </div>
    ) : "";
}

export default PopUp;