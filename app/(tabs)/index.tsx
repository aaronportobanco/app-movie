import SearchBar from "@/components/layout/SearchBar";
import {
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Text } from "@/components/ui/text";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();

  // Utiliza el hook personalizado useFetch para obtener las películas
  // y manejar el estado de carga y error.
  // Aquí no es necesario usar useState ni useEffect, ya que useFetch maneja
  // automáticamente la lógica de carga y error.
  // Además, useFetch se encarga de la limpieza de efectos secundarios.
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
    })
  );
  return (
    <View className="flex-1 bg-primary-primary">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute z-0 w-full"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image
          source={require("@/assets/images/logo.png")}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        />
        {moviesLoading ? (
          <ActivityIndicator
            size={"large"}
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie..."
            />
            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 16,
                  marginVertical: 16,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
