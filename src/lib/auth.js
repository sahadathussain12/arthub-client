import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('arthub');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  }, 
  database: mongodbAdapter(db, {
    client,
  }),
    socialProviders: {
        google: { 
            clientId: process.env. CLIENT_ID ,
            clientSecret: process.env.CLIENT_SECRET ,
        }, 
    },
    user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user", // ডিফল্ট হিসেবে ইউজার থাকবে
        input: true, // ক্লায়েন্ট সাইড থেকে রোল পাঠানোর অনুমতি দেওয়ার জন্য এটি জরুরি
      },
    },
  },
  session:{
    cookieCache:{
      enabled:true,
      strategy:"jwt",
      maxAge:7 * 24 * 60 * 60
    }
  },
  plugins:[
    jwt()
  ]
 
});