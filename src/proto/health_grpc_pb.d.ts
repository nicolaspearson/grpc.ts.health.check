// package: grpc.health.v1
// file: health.proto

import * as grpc from 'grpc';
import * as health_pb from './health_pb';

interface IHealthService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  check: IHealthService_ICheck;
  setStatus: IHealthService_ISetStatus;
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

interface IHealthService_ISetStatus {
  path: string; // "/grpc.health.v1.Health/SetStatus"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<health_pb.SetStatusRequest>;
  requestDeserialize: grpc.deserialize<health_pb.SetStatusRequest>;
  responseSerialize: grpc.serialize<health_pb.SetStatusResponse>;
  responseDeserialize: grpc.deserialize<health_pb.SetStatusResponse>;
}

export const HealthService: IHealthService;
export interface IHealthServer {
  check: grpc.handleUnaryCall<health_pb.HealthCheckRequest, health_pb.HealthCheckResponse>;
  setStatus: grpc.handleUnaryCall<health_pb.SetStatusRequest, health_pb.SetStatusResponse>;
}

export interface IHealthClient {
  check(request: health_pb.HealthCheckRequest, callback: (error: Error | null, response: health_pb.HealthCheckResponse) => void): grpc.ClientUnaryCall;
  check(request: health_pb.HealthCheckRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: health_pb.HealthCheckResponse) => void): grpc.ClientUnaryCall;
  setStatus(request: health_pb.SetStatusRequest, callback: (error: Error | null, response: health_pb.SetStatusResponse) => void): grpc.ClientUnaryCall;
  setStatus(request: health_pb.SetStatusRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: health_pb.SetStatusResponse) => void): grpc.ClientUnaryCall;
}

export class HealthClient extends grpc.Client implements IHealthClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public check(request: health_pb.HealthCheckRequest, callback: (error: Error | null, response: health_pb.HealthCheckResponse) => void): grpc.ClientUnaryCall;
  public check(request: health_pb.HealthCheckRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: health_pb.HealthCheckResponse) => void): grpc.ClientUnaryCall;
  public setStatus(request: health_pb.SetStatusRequest, callback: (error: Error | null, response: health_pb.SetStatusResponse) => void): grpc.ClientUnaryCall;
  public setStatus(request: health_pb.SetStatusRequest, metadata: grpc.Metadata, callback: (error: Error | null, response: health_pb.SetStatusResponse) => void): grpc.ClientUnaryCall;
}

