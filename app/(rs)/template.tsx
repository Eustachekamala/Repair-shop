import React, { ReactNode } from 'react'

const Tamplate = ({children} : { children : ReactNode}) => {
  return (
    <div className='animate-appear'>
        {children}
    </div>
  )
}

export default Tamplate
