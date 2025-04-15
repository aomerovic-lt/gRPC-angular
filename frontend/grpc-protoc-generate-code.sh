#!/bin/bash

#OUT_DIR=./src/app/grpc
#
#mkdir -p "$OUT_DIR"

#protoc -I=../protos \
#  ../protos/helloworld.proto \
#  --grpc-web_out=import_style=typescript,mode=grpcwebtext:"$OUT_DIR"

#!/bin/bash

OUT_DIR="./src/app/grpc"

mkdir -p "$OUT_DIR"

# PROTOC COMMAND
protoc -I=../protos \
  ../protos/helloworld.proto \
  --js_out=import_style=commonjs,binary:"$OUT_DIR" \
  --grpc-web_out=import_style=typescript,mode=grpcweb:"$OUT_DIR"

