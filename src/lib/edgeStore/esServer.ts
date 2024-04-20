import { edgeStoreRawSdk } from "@edgestore/server/core";
import { env } from "../env.mjs";

export const deleteImage = async ({ imageUrl }: { imageUrl: string }) => await edgeStoreRawSdk.deleteFile({
  accessKey: env.EDGE_STORE_ACCESS_KEY,
  secretKey: env.EDGE_STORE_SECRET_KEY,
  url: imageUrl
})

export default {
  deleteImage
}