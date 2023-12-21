export type DataBetAnimal = {
    key: string;
    value: string[];
  };

export type DataBet ={
    userId:number,
    userCPF:string,
    userEmail:string,
    animalsSelected: DataBetAnimal[]
    amountBet:number,
}