import { useState } from "react";

const useForm = (callback) => {
  const [authFormVals, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const vals = authFormVals;
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

  return {
    handleSubmit,
    handleChange,
    authFormVals
  };
};

export default useForm;
