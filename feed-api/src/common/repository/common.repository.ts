// import * as _ from "lodash";
import {MysqlEngine} from "../engine/mysql/mysql.engine";

export class CommonRepository {

    protected mysqlEngine = MysqlEngine.instance();

    protected async getMysqlConnection(): Promise<any> {
        // const mysqlPool = await this.mysqlEngine.client();
        // return await mysqlPool.getConnection();
        return this.mysqlEngine.client();
    }

    protected async executeQuery(query: string, context: string): Promise<any> {
        try {
            const mysqlConnection = await this.getMysqlConnection();
            let [rows, fields] = await mysqlConnection.execute(query);
            return rows;
        } catch (err) {
            throw (err);
        }
    }
}
