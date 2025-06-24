import { View, Text} from "react-native";
import { UserRound } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <UserRound color={"white"} className="size-10" />
        <Text className="text-white text-base">Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;