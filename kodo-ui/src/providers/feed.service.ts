import { environment } from '../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()

export class FeedService {
    constructor(public httpClient: HttpClient) {
    }

    getFeed(currentPage, pageSize, sortBy, keyword) {
        let sortQuery = "";
        let searchQuery = "";
        if(sortBy){
            sortQuery = `&sortBy=${sortBy}`;
        }
        if(keyword){
            searchQuery = `&keyword=${keyword}`;
        }
        return this.httpClient.get<ItemsResponse>(API_URL + 
            `/feed?pageNumber=${currentPage}&resultsPerPage=${pageSize}${sortQuery}${searchQuery}`);
    }
}

interface ItemsResponse {
    statusCode: number,
    message: string
    data: any;
}