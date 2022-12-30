import { SlArrowDown } from 'react-icons/sl'

interface ILoadMore {
  handlePagination: () => void
}
export const LoadMoreBtn = ({ handlePagination }: ILoadMore) => {
  return (
    <div className='loader'>
      <span className='loadBtn'>
        <SlArrowDown onClick={handlePagination} />
      </span>
      <span className='loadText'>Load More</span>
    </div>
  )
}
