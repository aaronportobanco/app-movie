import { TextInput, View } from "react-native";
import React from "react";
import { IconSearch } from "@/lib/icons/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({
  placeholder,
  onPress,
  value,
  onChangeText,
}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <IconSearch className="h-5 w-5 text-[#ab8bff]" />
      <TextInput
        onPress={onPress}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
        returnKeyType="search" // Muestra "search" en el teclado
      />
    </View>
  );
};

export default SearchBar;
