"use client";

import { useSelector, useDispatch } from "react-redux";
import { setNodes, setEdges, addNode } from "@/features/flowbuilder/flowSlice";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  ReactFlowProvider,
} from "reactflow";

import CustomNode from "@/components/CustomNode";
import Sidebar from "@/components/Sidebar";

import React, { useCallback } from "react";
import { nanoid } from "nanoid";

const nodeTypes = {
  editable: CustomNode,
};

function FlowCanvas() {
  const nodes = useSelector((state) => state.flow.nodes);
  const edges = useSelector((state) => state.flow.edges);
  const dispatch = useDispatch();
  const { project } = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      
      // Check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // Get position of the drop
      const position = project({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: nanoid(),
        type: "editable",
        position,
        data: {
          label: `${type} Node`,
          subtype: type,
        },
      };

      dispatch(addNode(newNode));
    },
    [dispatch, project]
  );

  const onNodesChange = useCallback(
    (changes) => {
      dispatch(setNodes(applyNodeChanges(changes, nodes)));
    },
    [dispatch, nodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      dispatch(setEdges(applyEdgeChanges(changes, edges)));
    },
    [dispatch, edges]
  );

  const onConnect = useCallback(
    (connection) => {
      dispatch(setEdges(addEdge(connection, edges)));
    },
    [dispatch, edges]
  );

  return (
    <div className="w-full h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default function FlowBuilder() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}