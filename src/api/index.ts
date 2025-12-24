import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * BaseApiModule provides a foundation for API interaction using Axios.
 * It abstracts the common logic for making HTTP requests.
 */
class BaseApiModule {
  readonly axios: AxiosInstance
  protected path: string

  /**
   * @param axiosInstance - An instance of Axios (usually with base configuration)
   * @param path - The default endpoint path for this module
   */
  constructor(axiosInstance: AxiosInstance, path: string) {
    this.axios = axiosInstance
    this.path = path
  }

  /**
   * Generic call method to execute HTTP requests
   * @template T - The expected response data type
   * @param params - Request configuration object
   * @param params.method - HTTP method (GET, POST, PUT, DELETE, etc.)
   * @param params.url - Specific endpoint URL (defaults to this.path)
   * @param params.body - Payload for the request (maps to Axios 'data')
   * @param params.params - URL query parameters
   * @param params.extras - Additional Axios configuration (headers, timeout, etc.)
   * @returns Promise containing the response data of type T
   */
  async call<T>(params: {
    method: string
    url?: string
    body?: object
    params?: object
    extras?: AxiosRequestConfig
  }): Promise<T> {
    // Construct the Axios request configuration
    const config: AxiosRequestConfig = {
      method: params.method,
      url: params.url ?? this.path,
      data: params.body, // Axios uses 'data' property for the request body
      params: params.params, // Query parameters for the URL
      ...params.extras, // Spread additional configurations
    }

    /**
     * Execute the request.
     * Axios wraps the server response in an object; we return only the 'data' property.
     */
    const response: AxiosResponse<T> = await this.axios.request<T>(config)

    return response.data
  }
}

export default BaseApiModule
