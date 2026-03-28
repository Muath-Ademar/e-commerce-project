import React from 'react'

const NameAndEmail = ({firstName, lastName, email}) => {
  return (
    <div>
        <p className="font-medium text-gray-900">{firstName} {lastName}</p>
        <p className="text-xs text-gray-500">{email}</p>
    </div>
  )
}

export default NameAndEmail
