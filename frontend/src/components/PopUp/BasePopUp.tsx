import "./BasePopUp.css";

export type PopUpOpenParams = {
    open:boolean;
    onClose:() => void;
}

type PopUpParams = {
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