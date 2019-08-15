# gRPC Health Check

[![License][license-image]][license-url]
[![Current Version](https://img.shields.io/npm/v/grpc-ts-health-check.svg)](https://www.npmjs.com/package/grpc-ts-health-check)
[![npm](https://img.shields.io/npm/dw/grpc-ts-health-check.svg)](https://www.npmjs.com/package/grpc-ts-health-check)
![](https://img.shields.io/bundlephobia/min/grpc-ts-health-check.svg?style=flat)

[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/make-coverage-badge.svg

An implementation of gRPC health checks, written in typescript.

It is assumed that you are using the `grpc` library.

### Installation

```
npm install grpc-ts-health-check --save
```

Install the `grpc` library:

```
npm install grpc --save
```

### Dependencies

- [Google Protobuf](https://www.npmjs.com/package/google-protobuf): Protocol Buffers - Google's data interchange format.
- [gRPC Boom](https://www.npmjs.com/package/grpc-boom): A zero dependency library to help create gRPC-friendly error objects.

### Usage

## Methods

Below is a list of available methods:

### `watch(request)`

Set the initial status of the service and continues to watch for any changes.

- `request` - the `HealthCheckRequest` object.

```typescript
const healthClient = new HealthClient(`${host}:${port}`, grpc.credentials.createInsecure());
const request = new HealthCheckRequest();
request.setService(serviceName);
const healthStream = healthClient.watch(request);
healthStream.on('data', (response: HealthCheckResponse) => {
  AppLogger.logger.debug(`Health Status: ${response.getStatus()}`);
});
```

### `check(request)`

Checks the status of the service once.

- `request` - the `HealthCheckRequest` object.

```typescript
const healthClient = new HealthClient(`${host}:${port}`, grpc.credentials.createInsecure());
const request = new HealthCheckRequest();
request.setService(serviceName);
healthClient.check(request, (error: Error | null, response: HealthCheckResponse) => {
  if (error) {
    AppLogger.logger.error('Health Check Failed', error);
  } else {
    AppLogger.logger.debug(`Health Status: ${response.getStatus()}`);
  }
});
```

## Example

```typescript
import * as grpc from 'grpc';
import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';

const serviceName = 'auth.Authenticator';
const healthCheckStatusMap = {
  serviceName: HealthCheckResponse.ServingStatus.UNKNOWN
};

function start(): grpc.Server {
  // Create the server
  const server: grpc.Server = new grpc.Server();

  // Register the health service
  const grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);
  server.addService(HealthService, grpcHealthCheck);

  // Bind and start the server
  server.bind('localhost:9090', grpc.ServerCredentials.createInsecure());
  server.start();

  // Create the health client
  const healthClient = new HealthClient(`${host}:${port}`, grpc.credentials.createInsecure());
  const request = new HealthCheckRequest();
  request.setService(serviceName);

  // Watch health status - streaming request
  // This will set the initial health status
  // and continue to watch the service for changes.
  const healthStream = healthClient.watch(request);
  healthStream.on('data', (response: HealthCheckResponse) => {
    AppLogger.logger.debug(`Authenticator Service: Health Status: ${response.getStatus()}`);
  });

  // Check health status - single request
  // This will provide the current health status
  // of the service when the request is executed.
  setTimeout(() => {
    healthClient.check(request, (error: Error | null, response: HealthCheckResponse) => {
      if (error) {
        AppLogger.logger.error('Authenticator Service: Health Check Failed', error);
      } else {
        AppLogger.logger.debug(
          `Authenticator Service: Health Check Status: ${response.getStatus()}`
        );
      }
    });
  }, 5000);
  return server;
}
```
