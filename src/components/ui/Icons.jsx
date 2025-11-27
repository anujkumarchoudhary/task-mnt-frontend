import React from "react";
import { MdClose, MdEdit, MdDelete } from "react-icons/md";
import { FaUser, FaSignInAlt } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const iconMap = {
  edit: MdEdit,
  delete: MdDelete,
  user: FaUser,
  login: FaSignInAlt,
  close: MdClose,
  threeDots: BsThreeDots,
};

const Icons = ({
  name,
  handleClick,
  size = 18,
  color = "inherit",
  className = "",
}) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;

  return (
    <IconComponent
      onClick={handleClick}
      size={size}
      color={color}
      className={className}
    />
  );
};

export default Icons;
