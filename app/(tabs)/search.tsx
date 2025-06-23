import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import bg from "@/assets/images/bg.png";
import logo from "@/assets/images/logo.png";
import React, { useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import SearchBar from "@/components/layout/SearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const {
    data: movies,
    loading,
    error,
    reset,
    refetch: loadMovies,
  } = useFetch(
    () =>
      fetchMovies({
        query: searchQuery.trim(),
      }),
    false
  );

  // 2. Usa useEffect para ejecutar la búsqueda con debounce
  useEffect(() => {
    const timeoutID = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset(); // Resetea los resultados si la búsqueda está vacía
      }
    }, 1000); // Espera 1 segundo antes de ejecutar la búsqueda

    return () => clearTimeout(timeoutID); // Limpia el timeout si searchQuery cambia antes de que se complete

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]); // Este efecto se ejecuta cada vez que searchQuery cambia

  return (
    <View className="flex-1 bg-primary-primary">
      <Image
        source={bg}
        className="flex-1 absolute z-0 w-full"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={logo} className="w-12 h-10 mb-5" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search for movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 text-center px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-xl text-white font-bold mb-3">
                Search results for {""}
                <Text className="text-accent-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-white text-center px-5 my-3">
                {searchQuery
                  ? `No results found for "${searchQuery}"`
                  : "Please enter a search term"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
