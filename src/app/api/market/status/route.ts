import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8);
  const dayOfWeek = now.getDay();

  // 周末休市
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return NextResponse.json({
      isTrading: false,
      session: "CLOSED",
      reason: "周末休市",
      nextSession: "周一 09:30",
    });
  }

  const MORNING_START = "09:30:00";
  const MORNING_END  = "11:30:00";
  const AFTERNOON_START = "13:00:00";
  const AFTERNOON_END  = "15:00:00";

  let session: string;
  let isTrading: boolean;

  if (timeStr >= MORNING_START && timeStr <= MORNING_END) {
    isTrading = true;
    session = "MORNING";
  } else if (timeStr >= AFTERNOON_START && timeStr <= AFTERNOON_END) {
    isTrading = true;
    session = "AFTERNOON";
  } else if (timeStr > AFTERNOON_END) {
    isTrading = false;
    session = "CLOSED";
  } else if (timeStr < MORNING_START) {
    isTrading = false;
    session = "PRE_OPEN";
  } else {
    // 11:30 - 13:00 午间休市
    isTrading = false;
    session = "LUNCH_BREAK";
  }

  return NextResponse.json({
    isTrading,
    session,
    tradingHours: {
      morning:  { start: MORNING_START, end: MORNING_END },
      afternoon: { start: AFTERNOON_START, end: AFTERNOON_END },
    },
    nextSession: isTrading ? null : session === "CLOSED"
      ? "明日 09:30"
      : session === "LUNCH_BREAK" ? "13:00"
      : "09:30",
  });
}
