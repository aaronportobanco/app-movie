import { View, Text, ScrollView, Image } from "react-native";
import star from "../../assets/images/star.png";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react-native";

interface MovieInfoProps {
  label: string;
  value: string | number | null | undefined;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-light-200 text-sm font-normal">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  return (
    <View className="bg-primary-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          {movie && (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
              }}
              className="w-full h-[550px]"
              resizeMode="stretch"
            />
          )}
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center justify-between gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date
                ? new Date(movie.release_date).getFullYear()
                : "N/A"}
            </Text>
            <Text className="text-light-200 text-sm">
              {movie?.runtime ? `- ${movie.runtime} min` : ""}
            </Text>
          </View>
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={star} className="size-4" />
            <Text className="text-white font-bold text-sm mx-2">
              {movie?.vote_average.toFixed(1) ?? "N/A"}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count ?? 0} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres?.map((genre) => genre.name).join(" - ") || "N/A"
            }
          />
          <View className="flex flex-row justify-between w-full">
            <MovieInfo
              label="Budget"
              value={
                movie?.budget
                  ? `$${(movie.budget / 1000000).toFixed(2)} millions`
                  : "N/A"
              }
            />
            <MovieInfo
              label="Revenue"
              value={
                movie?.revenue !== undefined
                  ? `$${(Math.round(movie.revenue) / 1000000).toFixed(2)} millions`
                  : "N/A"
              }
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ? movie.production_companies
                    .map((company) => company.name)
                    .join(" - ")
                : "N/A"
            }
          />
        </View>
      </ScrollView>
      <Button
        className="flex flex-row items-center justify-center bg-accent-accent rounded-lg py-3.5 mx-5"
        onPress={() => router.back()}
      >
        <ArrowLeft color={"white"} className="mr-1 mt-0.5" />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </Button>
    </View>
  );
};

export default MovieDetails;