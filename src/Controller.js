import 'antd/dist/antd.css';
import React from 'react';
import { Drawer} from 'antd';
import { connect } from 'react-redux'

import { openDrawer, closeDrawer, reduxGraphStoreChanged } from "./actions"

import TheGraph from 'the-graph'
import 'the-graph/themes/the-graph-dark.css'
import 'the-graph/themes/the-graph-light.css'
import Switch from './gates/Switch'


class ReduxGraphStore extends TheGraph.fbpGraph.journal.JournalStore {
  constructor(){
    super()
    this.reduxMethods = undefined
    this.transactions = []
  }

  setReduxMethods(dispatch, getState) {
    this.reduxMethods = {
      dispatch,
      getState
    }
    for (var revId = 0; revId < this.transactions.length; revId++) {
        dispatch(reduxGraphStoreChanged(revId, this.transactions[revId]))
    }
  }

  putTransaction(revId, entries){
    if (this.reduxMethods) {
      this.reduxMethods.dispatch(reduxGraphStoreChanged(revId, entries))
      this.lastRevision = 0
    } else {
      super.putTransaction(revId, entries)
      this.transactions[revId] = entries
    }
  }

  fetchTransaction(revId){
    if (this.reduxMethods) {
      return this.reduxMethods.getState().controller.transactions[revId]
    } else {
      return this.transactions[revId]
    }
  }
}

export const graphStore = new ReduxGraphStore()
var graph = new TheGraph.fbpGraph.Graph();
var journal = new TheGraph.fbpGraph.Journal(graph, undefined, graphStore);
graph.addNode(0, "video",  {label: "video",  x:  50, y:  50});
graph.addNode(1, "video",  {label: "video",  x:  50, y: 250});
graph.addNode(2, "switch", {label: "switch", x: 250, y: 150});
graph.addNode(3, "screen", {label: "screen", x: 450, y: 150});
graph.addEdge(0, "out", 2, "in1");
graph.addEdge(1, "out", 2, "in2");
graph.addEdge(2, "out", 3, "in");

// Component library
var library = {
  screen: {
    name: 'screen',
    description: 'screen',
    icon: 'desktop',
    inports: [
      {'name': 'in', 'type': 'rgbVideo'}
    ],
    outports: []
  },
  switch: {
    name: 'switch',
    description: 'switch',
    icon: 'chevron-right',//arrows-v chevron-right
    inports: [
      {'name': 'in1', 'type': 'rgbVideo'},
      {'name': 'in2', 'type': 'rgbVideo'}
    ],
    outports: [
      {'name': 'out', 'type': 'rgbVideo'}
    ]
  },
  video: {
    name: 'video',
    description: 'video',
    icon: 'file-video-o',
    inports: [],
    outports: [
      {'name': 'out', 'type': 'rgbVideo'}
    ]
  }
};

class Controller extends React.Component {
  render() {
    const { handleSettings, handleDrawerClose, isDrawerOpen, lastRevId } = this.props;
    const contextMenus = {
      node: {
        n4: {
          icon: "cogs",
          iconLabel: "settings",
          action: handleSettings
        }
      }
    };
    if (lastRevId >= 0) journal.moveToRevision(lastRevId)
    return (
      <div>
        <a onClick={
          ()=>window.open('/screen', 'Mirage', 'fullscreen=True')
        }>Screen</a><br/>
        <div className={'the-graph-dark'}>
          <TheGraph.App height={400} width={600} graph={graph} library={library} menus={contextMenus}/>
        </div>
        <Drawer
          title="Settings"
          placement="bottom"
          onClose={handleDrawerClose}
          visible={isDrawerOpen}
        >
          <Switch.Controller/>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isDrawerOpen: state.controller.isDrawerOpen,
    lastRevId: state.controller.lastRevId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSettings: () => dispatch(openDrawer()),
  handleDrawerClose: () => dispatch(closeDrawer())
})

const ConnectedController = connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller)

export default ConnectedController
