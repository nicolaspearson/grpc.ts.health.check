import * as grpc from 'grpc';
import GrpcBoom from 'grpc-boom';

import { HealthClient, HealthService, IHealthServer } from './proto/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from './proto/health_pb';

class GrpcHealthCheck implements IHealthServer {
	private watchStatusMap: { [key: string]: HealthCheckResponse.ServingStatus } = {};
	private watchErrorMap: { [key: string]: Error } = {};

	constructor(private statusMap: { [key: string]: HealthCheckResponse.ServingStatus }) {
		// Empty
	}

	private setStatus(service: string, status: HealthCheckResponse.ServingStatus): void {
		this.statusMap[service] = status;
	}

	private sendStatusResponse(
		call: grpc.ServerWriteableStream<HealthCheckRequest>,
		status: HealthCheckResponse.ServingStatus,
		callback?: (error: Error | null | undefined) => void
	): void {
		// Send the status to the client
		const response = new HealthCheckResponse();
		response.setStatus(status);
		call.write(response, callback);
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
		call: grpc.ServerWriteableStream<HealthCheckRequest>
	): void {
		const service: string = call.request.getService();
		// Updated status is used for getting service status updates.
		let updatedStatus = HealthCheckResponse.ServingStatus.SERVING;
		if (!this.statusMap[service]) {
			// Set the initial status
			updatedStatus = HealthCheckResponse.ServingStatus.SERVICE_UNKNOWN;
			this.setStatus(service, updatedStatus);
			this.sendStatusResponse(call, updatedStatus);
		} else {
			updatedStatus = this.statusMap[service];
		}

		this.watchStatusMap[service] = updatedStatus;
		let lastStatus = -1;
		if (!this.watchErrorMap[service]) {
			// tslint:disable no-console
			console.log('Next Tick');
			const callback = () => {
				lastStatus = this.statusMap[service];
				if (lastStatus !== updatedStatus) {
					console.log('Sending Status: ' + updatedStatus);
					// Status has changed
					this.setStatus(service, updatedStatus);
					this.sendStatusResponse(call, updatedStatus, (error: Error | null | undefined) => {
						if (error) {
							// Terminate stream on next tick
							this.watchErrorMap[service] = error;
						}
					});
				}
			};
			process.nextTick(callback);
		} else {
			// Terminate the stream
			call.end(this.watchErrorMap[service]);
		}
	}
}

export { GrpcHealthCheck, HealthCheckRequest, HealthCheckResponse, HealthClient, HealthService };
