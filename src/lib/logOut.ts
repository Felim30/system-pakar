import initStorage from "./db"

const logOut = async () => {
    
    const storage = await initStorage()
    storage.remove('token');
}

export default logOut