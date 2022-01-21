import { api } from '../boot/axios';
class Auth {

    user = null;

    async signin (email, password) {
        try {
            let res = await api.post("auth/login", {
                email,
                password
            });
            return res;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return 'Invalid credentials';
            }
            return 'Internal error.';
        }
    }

    async signout () {
        try {
            await api.get("auth/logout");
        } catch (error) {
            //nothing to do
        }
        return true;
    }

    async signup (name, email, password) {
        try {
            let res = await api.post("auth/signup", {
                name,
                email,
                password
            });
            return res;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return 'Invalid credentials';
            }
            return 'Internal error.';
        }
    }
}

export default new Auth();