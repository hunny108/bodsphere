import axios from 'axios';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:5001/api/users';

class UserService {
    static async getUploaderInfoById(token) {
        console.log("🚀 ~ UserService ~ getUploaderInfoById ~ token:", token)
        try {
            const response = await axios.get(`${USER_SERVICE_URL}/getUserDetail`, {
                headers: {
                    authorization:token
                }
            });
            console.log("🚀 ~ UserService ~ getUploaderInfoById ~ response.data:", response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            return null;
        }
    }
}

export default UserService;
