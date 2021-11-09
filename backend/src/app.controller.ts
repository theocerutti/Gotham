import {Controller, Logger, Post} from "@nestjs/common";
import {AppService} from "./app.service";
import {ApiOperation} from "@nestjs/swagger";
import {SkipAuth} from "./auth/skip-auth.decorators";

@Controller("api")
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {
  }

  @ApiOperation({summary: "Ping to check if API is up and running"})
  @SkipAuth()
  @Post("ping")
  async ping(): Promise<string> {
    this.logger.log("Someone has pinged the API!");
    return "API is up and running!";
  }
}
