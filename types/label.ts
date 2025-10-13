import {UserType} from "./user"
export type LabelType = {
    text : string
    user : UserType
    good : number
    heart : number
    createAt : string
}
export type LabelTypes ={
    d : LabelType []
}
