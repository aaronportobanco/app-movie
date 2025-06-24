import { View, Text} from "react-native";
import { Bookmark } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Saved = () => {
  return (
    <SafeAreaView className="bg-primary-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Bookmark color={"white"} className="size-10" />
        <Text className="text-white text-base">Saved</Text>
      </View>
    </SafeAreaView>
  );
};

export default Saved;