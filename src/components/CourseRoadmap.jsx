import React from "react";
import { useParams } from "react-router-dom";
import RoadmapDSA from "./roadmaps/RoadmapDSA";
import RoadmapOS from "./roadmaps/RoadmapOS";
import RoadmapCN from "./roadmaps/RoadmapCN";
import RoadmapCOA from "./roadmaps/RoadmapCOA";
import RoadmapDBMS from "./roadmaps/RoadmapDBMS";
import RoadmapDAA from "./roadmaps/RoadmapDAA";
import RoadmapOOPS from "./roadmaps/RoadmapOOPS";
import RoadmapWeb from "./roadmaps/RoadmapWeb";
import RoadmapPython from "./roadmaps/RoadmapPython";
import RoadmapJava from "./roadmaps/RoadmapJava";
import RoadmapCyber from "./roadmaps/RoadmapCyber";
import RoadmapCloud from "./roadmaps/RoadmapCloud";
import "./CourseRoadmap.css";

/**
 * @feature Multi-subject Course Roadmaps + Game Integration
 * Dynamic roadmap loader based on URL param or prop
 * Each subject has its own roadmap: DSA, OS, CN, COA, DBMS, OOPs, AI, Cyber, Cloud
 * Maintains DSA mini-games and adds new subject-specific games
 * 
 * Usage:
 * - Route: <Route path="/courses/:subject" element={<CourseRoadmap />} />
 * - Component: <CourseRoadmap subject="os" />
 * - Default: Shows DSA if no subject specified
 */

/**
 * Dynamic Roadmap Loader
 * Loads subject-specific roadmap based on URL param (/courses/:subject) or prop (subject="os")
 * Supports: dsa, os, cn, coa, dbms, oops, ai, cyber, cloud
 */
const CourseRoadmap = ({ subject: propSubject }) => {
  const { subject: paramSubject } = useParams();
  const subject = propSubject || paramSubject || "dsa";

  // Render subject-specific roadmap component
  switch (subject.toLowerCase()) {
    case "dsa":
      return <RoadmapDSA />;
    case "os":
      return <RoadmapOS />;
    case "cn":
      return <RoadmapCN />;
    case "coa":
      return <RoadmapCOA />;
    case "dbms":
      return <RoadmapDBMS />;
    case "daa":
      return <RoadmapDAA />;
    case "oops":
      return <RoadmapOOPS />;
    case "web":
    case "webdev":
      return <RoadmapWeb />;
    case "python":
      return <RoadmapPython />;
    case "java":
      return <RoadmapJava />;
    case "cyber":
    case "cybersecurity":
      return <RoadmapCyber />;
    case "cloud":
      return <RoadmapCloud />;
    default:
      // Default to DSA
      return <RoadmapDSA />;
  }
};

export default CourseRoadmap;
