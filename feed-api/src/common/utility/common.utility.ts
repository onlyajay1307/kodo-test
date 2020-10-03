import * as _ from "lodash";

export class CommonUtility {

    public static async executeParallelTasks(parallelTasks: object): Promise<any> {
        if (parallelTasks) {
            const parallelTaskKeys = Object.keys(parallelTasks);
            const responses = await Promise.all(Object.values(parallelTasks));
            const responseMap = new Map();
            responses.forEach((response, index) => {
                responseMap.set(parallelTaskKeys[index], response);
            });
            return responseMap;
        }
        return parallelTasks;
    }
}
