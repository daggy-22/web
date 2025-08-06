import { group } from "console";

export const onboardingFormConfig = [
  {
    title: "Personal Information",
    subtitle: "Please provide your Personal details to proceed with financing",
    skip: false,
    backButton: "Back",
    nextButton: "Next",
    fields: [
      {
        label: "First Name",
        name: "firstName",
        type: "text",
        required: true,
        placeholder: "Enter your first name",
        validation: {
          regex: /^[a-zA-Z]{2,30}$/,
          errorMessage:
            "First name must contain only letters and be between 2 and 30 characters long.",
        },
      },
      {
        label: "Middle Name",
        name: "middleName",
        type: "text",
        required: true,
        placeholder: "Enter your first name",
        validation: {
          regex: /^[a-zA-Z]{2,30}$/,
          errorMessage:
            "Middle name must contain only letters and be between 2 and 30 characters long.",
        },
      },
      {
        label: "Last Name",
        name: "lastName",
        type: "text",
        required: true,
        placeholder: "Enter your last name",
        validation: {
          regex: /^[a-zA-Z]{2,30}$/,
          errorMessage:
            "Last name must contain only letters and be between 2 and 30 characters long.",
        },
      },

      {
        label: "Gender",
        name: "gender",
        type: "select",
        required: true,
        placeholder: "Select your gender",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
      {
        label: "Birth Region",
        name: "birthPlace",
        type: "select",
        required: true,
        placeholder: "Select your birth region",
        endpoint: "https://opendata.qena.dev/data/regions?level=4",
      },
      {
        label: "Current Region",
        name: "region",
        type: "select",
        required: true,
        placeholder: "Select your marital status",
        endpoint: "https://opendata.qena.dev/data/regions?level=4",
      },

      {
        label: "Zone",
        name: "zone",
        type: "select",
        required: true,
        placeholder: "Select your zone",
      },

      {
        label: "Woreda",
        name: "woreda",
        type: "select",
        required: true,
        placeholder: "Select your woreda",
      },
      {
        label: "Kebele",
        name: "kebele",
        type: "select",
        required: true,
        placeholder: "Select your woreda",
      },
      {
        label: "Birth Date",
        name: "dateOfBirth",
        type: "date",
        required: true,
        placeholder: "Enter your birth date",
        maxDate: new Date(
          new Date().setFullYear(new Date().getFullYear() - 18)
        ),
      },
      {
        label: "House Number",
        name: "houseNumber",
        type: "number",
        required: true,
        placeholder: "Enter house number",
        validation: {
          regex: /^[0-9]{1,6}$/,
          errorMessage:
            "House number must contain only numbers and be between 1 and 6 digits long.",
        },
      },
      {
        label: "Education Level",
        name: "educationLevel",
        type: "select",
        required: false,
        placeholder: "Select your education level",
        options: [
          { label: "Primary", value: "PRIMARY" },
          { label: "TVET", value: "TVET" },
          { label: "Diploma", value: "DIPLOMA" },
          { label: "Bachelor's Degree", value: "BACHELOR_DEGREE" },
          { label: "Master's Degree", value: "MASTERS_DEGREE" },
          { label: "PhD and Above", value: "PHD_AND_ABOVE" },
        ],
        // [none, primary, secondary, TVET, diploma, bachelors degree, masters degree, phd and above]
      },

      {
        label: "Marital Status",
        name: "maritalStatus",
        type: "select",
        required: true,
        placeholder: "Select your marital status",
        options: [
          { label: "Single", value: "single" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" },
          { label: "Widowed", value: "widowed" },
        ],
      },
    ],
  },
  {
    title: "Identity Information",
    subtitle: "What type of ID do you have?",
    skip: false,
    backButton: "Back",
    nextButton: "Next",
    fields: [
      {
        label: "ID Type",
        name: "idType",
        group: "customerIdentifications",
        type: "select",
        required: true,
        placeholder: "Select your id type",
        options: [
          { label: "National ID", value: "NATIONAL_ID" },
          { label: "Kebele ID", value: "KEBELE_ID" },
          { label: "Drivers License", value: "DRIVERS_LICENSE" },
          { label: "Passport", value: "PASSPORT" },
        ],
      },
      {
        label: "ID Number",
        name: "idNumber",
        group: "customerIdentifications",
        type: "number",
        required: true,
        placeholder: "Enter id number",
        validation: {
          regex: /^[0-9]+$/,
          errorMessage: "Id number must contain only numbers",
        },
      },
      {
        label: "Issued Date",
        name: "issuedDate",
        group: "customerIdentifications",
        type: "date",
        required: true,
        placeholder: "Enter date of issue of ID",
        maxDate: new Date(),
      },
      {
        label: "Expiry Date",
        name: "expiryDate",
        group: "customerIdentifications",
        type: "date",
        required: true,
        placeholder: "Enter expiry date of ID",
        maxDate: new Date(),
      },
    ],
  },
  {
    title: "Emergency Contact Information",
    subtitle: "Please, provide details about your emergency contact",
    skip: false,
    backButton: "Back",
    nextButton: "Next",
    fields: [
      {
        label: "Full Name",
        name: "fullNames",
        type: "text",
        required: true,
        placeholder: "Enter your emergency contact's full name",
        validation: {
          regex: /^[a-zA-Z]{2,25} [a-zA-Z]{2,25}$/,
          errorMessage:
            "Full name must be between 3 and 50 characters and can only contain letters and spaces.",
        },
      },
      {
        label: "Phone Number",
        name: "emergencyMobileNumber",
        group: "emergencyInfo",
        type: "number",
        required: true,
        placeholder: "Enter emergency contact phone number",
        validation: {
          regex: /^(09|07)[0-9]{8}$/,
          errorMessage:
            "Phone number must start with 09 or 07, followed by exactly 8 digits.",
        },
      },
      {
        label: "Relationship",
        name: "relationship",
        type: "text",
        required: true,
        placeholder: "Enter your relationship with your emergency contact",
        validation: {
          regex: /^[a-zA-Z\s]{3,50}$/,
          errorMessage:
            "Relationship must be between 3 and 50 characters and can only contain letters and spaces.",
        },
      },
      {
        label: "Address",
        name: "emergencyAddress",
        type: "text",
        required: true,
        placeholder: "Enter your emergency contact address",
        validation: {
          regex: /^[a-zA-Z\s]{5,100}$/,
          errorMessage:
            "Address must be between 5 and 100 characters and can only contain letters and spaces.",
        },
      },

      {
        label: "Email",
        name: "emergencyEmail",
        type: "text",
        required: true,
        placeholder: "Enter your emergency contact's email address",
        validation: {
          regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          errorMessage: "Email address is invalid",
        },
      },
    ],
  },
  {
    title: "Bank Details",
    subtitle: "Enter your bank informations to proceed with fiancing",
    skip: false,
    backButton: "Back",
    nextButton: "Next",
    fields: [
      {
        label: "Bank Name",
        name: "bankName",
        type: "select",
        required: true,
        placeholder: "Select your bank",
        options: [
          {
            value: "COOPBANK",
            label: "Cooperative Bank of Oromia",
          },
        ],
      },
      {
        label: "Account Number",
        name: "accountNumber",
        group: "accountNumber",
        type: "number",
        required: true,
        placeholder: "Enter account number",
        validation: {
          regex: /^[0-9]{7,16}$/,
          errorMessage: "Account number must contain only numbers",
        },
      },
      {
        label: "Branch Name",
        name: "branchName",
        type: "text",
        required: true,
        placeholder: "Enter your bank branch",
        validation: {
          regex: /^[a-zA-Z\s]{3,50}$/,
          errorMessage:
            "Branch name must contain only letters and spaces, and be between 3 and 50 characters long.",
        },
      },
      {
        label: "Branch Code",
        name: "branchCode",
        type: "text",
        required: false,
        placeholder: "Enter your bank branch code",
        validation: {
          regex: /^[a-zA-Z0-9\s]{3,10}$/,
          errorMessage:
            "Branch code must contain only letters, numbers, and spaces, and be between 3 and 10 characters long.",
        },
      },
    ],
  },
  {
    title: "Income Source",
    subtitle:
      "Choose your Income Source to check financing eligibility and pre-fill your details.",
    skip: false,
    backButton: "Back",
    nextButton: "Next",
    fields: [
      {
        label: "",
        name: "incomeSource",
        type: "radio",
        required: true,
        options: [
          { label: "Bussiness Owner", value: "BUSINESS" },
          { label: "Employee", value: "EMPLOYMENT" },
        ],
      },
    ],
  },

  {
    title: "Business Information",
    employeeTitle: "Employment Information",
    subtitle: "Please provide your Business details to proceed with financing",
    employeeSubtitle:
      "Please provide your employment details to proceed with financing",
    skip: false,
    backButton: false,
    nextButton: "Submit & Continue",
    fields: [
      {
        label: "Employer Name",
        name: "employerName",
        group: "employmentInfos",
        type: "text",
        required: true,
        placeholder: "Enter your employer's name",
        validation: {
          regex: /^[a-zA-Z\s]+$/,
          errorMessage: "Employer name must contain only letters",
        },
      },
      {
        label: "Employer Address",
        name: "employerAddress",
        group: "employmentInfos",
        type: "text",
        required: true,
        placeholder: "Enter your employer's address",
      },
      {
        label: "Contact Person Name",
        name: "contactPersonName",
        group: "employmentInfos",
        type: "text",
        required: true,
        placeholder: "Enter the contact person's name",
        validation: {
          regex: /^[a-zA-Z\s]+$/,
          errorMessage: "Contact person name must contain only letters",
        },
      },
      {
        label: "Job Title",
        name: "jobTitle",
        group: "employmentInfos",
        type: "text",
        required: true,
        placeholder: "Enter your job title",
        validation: {
          regex: /^[a-zA-Z\s]+$/,
          errorMessage: "Job title must contain only letters",
        },
      },
      {
        label: "Employee ID Number",
        name: "employeeIdNumber",
        group: "employmentInfos",
        type: "text",
        required: true,
        placeholder: "Enter your employee ID number",
        validation: {
          regex: /^[0-9]+$/,
          errorMessage: "Employee ID number must contain only numbers",
        },
      },
      {
        label: "Monthly Income",
        name: "monthlyIncome",
        group: "employmentInfos",
        type: "number",
        required: true,
        placeholder: "Enter your monthly income",
        validation: {
          regex: /^[0-9]+$/,
          errorMessage: "Monthly income must contain only numbers",
          min: 0,
        },
      },
      {
        label: "Start Date",
        name: "startDate",
        group: "employmentInfos",
        type: "date",
        required: true,
        placeholder: "Enter your employment start date",
        maxDate: new Date(),
      },
      {
        label: "End Date",
        name: "endDate",
        group: "employmentInfos",
        type: "date",
        required: false,
        placeholder: "Enter your employment end date (if applicable)",
        minDate: new Date(),
      },
      // {
      //   label: "Verification Document URL",
      //   name: "verificationDocumentUrl",
      //   type: "file",
      //   required: true,
      //   accept: ".pdf, .doc, .docx",
      // },
      {
        label: "Employment Type",
        name: "employmentType",
        type: "select",
        required: true,
        placeholder: "Select your employment type",
        options: [
          { label: "Part-Time", value: "part-time" },
          { label: "Full-Time", value: "full-time" },
          { label: "Contract", value: "contract" },
          { label: "Freelance", value: "freelance" },
          { label: "Other", value: "other" },
        ],
      },
      {
        label: "Payment Frequency",
        name: "paymentFrequency",
        type: "select",
        required: true,
        placeholder: "Select your payment frequency",
        options: [
          { label: "Monthly", value: "monthly" },
          { label: "Weekly", value: "weekly" },
        ],
      },
    ],
    fieldsForRegistered: [
      {
        label: "Company Name",
        name: "companyName",
        group: "businessInfos",
        type: "text",
        required: true,
        validation: {
          validation: {
            regex: /^[a-zA-Z0-9\s]{4,80}$/,
            errorMessage:
              "Company name must contain only letters, numbers, and spaces and be between 4 and 80 characters",
          },
        },
      },
      {
        label: "Source of Initial Capital",
        name: "sourceOfInitialCapital",
        group: "businessInfos",
        type: "text",
        required: true,
        validation: {
          regex: /^[a-zA-Z0-9\s]{4,30}$/,
          errorMessage: "Source of initial capital must contain only letters",
        },
      },
      {
        label: "TIN Number",
        name: "tinNumber",
        group: "businessInfos",
        type: "text",
        required: true,
        validation: {
          regex: /^[0-9]+$/,
          errorMessage: "TIN number must contain only 9 digits",
          minLength: 9,
          maxLength: 9,
        },
      },
      {
        label: "Starting Number of Employees",
        name: "startingNumberOfEmployees",
        group: "businessInfos",
        type: "number",
        required: true,
        validation: {
          regex: /^[0-9]+$/,
          errorMessage:
            "Starting number of employees must contain only numbers",
        },
      },
      {
        label: "Business Sector",
        name: "businessSector",
        group: "businessInfos",
        type: "select",
        required: true,
      },
      // {
      //   label: "License Document",
      //   name: "licenseDocument",
      //   group: "businessInfos",
      //   type: "file",
      //   // required: true,
      //   required: false,
      //   accept: ".pdf, .doc, .docx",
      // },
      {
        label: "Current Number of Employees",
        name: "currentNumberOfEmployees",
        group: "businessInfos",
        type: "number",
        required: true,
        validation: {
          regex: /^[0-9]+$/,
          errorMessage: "Current number of employees must contain only numbers",
        },
      },
      {
        label: "Line Of Business",
        name: "lineOfBusiness",
        group: "businessInfos",
        type: "select",
        required: true,
      },
      {
        label: "Current Capital",
        name: "currentCapital",
        group: "businessInfos",
        type: "number",
        required: true,
        validation: {
          regex: /^[0-9]+$/,
          errorMessage: "Current capital must contain only numbers",
          min: 0,
        },
      },
      // {
      //   label: "Year of Establishment",
      //   name: "yearOfEstablishment",
      //   group: "businessInfos",
      //   type: "number",
      //   required: true,
      //   validation: {
      //     regex: /^[0-9]+$/,
      //     errorMessage: "Invalid year entered",
      //     min: 1900,
      //     max: new Date().getFullYear(),
      //   },
      // },
      {
        label: "Anual Sales",
        name: "anualSales",
        group: "businessInfos",
        type: "number",
        required: true,
        validation: {
          regex: /^[0-9]+$/,
          errorMessage: "Anual sales must contain only numbers",
          min: 0,
        },
      },
    ],
  },
];
