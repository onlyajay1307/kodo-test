export class ResponseUtility {
    static getFormattedResponse(response: any, statusCode?: number,  message?: string): object {
        return {
            statusCode: statusCode || 200,
            message: message || "success",
            data: response,
        };
    }
}