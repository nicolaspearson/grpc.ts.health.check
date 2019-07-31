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

	// Check the health status
	const healthClient = new HealthClient(`${host}:${port}`, grpc.credentials.createInsecure());
	const request = new HealthCheckRequest();
	request.setService(serviceName);
	healthClient.check(request, (error: Error | null, response: HealthCheckResponse) => {
		if (error) {
			AppLogger.logger.error('Contact Service: Health Check Failed', error);
		} else {
			AppLogger.logger.debug(`Contact Service: Health Check Status: ${response.getStatus()}`);
		}
	});
	// Watch health status changes
	const healthStream = healthClient.watch(request);
	healthStream.on('data', (response: HealthCheckResponse) => {
		AppLogger.logger.debug(`Contact Service: Health Check Status: ${response.getStatus()}`);
	});

	return server;
}
```
