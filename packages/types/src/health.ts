/** Response body of `GET /health`. */
export interface HealthResponse {
  status: 'ok';
  /** ISO 8601 timestamp of the response. */
  timestamp: string;
}
