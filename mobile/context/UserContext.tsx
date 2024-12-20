import { ReactElement, createContext, useReducer } from "react";

export const UserContext = createContext<User | null>(null);
export const UserDispatchContext = createContext<any>(null);

export enum UserActionType {
    LOGAR, DESLOGAR
};

interface User {
    email: string,
    password: string,
    token: string,
    status: boolean,
    message: string,
};

interface UserReducerAction {
    type: UserActionType,
    user: User
};

export default function UserProvider({ children }: { children: ReactElement }) {

    const [user, dispatch] = useReducer(UserReducer, initialUser);

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
};

function UserReducer(user: User, { type, user: userAuth }: UserReducerAction) {
    switch (type) {
        case UserActionType.LOGAR: {
            return {
                ...userAuth,
                status: true,
                message: 'Autenticado com sucesso.',
            };
        }
        case UserActionType.DESLOGAR: {
            const { email, password } = user;
            return {
                email,
                password,
                token: null,
                status: false,
                message: null,
            };
        }
        default: {
            throw Error('Operação desconhecida.');
        }
    }
}

const initialUser: User = {
    email: 'tiago@serra.com.br', password: 'mudar@123', token: '', status: false, message: ''
}