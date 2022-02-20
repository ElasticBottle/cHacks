//@ts-ignore
import NextAuth from "next-auth";
//@ts-ignore
import GithubProvider from "next-auth/providers/github";
import { ROUTE_MAP } from "../../../interface/routes";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.substring(0, -1) === baseUrl)
        return new URL(ROUTE_MAP, baseUrl).toString();
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
});
