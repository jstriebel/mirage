import "antd/dist/antd.css"
import React from "react"
import { Drawer } from "antd"
import { connect } from "react-redux"

import { openDrawer, closeDrawer } from "./actions"

import TheGraph from "the-graph"
import "the-graph/themes/the-graph-dark.css"
import "the-graph/themes/the-graph-light.css"
import gates from "./gates"
import { ReduxGraphStore, ReduxJournal } from "./the-graph-redux"

class Controller extends React.Component {
  constructor(props) {
    super(props)
    const graphStore = new ReduxGraphStore()
    this.graph = new TheGraph.fbpGraph.Graph()
    this.journal = new ReduxJournal(this.graph, undefined, graphStore)
  }

  render() {
    const {
      handleSettings,
      handleNodeSelection,
      handleDrawerClose,
      isDrawerOpen,
      settingsId,
      settingsComponent,
      lastRevId,
      graphLibrary,
    } = this.props
    const contextMenus = {
      node: {
        n4: {
          icon: "cogs",
          iconLabel: "settings",
          action: handleSettings,
        },
      },
    }
    const settings =
      gates[settingsComponent] && gates[settingsComponent].Settings ? (
        React.createElement(gates[settingsComponent].Settings, {
          id: settingsId,
        })
      ) : (
        <div />
      )

    if (lastRevId >= 0) {
      this.journal.moveToRevision(lastRevId)
    }

    return (
      <div>
        <a onClick={() => window.open("/screen", "Mirage", "fullscreen=True")}>
          Screen
        </a>
        <br />
        <div className={"the-graph-dark"}>
          <TheGraph.App
            height={400}
            width={600}
            graph={this.graph}
            library={graphLibrary}
            menus={contextMenus}
            onNodeSelection={handleNodeSelection}
          />
        </div>
        <Drawer
          title="Settings"
          placement="bottom"
          onClose={handleDrawerClose}
          visible={isDrawerOpen}
        >
          {settings}
        </Drawer>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isDrawerOpen: state.controller.isDrawerOpen,
    lastRevId: state.controller.lastRevId,
    graphLibrary: state.controller.graphLibrary,
    settingsId: state.controller.nodeId,
    settingsComponent: state.controller.nodeComponent,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  // handleSettings: () => dispatch(openDrawer()),
  handleDrawerClose: () => dispatch(closeDrawer()),
  handleNodeSelection: (id, node, z) => dispatch(openDrawer(node)),
})

const ConnectedController = connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller)

export default ConnectedController
