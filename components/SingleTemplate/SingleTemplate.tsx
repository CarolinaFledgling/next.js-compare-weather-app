import React from "react";

export const SingleTemplate = ({ index, element, handleDeleteElement }) => {
  return (
    <tr key={`elem-${index}`}>
      <td>{index + 1}.</td>
      <td>{element.country}</td>
      <td>{element.capital}</td>
      <td>{element.weather}</td>
      <button onClick={(e) => handleDeleteElement(e, element.id)}>
        Delete
      </button>
    </tr>
  );
};
