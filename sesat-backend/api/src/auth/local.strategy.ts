import { Strategy } from "passport-local"
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async verifyCredentials (clave: string, password: string): Promise<any> {
        console.log("Before await");
        let user = await this.authService.verifyCredentials(+clave, password);
        console.log("local strategy user: " + user);
        if(!user) {
            console.log("Usuario Vacio");
            //throw new UnauthorizedException();
        }
        user = {user, password};
        return user;
    }
}