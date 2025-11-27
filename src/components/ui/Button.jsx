import React from 'react'

const Button = ({name,isBorder,className, handleClick}) => {
  return (
    <div onClick={handleClick} className={`${className} cursor-pointer font-semi-bold text-center px-4 py-2 ${isBorder && "border-2 border-[#EC4133] text-[#EC4133] bg-white"}`}>
      {name}
    </div>
  )
}

export default Button
