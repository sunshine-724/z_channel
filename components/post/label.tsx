import React from 'react';
import './label.css';
import { LabelType } from '../../types/label';
import User from "./user"

const ZLavel: React.FC<LabelType> = (
    { text, user, good, heart ,createAt}
) => {
    return (
        <div className="zweet">
            <div className="zweet-head">ずいーと：
                <User
                    id = {user.id}
                    name = {user.name}
                    ico = {user.ico}
                />
            </div>
            <div className="zweet-body">
                {text}
            </div>
            <div className="zweet-footer">
                <span></span>
                {good}
                <button>👍</button>
                {heart}
                <button>❤️</button>
                <button>返信</button>
                <button>...</button>
                {createAt}
            </div>
        </div>
    )
}
export default ZLavel;