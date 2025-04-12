import ZooKeeper from "zookeeper";

const host = "localhost:2181";

function createClient(timeoutMs = 5000) {
  const config = {
    connect: host,
    timeout: timeoutMs,
    debug_level: ZooKeeper.constants.ZOO_LOG_LEVEL_WARN,
    host_order_deterministic: false,
  };

  return new ZooKeeper(config);
}

export const client = createClient();

client.init({});

client.on("connect", () => {
  console.log("Connected to ZooKeeper");
});
