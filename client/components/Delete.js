import React from 'react'

const Delete = (props) => {
  return (
    <div>
      <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300" onClick={props.successCallBack}>
        Delete
      </button>
    </div>
  )
}

export default Delete
