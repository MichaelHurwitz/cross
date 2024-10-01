 export interface User {
    id?:string,
    userName:string,
    password: string,
    games? :Game[]
}
 export interface Game {
    gameId?:string,
    player : string,
    position : []

}