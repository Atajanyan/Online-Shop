export interface ICartSummaryProps {
    submitFunction: ()=> void;
    submitButtonName: string
}


export interface ICardInfo {
    number: number
    name: string
    expiry: number
    cvc: number
  }
  
 export interface ICardForm {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  }
  