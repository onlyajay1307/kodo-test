import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as compression from "compression";
import {Logger} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(compression());
  app.enableCors();
  await app.listen(3000);
  Logger.log(`Server is listening`, "Main");
}
bootstrap();
