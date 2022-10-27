// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const useForm = (initialState = {}) => {
  const [dataForm, setDataForm] = useState(initialState);

  const handleChangeInput = ({ target }) => {
    setDataForm({
      ...dataForm,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setDataForm(initialState);
  };

  return [dataForm, handleChangeInput, reset];
};

export default useForm;
