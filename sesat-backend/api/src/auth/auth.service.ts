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

  async validateUser(clave: number, pass: string): Promise<any> {
    const user = await this.usuarioService.findOne(clave);
    if(user && user.password === pass) {
      const {password, ...result} = user;
      return result;
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
