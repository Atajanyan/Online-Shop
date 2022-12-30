import React from 'react'

const NoResults: React.FC<{ keyword: string }> = ({ keyword }) => {
  return (
    <div className='no-results'>
      <h2 className='no-results-heading'>{`Sorry, we couldn't find any products related to “${keyword}”`}</h2>
      <p>Check the spelling, try a more general term, or use fewer words.</p>
    </div>
  )
}

export default NoResults
