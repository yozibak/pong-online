import { startSubscription } from '.'

export const makeNetwork = () => {
  let subscription: ReturnType<typeof startSubscription>
  return {
    start(...args: Parameters<typeof startSubscription>) {
      subscription = startSubscription(...args)
    },
    stop() {
      subscription.unsubscribe()
    },
  }
}
