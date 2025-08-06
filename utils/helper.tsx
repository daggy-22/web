import { NationalIdData } from "@/stores/nationalIdDataStore";
import dayjs from "dayjs";

export interface Industry {
  code?: string;
  name?: string;
  lineOfBusinesses: {
    code: string;
    name: string;
    localizations?: {
      am?: string;
      or: string;
    };
  }[];
}
export const addressApiBaseUrl =
  process.env.NEXT_PUBLIC_ADDRESS_API_BASE_URL ||
  "https://opendata.qena.dev/data/regions";

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://opendata.qena.dev/data/regions";

export const businessSectorApiBaseUrl =
  process.env.NEXT_PUBLIC_BUSINESS_SECTOR_API_BASE_URL ||
  "https://opendata.qena.dev/data/businessSectors";

export const getImageUrl = (id: string) => {
  return `${apiBaseUrl}/order-service/v1/devices/${id}/download`;
};

export const getMerchantImageUrl = (id: string) => {
  return `${apiBaseUrl}/cs/v1/merchants/${id}/download`;
};

// eslint-disable-next-line
export const constructOrderPayload = (
  merchantId: string,
  customer: any,
  device: any
) => {
  return {
    merchantId,
    customerId: customer.id,
    customerPhoneNumber: customer.mobileNumber,
    totalAmount: device.maximumPrice,
    downPayment: 0.0,
    items: [
      {
        itemId: device.id,
        name: device.deviceName,
        quantity: 1,
        price: device.maximumPrice,
      },
    ],
    action: "create",
    loan_product_id: device.id,
    amount: device.maximumPrice,
    externalCustomerId: customer.id,
  };
};

export const snakeToTitleCase = (text: string) => {
  if (typeof text !== "string" || text === "") return "";
  return text
    .replace(/_/g, " ")
    .replace(/\b[a-zA-Z]/g, (char) => char.toUpperCase());
};

// eslint-disable-next-line
export const constructOnboardingPayload = (data: any) => {
  console.log(`regg${data.region}`);
  return {
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    dateOfBirth: dayjs(data.dateOfBirth).format("YYYY-MM-DD"),
    gender: data.gender,
    maritalStatus: data.maritalStatus,
    // signature: "SGVsbG8gd29ybGQh",
    customerAddress: {
      addressType: "HOME",
      regionCode: `${data.region}`,
      cityId: 10,
      subCityId: 20,
      houseNumber: data.houseNumber,
      // woredaCode: `${data.woreda}`,
      nationality: "Ethiopian",
    },
    educationLevel: data.educationLevel,
    businessInfos: [],
    customerIdentifications: [
      {
        idNumber: `${data.idNumber}`,
        idType: data.idType,
        issuedDate: dayjs(data.issuedDate).format("YYYY-MM-DD"),
        expiryDate: dayjs(data.expiryDate).format("YYYY-MM-DD"),
      },
    ],
    sourceOfIncome: data.incomeSource,
    // businessInfos:
    // {
    //   companyName: data.companyName,
    //   tinNumber: +data.tinNumber,
    //   lineOfBusiness: data.lineOfBusiness,
    //   startingEmployeeCount: +data.startingEmployeeCount,
    //   currentEmployeeCount: +data.currentNumberOfEmployees,
    //   currentCapital: +data.currentCapital,
    //   sourceOfInitialCapital: data.sourceOfInitialCapital,
    //   annualSales: +data.annualSales,
    // },
    employmentInfos: [
      {
        employerName: data.employerName,
        employerAddress: data.employerAddress,
        contactPersonName: data.contactPersonName,
        jobTitle: data.jobTitle,
        employeeIdNumber: data.employeeIdNumber,
        monthlyIncome: parseFloat(data.monthlyIncome),
        startDate: dayjs(data.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(data.endDate).format("YYYY-MM-DD"),
        employmentType: data.employmentType,
        paymentFrequency: data.paymentFrequency,
        verificationDocumentUrl: "https://google.com",
      },
    ],
    bankDetails: {
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      branchName: data.branchName,
      branchCode: data.branchCode,
    },
    languagePreference: "english",
    emergencyContacts: [
      {
        fullNames: data.fullNames,
        mobileNumber: `251${data.emergencyMobileNumber?.replace(/^0/, "")}`,
        relationship: data.relationship,
        address: data.emergencyAddress,
        email: data.emergencyEmail,
      },
    ],
  };
};

// eslint-disable-next-line
export const clearNullValues = <T extends Record<string, any>>(
  data: T
): any => {
  if (Array.isArray(data)) {
    const cleanedArray = data
      .map((item) => clearNullValues(item))
      .filter(
        (item) =>
          item !== null &&
          item !== undefined &&
          item !== "" &&
          !Number.isNaN(item)
      );
    return cleanedArray.length > 0 ? cleanedArray : undefined;
  } else if (typeof data === "object" && data !== null) {
    const cleanedObject = Object.entries(data).reduce((acc, [key, value]) => {
      const cleanedValue = clearNullValues(value);
      if (
        cleanedValue !== null &&
        cleanedValue !== undefined &&
        cleanedValue !== "" &&
        !Number.isNaN(cleanedValue)
      ) {
        (acc as any)[key] = cleanedValue;
      }
      return acc;
    }, {} as Partial<T>);

    return Object.keys(cleanedObject).length > 0 ? cleanedObject : undefined;
  }
  return data;
};

export const constructInitialValues = (idData: NationalIdData | null) => {
  if (!idData) {
    return {}
  }
  return {
    firstName: idData?.fullName?.split(" ")[0] || "",
    middleName: idData?.fullName?.split(" ")[1] || "",
    lastName: idData?.fullName?.split(" ")[2] || "",
    gender: idData?.gender?.toLowerCase() || "",
    //region: idData?.response?.identity?.fullAddress[0].value || "",
    idType: "NATIONAL_ID",
    idNumber: idData?.idNumber || "",
  };
};

export function generateRandomUUIDLikeString(): string {
  // Generate random hexadecimal segments
  const segment1 = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  const segment2 = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  const segment3 = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  const segment4 = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  const segment5 = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

  // Combine segments in UUID-like format (8-4-4-4-12)
  return `${segment1}${segment2}-${segment3}-${segment4}-${segment5}-${segment1}${segment2}${segment3}`;
}

export const mapIndustriesToLinesOfBusiness = (dataArray: Industry[]) => {
  const data = dataArray.flatMap((industry) =>
    industry.lineOfBusinesses?.map((business) => ({
      value: business.code,
      label: business.name,
      am: business.localizations?.am,
      or: business.localizations?.or,
    }))
  );
  console.log({ data });
  return data;
};

export const getThemeClasses = (theme: string) => {
  return theme === "dark"
    ? "bg-gray-900 text-gray-200"
    : "bg-white text-gray-800";
};
