import { View, Text, TouchableOpacity, Image } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import rankingGradient from "../assets/images/rankingGradient.png";
import React from "react";
import { Link } from "expo-router";

const TrendingCardMovie = ({
  movie: { movie_ID, movie_title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movie-screen/${movie_ID}`} push asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={<Text className="text-white font-bold text-6xl">{index + 1}</Text>}
          >
            <Image
              source={rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="text-light-200 font-bold text-sm mt-2">
            {movie_title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCardMovie;
