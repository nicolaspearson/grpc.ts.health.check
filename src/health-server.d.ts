import * as grpc from 'grpc';

import { IHealthServer } from './proto/health_grpc_pb';
import { HealthCheckRequest, HealthCheckResponse } from './proto/health_pb';

export class HealthServer extends grpc.Server implements IHealthServer {
	constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
	public check(): grpc.handleUnaryCall<HealthCheckRequest, HealthCheckResponse>;
	public watch(): grpc.handleServerStreamingCall<HealthCheckRequest, HealthCheckResponse>;
}
