import conf from "../conf/conf";
import { Client, Databases, Storage, ID, Query } from "appwrite"


class ConfigService {
    clinet = new Client()
    databases;
    storage;
    constructor() {
        this.clinet
            .setEndpoint(conf.appwriteApiEndpoint) // Your API Endpoint
            .setProject(conf.appwriteProjectId) // Your project ID
        this.databases = new Databases(this.clinet)
        this.storage = new Storage(this.clinet)
    }

    async createPost({ slug, title, image, content, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, image, content, status, userId
            });

        } catch (error) {
            console.log("Error has been acurred in create post", error);
        }
    }
    async updatePost(slug, { title, image, content, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, image, content, status });
        } catch (error) {
            console.log("Error has been acurred in update post", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true
        } catch (error) {
            console.log("Error has been acurred in delete post", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Error has been acurred in get post", error);
            return false
        }
    }
    async getPosts(queries=[Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        } catch (error) {
            console.log("Error occurred in getPosts:", error);
        }
    }

    // Storage 

    async uploadFile(file) {
        try {
            return await this.storage.createFile(conf.appwriteStorageId, ID.unique(), file);
        } catch (error) {
            console.log("Error has been acurred in upload file", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(conf.appwriteStorageId, fileId);
            return true
        } catch (error) {
            console.log("Error has been acurred in delete file", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(conf.appwriteStorageId, fileId)
    }
}



const configService = new ConfigService()
export default configService