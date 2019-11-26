import { useState } from "react";

const useForm = (callback) => {
  const [authFormVals, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const vals = authFormVals;

    setValues({});

    callback(vals);
  };

  const handleSubmitWithId = (event, id) => {
    event.preventDefault();
    const vals = { id: id, ...authFormVals };

    setValues({});

    callback(vals);
  };

  // passes previous input in and only changes the input that was altered
  const handleChange = (event) => {
    event.persist();
    setValues((authFormVals) => ({
      ...authFormVals,
      [event.target.name]: event.target.value
    }));
  };

  // Reverts form state if there is an error on submit
  const revertChange = (values) => {
    setValues(values);
  };

  return {
    handleSubmit,
    handleChange,
    authFormVals,
    revertChange,
    handleSubmitWithId
  };
};

export default useForm;
