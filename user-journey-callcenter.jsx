import { useState } from "react";

const stages = [
  {
    id: 1,
    label: "Call Received",
    icon: "📞",
    color: "#4FC3F7",
    actions: ["Incoming call notification appears", "Agent reviews caller ID & history", "Agent accepts the call"],
    thoughts: ["Who is this caller?", "Do I have context about them?", "Let me be ready"],
    emotions: ["Neutral", "Alert", "Focused"],
    emojiEmotion: "😐",
    assistantRole: "Pulls up caller history and account info automatically",
    painPoints: ["No prior context on caller", "Multiple systems to check at once"],
    touchpoints: ["Call platform UI", "CRM panel", "AI assistant panel"],
  },
  {
    id: 2,
    label: "Active Listening",
    icon: "🎧",
    color: "#81C784",
    actions: ["Agent greets and begins conversation", "Agent listens and responds", "Conversation flows naturally"],
    thoughts: ["How do I solve this?", "Am I communicating clearly?", "Is this escalating?"],
    emotions: ["Engaged", "Slightly Pressured", "Attentive"],
    emojiEmotion: "🤔",
    assistantRole: "Listens in real-time, gives subtle tone & pacing feedback (e.g. 'Slow down', 'Too casual')",
    painPoints: ["Hard to self-monitor tone while problem-solving", "Missing key info mid-conversation"],
    touchpoints: ["Live transcript", "Tone indicator", "Real-time suggestion ribbon"],
  },
  {
    id: 3,
    label: "Opening Feedback",
    icon: "📋",
    color: "#F06292",
    actions: ["Assistant reviews how the call opened", "Feedback card appears on screen", "Agent reads and acknowledges tips"],
    thoughts: ["Was my greeting good enough?", "Did I sound confident?", "What should I change?"],
    emotions: ["Curious", "Receptive", "Self-aware"],
    emojiEmotion: "🧐",
    assistantRole: "Scores the call opening on tone, greeting formula, empathy level, and pace. Shows quick tips like 'Use the caller name earlier' or 'Your opening was too rushed'.",
    painPoints: ["Feedback can feel disruptive mid-call", "Hard to absorb tips while still in conversation", "Risk of over-correcting tone abruptly"],
    touchpoints: ["Opening score card", "Inline feedback overlay", "Dismiss / snooze button"],
  },
  {
    id: 4,
    label: "Name Usage Warning",
    icon: "🏷️",
    color: "#FFD54F",
    actions: ["Assistant tracks how often customer name is said", "Warning or nudge appears on screen", "Agent adjusts name usage naturally"],
    thoughts: ["Am I saying their name too much?", "Does it sound natural or robotic?", "I should personalise more"],
    emotions: ["Surprised", "Self-aware", "Adjusting"],
    emojiEmotion: "😲",
    assistantRole: "Counts customer name frequency in real-time. Alerts when overused ('You said the name 6x in 2 mins') or underused ('Use their name to build rapport'). Suggests natural insertion points.",
    painPoints: ["Agent unaware of name repetition in the moment", "Overuse sounds scripted and insincere", "Underuse makes the call feel impersonal"],
    touchpoints: ["Name frequency counter", "Subtle warning badge", "Inline coaching nudge"],
  },
  {
    id: 5,
    label: "Agent Seeks Help",
    icon: "🆘",
    color: "#FFB74D",
    actions: ["Agent hits 'Help' button or types a question", "Agent asks assistant verbally or via chat", "Agent pauses to scan suggestions"],
    thoughts: ["I don't know the answer to this", "I need a policy or procedure fast", "What's the right thing to say here?"],
    emotions: ["Uncertain", "Slightly Anxious", "Hopeful"],
    emojiEmotion: "😟",
    assistantRole: "Detects unanswered customer questions. Surfaces answers, scripts, or policy docs proactively.",
    painPoints: ["Silence on the call feels awkward", "Can't find the right answer quickly", "Fear of giving wrong info"],
    touchpoints: ["Help button", "Assistant chat input", "Knowledge base suggestions"],
  },
  {
    id: 6,
    label: "Assistant Responds",
    icon: "🤖",
    color: "#CE93D8",
    actions: ["Assistant provides answer or suggestion", "Agent reads / applies advice", "Agent continues or redirects call"],
    thoughts: ["OK, I can use this", "Let me reword this naturally", "That was fast"],
    emotions: ["Relieved", "Confident", "Back in flow"],
    emojiEmotion: "😌",
    assistantRole: "Delivers clear, concise answers. Flags when to escalate. Coaches tone (e.g. 'I completely understand your frustration').",
    painPoints: ["Response too verbose to scan fast", "Suggestion does not fit the situation", "Hard to use answer without sounding scripted"],
    touchpoints: ["Assistant response card", "Copy-to-clipboard", "Escalation flag"],
  },
  {
    id: 7,
    label: "Agent Texts Question",
    icon: "✍️",
    color: "#80CBC4",
    actions: ["Agent opens text input panel", "Agent types a question to the assistant", "Agent sends message without interrupting the call"],
    thoughts: ["I need more detail on this", "I can't ask this out loud on the call", "Let me type it quickly"],
    emotions: ["Focused", "Discreet", "Curious"],
    emojiEmotion: "🤫",
    assistantRole: "Provides a silent text channel so agent can ask questions privately while the call continues. Transcribes and understands typed queries in context of the live conversation.",
    painPoints: ["Typing while talking is cognitively demanding", "Risk of losing focus on the customer", "Small input area is hard to use under pressure"],
    touchpoints: ["Text input panel", "Minimised chat drawer", "Keyboard shortcut to open"],
  },
  {
    id: 8,
    label: "Assistant Text Reply",
    icon: "💬",
    color: "#A5D6A7",
    actions: ["Assistant reads the typed question", "Generates a concise text reply", "Agent reads reply and applies to the call"],
    thoughts: ["Perfect, that answers it", "I can work with this", "No need to put the customer on hold"],
    emotions: ["Satisfied", "Confident", "In control"],
    emojiEmotion: "😎",
    assistantRole: "Replies with a short, scannable answer — policy snippet, suggested phrasing, or a direct fact. Formats reply for quick reading: bullet points, bold key info, max 3 lines.",
    painPoints: ["Reply too long to read mid-call", "Answer arrives too slowly", "Agent may miss the notification while talking"],
    touchpoints: ["Text reply bubble", "Bold key info formatting", "Notification badge on chat panel"],
  },
  {
    id: 9,
    label: "Call Resolved",
    icon: "✅",
    color: "#4DB6AC",
    actions: ["Agent wraps up call", "Call ends", "Agent reviews post-call summary"],
    thoughts: ["Did I handle that well?", "What could I improve?", "How long was that?"],
    emotions: ["Accomplished", "Reflective", "Ready for next"],
    emojiEmotion: "😊",
    assistantRole: "Generates call summary, quality score, coaching tips, and auto-fills call notes in CRM.",
    painPoints: ["Manual note-taking is time-consuming", "No feedback loop on performance", "Moving fast to next call without reflection"],
    touchpoints: ["Post-call summary panel", "Quality score card", "CRM auto-fill", "Coaching tips"],
  },
];

