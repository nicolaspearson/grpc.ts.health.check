// package: grpc.health.v1
// file: health.proto

import * as grpc from 'grpc';
import * as health_pb from './health_pb';

interface IHealthService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  check: IHealthService_ICheck;
  watch: IHealthService_IWatch;
}

interface IHealthService_ICheck {
  path: string; // "/grpc.health.v1.Health/Check"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<health_pb.HealthCheckRequest>;
  requestDeserialize: grpc.deserialize<health_pb.HealthCheckRequest>;
  responseSerialize: grpc.serialize<health_pb.HealthCheckResponse>;
  responseDeserialize: grpc.deserialize<health_pb.HealthCheckResponse>;
}

interface IHealthService_IWatch {
  path: string; // "/grpc.health.v1.Health/Watch"
  requestStream: boolean; // false
  responseStream: boolean; // true
  requestSerialize: grpc.serialize<health_pb.HealthCheckRequest>;
  requestDeserialize: grpc.deserialize<health_pb.HealthCheckRequest>;
  responseSerialize: grpc.serialize<health_pb.HealthCheckResponse>;
  responseDeserialize: grpc.deserialize<health_pb.HealthCheckResponse>;
}

export const HealthService: IHealthService;
export interface IHealthServer {
  check: grpc.handleUnaryCall<health_pb.HealthCheckRequest, health_pb.HealthCheckResponse>;
  watch: grpc.handleServerStreamingCall<health_pb.HealthCheckRequest, health_pb.HealthCheckResponse>;
}

export interface IHealthClient {
  check(request: health_pb.HealthCheckRequest, callback: (error: Error | null, response: health_pb.HealthCheckResponse) => void): grpc.ClientUnaryCall;
  check(request: health_pb.HealthCheckRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: health_pb.HealthCheckResponse) => void): grpc.ClientUnaryCall;
  watch(request: health_pb.HealthCheckRequest, metadata?: grpc.Metadata): grpc.ClientReadableStream<health_pb.HealthCheckResponse>;
}

export class HealthClient extends grpc.Client implements IHealthClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public check(request: health_pb.HealthCheckRequest, callback: (error: Error | null, response: health_pb.HealthCheckResponse) => void): grpc.ClientUnaryCall;
  public check(request: health_pb.HealthCheckRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: health_pb.HealthCheckResponse) => void): grpc.ClientUnaryCall;
  public watch(request: health_pb.HealthCheckRequest, metadata?: grpc.Metadata): grpc.ClientReadableStream<health_pb.HealthCheckResponse>;
}

