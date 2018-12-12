import * as grpc from 'grpc';

import { HealthClient, HealthService } from './src/proto/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from './src/proto/health_pb';

declare class GrpcHealthCheck {
	constructor(statusMap: { [key: string]: number });
	setStatus(service: string, status: number): void;
	check(
		call: grpc.ServerUnaryCall<HealthCheckRequest>,
		callback: grpc.sendUnaryData<HealthCheckResponse>
	): void;
}

export { GrpcHealthCheck, HealthCheckRequest, HealthCheckResponse, HealthClient, HealthService };
