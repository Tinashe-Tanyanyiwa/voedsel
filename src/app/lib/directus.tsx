import {
  createDirectus,
  rest,
  graphql,
  staticToken,
  authentication,
} from "@directus/sdk";
import { NextApiRequest, NextApiResponse } from "next";

interface Bales {
  id: number;
  status: string;
  seedvariant: string;
  netweight: number;
  time: string;
  farmerid: number;
  grade: string;
  balestatus: string;
  date_created: string;
}

interface Farmers {
  id: number;
  name: string;
  surname: string;
  location: string;
}

interface BaleStatus {
  title: string;
  slug: string;
}

interface Schema {
  bales: Bales[];
  farmers: Farmers[];
  balestatus: BaleStatus[];
  person: person[];
}

interface person {
  id: number;
  name: string;
  age: number;
}

const api = process.env.NEXT_PUBLIC_API_URL as string;
const token = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;
console.log("Your API Is: ", api);
// Client with GraphQL support
const directus = createDirectus(api)
  .with(staticToken(token))
  .with(
    rest({
      credentials: "include",
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  );

export default directus;
