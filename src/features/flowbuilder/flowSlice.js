import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes(state, action) {
      state.nodes = action.payload;
    },
    setEdges(state, action) {
      state.edges = action.payload;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    // Add this new reducer for updating node label
    updateNodeLabel: (state, action) => {
      const { id, label } = action.payload;
      const nodeIndex = state.nodes.findIndex(node => node.id === id);
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = {
          ...state.nodes[nodeIndex],
          data: {
            ...state.nodes[nodeIndex].data,
            label
          }
        };
      }
    },
  },
});

export const { setNodes, setEdges, addNode, updateNodeLabel } = flowSlice.actions;
export default flowSlice.reducer;