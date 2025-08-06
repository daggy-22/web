"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CustomerAddress = {
  id: string;
  birthPlace: string;
  regionId: number;
  subCityId: number;
  woreda: string;
  houseNumber: string;
  nationality: string;
};

type CustomerIdentification = {
  id: string;
  idNumber: string;
  idType: string;
  issuedDate: string;
  expiryDate: string | null;
};

type EmergencyContact = {
  id: string;
  fullNames: string | null;
  mobileNumber: string;
  relationship: string;
  address: string;
  email: string | null;
};

type EmploymentInfo = {
  id: string;
  employerName: string;
  employerAddress: string;
  contactPersonName: string;
  jobTitle: string;
  employeeIdNumber: string;
  employmentType: string;
  paymentFrequency: string;
  monthlyIncome: number;
  startDate: string;
  endDate: string | null;
  verificationDocumentUrl: string | null;
};

type BankDetails = {
  id: string;
  bankName: string | null;
  accountNumber: string;
  branchName: string | null;
  branchCode: string | null;
};

type CustomerData = {
  id: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  customerAddress: CustomerAddress;
  languagePreference: string;
  educationLevel: string;
  customerIdentifications: CustomerIdentification[];
  emergencyContacts: EmergencyContact[];
  sourceOfIncome: string;
  employmentInfos: EmploymentInfo[];
  businessInfos: unknown[];
  profile: string | null;
  signature: string | null;
  bankDetails: BankDetails;
  profilePictureFilePath: string;
  profilePictureUrl: string | null;
  customerStatus: string | null;
  createdOn: string;
  externalId?: string
};

interface CustomerState {
  customer: CustomerData | null;
  setCustomer: (data: CustomerData) => void;
  clearCustomer: () => void;
}

const useCustomerStore = create(
  persist<CustomerState>(
    (set) => ({
      customer: null,
      setCustomer: (data) => set({ customer: data }),
      clearCustomer: () => set({ customer: null }),
    }),
    {
      name: "customer-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCustomerStore;