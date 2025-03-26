import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

// Load proto file
const PROTO_PATH = path.resolve(__dirname, "./proto/hello.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const sayHello = (call: any, callback: any) => {
  callback(null, { message: `Hello, ${call.request.name}!` });
};

const helloProto = grpc.loadPackageDefinition(packageDefinition).hello as any;

const startGrpcServer = () => {
  const server = new grpc.Server();
  server.addService(helloProto.Greeter.service, { SayHello: sayHello });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("🚀 gRPC Server running on port 50051");
    }
  );
};

startGrpcServer();
