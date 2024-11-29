import { RawAxiosRequestHeaders } from "axios";
import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ExternalPartyAxiosClientService {
  private readonly logger = new Logger(ExternalPartyAxiosClientService.name);
  private baseUrl = "";

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl =
      this.configService.get<string>("EXTERNAL_PARTY_BASE_URL") ??
      "https://default-value.whatever";
  }

  async exec<T, D>(
    path: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    headers: RawAxiosRequestHeaders,
    data?: D,
    params?: unknown,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    this.logger.debug(`[exec] Making HTTP ${method} call to ${url}`);

    try {
      const response = await this.httpService.axiosRef.request({
        url,
        method,
        headers,
        data,
        params,
      });
      return response.data;
    } catch (error) {
      this.logger.error(
        {
          url: error.response?.config?.url,
          code: error.code,
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        },
        "External Party API Error",
      );

      if (!error.response) {
        throw new HttpException("External service is unavailable", 500);
      }

      const errorMessage = error.response.data?.message || error.message;
      const errorCode = error.response.data?.error || "EXTERNAL_API_ERROR";
      const status = error.response.status || 500;

      throw new HttpException(`${errorCode}: ${errorMessage}`, status);
    }
  }
}
