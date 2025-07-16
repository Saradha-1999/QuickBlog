import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-white border-gray-700"></div>
        <p className='text-gray-600 mt-4'>Loading...</p>
    </div>
  )
}

export default Loader