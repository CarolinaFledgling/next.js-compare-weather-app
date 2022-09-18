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
    <div className="edit-row" key={`elem-${index}`}>
      <p> {index + 1}. </p>
      <label htmlFor="input-name">&nbsp;Edited value: &nbsp;</label>
      <input
        disabled={isSaveLoading}
        value={inputSaveValue}
        defaultValue={element.country}
        onChange={handleSave}
        id="input-name"
        type="text"
      />
      <button onClick={handlerChangeSaveEditing}>
        {isSaveLoading ? "loading.." : "Save"}
      </button>
    </div>
  );
};
