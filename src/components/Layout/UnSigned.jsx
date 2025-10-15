import React from 'react'
import Button from '../UI/Button'

const UnSigned = () => {
  return (
    <div className='flex items-center justify-center'>
        <div className="cat-button flex items-center justify-center">
            <img src={''} alt="Bag Icon" />
            <div className="cart-text">
                <span>Shopping cart:</span>
                <p>$57.00</p>
            </div>
        </div>
        <div className="sign-in-up">
            <Button variant='primary'>Sign in</Button>
            <Button variant='outline'>Sign Up</Button>
        </div>
    </div>
  )
}

export default UnSigned
