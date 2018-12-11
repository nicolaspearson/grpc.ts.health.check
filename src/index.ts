import * as grpc from 'grpc';
import GrpcBoom from 'grpc-boom';

import { HealthClient, HealthService } from './proto/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from './proto/health_pb';

class GrpcHealthCheck {
	constructor(private statusMap: { [key: string]: number }) {
		// Empty
	}

	public setStatus(service: string, status: number) {
		this.statusMap[service] = status;
	}

	public check(
		call: grpc.ServerUnaryCall<HealthCheckRequest>,
		callback: grpc.sendUnaryData<HealthCheckResponse>
	) {
		const service: string = call.request.getService();
		const status: number = this.statusMap[service];
		if (!status) {
			callback(GrpcBoom.notFound(`Status not found for service: ${service}`), null);
		} else {
			const response: HealthCheckResponse = new HealthCheckResponse();
			response.setStatus(status);
			callback(null, response);
		}
	}
}

export { GrpcHealthCheck, HealthClient, HealthService, HealthCheckResponse };
