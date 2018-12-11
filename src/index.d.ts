import * as grpc from 'grpc';

import { HealthClient, HealthService } from './proto/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from './proto/health_pb';

export = GrpcHealthCheck;

declare class GrpcHealthCheck {
	constructor(statusMap: { [key: string]: number });
	setStatus(service: string, status: number): void;
	check(
		call: grpc.ServerUnaryCall<HealthCheckRequest>,
		callback: grpc.sendUnaryData<HealthCheckResponse>
	);
}
