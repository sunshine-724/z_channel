export type UserType = {
    id : number
    username?: string
    name : string
    ico : string
}

export type UserGetData = {
    user : UserType
    profile : {
        follow : UserType[]
        intro : string // 自己紹介
    }
}
