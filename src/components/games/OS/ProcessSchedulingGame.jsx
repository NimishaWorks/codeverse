/**
 * @game ProcessSchedulingGame
 * @subject Operating Systems
 * Interactive simulation of CPU scheduling algorithms (FCFS, SJF, RR)
 * Players arrange processes to optimize turnaround time and minimize waiting
 */

import React, { useState } from "react";

const ProcessSchedulingGame = () => {
  const [processes, setProcesses] = useState([
    { id: 1, name: "P1", arrivalTime: 0, burstTime: 5, priority: 2 },
    { id: 2, name: "P2", arrivalTime: 1, burstTime: 3, priority: 1 },
    { id: 3, name: "P3", arrivalTime: 2, burstTime: 8, priority: 3 },
    { id: 4, name: "P4", arrivalTime: 3, burstTime: 6, priority: 2 }
  ]);

  const [algorithm, setAlgorithm] = useState("FCFS");
  const [result, setResult] = useState(null);

  const runScheduling = () => {
    let scheduled = [];
    let currentTime = 0;
    let remaining = [...processes];

    if (algorithm === "FCFS") {
      scheduled = remaining.sort((a, b) => a.arrivalTime - b.arrivalTime);
    } else if (algorithm === "SJF") {
      scheduled = remaining.sort((a, b) => a.burstTime - b.burstTime);
    } else if (algorithm === "Priority") {
      scheduled = remaining.sort((a, b) => a.priority - b.priority);
    }

    const ganttChart = scheduled.map((p) => {
      const start = currentTime;
      currentTime += p.burstTime;
      return { ...p, start, end: currentTime };
    });

    const avgWaitingTime =
      ganttChart.reduce((sum, p) => sum + (p.start - p.arrivalTime), 0) /
      ganttChart.length;

    setResult({ ganttChart, avgWaitingTime });
  };

  return (
    <div style={{ padding: "2rem", background: "#1e293b", minHeight: "100vh", color: "#fff" }}>
      <h1>🖥️ CPU Scheduling Simulator</h1>
      <p>Choose an algorithm and schedule the processes!</p>

      <div style={{ margin: "2rem 0" }}>
        <label>Algorithm: </label>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} style={{ padding: "0.5rem", fontSize: "1rem" }}>
          <option value="FCFS">First-Come First-Served (FCFS)</option>
          <option value="SJF">Shortest Job First (SJF)</option>
          <option value="Priority">Priority Scheduling</option>
        </select>
        <button onClick={runScheduling} style={{ marginLeft: "1rem", padding: "0.5rem 1.5rem", fontSize: "1rem" }}>
          Run
        </button>
      </div>

      <div>
        <h2>Process Queue</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#334155" }}>
              <th style={{ padding: "0.5rem", border: "1px solid #475569" }}>Process</th>
              <th style={{ padding: "0.5rem", border: "1px solid #475569" }}>Arrival Time</th>
              <th style={{ padding: "0.5rem", border: "1px solid #475569" }}>Burst Time</th>
              <th style={{ padding: "0.5rem", border: "1px solid #475569" }}>Priority</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr key={p.id}>
                <td style={{ padding: "0.5rem", border: "1px solid #475569" }}>{p.name}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #475569" }}>{p.arrivalTime}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #475569" }}>{p.burstTime}</td>
                <td style={{ padding: "0.5rem", border: "1px solid #475569" }}>{p.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Gantt Chart</h2>
          <div style={{ display: "flex", gap: "0.25rem", marginTop: "1rem" }}>
            {result.ganttChart.map((p, i) => (
              <div
                key={i}
                style={{
                  flex: p.burstTime,
                  background: `hsl(${i * 80}, 70%, 50%)`,
                  padding: "1rem",
                  textAlign: "center",
                  border: "1px solid #fff"
                }}
              >
                {p.name}
                <div style={{ fontSize: "0.8rem" }}>
                  {p.start}-{p.end}
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1rem" }}>
            <strong>Average Waiting Time:</strong> {result.avgWaitingTime.toFixed(2)} ms
          </p>
        </div>
      )}
    </div>
  );
};

export default ProcessSchedulingGame;
