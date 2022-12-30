import React, { useState } from 'react'
import './styles.css'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { nanoid } from '@reduxjs/toolkit'

interface IRecentSearch {
  id: string
  keyword: string
}

const SearchField: React.FC = () => {
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false)
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const getRecentSearches = () => {
    const recentSearches = localStorage.getItem('recentSearches')

    let recentSearchesArr = []


    if (recentSearches) {
      recentSearchesArr = JSON.parse(recentSearches)
    }
    if (recentSearchesArr.length === 5) {
      recentSearchesArr.shift()
    }
    return recentSearchesArr
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleSubmitSearch = () => {
    if (keyword.trim()) {
      const recentSearches = [...getRecentSearches(), { id: nanoid(), keyword }]
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
      navigate(`search/${keyword}`)
    }
  }

  const handleSuggestionClick = (keyword: string) => {
    navigate(`search/${keyword}`)
  }

  const handleFocusOut = () => {
    setTimeout(() => {
      setIsSuggestionsVisible(false)
    }, 500)
  }

  return (
    <div className='search-field'>
      <form autoComplete='off'>
        <label htmlFor='search'></label>
        <input
          className='search-input'
          type='text'
          id='search'
          value={keyword}
          placeholder='Search'
          onChange={handleInputChange}
          onFocus={() => setIsSuggestionsVisible(true)}
          onBlur={handleFocusOut}
          onSubmit={handleSubmitSearch}
        />
        <button
          type='submit'
          onClick={handleSubmitSearch}
        >
          <BsSearch />
        </button>
      </form>
      <div className={`search-suggestions-container ${isSuggestionsVisible ? 'visible' : ''}`}>
        <ul>
          {getRecentSearches().map((recentSearch: IRecentSearch) => {
            return (
              <li
                key={recentSearch.id}
                onClick={() => handleSuggestionClick(recentSearch.keyword)}
              >
                {recentSearch.keyword}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SearchField
