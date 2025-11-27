import React from 'react'

const InputField = ({ type, name, value,handleChange,maxLength, placeholder, className }) => {
    return (
        <input type={type} name={name} value={value} onChange={handleChange} maxLength={maxLength} placeholder={placeholder} className={`${className} bg-white outline-none border border-slate-300 px-4 py-2 my-1 w-full`} />
    )
}

export default InputField
