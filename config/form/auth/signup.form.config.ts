export const signupFormConfig = [
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
    validation: {
      regex: /^[a-zA-Z\s-]+$/,
      errorMessage:
        "First name should only contain letters, spaces, and hyphens",
    },
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
    placeholder: "Enter your email",
    validation: {
      regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      errorMessage: "Invalid email address",
    },
  },
  {
    label: "Phone",
    name: "phone",
    type: "tel",
    required: true,
    placeholder: "Enter your phone number",
    validation: {
      regex: /^\d{10}$/,
      errorMessage: "Phone number must be 10 digits",
    },
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
    placeholder: "Enter password",
    validation: {
      regex: /^.{6,20}$/,
      errorMessage: "Password must be between 6 and 20 characters",
    },
  },

  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    required: true,
    placeholder: "Re-enter password",
    validation: {
      regex: (value: string, formData: any) => value === formData.password,
      errorMessage: "Passwords do not match",
    },
    canBeSentToBackend: false,
  },
  {
    label: "I agree to the Terms & Conditions",
    name: "acceptTerms",
    type: "checkbox",
    required: true,
    validation: {
      regex: (value: boolean) => value === true,
      errorMessage: "You must accept the Terms & Conditions to continue",
    },
    canBeSentToBackend: false,
    termsLink: "/terms",
  },
];
