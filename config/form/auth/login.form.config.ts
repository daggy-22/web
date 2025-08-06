export const loginFormConfig = [
  {
    label: "Username",
    name: "userName",
    type: "text",
    placeholder: "Enter your user name",
    required: true,
    validation: {
      regex: null, 
      errorMessage: "Username is required",
    },
  },

  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter password",
    validation: {
      regex: null,
      errorMessage:
        "Password is required",
    },
  },
];
