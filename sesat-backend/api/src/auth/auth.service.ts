import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { resolve } from "path";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioService } from "src/usuario/usuario.service";

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

  async login(user: Usuario) {
    return new Promise((resolve, reject) => {
      resolve({
        message: "Authenticated",
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido_paterno: user.apellido_paterno,
        apellido_materno: user.apellido_materno,
        rol: user.rol.nombre_rol,
        token: this.jwtService.sign(
          {
            usuario: {
              id_usuario: user.id_usuario,
              nombre: user.nombre,
              apellido_paterno: user.apellido_paterno,
              apellido_materno: user.apellido_materno,
              rol: user.rol.nombre_rol
            },
          },
          //Va encriptado (contraseña y rol)
          {
            secret: process.env.SECRET_JWT,
          }
        ),
      });
    });
  }
}
