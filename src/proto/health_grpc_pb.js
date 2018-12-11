// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var health_pb = require('./health_pb.js');

function serialize_grpc_health_v1_HealthCheckRequest(arg) {
  if (!(arg instanceof health_pb.HealthCheckRequest)) {
    throw new Error('Expected argument of type grpc.health.v1.HealthCheckRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_grpc_health_v1_HealthCheckRequest(buffer_arg) {
  return health_pb.HealthCheckRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_health_v1_HealthCheckResponse(arg) {
  if (!(arg instanceof health_pb.HealthCheckResponse)) {
    throw new Error('Expected argument of type grpc.health.v1.HealthCheckResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_grpc_health_v1_HealthCheckResponse(buffer_arg) {
  return health_pb.HealthCheckResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_health_v1_SetStatusRequest(arg) {
  if (!(arg instanceof health_pb.SetStatusRequest)) {
    throw new Error('Expected argument of type grpc.health.v1.SetStatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_grpc_health_v1_SetStatusRequest(buffer_arg) {
  return health_pb.SetStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_grpc_health_v1_SetStatusResponse(arg) {
  if (!(arg instanceof health_pb.SetStatusResponse)) {
    throw new Error('Expected argument of type grpc.health.v1.SetStatusResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_grpc_health_v1_SetStatusResponse(buffer_arg) {
  return health_pb.SetStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var HealthService = exports.HealthService = {
  check: {
    path: '/grpc.health.v1.Health/Check',
    requestStream: false,
    responseStream: false,
    requestType: health_pb.HealthCheckRequest,
    responseType: health_pb.HealthCheckResponse,
    requestSerialize: serialize_grpc_health_v1_HealthCheckRequest,
    requestDeserialize: deserialize_grpc_health_v1_HealthCheckRequest,
    responseSerialize: serialize_grpc_health_v1_HealthCheckResponse,
    responseDeserialize: deserialize_grpc_health_v1_HealthCheckResponse,
  },
  setStatus: {
    path: '/grpc.health.v1.Health/SetStatus',
    requestStream: false,
    responseStream: false,
    requestType: health_pb.SetStatusRequest,
    responseType: health_pb.SetStatusResponse,
    requestSerialize: serialize_grpc_health_v1_SetStatusRequest,
    requestDeserialize: deserialize_grpc_health_v1_SetStatusRequest,
    responseSerialize: serialize_grpc_health_v1_SetStatusResponse,
    responseDeserialize: deserialize_grpc_health_v1_SetStatusResponse,
  },
};

exports.HealthClient = grpc.makeGenericClientConstructor(HealthService);
