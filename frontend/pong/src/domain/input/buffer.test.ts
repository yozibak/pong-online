import { NetworkPayload } from "../output";
import { makeNetworkBuffer } from "./buffer";

describe(`${makeNetworkBuffer.name}`, () => {
  const payload = {
    frameCount: 398,
  } as unknown as NetworkPayload
  it(`can retrieve latest payload that is older than current frameCount`, () => {
    const buffer = makeNetworkBuffer()
    buffer.push(payload)
    buffer.push({...payload, frameCount: 399})
    buffer.push({...payload, frameCount: 399})
    buffer.push({...payload, frameCount: 400})
    expect(buffer.get(399)!.frameCount).toBe(399)
    expect(buffer.get(402)!.frameCount).toBe(400)
    expect(buffer.length).toBe(1)
  })
  it(`should leave at least one paylod to resort to`, () => {
    const buffer = makeNetworkBuffer()
    buffer.push(payload)
    buffer.push({...payload, frameCount: 399})
    expect(buffer.get(399)!.frameCount).toBe(399)
    expect(buffer.length).toBe(1)
    expect(buffer.get(399)!.frameCount).toBe(399)
    expect(buffer.length).toBe(1)
  })
  it(`should delete stale payload from buffer`, () =>{
    const buffer = makeNetworkBuffer()
    buffer.push(payload)
    buffer.push({...payload, frameCount: 399})
    buffer.push({...payload, frameCount: 399})
    buffer.push({...payload, frameCount: 400})
    expect(buffer.get(399)).not.toBeNull()
    expect(buffer.get(398)).toBeNull()
    expect(buffer.length).toBe(2)
  })
})
