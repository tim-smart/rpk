import * as K from "../src/index";
import { describe } from "mocha";
import { runCases } from "./helpers";

describe("pvc", () =>
  runCases([
    {
      it: "create the persistent volume claim",
      in: {},
      fn: (_) => K.pvc("mypvc", "10Gi"),
      diff: {
        apiVersion: "v1",
        kind: "PersistentVolumeClaim",
        metadata: {
          name: "mypvc",
        },
        spec: {
          accessModes: ["ReadWriteOnce"],
          resources: {
            requests: {
              storage: "10Gi",
            },
          },
        },
      },
    },
  ]));
