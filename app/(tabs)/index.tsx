import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";

export default function Index() {
  const { toggleColorScheme } = useColorScheme();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Button className="bg-blue-500" onPress={toggleColorScheme}>
        <Text className="text-center text-white">Click Me </Text>
      </Button>

    </View>
  );
}
