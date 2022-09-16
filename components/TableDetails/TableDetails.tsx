import React from "react";
import { SingleTemplate } from "../SingleTemplate/SingleTemplate";

export const TableDetails = (
  detailsDataList: never[],
  handleDeleteElement: (e: any, id: number) => void
) => {
  return (
    <table>
      <tbody>
        {detailsDataList.map((element, index) => {
          return (
            <>
              <SingleTemplate
                index={index}
                element={element}
                handleDeleteElement={handleDeleteElement}
              />
            </>
          );
        })}
      </tbody>
    </table>
  );
};

