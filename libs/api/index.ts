import axios from "axios";
import apiClient from "../axios.instance";
import tempApiClient from "../temp-user-axios.instance";

export const fetchFeaturedDevices = async () => {
  try {
    const response = await apiClient.get("v1/public/devices?featured=true");
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const customerLogin = async (data: unknown) => {
  try {
    const response = await apiClient.post("/cs/v1/customer/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initiateResetPassword = async (data: unknown) => {
  try {
    const response = await apiClient.post(
      "/cs/v1/customer/initiate-reset-password",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateResetPassword = async (data: unknown) => {
  try {
    const response = await apiClient.post(
      "/cs/v1/customer/validate-reset-password",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCustomerProfile = async (id: string) => {
  try {
    const response = await apiClient.get(`/cs/v1/customer/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMerchants = async (
  page: number = 0,
  size: number = 12,
  query: string = ""
) => {
  try {
    const response = await apiClient.get(
      `/cs/v1/merchant?page=${Number(page)}&size=${Number(size)}&name=${query}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDevices = async (query: string = "") => {
  try {
    const response = await apiClient.get(`/cs/v1/devices?deviceName=${query}`);
    return response.data.content;
  } catch (error) {
    throw error;
  }
};

export const fetchCustomerDevices = async (id: string, query: string = "") => {
  try {
    const response = await apiClient.get(
      `/cs/v1/customer/${id}/device-by-limit`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDevice = async (id: string) => {
  try {
    const response = await apiClient.get(`/cs/v1/devices/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMerchant = async (id: string) => {
  try {
    const response = await apiClient.get(`/cs/v1/merchant/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderDevice = async (data: unknown) => {
  try {
    const response = await apiClient.post("/cs/v1/orders", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initiateOnboarding = async (body: unknown) => {
  try {
    const response = await apiClient.post(
      `/cs/v1/customer/initiate-onboarding`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOnboarding = async (body: unknown) => {
  try {
    const response = await apiClient.post(
      `/cs/v1/customer/validate-onboarding-otp`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setPassword = async (body: unknown) => {
  try {
    const response = await tempApiClient.post(
      "/cs/v1/customer/reset-password",
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitOnboarding = async (body: unknown, id: string) => {
  try {
    const response = await tempApiClient.put(
      `cs/v1/customer/${id}/add-details`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLoanOffers = async (id: string) => {
  try {
    const response = await apiClient.get(`cs/v1/customer/${id}/eligibility`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acceptOffer = async (id: string, data: unknown) => {
  try {
    const response = await apiClient.post(
      `order-service/v1/loan/${id}/accept-offer`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const setUserPassword = async (
  id: string | undefined,
  body: unknown
) => {
  if (!id) return;
  try {
    const response = await tempApiClient.put(
      `/cs/v1/customer/${id}/create-password`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetUserPassword = async (body: unknown) => {
  try {
    const response = await tempApiClient.post(
      `/cs/v1/customer/reset-password`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initiateNationalId = async (body: unknown) => {
  try {
    const response = await tempApiClient.post(
      "/cs/v1/nationalid/initiate-verification",
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyIdConsent = async (body: unknown) => {
  try {
    const response = await tempApiClient.post(
      "/cs/v1/nationalid/submit-consent",
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acceptPaymentPlan = async (id: string, body: unknown) => {
  try {
    const response = await apiClient.post(
      `/order-service/v1/orders/${id}/accept-payment-plan`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signOrder = async (id: string, body: unknown) => {
  try {
    const response = await apiClient.post(
      `/order-service/v1/orders/${id}/sign-order`,
      body
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAddresses = async (level: number, parentCode: string) => {
  try {
    const response = await tempApiClient.get(
      `/v1/addresses?level=${level}&${
        parentCode ? `parentCode=${parentCode}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    try {
      const retryResponse = await tempApiClient.get(
        `/v1/addresses?level=${level}&parentCode=${parentCode}`
      );
      return retryResponse.data;
    } catch (retryError) {
      throw retryError;
    }
  }
};

export const refreshAddresses = async () => {
  try {
    const response = await tempApiClient.get(`/v1/addresses/refresh`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
