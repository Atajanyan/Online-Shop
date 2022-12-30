import React, { useState } from 'react'
import Cards, { Focused } from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { ICardForm } from './types'


const CardForm = () => {
  const [cardInfo, setCardInfo] = useState<ICardForm>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  })
  const [focus, setFocus] = useState('')

  const containsOnlyDigits = (str: string) => {
    return /^[0-9 /]+$/.test(str)
  }


  const containsOnlyLetters = (str: string) => {
    return /^[A-Za-z]*$/.test(str)
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(containsOnlyDigits(e.target.value) || e.target.value === '') {
      setCardInfo((prev) => {
        return { ...prev, number: e.target.value }
      })
    }
  }


  const handleCardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if(containsOnlyLetters(e.target.value)) {
  setCardInfo((prev) => {
    return { ...prev, name: e.target.value }
  })
}
  }

 
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(containsOnlyDigits(e.target.value) || e.target.value === '' ) {
      setCardInfo((prev) => {
        return { ...prev, expiry: e.target.value }
      })
    }
  }

  const handleCardCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(containsOnlyDigits(e.target.value) || e.target.value === '') {
      setCardInfo((prev) => {
        return { ...prev, cvc: e.target.value }
      })
    }
  }

  return (
    <div className='card-form-wrapper'>
      <Cards 
      number={cardInfo.number}
      name={cardInfo.name}
      expiry={cardInfo.expiry}
      cvc={cardInfo.cvc}
      focused={focus as Focused}
      />
      <div className='card-form-container'>
        <form>
          <input
            type='tel'
            name='number'
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            placeholder='Card Number'
            value={cardInfo.number}
            maxLength={16}
            onChange={handleCardNumberChange}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type='text'
            name='name'
            placeholder='Name On Card'
            value={cardInfo.name}
            required
            maxLength={22}
            onChange={handleCardNameChange}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type='text'
            name='expiry'
            placeholder='0123  Expiry'
            maxLength={4}
            value={cardInfo.expiry}
            required
            onChange={handleCardExpiryChange}
            onFocus={(e) => setFocus(e.target.name)}
          />
          <input
            type='tel'
            name='cvc'
            placeholder='CVC'
            value={cardInfo.cvc}
            required
            maxLength={3}
            onChange={handleCardCvcChange}
            onFocus={(e) => setFocus(e.target.name)}
          />
        </form>
      </div>
    </div>
  )
}

export default CardForm
