/**
 * @game MemoryGame
 * @subject Operating Systems
 * Interactive visualization of memory allocation strategies (First Fit, Best Fit, Worst Fit)
 * Players allocate processes to memory blocks to minimize fragmentation
 */

import React, { useState } from "react";

const MemoryGame = () => {
  const [memoryBlocks, setMemoryBlocks] = useState([
    { id: 1, size: 100, allocated: false, processName: "" },
    { id: 2, size: 500, allocated: false, processName: "" },
    { id: 3, size: 200, allocated: false, processName: "" },
    { id: 4, size: 300, allocated: false, processName: "" },
    { id: 5, size: 600, allocated: false, processName: "" }
  ]);

  const [processes, setProcesses] = useState([
    { name: "P1", size: 212, allocated: false },
    { name: "P2", size: 417, allocated: false },
    { name: "P3", size: 112, allocated: false },
    { name: "P4", size: 426, allocated: false }
  ]);

  const [strategy, setStrategy] = useState("firstFit");

  const allocateMemory = () => {
    const newBlocks = [...memoryBlocks];
    const newProcesses = processes.map((p) => ({ ...p, allocated: false }));

    newProcesses.forEach((process) => {
      let targetBlock = null;

      if (strategy === "firstFit") {
        targetBlock = newBlocks.find((block) => !block.allocated && block.size >= process.size);
      } else if (strategy === "bestFit") {
        const availableBlocks = newBlocks.filter((block) => !block.allocated && block.size >= process.size);
        targetBlock = availableBlocks.sort((a, b) => a.size - b.size)[0];
      } else if (strategy === "worstFit") {
        const availableBlocks = newBlocks.filter((block) => !block.allocated && block.size >= process.size);
        targetBlock = availableBlocks.sort((a, b) => b.size - a.size)[0];
      }

      if (targetBlock) {
        targetBlock.allocated = true;
        targetBlock.processName = process.name;
        process.allocated = true;
      }
    });

    setMemoryBlocks(newBlocks);
    setProcesses(newProcesses);
  };

  const reset = () => {
    setMemoryBlocks(
      memoryBlocks.map((block) => ({ ...block, allocated: false, processName: "" }))
    );
    setProcesses(processes.map((p) => ({ ...p, allocated: false })));
  };

  return (
    <div style={{ padding: "2rem", background: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      <h1>💾 Memory Allocation Game</h1>
      <p>Allocate processes to memory blocks using different strategies!</p>

      <div style={{ margin: "2rem 0" }}>
        <label>Strategy: </label>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "1rem" }}
        >
          <option value="firstFit">First Fit</option>
          <option value="bestFit">Best Fit</option>
          <option value="worstFit">Worst Fit</option>
        </select>
        <button onClick={allocateMemory} style={{ padding: "0.5rem 1.5rem", fontSize: "1rem", marginRight: "0.5rem" }}>
          Allocate
        </button>
        <button onClick={reset} style={{ padding: "0.5rem 1.5rem", fontSize: "1rem" }}>
          Reset
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div>
          <h2>Memory Blocks</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {memoryBlocks.map((block) => (
              <div
                key={block.id}
                style={{
                  padding: "1rem",
                  background: block.allocated ? "#10b981" : "#475569",
                  border: "2px solid #cbd5e1",
                  borderRadius: "0.5rem"
                }}
              >
                <div>Block {block.id}: {block.size} KB</div>
                {block.allocated && <div style={{ marginTop: "0.5rem", fontWeight: "bold" }}>Allocated to: {block.processName}</div>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Processes</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {processes.map((process) => (
              <div
                key={process.name}
                style={{
                  padding: "1rem",
                  background: process.allocated ? "#3b82f6" : "#1e293b",
                  border: "2px solid #64748b",
                  borderRadius: "0.5rem"
                }}
              >
                {process.name}: {process.size} KB
                {process.allocated && <span style={{ marginLeft: "1rem", color: "#4ade80" }}>✓ Allocated</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "#1e293b", borderRadius: "0.5rem" }}>
        <h3>💡 How It Works:</h3>
        <ul>
          <li><strong>First Fit:</strong> Allocate to the first block that's large enough</li>
          <li><strong>Best Fit:</strong> Allocate to the smallest block that's large enough</li>
          <li><strong>Worst Fit:</strong> Allocate to the largest available block</li>
        </ul>
      </div>
    </div>
  );
};

export default MemoryGame;
