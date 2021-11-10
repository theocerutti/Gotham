import {TeamModule} from "../team/team.module";
import {WorkingTimeModule} from "../working-time/working-time.module";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "src/user/user.module";
import {Seeder} from "./seeder";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: parseInt(process.env.POSTGRES_PORT) || 5433,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    database: process.env.POSTGRES_DATABASE || "postgres",
    synchronize: true,
    autoLoadEntities: true
  }),
    UserModule,
    WorkingTimeModule,
    TeamModule,
    AuthModule,
  ],
  providers: [Seeder]
})
export class SeederModule {
}
