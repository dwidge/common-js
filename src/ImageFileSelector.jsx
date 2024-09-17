// Copyright DWJ 2022.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import React, { useRef } from "react";
import { StyledButton } from "./StyledButton";

const ImageFileSelector = ({ onSelect, children }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onSelect(file);
    }
  };

  return (
    <>
      <StyledButton onClick={handleButtonClick}>{children}</StyledButton>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImageFileSelector;
