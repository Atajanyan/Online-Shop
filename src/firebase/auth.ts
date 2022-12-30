import { ICartItem } from './../pages/cart/addToCart'
import { IProduct } from './../pages/productPage/productPage'
import { ICustomerOrder, IUser, TUpdateCartAction, TUpdateFavoritesAction } from './../features/slices/types'
import { setDoc, doc, getDoc, updateDoc, query, collection, where, getDocs, deleteField } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { db } from './config'

export const auth = getAuth()

const addUserToCollection = async (user: IUser) => {
  await setDoc(doc(db, 'users', user.uid), user)
  const userRef = doc(db, 'users', user.uid)
  const userSnap = await getDoc(userRef)
  return { ...userSnap.data() }
}

const createNewUser = async (
  email: string,
  password: string,
  name: string,
  favoriteItems: IProduct[],
  cartItems: ICartItem[],
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      updateProfile(cred.user, {
        displayName: name,
      })
      return cred
    })
    .then((cred) => {
      const userData: IUser = {
        uid: cred.user.uid,
        name,
        email,
        favoriteItems,
        cartItems,
      }
      return addUserToCollection(userData)
    })
}


const getOrderByNumber = async(number: number) => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, where('orderNumber', '==', number));
  const querySnapshot = await getDocs(q);
 const orderArr = querySnapshot.docs.map((doc) => {
return doc.data()
});

return orderArr[0] as ICustomerOrder
}


const getUserOrders = async(uid: string) => {
  const q = query(collection(db, 'orders'), where('userId', '==', uid))

  const qSnapshot = await getDocs(q)

  const orders: ICustomerOrder[] = qSnapshot.docs.map((snap) => {
    return {
     userId: snap.data().userId,
     status: snap.data().status,
     orderNumber: snap.data().orderNumber,
     date: snap.data().date,
     subtotal: snap.data().subtotal,
     items: snap.data().items
    }
  })
  return orders.length ? orders : null
}

const getUserById = async (id: string) => {
  const userRef = doc(db, 'users', id)
  const userSnap = await getDoc(userRef)
  const user = userSnap.data() as IUser
  
  const orders = await getUserOrders(id)
 
  return {user, orders}
}

const updateUserItems = async (id: string, favoriteItems: IProduct[], cartItems: ICartItem[]) => {
  const userRef = doc(db, 'users', id)
  const {user} = await getUserById(id)

  cartItems.forEach((item) => {
    const userCartItem = user.cartItems.find((userItem) => userItem.product.id === item.product.id)
    if (userCartItem) {
      userCartItem.qty += item.qty
    } else {
      user.cartItems.push(item)
    }
  })

  favoriteItems.forEach((item) => {
    const userFavoriteItem = user.favoriteItems.find((userFavorite) => userFavorite.id === item.id)
    if (!userFavoriteItem) {
      user.favoriteItems.push(item)
    }
  })

  await updateDoc(userRef, {
    favoriteItems: user.favoriteItems,
    cartItems: user.cartItems,
  })
}

const signIn = async (
  email: string,
  password: string,
  favoriteItems: IProduct[],
  cartItems: ICartItem[],
) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password)
  await updateUserItems(userCred.user.uid, favoriteItems, cartItems)
  const {user} = await getUserById(userCred.user.uid)
  return user
}

const updateUserFavorites = async (
  id: string,
  actionType: TUpdateFavoritesAction,
  likedItem: IProduct,
) => {
  const userRef = doc(db, 'users', id)
  const {user} = await getUserById(id)
  switch (actionType) {
    case 'like-dislike':
      {
        const userFavoriteItem = user.favoriteItems.find(
          (userFavorite) => userFavorite.id === likedItem.id,
        )
        if (userFavoriteItem) {
          user.favoriteItems = user.favoriteItems.filter(
            (userFavorite) => userFavorite.id !== likedItem.id,
          )
        } else {
          user.favoriteItems.push(likedItem)
        }
      }
      break
    case 'clearAll': {
      user.favoriteItems.length = 0
    }
  }
  await updateDoc(userRef, {
    favoriteItems: user.favoriteItems,
  })
const {user: updatedUser} = await getUserById(id)
  return updatedUser
}

const updateUserCart = async (id: string, product: IProduct, actionType: TUpdateCartAction) => {
  const userRef = doc(db, 'users', id)
  const {user} = await getUserById(id)
  const userCartItem = user.cartItems.find((cartItem) => cartItem.product.id === product.id)
  switch (actionType) {
    case 'addToCart':
      {
        if (userCartItem) {
          userCartItem.qty++
        } else {
          user.cartItems.push({ product, qty: 1 })
        }
      }
      break
    case 'removeFromCart':
      {
        user.cartItems = user.cartItems.filter((userItem) => userItem.product.id !== product.id)
      }
      break
    case 'addQty':
      {
        if (userCartItem && userCartItem.product.inStock - userCartItem.qty + 1 >= 1) {
          userCartItem.qty++
        }
      }
      break
    case 'removeQty': {
      if (userCartItem && userCartItem.qty > 1) {
        userCartItem.qty--
      }
    }
  }
  await updateDoc(userRef, {
    cartItems: user.cartItems,
  })
  const {user: updatedUser} = await getUserById(id)
  return updatedUser
}



const deleteUserCart = async(uid: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    cartItems: []
});
}

export { createNewUser, signIn, getUserById, updateUserFavorites, updateUserCart, getOrderByNumber, deleteUserCart }
