import * as mysql from "mysql2/promise";
import * as mysqlEngineConfig  from "./config.json";
import { AbstractBaseEngine } from "../abstract-base.engine";
import { Injectable, Logger } from "@nestjs/common";
import { EnvironmentConfig } from "../../config/environment.config";

export class MysqlEngine extends AbstractBaseEngine {

    private static _instance: MysqlEngine;

    private constructor() {
        // mysql.fetchAsString = [ mysql.CLOB ];
        const configService = new EnvironmentConfig();
        super(configService);
        this.engineConfig = mysqlEngineConfig;
    }

    public static instance(): MysqlEngine {
        if (!MysqlEngine._instance) {
            MysqlEngine._instance = new MysqlEngine();
        }
        return MysqlEngine._instance;
    }

    protected getUrlOfRequiredFormat(configOfEnvironment: object): any {
        return configOfEnvironment;
    }

    protected async establishConnection(connectionUrl: any): Promise<any> {
        try {
            Logger.log("Established the connection to the mysql::::", "MysqlEngine");
            return await mysql.createPool(connectionUrl);
        } catch (err) {
            throw(err);
        }
    }
}
