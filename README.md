# gRPC Health Check

An implementation of gRPC health checks, written in typescript.

### Installation

```
npm install grpc-ts-health-check --save
```

### Dependencies

- [Google Protobuf](https://www.npmjs.com/package/google-protobuf): Protocol Buffers: Google's data interchange format.
- [gRPC](https://www.npmjs.com/package/grpc): Node.js gRPC Library.
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
	grpcHealthCheck.setStatus(serviceName, HealthCheckResponse.ServingStatus.SERVING);
	server.addService(HealthService, grpcHealthCheck);

	// Bind and start the server
	server.bind('localhost:9090', grpc.ServerCredentials.createInsecure());
	server.start();

	return server;
}
```
