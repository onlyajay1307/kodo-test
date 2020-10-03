import {Controller, Logger, Get, Res, Query} from "@nestjs/common";
import {FeedService} from "./feed.service";

@Controller("feed")
export class FeedController {
    constructor(private feedService: FeedService) {
    }

    @Get("")
    async getFeedDetails(@Query() query, @Res() res): Promise<any> {
        try {
            const response = await this.feedService.getFeedDetails(query);
            res.send(response);
        } catch (err) {
            throw err;
        }
    }
}