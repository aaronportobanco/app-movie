import { Client, Databases, ID, Query } from "appwrite";
/* 
    Comprueba si un registro de busqueda ya ha sido almacenado
    Si un registro ya existe, actualiza el contador de busquedas
    Si no existe, crea un nuevo registro con el contador de busquedas en 1
    Lo almacena en la base de datos de Appwrite
*/

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const UpdateSearchCount = async (query: string, movie: Movie) => {
  // 1. Verifica que la función se está ejecutando con los datos correctos
  console.log(
    `[Appwrite] Buscando o actualizando la consulta: "${query}" con la película: "${movie.title}"`
  );
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("search_term", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      // 2. Indica que se encontró un documento y se va a actualizar
      console.log(
        `[Appwrite] Documento encontrado. Actualizando contador a: ${
          existingMovie.search_count + 1
        }`
      );

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          search_count: existingMovie.search_count + 1,
        }
      );
    } else {
      // 3. Indica que no se encontró un documento y se va a crear uno nuevo
      console.log("[Appwrite] Documento no encontrado. Creando nuevo registro.");
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        search_term: query,
        movie_ID: movie.id,
        movie_title: movie.title,
        search_count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    // 4. Muestra un error específico si algo falla en el proceso
    console.error("[Appwrite] Error al actualizar el contador de búsqueda:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
