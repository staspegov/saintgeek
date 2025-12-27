import { google } from "googleapis"

export const MERCHANT_ID = process.env.GOOGLE_MERCHANT_ID!

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/content"],
})

export const merchant = google.content({
  version: "v2.1",
  auth,
})
