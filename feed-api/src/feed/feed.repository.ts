import {CommonRepository} from "../common/repository/common.repository";
import {CommonUtility} from "../common/utility/common.utility";

export class FeedRepository extends CommonRepository {
    private static _instance: FeedRepository;

    public static instance(): FeedRepository {
        if (!FeedRepository._instance) {
            FeedRepository._instance = new FeedRepository();
        }
        return FeedRepository._instance;
    }

    public async getFeedDetails(query: object): Promise<any> {
        const queryParams = new Map(Object.entries(query));
        const PAGE_NUMBER_DEFAULT = 1; // Page
        const RESULTS_PER_PAGE_DEFAULT = 9; // limit
        const pageNumber = +queryParams.get("pageNumber") || PAGE_NUMBER_DEFAULT;
        const resultsPerPage = +queryParams.get("resultsPerPage") || RESULTS_PER_PAGE_DEFAULT;
        const offset = (pageNumber - 1) * resultsPerPage;

        const sortBy = queryParams.get("sortBy");
        let sortByQuery = "";
        if (sortBy) {
            sortByQuery = sortBy === 'name' ? `ORDER BY name ASC` : `ORDER BY dateLastEdited DESC`;
        }

        const keyword = queryParams.get("keyword");
        let searchQuery = "";
        if (keyword) {
            if (keyword.indexOf('\'') >= 0 || keyword.indexOf('"') >= 0) {
                // searchQuery = `WHERE ( name LIKE '%${keyword}%' OR description LIKE '%${keyword}%')`;
                searchQuery = `WHERE MATCH(name, description) AGAINST ('${keyword}')`;
            } else {
                const keywordArray = keyword.split(" ");
                const keyResult = [];
                for (const key of keywordArray) {
                    keyResult.push(`name LIKE '%${key}%'`);
                    keyResult.push(`description LIKE '%${key}%'`);
                }
                searchQuery = `WHERE ( ${keyResult.join(" OR ")} )`;
            }
        }

        const feedQuery = `SELECT * FROM feed_data ${searchQuery} ${sortByQuery} LIMIT ${offset},${resultsPerPage}`;

        const totalQuery = `SELECT COUNT(*) as totalResults FROM feed_data ${searchQuery}`;

        const parallelTask = {
            results: this.executeQuery(feedQuery, "FeedRepository-getFeedDetails"),
            totalResults: this.executeQuery(totalQuery, "FeedRepository-getFeedDetails"),
        };
        const parallelTaskResponse = await CommonUtility.executeParallelTasks(parallelTask);
        const formattedResults = {totalResults: 0, results: []};
        formattedResults.totalResults = parallelTaskResponse.get("totalResults")[0].totalResults;
        formattedResults.results = parallelTaskResponse.get("results");
        return formattedResults;
    }
}
