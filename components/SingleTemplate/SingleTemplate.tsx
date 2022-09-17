import React from "react";

interface Element {
  country: string;
  capital: string;
  weather: string;
  id: string;
}

interface SingleTemplateProps {
  index: number;
  element: Element;
  handleDeleteElement: (e: any, id: string) => void;
  handleEditClick: (e: any, element: Element, id: string) => void;
}

export const SingleTemplate = ({
  index,
  element,
  handleDeleteElement,
  handleEditClick,
}: SingleTemplateProps) => {
  return (
    <tr key={`elem-${index}`}>
      <td>{index + 1}.</td>
      <td>{element.country}</td>
      <td>{element.capital}</td>
      <td>{element.weather}</td>
      <button onClick={(e) => handleDeleteElement(e, element.id)}>
        Delete
      </button>
      <button onClick={(e) => handleEditClick(e, element, element.id)}>
        Edit
      </button>
    </tr>
  );
};
