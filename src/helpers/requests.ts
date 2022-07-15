import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";

class RequestHandler {

    requestHandler: AxiosInstance;

    constructor() {
        this.requestHandler = this.createHandler();
    };

    private createHandler(): AxiosInstance {
        return axios.create({
            headers: {
                "Accept": "application/json"
            },
            method: "POST",
            timeout: 200000,
            validateStatus: null
        });
    };

    async request(options: AxiosRequestConfig): Promise<AxiosResponse> {
        return await this.requestHandler(options);
    };

};

export const req: RequestHandler =  new RequestHandler();