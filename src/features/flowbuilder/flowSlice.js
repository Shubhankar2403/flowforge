// src/features/flowbuilder/flowSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action) => {
      state.edges.push(action.payload);
    },
  },
});

export const { setNodes, setEdges, addNode, addEdge } = flowSlice.actions;

export default flowSlice.reducer;
