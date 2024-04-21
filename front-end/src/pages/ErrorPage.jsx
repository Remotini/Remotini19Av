import React from 'react'
import Error from '../components/ErrorNotFound/Error.jsx'

function ErrorPage() {
  return (
    <>
      <div className="flex-two-table">
        <div className="left-design"></div>
        <div className="Table">
          <Error/>
        </div>
      </div>
    </>
  )
}

export default ErrorPage
