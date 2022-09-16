import React from "react";

export const MainForm = (
  isLoading: boolean,
  valueInput: string,
  handleChangeInput: () => void,
  handleSubmitForm: () => void
) => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="country"> Enter Country: </label>
        <input
          disabled={isLoading}
          type="text"
          id="country"
          value={valueInput}
          onChange={handleChangeInput}
        />
      </div>
      <button disabled={isLoading} onClick={handleSubmitForm}>
        {isLoading ? "Loading..." : "Add to the List"}
      </button>
    </form>
  );
};
