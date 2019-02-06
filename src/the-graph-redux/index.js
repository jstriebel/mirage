import TheGraph from "the-graph"
import store from "../store"
import { reduxGraphStoreChanged } from "../actions"

export class ReduxGraphStore extends TheGraph.fbpGraph.journal.JournalStore {
  constructor() {
    super()
    this.transactions = []
  }

  putTransaction(revId, entries) {
    if (revId > 0) {
      store.dispatch(reduxGraphStoreChanged(revId, entries))
    }
    return revId
  }

  fetchTransaction(revId) {
    return store.getState().controller.transactions[revId]
  }
}

export class ReduxJournal extends TheGraph.fbpGraph.Journal {
  endTransaction(id, meta) {
    if (!this.subscribed) return

    this.appendCommand(
      "endTransaction",
      { id: id, metadata: meta },
      this.currentRevision
    )
    // TODO: this would be the place to refine @entries into
    // a minimal set of changes, like eliminating changes early in transaction
    // which were later reverted/overwritten
    this.currentRevision = this.store.putTransaction(
      this.currentRevision,
      this.entries
    )
    this.entries = []
  }
}
