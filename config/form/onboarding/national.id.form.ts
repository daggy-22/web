export const nationalIdFormConfig = [
  {
    label: "National ID",
    name: "nationalIdNumber",
    type: "number",
    placeholder: "Enter your national ID number",
    required: true,
    minLength: 16,
    maxLength: 16,
    pattern: "\\d{16}",
    validation: {
      regex: /^\d{16}$/,
      errorMessage: "National ID must be exactly 16 digits",
    },
  },
];
