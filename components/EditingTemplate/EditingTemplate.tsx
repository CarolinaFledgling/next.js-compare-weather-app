import React, { ChangeEvent, FormEvent } from "react";

interface EditingTemplateProps {
  inputSaveValue: string;
  handleSave: (e: ChangeEvent<HTMLInputElement>) => void;
  handlerChangeSaveEditing: (e: FormEvent) => void;
  index: number;
  element: {
    country: string;
  };
  isSaveLoading: boolean;
}

export const EditingTemplate = ({
  inputSaveValue,
  handleSave,
  handlerChangeSaveEditing,
  index,
  element,
  isSaveLoading,
}: EditingTemplateProps) => {
  return (
    <tr key={`elem-${index}`}>
      <td>{index + 1}.</td>
      <td>
        <label htmlFor="input-name">
          &nbsp;Edited: &nbsp;
        </label>
      </td>
      <td>
        <input
          disabled={isSaveLoading}
          value={inputSaveValue}
          defaultValue={element.country}
          onChange={handleSave}
          id="input-name"
          type="text"
        />
      </td>
      <td>
        <button onClick={handlerChangeSaveEditing}>
          {isSaveLoading ? "loading.." : "Save"}
        </button>
      </td>
    </tr>
  );
};
