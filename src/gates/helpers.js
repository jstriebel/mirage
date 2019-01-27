export function getInNodes(graph, id) {
    const inEdges = graph.edges.filter(edge => edge.to.node === id)
    const inNodes = inEdges.reduce(
        (obj, edge) => ({...obj, [edge.to.port]: graph.nodes[edge.from.node]}),
        {}
    )
    return inNodes
}
