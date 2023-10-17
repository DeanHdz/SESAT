import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { resolve } from "path";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { decrypt, encrypt } from "./crypto";
import { ExtractJwt } from "passport-jwt";
import { decode } from "punycode";

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async validateUser(id: number, pass: string): Promise<any> {
    const user = await this.usuarioService.findOne(id);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  findRole(headers: any) {
    const token: string = headers.authorization.split(" ").at(1);
    const decoded: any = this.jwtService.decode(token);
    const rol = decrypt(decoded.digest);
    return rol;
  }

  findUserInfo(headers: any) {
    const token: string = headers.authorization.split(" ").at(1);
    const decoded: any = this.jwtService.decode(token);
    const { digest, ...userInfo } = decoded;
    return userInfo;
  }

  async login(user: Usuario) {
    return new Promise((resolve, reject) => {
      resolve({
        message: "Authenticated",
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido_paterno: user.apellido_paterno,
        apellido_materno: user.apellido_materno,
        token: this.jwtService.sign(
          {
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            apellido_paterno: user.apellido_paterno,
            apellido_materno: user.apellido_materno,
            digest: encrypt(
              JSON.stringify({
                password: user.password,
                rol: user.rol.nombre_rol,
              })
            ),
          },
          {
            secret: process.env.SECRET_JWT,
          }
        ),
      });
    });
  }
}
