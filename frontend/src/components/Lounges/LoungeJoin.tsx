import { useParams } from "react-router-dom";

const LoungeJoin = () => {
    const { roomId } = useParams();

    return(
        <div>
            {roomId}
        </div>
    );
}

export default LoungeJoin;