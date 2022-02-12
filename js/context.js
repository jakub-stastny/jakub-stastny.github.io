import { parseQS } from "./helpers.js"

const priceByCountry = {
  gt: {first: "Q350", repeated: "Q300"},
  mx: {first: "$500", repeated: "$400"}
}

const qs = parseQS()

export default {
  localPrice: priceByCountry[qs.country]?.first,
  localPriceRepeated: priceByCountry[qs.country]?.repeated
}
