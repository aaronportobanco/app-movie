import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import star from "@/assets/images/star.png";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    // Use Link from expo-router to navigate to the movie screen
    // This allows for client-side navigation without a full page reload
    <Link href={`/movie-screen/${id}`} push asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://via.placeholder.com/600x400?text=No+Image",
          }}
          className="w-full h-52 rounded-lg mb-2"
          resizeMode="cover"
        />
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1 mt-1">
          <Image source={star} />
          <Text
            className="text-xs text-white font-bold uppercase"
            numberOfLines={1}
          >
            {vote_average.toFixed(1)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {new Date(release_date).getFullYear()}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
