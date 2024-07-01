import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


export const authOptions = {
    // Configure one or more authentication providers
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ], callbacks: {
        async signIn({ account, profile }) {
            console.log(profile)
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@gmail.com")
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
        async redirect(url, baseUrl) {
            // Example: Redirect to a specific page after sign-in
            return '/app';
        },

    }

}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST } 