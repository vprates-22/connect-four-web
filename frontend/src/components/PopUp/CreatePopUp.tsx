import './CreatePopUp.css'

type CreateOptParams = {
    idName:string,
    minVal:number,
    maxVal:number
}

const CreateOptions = (params:CreateOptParams) => {
    const idName:string = params.idName
    const minVal:number = params.minVal
    const maxVal:number = params.maxVal


    const arrayLength = maxVal - minVal + 1
    const options = [...Array(arrayLength).keys()].map(i => i + minVal);
    
    return(
        <>
            <select className='BoardSelect' id={idName}> 
                {options.map(size => <option value={size}>{size}</option>)}
            </select>
        </>

    );
}

const CreatePopUp = () => {
    return (
        <div className="PopUpBox">
            <h1 className='Title'>Create Room</h1>
            <form className='GameParams'>
                <div className='BoardParams'>
                    <div className='DimParams'>
                        <p>Height.............................</p> 
                        <CreateOptions {...{idName:'Height', minVal:6, maxVal:10}}/>
                    </div>
                    <div className='DimParams'>
                        <p>Width..............................</p> 
                        <CreateOptions {...{idName:'Height', minVal:7, maxVal:12}}/>
                    </div>
                </div>
            </form>
            <div className='SubmitDiv'>
                <button className='SubmitButton' type='submit'>Continue</button>
            </div>
        </div>
    );
}

export default CreatePopUp;