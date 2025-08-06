/* eslint-disable */

"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { onboardingFormConfig } from "@/config/form/onboarding/onboarding.form";
import { fetchData, getAddresses } from "@/libs/api";
import {
  addressApiBaseUrl,
  businessSectorApiBaseUrl,
  clearNullValues,
  constructOnboardingPayload,
  Industry,
  mapIndustriesToLinesOfBusiness,
  snakeToTitleCase,
} from "@/utils/helper";
import { apiBaseUrl } from "@/utils/helper";
import useCustomerIdStore from "@/stores/customerIdStore";
import useTokenStore from "@/stores/tokenStore";
import axios from "axios";
import { Autocomplete } from "./Autocomplete";
import {
  FormBuilderProps,
  LocationData,
  StepConfig,
  Woreda,
  FieldConfig,
} from "@/libs/interfaces";
import useCustomerProfileStore from "@/stores/customerProfileStore";
import toast from "react-hot-toast";
import useNationalIdDataStore from "@/stores/nationalIdDataStore";

const MultiStepForm: React.FC<FormBuilderProps> = ({
  onAfterSubmit,
  onStepChange,
  initialValues,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [profileImageError, setProfileImageError] = useState<string | null>(
    null
  );
  const idData = useNationalIdDataStore((state) => state.idData);

  const [step, setStep] = useState(0);
  const token = useTokenStore((state) => state.token);
  const mobileNumber = useTokenStore((state) => state.phone);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<Record<string, unknown>>({
    ...(typeof window !== "undefined"
      ? {
          firstName: initialValues?.firstName || "",
          middleName: initialValues?.middleName || "",
          lastName: initialValues?.lastName || "",
          gender: initialValues?.gender || "",
          dateOfBirth: initialValues?.dateOfBirth || undefined,
          idType: initialValues?.idType || "",
          idNumber: initialValues?.idNumber || "",
        }
      : {}),
  });
  const id = useCustomerIdStore((state) => state.id);
  const [steps, _] = useState<StepConfig[]>([
    {
      title: "Profile Picture",
      subtitle: "Upload your profile picture",
      fields: [],
      nextButton: "Continue",
    },
    ...(onboardingFormConfig as any),
  ]);
  const [selectedFiles, setSelectedFiles] = useState<
    Record<string, File | null>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Address data queries
  const { data: regionsData = [] } = useQuery({
    queryKey: ["regionsData"],
    queryFn: () => getAddresses(0, ""),
    staleTime: Infinity,
  });

  const { data: birthPlaceData = [] } = useQuery({
    queryKey: ["birthPlaceData"],
    queryFn: () => getAddresses(0, ""),
    staleTime: Infinity,
  });

  const {
    data: zonesData = [],
    refetch: refetchZones,
    isFetching: isFetchingZones,
  } = useQuery({
    queryKey: ["zonesData", formData.region],
    queryFn: () => {
      if (!formData.region) return Promise.resolve([]);
      return getAddresses(1, formData.region as string);
    },
    enabled: !!formData.region,
    staleTime: Infinity,
  });

  const {
    data: woredasData = [],
    refetch: refetchWoredas,
    isFetching: isFetchingWoredas,
  } = useQuery({
    queryKey: ["woredasData", formData.zone],
    queryFn: () => {
      if (!formData.zone) return Promise.resolve([]);
      return getAddresses(2, formData.zone as string);
    },
    enabled: !!formData.zone,
    staleTime: Infinity,
  });

  const {
    data: kebelesData = [],
    refetch: refetchKebeles,
    isFetching: isFetchingKebeles,
  } = useQuery({
    queryKey: ["kebelesData", formData.woreda],
    queryFn: () => {
      if (!formData.woreda) return Promise.resolve([]);
      return getAddresses(3, formData.woreda as string);
    },
    enabled: !!formData.woreda,
    staleTime: Infinity,
  });

  const { data: sectorsData = [] } = useQuery({
    queryKey: ["sectorsData"],
    queryFn: () => fetchData(`${businessSectorApiBaseUrl}?level=0`),
    staleTime: Infinity,
  });

  const { data: linesOfBizData = [] } = useQuery({
    queryKey: ["linesOfBizData"],
    queryFn: () => fetchData(`${businessSectorApiBaseUrl}?level=2`),
    staleTime: Infinity,
  });

  const isLocationDataLoading = [
    regionsData,
    birthPlaceData,
    zonesData,
    woredasData,
    kebelesData,
    sectorsData,
    linesOfBizData,
  ].some((query) => query === undefined);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentStepConfig = steps[step];

  const getFieldsForStep = useCallback(() => {
    if (step === 0) return [];
    if (step === 6) {
      if (formData.incomeSource === "businessOwner") {
        return (
          currentStepConfig.fieldsForRegistered || currentStepConfig.fields
        );
      }
      return currentStepConfig.fields;
    }
    return currentStepConfig?.fields;
  }, [step, formData.incomeSource, currentStepConfig]);

  const fields = getFieldsForStep();

  // Handle address hierarchy changes
  useEffect(() => {
    if (formData.region) {
      refetchZones();
      setFormData((prev: Record<string, unknown>) => ({
        ...prev,
        zone: "",
        woreda: "",
        kebele: "",
      }));
    }
  }, [formData.region, refetchZones]);

  useEffect(() => {
    if (formData.zone) {
      refetchWoredas();
      setFormData((prev: Record<string, unknown>) => ({
        ...prev,
        woreda: "",
        kebele: "",
      }));
    }
  }, [formData.zone, refetchWoredas]);

  useEffect(() => {
    if (formData.woreda) {
      refetchKebeles();
      setFormData((prev: Record<string, unknown>) => ({
        ...prev,
        kebele: "",
      }));
    }
  }, [formData.woreda, refetchKebeles]);

  useEffect(() => {
    const loadInitialProfileImage = async () => {
      if (!idData?.photo || profileImage) return;

      try {
        const base64WithPrefix = `data:image/jpeg;base64,${idData.photo}`;
        const res = await fetch(base64WithPrefix);
        const blob = await res.blob();
        const file = new File([blob], "profile.jpg", { type: blob.type });

        setProfileImage(file);
        setProfileImagePreview(base64WithPrefix); // For preview
      } catch (error) {
        console.error("Failed to load base64 profile image", error);
      }
    };

    loadInitialProfileImage();
  }, [idData?.photo, profileImage]);

  const validationSchema = React.useMemo(() => {
    if (step === 0) return z.object({});
    return z
      .object(
        Object.fromEntries(
          fields.map((field: FieldConfig) => {
            if (field.type === "file") {
              return [
                field.name,
                field.required
                  ? z.instanceof(File, { message: "A file is required" })
                  : z.instanceof(File).optional(),
              ];
            }
            if (field.name === "dateOfBirth") {
              return [
                field.name,
                z.preprocess(
                  (value) =>
                    typeof value === "string" && value
                      ? new Date(value)
                      : value,
                  field.required
                    ? z
                        .date({ invalid_type_error: "Invalid date format" })
                        .refine(
                          (date) => {
                            const today = new Date();
                            const age =
                              today.getFullYear() - date.getFullYear();
                            const m = today.getMonth() - date.getMonth();
                            if (
                              m < 0 ||
                              (m === 0 && today.getDate() < date.getDate())
                            ) {
                              return age - 1 >= 18;
                            }
                            return age >= 18;
                          },
                          { message: "You must be at least 18 years old" }
                        )
                    : z.date().optional()
                ),
              ];
            }
            if (field.name === "issuedDate" || field.name === "expiryDate") {
              return [
                field.name,
                z.preprocess(
                  (value) =>
                    typeof value === "string" && value
                      ? new Date(value)
                      : value,
                  field.required
                    ? z.date({ invalid_type_error: "Invalid date format" })
                    : z.date().optional()
                ),
              ];
            }
            let schema = z.string();
            if (field.type === "select" && field.required) {
              schema = schema.min(1, "This field is required");
            }
            if (field.validation) {
              if (field.validation.regex) {
                schema = schema.regex(
                  field.validation.regex,
                  field.validation.errorMessage
                );
              }
              if (field.validation.minLength !== undefined) {
                schema = schema.min(
                  field.validation.minLength,
                  field.validation.errorMessage
                );
              }
              if (field.validation.maxLength !== undefined) {
                schema = schema.max(
                  field.validation.maxLength,
                  field.validation.errorMessage
                );
              }
              if (field.validation.min !== undefined) {
                schema = schema.min(
                  field.validation.min,
                  field.validation.errorMessage
                );
              }
              if (field.validation.max !== undefined) {
                schema = schema.max(
                  field.validation.max,
                  field.validation.errorMessage
                );
              }
            }
            return [field.name, field.required ? schema : schema.optional()];
          })
        )
      )
      .refine(
        (data) => {
          const { issuedDate, expiryDate } = data;
          if (issuedDate && expiryDate) {
            if (issuedDate >= expiryDate) {
              return false;
            }
          }
          return true;
        },
        {
          message: "Issued date must be earlier than expiry date",
          path: ["issuedDate", "expiryDate"],
        }
      );
  }, [fields, step]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: formData,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const handleAutocompleteChange = useCallback(
    (value: string, field: string) => {
      if (field === "region") {
        setFormData((prev: Record<string, unknown>) => ({
          ...prev,
          region: value,
          zone: "",
          woreda: "",
          kebele: "",
        }));
        refetchZones();
      } else if (field === "zone") {
        setFormData((prev: Record<string, unknown>) => ({
          ...prev,
          zone: value,
          woreda: "",
          kebele: "",
        }));
        refetchWoredas();
      } else if (field === "woreda") {
        setFormData((prev: Record<string, unknown>) => ({
          ...prev,
          woreda: value,
          kebele: "",
        }));
        refetchKebeles();
      } else {
        setFormData((prev: Record<string, unknown>) => ({
          ...prev,
          [field]: value,
        }));
      }
      setValue(field, value);
      if (errors[field]) {
        clearErrors(field);
      }
    },
    [
      setValue,
      clearErrors,
      errors,
      refetchZones,
      refetchWoredas,
      refetchKebeles,
    ]
  );

  useEffect(() => {
    reset({ ...formData });
  }, [reset, step, formData]);

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerProfileImageUpload = () => {
    profileInputRef.current?.click();
  };

  const submitFormData = async (formData: any) => {
    setIsSubmitting(true);
    try {
      console.log({ formData });
      const formDataToSubmit = new FormData();
      let customerData = clearNullValues(
        constructOnboardingPayload(formData.customer)
      );
      customerData = {
        ...customerData,
        mobileNumber,
      };
      console.log({ customerData });
      formDataToSubmit.append(
        "customer",
        new Blob([JSON.stringify(customerData)], { type: "application/json" })
      );
      if (profileImage) {
        formDataToSubmit.append("profile-pic", profileImage);
      }
      const response = await axios.put(
        `${apiBaseUrl}/cs/v1/customer/${id}/add-details`,
        formDataToSubmit,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (onAfterSubmit) onAfterSubmit(response.data);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFormSubmit = (data: FieldValues, event: React.FormEvent) => {
    event?.preventDefault();
    if (step === 0) {
      if (!profileImage) {
        toast.error("Profile image is required");
        return;
      }
      onStepChange && onStepChange(1);
      setStep(1);
      return;
    }

    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    if (step < steps.length - 1) {
      onStepChange && onStepChange(step + 1);
      setStep((prevStep: number) => prevStep + 1);
    } else {
      submitFormData({
        customer: updatedFormData,
        "profile-pic": profileImage,
      });
    }
  };

  const handleFileChange = useCallback(
    (fieldName: string, file: File | null) => {
      setSelectedFiles((prev: Record<string, File | null>) => ({
        ...prev,
        [fieldName]: file,
      }));
      setFormData((prev: Record<string, unknown>) => ({
        ...prev,
        [fieldName]: file ? file.name : null,
      }));
      if (errors[fieldName]) {
        clearErrors(fieldName);
      }
    },
    [errors, clearErrors]
  );

  const FileUploader = React.memo(
    ({
      field,
      onChange,
      value,
    }: {
      field: FieldConfig;
      onChange: (name: string, file: File | null) => void;
      value: string | null;
    }) => {
      const fileInputRef = useRef<HTMLInputElement>(null);
      const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange(field.name, file);
      };
      const triggerFileInput = () => fileInputRef.current?.click();
      return (
        <div className="flex flex-col w-full">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={field.accept || "*"}
            onChange={handleFileSelect}
            id={`file-${field.name}`}
          />

          <div className="flex flex-col w-full border rounded-md overflow-hidden">
            <div
              onClick={triggerFileInput}
              className="flex items-center justify-between px-3 py-1 bg-gray-50 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center">
                <span className="text-xs text-gray-600">
                  {value ? value : "Choose file..."}
                </span>
              </div>
              {value && (
                <div className="flex items-center justify-between px-3 bg-gray-100 border-t">
                  <button
                    type="button"
                    className="text-xs text-red-500"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      onChange(field.name, null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    X
                  </button>
                </div>
              )}
              <button
                type="button"
                className="px-3 py-1 text-xs bg-gray-200 rounded-md"
                onClick={triggerFileInput}
              >
                Browse
              </button>
            </div>
          </div>
        </div>
      );
    }
  );

  const calculateTotalSteps = useCallback(() => steps.length, [steps.length]);
  const totalSteps = calculateTotalSteps();

  if (!isClient)
    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow-xs rounded-lg"></div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-xl rounded-2xl bg-gray-50">
      <div className="flex flex-col w-full gap-3 md:min-w-[600px] min-w-[300px]">
        <div className="flex flex-col items-center gap-1 mb-7">
          <h2 className="text-xl text-center font-semibold">
            {step === 0
              ? "Profile Picture"
              : currentStepConfig.employeeSubtitle || currentStepConfig.title}
          </h2>
          <p className="text-sm text-center text-gray-500">
            {step === 0
              ? "Upload your profile picture"
              : currentStepConfig.employeeSubtitle ||
                currentStepConfig.subtitle}
          </p>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          if (step === 0) onFormSubmit({}, event);
          else
            handleSubmit(
              (data) => onFormSubmit(data, event),
              () => false
            )();
        }}
      >
        {step === 0 ? (
          <div className="flex flex-col items-center justify-center mb-10">
            <div
              className="w-52 h-52 rounded-xl bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 mb-4"
              onClick={triggerProfileImageUpload}
            >
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <input
              type="file"
              ref={profileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
            <button
              type="button"
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              onClick={triggerProfileImageUpload}
            >
              {profileImagePreview ? "Change Picture" : "Upload Picture"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {fields.map((field: FieldConfig) => (
              <div key={field.name} className="mb-4">
                {field.label && (
                  <label
                    className="block text-xs font-medium text-gray-600 mb-1"
                    htmlFor={
                      field.type === "file" ? `file-${field.name}` : field.name
                    }
                  >
                    {field.label}
                  </label>
                )}
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue={formData[field.name] || ""}
                  render={({ field: inputField }) => (
                    <>
                      {field.type === "select" ? (
                        <div className="w-full">
                          <Autocomplete
                            options={
                              field.name === "businessSector"
                                ? sectorsData
                                    .filter(
                                      (
                                        value: Industry,
                                        index: number,
                                        self: Industry[]
                                      ) =>
                                        index ===
                                        self.findIndex(
                                          (t: Industry) => t.code === value.code
                                        )
                                    )
                                    .map((sect: Industry) => ({
                                      value: sect.code,
                                      label: snakeToTitleCase(sect.name || ""),
                                    }))
                                : field.name === "lineOfBusiness"
                                ? (
                                    mapIndustriesToLinesOfBusiness(
                                      linesOfBizData
                                    ) || []
                                  ).map(
                                    (sect: {
                                      value: string;
                                      label: string;
                                    }) => ({
                                      value: sect.value || "",
                                      label: snakeToTitleCase(sect.label || ""),
                                    })
                                  )
                                : field.name === "birthPlace"
                                ? birthPlaceData.map((region: any) => ({
                                    value: region.code,
                                    label: snakeToTitleCase(region.name),
                                  }))
                                : field.name === "region"
                                ? regionsData.map((region: any) => ({
                                    value: region.code,
                                    label: snakeToTitleCase(region.name),
                                  }))
                                : field.name === "zone"
                                ? zonesData.map((zone: any) => ({
                                    value: zone.code,
                                    label: snakeToTitleCase(zone.name),
                                  }))
                                : field.name === "woreda"
                                ? woredasData.map((woreda: any) => ({
                                    value: woreda.code,
                                    label: snakeToTitleCase(woreda.name),
                                  }))
                                : field.name === "kebele"
                                ? kebelesData.map((kebele: any) => ({
                                    value: kebele.code,
                                    label: snakeToTitleCase(kebele.name),
                                  }))
                                : (field.options || []).map(
                                    (option: {
                                      value: string;
                                      label: string;
                                    }) => ({
                                      value: option.value,
                                      label: snakeToTitleCase(option.label),
                                    })
                                  )
                            }
                            value={formData[field.name] as string}
                            fieldName={field.name}
                            onChange={handleAutocompleteChange}
                            isLoading={
                              (field.name === "zone" && isFetchingZones) ||
                              (field.name === "woreda" && isFetchingWoredas) ||
                              (field.name === "kebele" && isFetchingKebeles) ||
                              isLocationDataLoading
                            }
                            disabled={
                              (field.name === "zone" && !formData.region) ||
                              (field.name === "woreda" && !formData.zone) ||
                              (field.name === "kebele" && !formData.woreda) ||
                              isLocationDataLoading
                            }
                            placeholder={field.label}
                            error={(errors as any)[field.name] || ""}
                          />
                        </div>
                      ) : field.type === "radio" ? (
                        <div className="flex justify-center">
                          <div className="flex flex-col gap-2">
                            {field.options?.map(
                              (option: { label: string; value: string }) => (
                                <label
                                  key={option.value}
                                  className="flex items-center text-xs cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    {...inputField}
                                    id={`${field.label}-${option.value}`}
                                    value={option.value}
                                    checked={inputField.value === option.value}
                                    className="mr-1"
                                    onChange={(e) => {
                                      setFormData((prev) => ({
                                        ...prev,
                                        [field.name]: e.target.value,
                                      }));
                                      if (errors[field.name])
                                        clearErrors(field.name);
                                    }}
                                  />
                                  {option.label}
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      ) : field.type === "file" ? (
                        <FileUploader
                          field={field}
                          onChange={handleFileChange}
                          value={(formData[field.name] as string) || null}
                        />
                      ) : (
                        <input
                          {...inputField}
                          id={field.name}
                          disabled={
                            Boolean((initialValues as any)?.[field.name]) &&
                            field.type !== "date"
                          }
                          type={field.type}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none text-xs focus:ring-1 focus:ring-gray-300"
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              [field.name]: e.target.value,
                            }));
                            if (errors[field.name]) {
                              clearErrors(field.name);
                            }
                          }}
                        />
                      )}
                    </>
                  )}
                />
                {errors[field.name] && (
                  <p
                    className={`text-red-500 text-xs mt-1 ${
                      field.type === "radio" ? "text-center" : "text-left"
                    }`}
                  >
                    {(errors[field.name] as { message: string }).message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              type="button"
              className="md:px-10 px-4 py-2 bg-gray-200 border border-gray-300 text-gray-700 rounded-md"
              onClick={() => {
                onStepChange && onStepChange(step - 1);
                setStep((prevStep: number) => prevStep - 1);
              }}
            >
              {currentStepConfig.backButton || "Back"}
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || isLocationDataLoading}
            className="md:px-10 px-4 py-2 bg-gray-800 text-white rounded-md ml-auto disabled:bg-gray-400"
          >
            {isSubmitting
              ? "Processing..."
              : step === 0
              ? "Continue"
              : step === steps.length - 1
              ? "Submit"
              : currentStepConfig.nextButton || "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(MultiStepForm);
