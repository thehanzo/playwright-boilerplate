import { FullConfig } from "@playwright/test";
import * as dotenv from 'dotenv'

function globalSetup(config) {
  if(process.env.ENV === undefined) {
    process.env.ENV = 'prod';
  }
  dotenv.config({
    path: `./src/helper/env/.env.${process.env.ENV}`,
    override: true,
  });
}

module.exports = globalSetup;
