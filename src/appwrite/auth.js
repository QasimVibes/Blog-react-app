import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js"

class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteApiEndpoint) // Your API Endpoint
            .setProject(conf.appwriteProjectId) // Your project ID
        this.account = new Account(this.client)
    }

   

    async login({ email, password }) {
        try {
            return this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async createUser({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // Call another method
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService()
export default authService