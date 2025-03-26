import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "../../logpoint/proto/hello.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello as any;

export const client = new helloProto.Greeter(
  "localhost:50051",
  grpc.credentials.createInsecure()
);
