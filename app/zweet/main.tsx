import "./style.css";
import ZLavel from "@/components/post/label";
import { LabelTypes } from "@/types/label";

export default function AllZweetScreen({d}:LabelTypes){
    
    return (
        <div className="zweets">
            {d?.map((item, idx) => (
                <ZLavel
                    key={idx}
                    text={item.text}
                    user={item.user}
                    good={item.good}
                    heart={item.heart}
                    createAt={item.createAt}
                />
            ))}
        </div>
    )
}