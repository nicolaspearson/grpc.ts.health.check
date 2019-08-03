import * as grpc from 'grpc';

import { HealthClient, HealthService, IHealthServer } from './src/proto/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from './src/proto/health_pb';

declare class GrpcHealthCheck implements IHealthServer {
	constructor(statusMap: { [key: string]: number });
	private setStatus(service: string, status: HealthCheckResponse.ServingStatus): void;
	private sendStatusResponse(
		call: grpc.ServerWriteableStream<HealthCheckRequest>,
		status: HealthCheckResponse.ServingStatus,
		callback?: (error: Error | null | undefined) => void
	): void;
	public check(
		call: grpc.ServerUnaryCall<HealthCheckRequest>,
		callback: grpc.sendUnaryData<HealthCheckResponse>
	): void;
	public watch(
		call: grpc.ServerWriteableStream<HealthCheckRequest>
	): void;
}

export { GrpcHealthCheck, HealthCheckRequest, HealthCheckResponse, HealthClient, HealthService };
