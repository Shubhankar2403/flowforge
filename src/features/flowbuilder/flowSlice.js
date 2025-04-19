// src/features/flowbuilder/flowSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  nodes: [],
  edges: [],
}

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload
    },
    setEdges: (state, action) => {
      state.edges = action.payload
    },
    resetFlow: () => initialState,
  },
})

export const { setNodes, setEdges, resetFlow } = flowSlice.actions

export default flowSlice.reducer
