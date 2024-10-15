type PopUpType = {
    trigger:boolean,
    children:any
};

const PopUp = (props:PopUpType) => {
    return props.trigger ? (
        <div className='PopUpBox'>
            { props.children }
        </div>
    ) : "";
}

export default PopUp;