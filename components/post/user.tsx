import { UserType } from "@/types/user";
import './user.css';

export default function User({id,name,ico}:UserType){
    return (
        <div className="user">
            <div className="user-icon"></div>
            {name}
        </div>
    )
}