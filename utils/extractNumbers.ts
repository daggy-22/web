import { Device } from "@/libs/interfaces";

export const extractNumberFromString = (str: string): number => {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export const getMinMaxFromDevices = (
  devices: Device[],
  property: keyof Device
): { min: number; max: number } => {
  const values = devices
    .map((device) => extractNumberFromString(String(device[property] || "0")))
    .filter((num) => !isNaN(num));

  return {
    min: values.length > 0 ? Math.min(...values) : 0,
    max: values.length > 0 ? Math.max(...values) : 0,
  };
};
