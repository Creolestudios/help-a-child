const BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINTS = {
  BASE: BASE_ENDPOINT,
  COLLECTIONS: `${BASE_ENDPOINT}/items`,
  FILES: `${BASE_ENDPOINT}/assets`,
  GRAPHQL: `${BASE_ENDPOINT}/graphql`,
  GRAPHQL_SYSTEM: `${BASE_ENDPOINT}/system/graphql`,
};
export default ENDPOINTS;
