import * as grpc from 'grpc';

import { HealthClient, IHealthServer } from './proto/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from './proto/health_pb';

export class HealthServer extends grpc.Server implements IHealthServer {
	constructor(address: string, credentials: grpc.ChannelCredentials, options?: object) {
		super();
	}

	public check(): grpc.handleUnaryCall<HealthCheckRequest, HealthCheckResponse> {
		return function handler(
			call: grpc.ServerUnaryCall<HealthCheckRequest>,
			callback: grpc.sendUnaryData<HealthCheckResponse>
		) {
			// client.check(call.request, callback);
		};
	}

	public watch(): grpc.handleServerStreamingCall<HealthCheckRequest, HealthCheckResponse> {
		return function handler(call: grpc.ServerWriteableStream<HealthCheckRequest>) {
			return;
		};
	}
}
