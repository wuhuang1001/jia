import { OpenGraphImage } from "@/app/_components/opengraph-image"
import { FEATURED_OG_IMAGES } from "@/lib/constants"
import { getRandomItem } from "@/lib/utils"

export { contentType, size } from "@/app/_components/favicon"

export default async function Image() {
  return OpenGraphImage({ url: "https://pic.imgdb.cn/item/66347ca00ea9cb1403132523.jpg" })
}
