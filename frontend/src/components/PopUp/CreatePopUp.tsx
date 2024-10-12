import './CreatePopUp.css'

const CreatePopUp = () => {
    return (
        <div className="PopUpBox">
            <div className='BoardParams'>
                Height <input type="number" name="" id="" min="5" max="10"/>
            </div>
            <div className='BoardParams'>
                Width <input type="number" name="" id="" min="6" max="12"/>
            </div>
            <div className='SendData'>
                <input type="button" value="Create" />
            </div>
        </div>
    );
}

export default CreatePopUp;