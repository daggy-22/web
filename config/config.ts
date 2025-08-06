export const appFaq = [
  {
    question: "Who can apply for device financing?",
    answer:
      "Anyone with a valid credit score and proof of income is eligible to apply for device financing. Additional terms may apply based on your location.",
  },
  {
    question: "How do I know if my application is approved?",
    answer:
      "You will receive a notification via email or SMS once your application is reviewed and approved. You can also check the status on your account dashboard.",
  },
  {
    question: "Can I pay off my loan early?",
    answer:
      "Yes, you can pay off your loan early without any prepayment penalties. Any early payments will be deducted from your remaining balance.",
  },
];

export const howForCustomers = [
  {
    icon: "visit",
    title: "Visit a Partner Merchant",
    list: [
      "Option 1: Visit a nearby merchant to complete your KYC and apply for financing if you don’t have a smartphone.",
      "Option 2: Download the Kifiya Customer App, register with your details, complete KYC, and apply for financing conveniently from your device.",
    ],
  },
  {
    icon: "approval",
    title: "Approval and Limit Assignment",
    list: [
      "After applying, you’ll receive a notification about your financing approval and limit.",
      "Use the app to search for nearby merchants offering the desired device.",
    ],
  },
  {
    icon: "purchase",
    title: "Device Purchase",
    list: [
      "Visit the merchant, select your device, and confirm the purchase by making the required down payment.",
      "Financing terms are finalized, and you’re all set to enjoy your new device!",
    ],
  },
];

export const partnerWithKifiya = [
  {
    icon: "formerchant",
    title: "For Merchants",
    desc: [
      "Drive sales growth with flexible financing options",
      "Receive instant payments for financed devices",
      "Join our digital revolution mission",
    ],
  },
  {
    icon: "forcompanies",
    title: "For Companies",
    desc: [
      "Offer device financing as an employee benefit",
      "Simplified employee onboarding with bulk KYC",
      "Direct payroll deduction for easy repayments",
    ],
  },
];

export const dummyDevices = [
  {
    id: 1,
    imageUrl:
      "https://www.assuredzone.com/et/wp-content/uploads/sites/16/2024/09/iPhone-16-Pro-Max.jpg",
    name: "MacBook Pro M3",
    specs: "16GB RAM, 512GB SSD, M3 Chip",
    price: 1299.99,
  },
  {
    id: 2,
    imageUrl:
      "https://www.assuredzone.com/et/wp-content/uploads/sites/16/2024/09/iPhone-16-Pro-Max.jpg",
    name: "iPhone 15 Pro Max",
    specs: "256GB Storage, A17 Bionic",
    price: 1399.99,
  },
  {
    id: 3,
    imageUrl:
      "https://www.assuredzone.com/et/wp-content/uploads/sites/16/2024/09/iPhone-16-Pro-Max.jpg",
    name: "Samsung Galaxy S24 Ultra",
    specs: "12GB RAM, 512GB Storage, Snapdragon 8 Gen 3",
    price: 1199.99,
  },
];

export const dummySuggestions = [
  "Samsung Galaxy S23",
  "iPhone 14 Pro",
  "Google Pixel 7",
  "OnePlus 11",
];

export const toastConfig = {
  duration: 5000,
  style: {
    background: "#363636",
    color: "#fff",
  },
  success: {
    duration: 3000,
  },
  error: {
    duration: 4000,
  },
};

export const appTheme = {
  primaryBgColor: "#F9B654",
  secondaryBgColor: "#904AF4",
  tertiaryBgColor: "#F05A7C",
};

export const onboardingPageTextContents = {
  initiate: {
    header: "",
    formTitle: "",
    formSUbTitle: "",
    image: "",
  },
  enterNationalId: {
    header: "",
    formTitle: "",
    formSUbTitle: "",
    image: "",
  },
};

export const kifiyaConstacts = {
  phone: "+251116671579",
  phoneFormatted: "+251 116 671 579",
  email: "info@kifiya.com",
};

export const CHAT_CONFIG = {
  BACKEND_URL:
    process.env.NEXT_PUBLIC_CHATBOT_API_BASE_URL || "http://3.216.34.218:9006",

  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_MAX_TOKENS: 1000,
  DEFAULT_LANGUAGE: "English",

  SUPPORTED_LANGUAGES: ["English", "አማርኛ", "Afaan Oromoo", "ትግርኛ"],

  LOAD_CHAT_HISTORY: true,

  WELCOME_MESSAGE: "Hello! I'm your AI assistant. How can I help you today?",
  CONNECTION_ERROR:
    "❌ Error connecting to the server. Please check if the backend is running.",
  HISTORY_LOADING_MESSAGE: "Loading chat history...",

  DEFAULT_GITHUB_URL:
    process.env.NEXT_PUBLIC_CHATBOT_GITHUB_URL ||
    "https://github.com/Qena-Digital-Lending/dfs_portal",

  LANGUAGE_CODES: {
    English: "EN",
    አማርኛ: "አማ",
    "Afaan Oromoo": "OM",
    ትግርኛ: "ትግ",
  },
};

export const formatMessage = (
  template: string,
  replacements: Record<string, string>
) => {
  let message = template;
  Object.entries(replacements).forEach(([key, value]) => {
    message = message.replace(`{${key}}`, value);
  });
  return message;
};
