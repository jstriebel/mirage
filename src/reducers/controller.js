import TheGraph from "the-graph"

const initialGraph = new TheGraph.fbpGraph.Graph()
const initalJournal = new TheGraph.fbpGraph.Journal(initialGraph)
initialGraph.addNode(0, "Video")
initialGraph.addNode(1, "Video")
initialGraph.addNode(2, "Switch")
initialGraph.addNode(3, "Screen")
initialGraph.setNodeMetadata(0, { label: "Video", x: 50, y: 50 })
initialGraph.setNodeMetadata(1, { label: "Video", x: 50, y: 250 })
initialGraph.setNodeMetadata(2, { label: "Switch", x: 250, y: 150 })
initialGraph.setNodeMetadata(3, { label: "Screen", x: 450, y: 150 })
initialGraph.addEdge(0, "out", 2, "in1")
initialGraph.addEdge(1, "out", 2, "in2")
initialGraph.addEdge(2, "out", 3, "in")

// Component library
const initialGraphLibrary = {
  Screen: {
    name: "Screen",
    description: "Screen",
    icon: "desktop",
    inports: [{ name: "in", type: "rgbVideo" }],
    outports: [],
  },
  Switch: {
    name: "Switch",
    description: "Switch",
    icon: "chevron-right", //arrows-v chevron-right
    inports: [
      { name: "in1", type: "rgbVideo" },
      { name: "in2", type: "rgbVideo" },
    ],
    outports: [{ name: "out", type: "rgbVideo" }],
  },
  Video: {
    name: "Video",
    description: "Video",
    icon: "file-video-o",
    inports: [],
    outports: [{ name: "out", type: "rgbVideo" }],
  },
}

function calculateMeta(oldMeta, newMeta) {
  const setMeta = {}
  for (let k in oldMeta) setMeta[k] = null
  for (let k in newMeta) setMeta[k] = newMeta[k]
  return setMeta
}

function executeEntry(entry, prev_graph) {
  const graph = new TheGraph.fbpGraph.Graph()
  TheGraph.fbpGraph.graph.mergeResolveTheirs(graph, prev_graph)
  const a = entry.args
  // prettier-ignore
  switch (entry.cmd) {
    case 'addNode':          graph.addNode(a.id, a.component); break;
    case 'removeNode':       graph.removeNode(a.id); break;
    case 'renameNode':       graph.renameNode(a.oldId, a.newId); break;
    case 'changeNode':       graph.setNodeMetadata(a.id, calculateMeta(a.old, a.new)); break;
    case 'addEdge':          graph.addEdge(a.from.node, a.from.port, a.to.node, a.to.port); break;
    case 'removeEdge':       graph.removeEdge(a.from.node, a.from.port, a.to.node, a.to.port); break;
    case 'changeEdge':       graph.setEdgeMetadata(a.from.node, a.from.port, a.to.node, a.to.port, calculateMeta(a.old, a.new)); break;
    case 'addInitial':       graph.addInitial(a.from.data, a.to.node, a.to.port); break;
    case 'removeInitial':    graph.removeInitial(a.to.node, a.to.port); break;
    case 'startTransaction': break;
    case 'endTransaction':   break;
    case 'changeProperties': graph.setProperties(a.new); break;
    case 'addGroup':         graph.addGroup(a.name, a.nodes, a.metadata); break;
    case 'renameGroup':      graph.renameGroup(a.oldName, a.newName); break;
    case 'removeGroup':      graph.removeGroup(a.name); break;
    case 'changeGroup':      graph.setGroupMetadata(a.name, calculateMeta(a.old, a.new)); break;
    case 'addInport':        graph.addInport(a.name, a.port.process, a.port.port, a.port.metadata); break;
    case 'removeInport':     graph.removeInport(a.name); break;
    case 'renameInport':     graph.renameInport(a.oldId, a.newId); break;
    case 'changeInport':     graph.setInportMetadata(a.name, calculateMeta(a.old, a.new)); break;
    case 'addOutport':       graph.addOutport(a.name, a.port.process, a.port.port, a.port.metadata); break;
    case 'removeOutport':    graph.removeOutport(a.name); break;
    case 'renameOutport':    graph.renameOutport(a.oldId, a.newId); break;
    case 'changeOutport':    graph.setOutportMetadata(a.name, calculateMeta(a.old, a.new)); break;
    default: throw new Error("Unknown journal entry: #{entry.cmd}")
  }
  return graph
}

const initialState = {
  isDrawerOpen: false,
  nodeComponent: undefined,
  nodeId: undefined,
  lastRevId: initalJournal.store.transactions.length - 1,
  transactions: initalJournal.store.transactions,
  graphLibrary: initialGraphLibrary,
  graph: initialGraph,
}

export const controller = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      if (action.node)
        return {
          ...state,
          isDrawerOpen: true,
          nodeId: action.node.id,
          nodeComponent: action.node.component,
        }
      else return state
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false }
    case "REDUX_GRAPH_STORE_CHANGED":
      const newTransactions = [...state.transactions]
      newTransactions[action.revId] = action.entries
      var newGraph = state.graph
      for (let i of action.entries) {
        newGraph = executeEntry(i, newGraph)
      }
      return {
        ...state,
        transactions: newTransactions,
        graph: newGraph,
        lastRevId: action.revId,
      }
    default:
      return state
  }
}
