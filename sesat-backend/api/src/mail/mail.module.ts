import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Global, Module, forwardRef } from "@nestjs/common";
import { MailService } from "./mail.service";
import { join } from "path";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AsignacionService } from "src/asignacion/asignacion.service";
import { TesisService } from "src/tesis/tesis.service";
import { AsignacionModule } from "src/asignacion/asignacion.module";
import { TesisModule } from "src/tesis/tesis.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Asignacion } from "src/asignacion/entities/asignacion.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Asignacion]),
    TesisModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("MAIL_HOST"),
          secure: false,
          auth: {
            user: config.get("MAIL_USER"),
            pass: config.get("MAIL_PASSWORD"),
          },
          pool: true,
          maxConnections: 1,
          rateLimit: 30,
          rateDelta: 1000 * 60,
        },
        defaults: {
          from: `"SESAT" <${config.get("MAIL_FROM")}>`,
        },
        template: {
          dir: join(__dirname, "templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
