import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { resolve } from "path";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";
import { decrypt, encrypt, hash } from "./crypto";
import { ExtractJwt } from "passport-jwt";
import { decode } from "punycode";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private readonly httpService: HttpService
  ) {}

  async validateUser(id: number, pass: string): Promise<any> {
    const hashedPassword = hash(pass);
    const url = `http://ciep.ing.uaslp.mx/sesat/authStudent.php?id=${id}&pass=${hashedPassword}`;
    const url2 = `http://ciep.ing.uaslp.mx/sesat/authAsesor.php?id=${id}&pass=${hashedPassword}`;
    const user = await this.usuarioService.findOne(id);
    const studentSuccess = await lastValueFrom(this.httpService.get(url));
    const asesorSuccess = await lastValueFrom(this.httpService.get(url2));
    if (user && (studentSuccess.data.result || asesorSuccess.data.result)) {
      const { password, ...result } = user;
      return result;
    } else if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async validateUser(id: number, pass: string): Promise<any> {
  //   const user = await this.usuarioService.findOne(id);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  findRole(headers: any) {
    const token: string = headers.authorization.split(" ").at(1);
    const decoded: any = this.jwtService.decode(token);
    const digest = JSON.parse(decrypt(decoded.digest));
    console.log(digest.rol);
    return { rol: digest.rol };
  }

  findUserInfo(headers: any) {
    const token: string = headers.authorization.split(" ").at(1);
    const decoded: any = this.jwtService.decode(token);
    const { digest, ...userInfo } = decoded;
    return userInfo;
  }

  async login(user: Usuario, pass: string) {
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
                password: pass,
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
