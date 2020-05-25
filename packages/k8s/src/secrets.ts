import { Secret } from "kubernetes-types/core/v1";
import { DeepPartial } from "./common";
import * as R from "ramda";
import { createConfigFromFile } from "./internal/fs";
import { resource, maybeMergeResource } from "./resources";

/**
 * Creates a secret resource from some data. This function automatically base64
 * encodes the values for you.
 */
export const secret = (
  name: string,
  data: { [name: string]: string },
  toMerge?: DeepPartial<Secret>,
): Secret =>
  maybeMergeResource<Secret>(
    resource<Secret>("v1", "Secret", name, {
      data: R.map((v) => Buffer.from(v).toString("base64"), data) as {
        [name: string]: string;
      },
    }),
    toMerge,
  );

/**
 * Create a secret from a file
 */
export const secretFromFile = (
  name: string,
  file: string,
  filename?: string,
  toMerge: DeepPartial<Secret> = {},
) =>
  createConfigFromFile(file, filename).then((data) =>
    secret(name, data, toMerge),
  );
