import { Storage } from "@ionic/storage";

let storageInstance: Storage | null = null;

const initStorage = async (): Promise<Storage> => {
  if (!storageInstance) {
    const storage = new Storage();
    await storage.create();
    storageInstance = storage;
  }
  return storageInstance;
};

export default initStorage;
