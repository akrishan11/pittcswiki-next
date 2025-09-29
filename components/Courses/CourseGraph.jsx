"use client"

import React, { useCallback } from "react"
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "@xyflow/react"
import dagre from "@dagrejs/dagre"

const position = { x: 0, y: 0 }
const edgeType = "smoothstep"

import "@xyflow/react/dist/style.css"

const initialNodes = [
  {
    id: "401",
    type: "input",
    data: { label: "CMP 401" },
    position,
  },
  {
    id: "445",
    data: { label: "CS 445" },
    position,
  },
  {
    id: "447",
    data: { label: "CS 447" },
    position,
  },
  {
    id: "449",
    data: { label: "CS 449" },
    position,
  },
  {
    id: "1501",
    data: { label: "CS 1501" },
    position,
  },
  {
    id: "1502",
    data: { label: "CS 1502" },
    position,
  },
  {
    id: "1503",
    data: { label: "CS 1503" },
    position,
  },
]

export const initialEdges = [
  { id: "e12", source: "401", target: "445", type: edgeType, animated: false },
  { id: "e13", source: "445", target: "447", type: edgeType, animated: true },
  {
    id: "e22a",
    source: "445",
    target: "1501",
    type: edgeType,
    animated: false,
  },
  { id: "e22b", source: "447", target: "449", type: edgeType, animated: true },
  {
    id: "e22c",
    source: "445",
    target: "1502",
    type: edgeType,
    animated: false,
  },
  {
    id: "e2c2d",
    source: "445",
    target: "1503",
    type: edgeType,
    animated: false,
  },
]

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR"
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }

    return newNode
  })

  return { nodes: newNodes, edges }
}

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
)

const CourseGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges)

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  )
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction)

      setNodes([...layoutedNodes])
      setEdges([...layoutedEdges])
    },
    [nodes, edges]
  )

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      proOptions={{ hideAttribution: true }}
      fitView
      panOnScroll={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      panOnDrag={false}
      zoomOnDoubleClick={false}
      minZoom={1}
      maxZoom={1}
    ></ReactFlow>
  )
}

export default CourseGraph
