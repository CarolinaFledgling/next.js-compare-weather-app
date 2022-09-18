import React, { ChangeEvent } from "react";

interface SubmitFormGroupProps {
  isLoading: boolean;
  valueInput: string;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SubmitFormGroup = ({
  isLoading,
  valueInput,
  handleChangeInput,
}: SubmitFormGroupProps) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor="country">
        Enter Country:
      </label>
      <input
        placeholder="Poland"
        className="input"
        disabled={isLoading}
        type="text"
        id="country"
        value={valueInput}
        onChange={handleChangeInput}
      />
    </div>
  );
};
