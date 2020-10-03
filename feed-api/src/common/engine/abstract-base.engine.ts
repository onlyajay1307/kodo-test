import {EnvironmentConfig} from "../config/environment.config";

export abstract class AbstractBaseEngine {
    private _client: Promise<any> = Promise.resolve(null);

    protected constructor(protected environmentConfig: EnvironmentConfig) {
    }

    private _engineConfig: object;

    get engineConfig(): object {
        return this._engineConfig;
    }

    set engineConfig(value: object) {
        this._engineConfig = value;
    }

    private static getEngineConfigOfEnvironment(engineConfig: object, environment: string): object {
        return engineConfig[environment];
    }

    public async client(): Promise<any> {
        const client = await this._client;
        if (null == client) {
            const engineConfigOfEnvironment = AbstractBaseEngine.getEngineConfigOfEnvironment(this.engineConfig, this.environmentConfig.environment);
            // const urlOfRequiredFormat = this.getUrlOfRequiredFormat(engineConfigOfEnvironment);
            this._client = this.establishConnection(engineConfigOfEnvironment);
        }
        return this._client;
    }

    protected abstract getUrlOfRequiredFormat(configOfEnvironment: object): any;

    protected async abstract establishConnection(connectionUrl: any): Promise<any>;
}
