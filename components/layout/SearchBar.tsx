import { TextInput, View } from "react-native";
import React from "react";
import { IconSearch } from "@/lib/icons/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <IconSearch className="h-5 w-5 text-[#ab8bff]" />
      <TextInput
        onPress={onPress}
        onChangeText={() => {}}
        value=""
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
