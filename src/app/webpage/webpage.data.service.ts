import { Injectable, isDevMode } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
/**
 * @description
 * @class
 */
@Injectable()
export class WebPageDataService {

    constructor(private _httpClient: HttpClient) {
    }

    getWeatherDetailsForCountry(): Observable<any> {
        let requestUrl: string = `https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576`;
        return this.get(requestUrl);
    }
    getDestinationImg(): Observable<any> {
        let requestUrl: string = `https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c`;
        return this.get(requestUrl);
    }

 

    public get<T>(requestUrl: string): Observable<any> {
        return this._httpClient.get(requestUrl);
    }

    handleOnLoadError(error: any) {
        if (error.status === 401) {
            error.isAccessRestricted = true;
        }
    }
}
