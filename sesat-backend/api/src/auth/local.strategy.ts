import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(clave: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(+clave, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
