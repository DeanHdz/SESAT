import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Headers,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/role")
  findRole(@Headers() headers: any) {
    return this.authService.findRole(headers);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/user-info")
  findUserInfo(@Headers() headers: any) {
    return this.authService.findUserInfo(headers);
  }
}
