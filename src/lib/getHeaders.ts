import initStorage from "./db"

const setHeaders = async () => {
  const storage = await initStorage();
  const token = await storage.get("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Accept": "application/json"
  };
};

export default setHeaders;
