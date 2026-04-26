export type WSPayload =
  | { type: "tap"; key: string }
  | { type: "down"; key: string }
  | { type: "up"; key: string }
  | { type: "axis"; x: number; y: number };