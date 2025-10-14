/**
 * @component GameHub
 * Central hub to access all games across different subjects
 * Quick access portal for testing and direct game launching
 */

import React from "react";
import { Link } from "react-router-dom";

const GameHub = () => {
  const gamesBySubject = {
    "Operating Systems": [
      {
        name: "CPU Process Scheduling",
        path: "/games/os/process-scheduling",
        description: "Learn FCFS, SJF, and Priority scheduling with interactive Gantt charts",
        icon: "🖥️",
        status: "available"
      },
      {
        name: "Memory Allocation",
        path: "/games/os/memory",
        description: "Practice First Fit, Best Fit, and Worst Fit allocation strategies",
        icon: "💾",
        status: "available"
      },
      {
        name: "Deadlock Escape",
        path: "#",
        description: "Solve deadlock scenarios and understand prevention strategies",
        icon: "🔒",
        status: "coming-soon"
      }
    ],
    "Data Structures & Algorithms": [
      {
        name: "Stack Operations",
        path: "#",
        description: "Push, pop, and manage stack overflow scenarios",
        icon: "📚",
        status: "coming-soon"
      },
      {
        name: "Queue Simulation",
        path: "#",
        description: "Enqueue, dequeue, and circular queue challenges",
        icon: "🎯",
        status: "coming-soon"
      },
      {
        name: "Sorting Visualizer",
        path: "#",
        description: "Visualize bubble, merge, quick, and heap sort algorithms",
        icon: "🔄",
        status: "coming-soon"
      }
    ],
    "Computer Networks": [
      {
        name: "Packet Routing Maze",
        path: "#",
        description: "Route packets through network nodes using routing algorithms",
        icon: "📡",
        status: "coming-soon"
      },
      {
        name: "IP Subnet Matching",
        path: "#",
        description: "Practice IP addressing and subnet calculations",
        icon: "🌐",
        status: "coming-soon"
      }
    ],
    "Computer Organization": [
      {
        name: "Logic Gate Puzzle",
        path: "#",
        description: "Build circuits using AND, OR, NOT, XOR gates",
        icon: "🔌",
        status: "coming-soon"
      },
      {
        name: "Pipeline Simulator",
        path: "#",
        description: "Understand CPU pipelining, hazards, and stalls",
        icon: "⚡",
        status: "coming-soon"
      },
      {
        name: "Cache Memory Game",
        path: "#",
        description: "Optimize cache hits with direct, associative mapping",
        icon: "💿",
        status: "coming-soon"
      }
    ],
    "Database Management": [
      {
        name: "SQL Query Builder",
        path: "#",
        description: "Practice SELECT, JOIN, subqueries with visual feedback",
        icon: "🗄️",
        status: "coming-soon"
      },
      {
        name: "ER Diagram Puzzle",
        path: "#",
        description: "Design entity-relationship models for real scenarios",
        icon: "📊",
        status: "coming-soon"
      }
    ]
  };

  return (
    <div style={{ 
      padding: "3rem", 
      background: "linear-gradient(140deg, #0b1020 0%, #101325 40%, #14182b 100%)",
      minHeight: "100vh",
      color: "#fff"
    }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎮 Game Hub</h1>
          <p style={{ fontSize: "1.2rem", color: "#94a3b8" }}>
            Access all interactive learning games across subjects
          </p>
        </header>

        {Object.entries(gamesBySubject).map(([subject, games]) => (
          <section key={subject} style={{ marginBottom: "3rem" }}>
            <h2 style={{ 
              fontSize: "1.8rem", 
              marginBottom: "1.5rem",
              borderBottom: "2px solid #475569",
              paddingBottom: "0.5rem"
            }}>
              {subject}
            </h2>
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem"
            }}>
              {games.map((game) => (
                <div
                  key={game.name}
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    border: "1px solid rgba(148, 163, 184, 0.2)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    transition: "transform 0.2s, border-color 0.2s",
                    cursor: game.status === "available" ? "pointer" : "not-allowed",
                    opacity: game.status === "available" ? 1 : 0.6
                  }}
                  onMouseEnter={(e) => {
                    if (game.status === "available") {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = "#7b5cff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(148, 163, 184, 0.2)";
                  }}
                  onClick={() => {
                    if (game.status === "available" && game.path !== "#") {
                      window.location.href = game.path;
                    }
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{game.icon}</div>
                  <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
                    {game.name}
                    {game.status === "coming-soon" && (
                      <span style={{ 
                        marginLeft: "0.5rem", 
                        fontSize: "0.7rem", 
                        background: "#475569", 
                        padding: "0.2rem 0.5rem",
                        borderRadius: "0.3rem"
                      }}>
                        Soon
                      </span>
                    )}
                  </h3>
                  <p style={{ color: "#cbd5e1", fontSize: "0.95rem" }}>
                    {game.description}
                  </p>
                  {game.status === "available" && (
                    <Link 
                      to={game.path} 
                      style={{ 
                        display: "inline-block",
                        marginTop: "1rem",
                        padding: "0.5rem 1rem",
                        background: "#7b5cff",
                        color: "#fff",
                        textDecoration: "none",
                        borderRadius: "0.5rem",
                        fontSize: "0.9rem"
                      }}
                    >
                      Play Now →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <div style={{ 
          textAlign: "center", 
          marginTop: "3rem",
          padding: "2rem",
          background: "rgba(123, 92, 255, 0.1)",
          borderRadius: "1rem",
          border: "1px solid rgba(123, 92, 255, 0.3)"
        }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📚 How to Access Games</h3>
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
            <p style={{ marginBottom: "0.5rem" }}>🗺️ <strong>From Roadmaps:</strong> Click on completed or active nodes in any course roadmap</p>
            <p style={{ marginBottom: "0.5rem" }}>🎯 <strong>Direct Access:</strong> Use the Game Hub to jump directly to any available game</p>
            <p style={{ marginBottom: "0.5rem" }}>🔗 <strong>URL Navigation:</strong> <code style={{ background: "#1e293b", padding: "0.2rem 0.5rem", borderRadius: "0.3rem" }}>/games/os/memory</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHub;
