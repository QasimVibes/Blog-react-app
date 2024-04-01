const conf = {
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteApiEndpoint: String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    appwriteStorageId: String(import.meta.env.VITE_APPWIRTE_STORAGE_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID)
}
export default conf
