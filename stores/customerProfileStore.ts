"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Profile = {
  id: string | null;
  externalId: string | null
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
  mobileNumber: string | null
  token: string | null;
  refreshToken: string | null;
  refreshTokenExpiry: string | null;
};

type ProfileState = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
};

const useCustomerProfileStore = create(
  persist<ProfileState>(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "customer_profile_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCustomerProfileStore;
