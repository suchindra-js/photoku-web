import { DefaultSession, DefaultUser } from "@auth";

// Extend the User interface to include role
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string;
  }

  interface Session {
    user?: {
      id?: string;
      role?: string;
    } & DefaultSession["USER"];
  }
}
