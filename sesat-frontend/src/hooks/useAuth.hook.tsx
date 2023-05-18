/*import { createContext } from "vm";
import { SESAT } from "../Interfaces/ISESAT";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/login.endpoint";

export interface loginData {
  clave: string;
  password: string;
}

interface AuthContextInterface {
  user: SESAT.LoggedUser;
  login(data: loginData): Promise<SESAT.LoggedUser>;
  logout(): void;
}

const AuthContext = createContext<AuthContextInterface>({
  user: {} as SESAT.LoggedUser,
  login: (data: loginData) => {
    return new Promise((res, rej) => res({} as SESAT.LoggedUser));
  },
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useSessionStorage("user", "");

  const navigate = useNavigate();

  let login = async (data: loginData): Promise<SESAT.LoggedUser> => {
    return new Promise(async (res, rej) => {
      try {
        const tempUser = await loginUser(data);
        if (tempUser !== undefined) {
          getUsuario(tempUser.usuario.clave, tempUser.token).then((user) => {
            if (user !== undefined) {
              setUser({
                message: tempUser.message,
                usuario,
                token: tempUser.token,
              });
              navigate("/assignment");
              res(tempUser);
            }
          });
        } else {
          rej({} as SESAT.LoggedUser);
        }
      } catch (error) {
        rej({} as SESAT.LoggedUser);
      }
    });
  };
};
*/