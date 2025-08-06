export interface Merchant {
  id: string;
  mobileNumber: string;
  name: string;
  tinNo: string;
  email: string | null;
  lineOfBusiness: string;
  yearOfEstablishment: number | null;
  startingNoOfEmployees: number | null;
  currentNoOfEmployees: number | null;
  startingCapital: number | null;
  currentCapital: number | null;
  sourceOfIncome: string | null;
  annualSanameles: number | null;
  annualProfit: number | null;
  state: {
    id: string;
    status: string;
    createdAt: string;
    remark: string;
  };
  bankDetails: {
    id: string;
    bankName: string;
    accountNumber: string;
    branchName: string | null;
    branchCode: string | null;
  };
  createdOn: string;
}

interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface MerchantApiResponse {
  content: Merchant[];
  page: Page;
}

export interface Device {
  id: string;
  deviceName: string;
  deviceModel: string;
  deviceOs: string;
  ram: string;
  storage: string;
  brand: string;
  color: string;
  category: string;
  cameraQuality: string;
  batteryCapacity: string;
  count: number;
  isActive: boolean;
  image: string;
  minimumPrice: number;
  price: number;
  maximumPrice: number;
  isFeatured: boolean;
}

export interface Product {
  id: string;
  isActive: boolean;
  deviceName: string;
  maximumPrice: number;
  downPayment: number;
  storage: string;
  ram: string;
  batteryCapacity: string;
  cameraQuality: string;
  frontCamera: string;
  processor: string;
  display: string;
  network: string;
  sensors: string;
  deviceOs: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  endpoint?: string;
  options?: { label: string; value: string }[];
  validation?: {
    regex: RegExp;
    errorMessage: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  accept?: string;
}

export interface StepConfig {
  title: string;
  employeeSubtitle?: string;
  employeeTitle?: string;
  subtitle: string;
  fields: FieldConfig[];
  fieldsForRegistered?: FieldConfig[];
  fieldsForUnregistered?: FieldConfig[];
  skip?: boolean;
  backButton?: string | boolean;
  nextButton?: string;
}

export interface FormBuilderProps {
  onAfterSubmit?: (data: any) => void;
  onStepChange?: (step: number) => void;
  currentStep?: number;
  initialValues?: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date | string | undefined;
    subCity?: { name: string };
    city?: { name: string };
    region?: { name: string };
    idType?: string;
    idNumber?: string;
  };
}

export interface LocationData {
  code: string;
  name: string;
  zones?: {
    code: string;
    name: string;
    woredas?: {
      code: string;
      name: string;
      kebeles?: {
        code: string;
        name: string;
      }[];
    }[];
  }[];
}

export interface Woreda {
  code: string;
  name: string;
  kebeles?: {
    code: string;
    name: string;
  }[];
}
