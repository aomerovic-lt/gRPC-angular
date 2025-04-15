import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const PROTO_PATH = path.join(__dirname, '../protos/helloworld.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

// You might want  to define a proper TypeScript interface instead of `any`
const helloProto = grpc.loadPackageDefinition(packageDefinition) as any;

function sayHello(
    call: grpc.ServerUnaryCall<{ name: string }, { message: string }>,
    callback: grpc.sendUnaryData<{ message: string }>
): void {
    console.log('✅ [gRPC Backend] Received request:', call.request.name);
    callback(null, { message: `Hello, ${call.request.name}!` });
}



function main(): void {
    const server = new grpc.Server();
    server.addService(helloProto.helloworld.Greeter.service, {
        SayHello: sayHello,
    });
    server.bindAsync(
        '0.0.0.0:50051',
        grpc.ServerCredentials.createInsecure(),
        () => {
            console.log('gRPC server running at http://0.0.0.0:50051');
        }
    );
}

main();
