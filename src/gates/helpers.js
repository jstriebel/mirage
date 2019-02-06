import React from "react";

import gates from "."

const library = {}

function createElement(node) {
    const key = node.component + node.id
    if (key in library) {
        return library[key]
    }
    const component = gates[node.component].Screen
    const element = node.component === "Video" ? component({id: node.id}) : React.createElement(component, {id: node.id})
    library[key] = element
    return element
}

export function getInElements(graph, id) {
    const inEdges = graph.edges.filter(edge => edge.to.node === id)
    return inEdges.reduce(
        (obj, edge) => {
            const node = graph.nodes[edge.from.node]
            return {...obj, [edge.to.port]: createElement(node)}
        },
        {}
    )
}
