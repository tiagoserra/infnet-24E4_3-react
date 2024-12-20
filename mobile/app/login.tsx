import { useContext, useState } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, Alert, Image, Pressable, Text, View } from 'react-native';
import { UserActionType, UserContext, UserDispatchContext } from '../context/UserContext';
import env from '../constants/env.firebase';
import TextField from '../components/input/TextField';
import { styles } from '../styles/loginStyles';

export default function LoginScreen() {

    const userAuth = useContext(UserContext);
    const userAuthDispatch = useContext(UserDispatchContext);
    const [isLoading, setLoading] = useState(false);
    const [inputUser, setInputUser] = useState<string>(userAuth?.email ?? "");
    const [inputPassword, setInputPassword] = useState<string>(userAuth?.password ?? "");
    const [inputUserFeedback, setInputUserFeedback] = useState<string>("");
    const [inputPasswordFeedback, setInputPasswordFeedback] = useState<string>("");

    const loginSubmit = async () => {
        setLoading(true);
        try {
            setInputUserFeedback("");
            setInputPasswordFeedback("");
            if (inputUser && inputPassword) {

                const apiKey = env.API_KEY;
                const apiUrl = env.API_URL;

                const response = await fetch(`${apiUrl}/v1/accounts:signInWithPassword?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: inputUser,
                        password: inputPassword,
                        returnSecureToken: true,
                    })
                });
                const { status } = response;
                if (status == 200) {
                    const body = await response.json();
                    userAuthDispatch({
                        type: UserActionType.LOGAR,
                        user: {
                            email: body.email,
                            password: inputPassword,
                            token: body.idToken,
                        }
                    });
                    router.push('/home');
                } else if (status == 400) {
                    const body = await response.json();
                    Alert.alert(`${body.error.message}`);
                } else {
                    Alert.alert(`Status ${status}`);
                }
            } else {
                if (!inputUser) setInputUserFeedback("Preencha este campo.");
                if (!inputPassword) setInputPasswordFeedback("Preencha este campo.");
            }
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.loginContainer}>
            <Image style={styles.loginImageIcon} resizeMode='contain' source={require('@/assets/images/login-logo.png')} />
            <Text style={styles.loginHeader}>Acesso</Text>
            <TextField
                placeholder='Usuário'
                value={inputUser}
                onChangeText={setInputUser}
                feedback={inputUserFeedback}
                editable={!isLoading}
            />
            <TextField
                placeholder='Senha'
                value={inputPassword}
                onChangeText={setInputPassword}
                feedback={inputPasswordFeedback}
                isPassword
                editable={!isLoading}
            />
            {!isLoading && <Pressable style={styles.loginBtnSubmit} onPress={loginSubmit}>
                <Text style={styles.loginBtnSubmitLabel}>Acessar</Text>
            </Pressable>}
            {isLoading && <ActivityIndicator size='large' />}
        </View>
    );
}