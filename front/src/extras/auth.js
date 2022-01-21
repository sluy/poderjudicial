import { api } from '../boot/axios';
import { ref, reactive } from 'vue';
import { LocalStorage } from 'quasar';


export let usermodel = ref(null);
let busy = ref(false);

export function getToken() {
    if (!isGuest()) {
        return usermodel.value.access_token;
    }
    return null;
}

export function isBusy() {
    return busy.value === true;
}

export function getUser () {
    return usermodel.value.userdata;
}

export function isGuest () {
    return !usermodel.value;
}

export function isAdmin () {
    return !isGuest() && (getUser().admin === 1 || getUser().admin === true);
}

export async function signup (name, email, password) {
    try {
        let res = await api.post("auth/signup", {
            name,
            email,
            password
        });
        return true;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return 'Error';
        }
        return 'Internal error.';
    }
}

export async function signin (email, password) {
    console.log('iniciando sesión... plop', email, password);
    try {
        let res = await api.post("auth/login", {
            email,
            password
        });
        usermodel.value = res.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return 'Invalid credentials';
        }
        return 'Internal error.';
    }
}

export async function signout () {
    if (!isGuest()) {
        try {
            await api.get("auth/logout", {
                headers: {
                    Authorization: 'Bearer ' + getToken()
                }
            });
        } catch (error) {
            //nothing to do
        }
    }    
    usermodel = ref(null);
    return true;
} 
