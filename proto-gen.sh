#!/bin/bash
# generate js codes
protoc-gen-grpc \
--js_out=import_style=commonjs,binary:./src/proto/ \
--grpc_out=./src/proto/ \
--proto_path ./src/proto/ \
./src/proto/*.proto

# generate d.ts codes
protoc-gen-grpc-ts \
--ts_out=service=true:./src/proto/ \
--proto_path ./src/proto/ \
./src/proto/*.proto
