import { ICartItem } from './../../pages/cart/addToCart';
import { IProduct } from './../../pages/productPage/productPage';

export interface ICustomerOrder {
    orderNumber: number;
    userId: string;
    status: 'Order received' | 'Processed' | 'Shipped' | 'Delivered';
    date: string;
    subtotal: number;
    items: ICartItem[]
}

export interface IUser {
  uid: string;
  name: string;
  email: string;
  cartItems: ICartItem[];
  favoriteItems: IProduct[];
  addresses?: string[];
}


export interface IUserArgs {
  email: string,
  password: string,
  name: string
}


export interface IAddressInfo {
  fullName: string;
  address: string;
  apt: string;
  city: string;
  zip: number;
  phone: number;
}


export type TUpdateCartAction = 'addToCart' | 'removeFromCart' | 'addQty' | 'removeQty' 
export type TUpdateFavoritesAction = 'like-dislike' | 'clearAll'