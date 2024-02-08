import React from 'react';

function Button({ title, color, size, onClick }) {
  let sizeClass = '';
  switch (size) {
    case 'small':
      sizeClass = 'px-3 py-1 text-sm';
      break;
    case 'large':
      sizeClass = 'px-10 py-3 text-lg';
      break;
    default:
      sizeClass = 'px-4 py-2 text-base';
  }

  let colorClass = '';
  switch (color) {
    case 'primary':
      colorClass = 'bg-blue-500 hover:bg-blue-600 text-white';
      break;
    case 'secondary':
      colorClass = 'bg-gray-500 hover:bg-gray-600 text-white';
      break;
    case 'success':
      colorClass = 'bg-green-500 hover:bg-green-600 text-white';
      break;
    case 'danger':
      colorClass = 'bg-red-500 hover:bg-red-600 text-white';
      break;
    default:
      colorClass = 'bg-gray-500 hover:bg-gray-600 text-white';
  }

  return (
    <button
      className={`rounded-lg focus:outline-none ${sizeClass} ${colorClass}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
