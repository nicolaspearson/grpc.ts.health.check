import * as grpc from 'grpc';
import GrpcBoom from 'grpc-boom';

import { HealthClient, HealthService } from './proto/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from './proto/health_pb';

class GrpcHealthCheck {
	constructor(private statusMap: { [key: string]: number }) {
		// Empty
	}

	private setStatus(service: string, status: number): void {
		this.statusMap[service] = status;
	}

	public check(
		call: grpc.ServerUnaryCall<HealthCheckRequest>,
		callback: grpc.sendUnaryData<HealthCheckResponse>
	): void {
		const service: string = call.request.getService();
		const status: number = this.statusMap[service];
		if (!status) {
			callback(GrpcBoom.notFound(`Unknown service: ${service}`), null);
		} else {
			const response: HealthCheckResponse = new HealthCheckResponse();
			response.setStatus(status);
			callback(null, response);
		}
	}

	public watch(
		call: grpc.ServerUnaryCall<HealthCheckRequest>,
		callback: grpc.sendUnaryData<HealthCheckResponse>
	): void {
		const service: string = call.request.getService();
		// TODO: Complete implementation
		const status: number = HealthCheckResponse.ServingStatus.UNKNOWN;
		this.setStatus(service, status);
		// Check the status of the service
		// Send the initial response
		const response: HealthCheckResponse = new HealthCheckResponse();
		response.setStatus(status);
		callback(null, response);
	}
}

export { GrpcHealthCheck, HealthCheckRequest, HealthCheckResponse, HealthClient, HealthService };
