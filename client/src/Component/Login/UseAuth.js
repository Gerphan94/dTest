import { useCookies } from 'react-cookie';
import { useGlobalVariables } from '../../Store/AppContext';

export const useAuth = async () => {
    const urlAPI = process.env.REACT_APP_API_URL;
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const { setLogginUser } = useGlobalVariables();

    console.log('cookies == ', cookies)
    if (cookies) {
        try {
            // Make an API call to your backend to verify the token
            const response = await fetch(urlAPI + '/auth/check-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'token':cookies.token
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('data == ', data)
                setLogginUser({ id: data.id, username: data.username });
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            return false
        }
    } else {
        return false
    }
};