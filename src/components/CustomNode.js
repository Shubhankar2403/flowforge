"use client";

import { useState } from "react";
import { Handle, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { updateNodeLabel } from "@/features/flowbuilder/flowSlice"; 

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function CustomNode({ id, data }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "Label");

  const handleBlur = () => {
    setEditing(false);
    // Dispatch the new action with just the id and new label
    dispatch(updateNodeLabel({ id, label }));
  };

  const renderElement = () => {
    switch (data.subtype) {
      case "text":
        return <span className="text-muted-foreground">{label}</span>;

      case "input":
        return (
          <div className="text-left space-y-1">
            <Label>{label}</Label>
            <Input placeholder="Enter value" disabled />
          </div>
        );

      case "button":
        return <Button disabled>{label}</Button>;

      case "dropdown":
        return (
          <div className="text-left space-y-1">
            <Label>{label}</Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return <span>{label}</span>;
    }
  };

  return (
    <div
      className="bg-white p-3 rounded-xl border shadow-md min-w-[200px]"
      onDoubleClick={() => setEditing(true)}
    >
      {editing && data.subtype !== "input" && data.subtype !== "dropdown" ? (
        <Input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
        />
      ) : (
        renderElement()
      )}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
