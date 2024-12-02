import BasePopUpHeader from "./BasePopUpHeader.tsx";
import PopUp, { PopUpOpenParams } from "./BasePopUp.tsx";

import "./CreatePopUp.css"
import CreateRoomForm from "../Forms/CreateRoomForm.tsx";



const CreatePopUp = (props:PopUpOpenParams) => {

    document.addEventListener('keyup', (e) => {
        if(e.code === 'Escape'){
            props.onClose();
        }
    })
    
    return (
    <PopUp id='CreatePopUp' open={props.open}>
        <BasePopUpHeader title='Create Room' closeButton={props.closeButton} onClose={props.onClose}/>
        <CreateRoomForm/>
    </PopUp>
    );
}

export default CreatePopUp;