const rowLabels = [
  { key: "actions", label: "Actions", icon: "⚡" },
  { key: "thoughts", label: "Thoughts", icon: "💭" },
  { key: "emojiEmotion", label: "Emotion", icon: "❤️" },
  { key: "assistantRole", label: "AI Assistant", icon: "🤖" },
  { key: "painPoints", label: "Pain Points", icon: "⚠️" },
  { key: "touchpoints", label: "Touchpoints", icon: "🖥️" },
];

const stressCurve  = [50, 40, 55, 48, 65, 30, 35, 20, 15];
const qualityCurve = [60, 65, 72, 76, 58, 80, 75, 85, 92];

function CurveChart({ data, color, label, subtitle }) {
  const max = 100;
  const width = 560;
  const height = 80;
  const pad = 20;
  const n = data.length;
  const stepX = (width - pad * 2) / (n - 1);

  const points = data.map((v, i) => ({
    x: pad + i * stepX,
    y: pad + ((max - v) / max) * (height - pad * 2),
    v,
  }));

  const pathD = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + p.x) / 2;
    return `C ${cpX} ${prev.y}, ${cpX} ${p.y}, ${p.x} ${p.y}`;
  }).join(" ");

  const areaD = pathD + ` L ${points[n - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return (
    <div style={{ flex: 1, minWidth: 260 }}>
      <div style={{ fontSize: 12, color: "#8B949E", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 11, color: "#6B7A8D", marginBottom: 10 }}>{subtitle}</div>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: 90, overflow: "visible" }}>
        <defs>
          <linearGradient id={`grad-${label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${label.replace(/\s/g, "")})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill={color} />
            <text x={p.x} y={p.y - 10} textAnchor="middle" fill={color} fontSize="10" fontWeight="700">{p.v}%</text>
          </g>
        ))}
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${n}, 1fr)`, marginTop: 4 }}>
        {stages.map((s) => (
          <div key={s.id} style={{ fontSize: 8, color: "#6B7A8D", textAlign: "center", lineHeight: 1.3 }}>{s.label}</div>
        ))}
      </div>
    </div>
  );
}

export default function UserJourneyMap() {
  const [activeStage, setActiveStage] = useState(null);
  const [activeRow, setActiveRow] = useState(null);

  const isHighlighted = (stageId, rowKey) => {
    if (activeStage && activeRow) return stageId === activeStage && rowKey === activeRow;
    if (activeStage) return stageId === activeStage;
    if (activeRow) return rowKey === activeRow;
    return false;
  };

  const isDimmed = (stageId, rowKey) => {
    if (!activeStage && !activeRow) return false;
    if (activeStage && activeRow) return !(stageId === activeStage && rowKey === activeRow);
    if (activeStage) return stageId !== activeStage;
    if (activeRow) return rowKey !== activeRow;
    return false;
  };

  const cols = `120px repeat(${stages.length}, 1fr)`;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0D1117",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#E8EDF3",
      padding: "32px 24px",
      overflowX: "auto",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ background: "linear-gradient(135deg, #4FC3F7, #CE93D8)", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎯</div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#6B7A8D", textTransform: "uppercase", marginBottom: 2 }}>UX User Journey</div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, background: "linear-gradient(90deg, #4FC3F7, #CE93D8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Call Center AI Assistant
            </h1>
          </div>
        </div>
        <p style={{ margin: 0, color: "#6B7A8D", fontSize: 13 }}>Agent experience · Real-time AI co-pilot · Team alignment map</p>
      </div>

      {/* Persona bar */}
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: "12px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #4FC3F7 0%, #81C784 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Alex, Call Center Agent</div>
            <div style={{ fontSize: 11, color: "#6B7A8D" }}>2 years experience · Handles 40–60 calls/day</div>
          </div>
        </div>
        <div style={{ width: 1, height: 36, background: "#21262D" }} />
        <div style={{ fontSize: 12, color: "#6B7A8D" }}>
          <span style={{ color: "#4FC3F7", fontWeight: 600 }}>Scenario: </span>
          Handling a live customer complaint about billing, with AI assistance
        </div>
        <div style={{ marginLeft: "auto" }}>
          {activeStage || activeRow ? (
            <button onClick={() => { setActiveStage(null); setActiveRow(null); }} style={{ background: "#21262D", border: "1px solid #30363D", color: "#E8EDF3", borderRadius: 6, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>Clear filter</button>
          ) : (
            <div style={{ fontSize: 11, color: "#6B7A8D" }}>Click any stage or row to focus</div>
          )}
        </div>
      </div>

      {/* Stage headers */}
      <div style={{ display: "grid", gridTemplateColumns: cols, gap: 6, marginBottom: 4 }}>
        <div />
        {stages.map((s) => (
          <div key={s.id} onClick={() => setActiveStage(activeStage === s.id ? null : s.id)} style={{
            background: activeStage === s.id ? s.color + "22" : "#161B22",
            border: `2px solid ${activeStage === s.id ? s.color : "#21262D"}`,
            borderRadius: 10, padding: "12px 6px", textAlign: "center",
            cursor: "pointer", transition: "all 0.2s",
            opacity: activeStage && activeStage !== s.id ? 0.4 : 1,
          }}>
            <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 9, letterSpacing: 0.5, color: s.color, textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>Stage {s.id}</div>
            <div style={{ fontSize: 10, fontWeight: 600, lineHeight: 1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Journey rows */}
      {rowLabels.map((row) => (
        <div key={row.key} style={{ display: "grid", gridTemplateColumns: cols, gap: 6, marginBottom: 6 }}>
          <div onClick={() => setActiveRow(activeRow === row.key ? null : row.key)} style={{
            background: activeRow === row.key ? "#21262D" : "transparent",
            border: `1px solid ${activeRow === row.key ? "#30363D" : "transparent"}`,
            borderRadius: 8, padding: "10px 8px",
            display: "flex", alignItems: "center", gap: 6,
            cursor: "pointer", transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 13 }}>{row.icon}</span>
            <span style={{ fontSize: 10, color: "#8B949E", fontWeight: 600 }}>{row.label}</span>
          </div>
          {stages.map((s) => {
            const value = s[row.key];
            const highlight = isHighlighted(s.id, row.key);
            const dimmed = isDimmed(s.id, row.key);
            return (
              <div key={s.id} style={{
                background: highlight ? s.color + "18" : "#161B22",
                border: `1px solid ${highlight ? s.color + "55" : "#21262D"}`,
                borderRadius: 8, padding: 8,
                transition: "all 0.2s",
                opacity: dimmed ? 0.2 : 1,
                minHeight: row.key === "emojiEmotion" ? "auto" : 72,
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                {row.key === "emojiEmotion" ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 20 }}>{value}</div>
                    <div style={{ fontSize: 8, color: "#6B7A8D", marginTop: 3 }}>{s.emotions.join(" · ")}</div>
                  </div>
                ) : Array.isArray(value) ? (
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {value.map((item, i) => (
                      <li key={i} style={{ fontSize: 9, color: row.key === "painPoints" ? "#F97583" : "#C9D1D9", marginBottom: 3, paddingLeft: 9, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 3, borderRadius: "50%", background: row.key === "painPoints" ? "#F97583" : s.color, display: "block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ margin: 0, fontSize: 9, color: row.key === "assistantRole" ? "#CE93D8" : "#C9D1D9", lineHeight: 1.5, fontStyle: row.key === "assistantRole" ? "italic" : "normal" }}>{value}</p>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Dual curves */}
      <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: "20px 24px", marginTop: 14, display: "flex", gap: 40, flexWrap: "wrap" }}>
        <CurveChart data={stressCurve} color="#F97583" label="Agent Stress Curve" subtitle="Higher = more stress / uncertainty" />
        <div style={{ width: 1, background: "#21262D", flexShrink: 0 }} />
        <CurveChart data={qualityCurve} color="#4DB6AC" label="Call Quality Curve" subtitle="Higher = better call quality score" />
      </div>

      {/* Opportunities */}
      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[
          { icon: "🚀", title: "Opportunity 1", desc: "Auto-surface caller context before call connects to reduce agent ramp-up stress." },
          { icon: "🏷️", title: "Opportunity 2", desc: "Real-time name usage coaching builds rapport without the agent needing to self-monitor." },
          { icon: "✍️", title: "Opportunity 3", desc: "Silent text channel lets agents get answers discreetly without putting customers on hold." },
        ].map((o, i) => (
          <div key={i} style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{o.icon}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#4FC3F7", marginBottom: 6 }}>{o.title}</div>
            <div style={{ fontSize: 12, color: "#8B949E", lineHeight: 1.5 }}>{o.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
