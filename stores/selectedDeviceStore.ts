import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Device = {
  id?: string;
  deviceName?: string;
  deviceModel?: string;
  deviceOs?: string;
  ram?: string;
  storage?: string;
  brand?: string;
  color?: string;
  category?: string;
  cameraQuality?: string;
  batteryCapacity?: string;
  count?: number;
  isActive?: boolean;
  image?: string;
  minimumPrice?: number;
  price?: number;
  maximumPrice?: number;
  isFeatured?: boolean;
  downPayment?: number;
  financingLimit?: number;
  orderId?: string;
  merchantPhone?: string;
  merchantLocation?: string;
};

interface DeviceState {
  device: Device | null;
  setDevice: (item: Device) => void;
  clearDevice: () => void;
}

const useSelectedDeviceStore = create<DeviceState>()(
  persist(
    (set) => ({
      device: null,
      setDevice: (item) => set({ device: item }),
      clearDevice: () => set({ device: null }),
    }),
    {
      name: "selected-device-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSelectedDeviceStore;
