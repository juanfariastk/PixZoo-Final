import { AnimalDraw } from "./animal.type"
export type UserBet = {
    userId:number,
    userCPF:string,
    userEmail:string,
    animalsSelected:AnimalDraw[],
    amountBet:number,
    date:string,
}