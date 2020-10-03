import * as _ from "lodash";

export class EnvironmentConfig {
  private _environment: string;

  constructor() {
    this._environment = _.get(process, "env.PA_ENV", "local");
  }

  get environment(): string {
    return this._environment;
  }

  set environment(value: string) {
    this._environment = value;
  }
}
