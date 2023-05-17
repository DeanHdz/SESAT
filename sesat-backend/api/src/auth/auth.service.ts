import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { resolve } from 'path';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async verifyCredentials(clave: number, password: string): Promise<any> {
    const user = await this.usuarioService.identify(clave, password);

    console.log("auth service user: " + user);

    if(user) {
      return user;
    }
    return null;
  }

  async login(user: Usuario) {
    return new Promise((resolve, reject) => {
      resolve({
        message: 'Authenticated',
        clave: user.clave,
        name: user.name,
        last_name: user.last_name,
        family_name: user.family_name,
        token: this.jwtService.sign(
          {
            usuario: {
              clave: user.clave,
              name: user.name,
              last_name: user.last_name,
              family_name: user.family_name
            }
          },
          {
            secret: process.env.SECRET_JWT, 
          }
        ),
      });
    });
  }
}
