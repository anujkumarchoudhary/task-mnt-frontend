import React from "react";
const SelectField = ({ data, name, value, handleChange }) => {
  return (
    <select
      onChange={handleChange}
      name={name}
      value={value}
      className="bg-white outline-none border border-slate-300 px-4 py-2 my-1 w-full"
    >
      <option value="">Select</option>

      {data?.map((item) => {
        return <option value={item?._id || item}>{item?.name || item}</option>;
      })}
    </select>
  );
};

export default SelectField;
