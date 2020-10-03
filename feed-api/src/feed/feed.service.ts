import {Injectable} from "@nestjs/common";
import {ResponseUtility} from "../common/utility/response.utility";
import {FeedRepository} from "./feed.repository";

@Injectable()
export class FeedService {
    private feedRepository = FeedRepository.instance();

    public async getFeedDetails(query: object) {
        const result = await this.feedRepository.getFeedDetails(query);
        return ResponseUtility.getFormattedResponse(result);
    }
}