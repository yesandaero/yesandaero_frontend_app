import * as Location from "expo-location";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import Toast from "react-native-toast-message";

export type RoadAddressLocation = {
  address: string;
  latitude: number;
  longitude: number;
};

const DEFAULT_LOCATION: RoadAddressLocation = {
  address: "대전광역시 유성구 가정북로 76",
  latitude: 36.39151,
  longitude: 127.36307,
};

function formatRoadAddress(address: Location.LocationGeocodedAddress) {
  if (address.formattedAddress) {
    return address.formattedAddress.replace(/^대한민국\s*/, "").trim();
  }

  const parts = [
    address.region,
    address.city,
    address.district,
    address.subregion,
    address.street,
    address.streetNumber,
  ].filter((part): part is string => Boolean(part));

  return [...new Set(parts)].join(" ");
}

async function reverseGeocode(latitude: number, longitude: number) {
  const [result] = await Location.reverseGeocodeAsync({ latitude, longitude });

  if (!result) {
    throw new Error("ROAD_ADDRESS_NOT_FOUND");
  }

  const address = formatRoadAddress(result);

  if (!address) {
    throw new Error("ROAD_ADDRESS_NOT_FOUND");
  }

  return { address, latitude, longitude };
}

async function ensureLocationPermission() {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (!permission.granted) {
    throw new Error("LOCATION_PERMISSION_DENIED");
  }
}

function showLocationError(error: unknown) {
  const message =
    error instanceof Error && error.message === "LOCATION_PERMISSION_DENIED"
      ? "현재 위치를 확인하려면 위치 권한이 필요합니다."
      : error instanceof Error && error.message === "ROAD_ADDRESS_NOT_FOUND"
        ? "일치하는 도로명 주소가 없습니다."
      : "도로명 주소를 가져오지 못했습니다. 다시 시도해주세요.";

  Toast.show({ type: "error", text1: message });
}

export function useRoadAddress(initialLocation = DEFAULT_LOCATION) {
  const [selectedLocation, setSelectedLocation] =
    useState<RoadAddressLocation>(initialLocation);

  const {
    isPending: isLocating,
    mutateAsync: getCurrentLocation,
  } = useMutation({
    mutationFn: async () => DEFAULT_LOCATION,
    onError: showLocationError,
    onSuccess: setSelectedLocation,
  });

  const {
    isPending: isSearching,
    mutateAsync: findRoadAddress,
  } = useMutation({
    mutationFn: async (query: string) => {
      await ensureLocationPermission();
      const [coordinates] = await Location.geocodeAsync(query);

      if (!coordinates) {
        throw new Error("ROAD_ADDRESS_NOT_FOUND");
      }

      return reverseGeocode(coordinates.latitude, coordinates.longitude);
    },
    onError: showLocationError,
    onSuccess: setSelectedLocation,
  });

  const getCurrentRoadAddress = useCallback(async () => {
    try {
      return await getCurrentLocation();
    } catch {
      return null;
    }
  }, [getCurrentLocation]);

  const searchRoadAddress = useCallback(async (roadAddress: string) => {
    const query = roadAddress.trim();

    if (!query) {
      Toast.show({ type: "error", text1: "도로명 주소를 입력해주세요." });
      return null;
    }

    try {
      return await findRoadAddress(query);
    } catch {
      return null;
    }
  }, [findRoadAddress]);

  return {
    address: selectedLocation.address,
    getCurrentRoadAddress,
    isLocating,
    isSearching,
    searchRoadAddress,
    selectedLocation,
  };
}
