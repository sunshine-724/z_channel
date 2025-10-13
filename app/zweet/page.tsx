import Sidebar from "@/components/Sidebar"
import "./style.css";
import mockLabels from '@/types/mock'
import AllZweetScreen from "./main";

export default function AllZweetScreeb(){
    // モックデータを挿入
    // 本番環境で要変更
    const { d } = mockLabels;
    return (
        <div className="main">
            <Sidebar/>
            <div className="center-labels">
                <AllZweetScreen 
                    d = {d}
                />
            </div>
        </div>
    )
}