import { Text, TextProps, StyleSheet } from "react-native";
import React from "react";

// Puedes extender este tipo si necesitas más variantes
interface AppTextProps extends TextProps {
  weight?: "regular" | "medium" | "bold";
}

const AppText: React.FC<AppTextProps> = ({
  style,
  weight = "regular",
  ...props
}) => {
  const fontMap = {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    semiBold: "Poppins_600SemiBold",
    bold: "Poppins_700Bold",
  };

  return (
    <Text
      {...props}
      style={[{ fontFamily: fontMap[weight] }, style]}
    />
  );
};

export { AppText as Text };
