import { NextResponse } from "next/server";
import { MORNING_SESSION, AFTERNOON_SESSION } from "@/lib/trading-rules";

// GET /api/market/status — 当前市场状态
export async function GET() {
  const now = new Date();
  const timeStr = now.toTimeString().slice(0, 8);
  const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD

  // 判断是否周末
  const dayOfWeek = now.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // 判断是否在交易时段
  const inMorning = timeStr >= MORNING_SESSION.start && timeStr <= MORNING_SESSION.end;
  const inAfternoon = timeStr >= AFTERNOON_SESSION.start && timeStr <= AFTERNOON_SESSION.end;
  const isOpen = !isWeekend && (inMorning || inAfternoon);

  // 下一个关键时间点
  let nextEvent = "";
  let nextEventTime = "";
  if (isWeekend) {
    nextEvent = "周一开盘";
    nextEventTime = getNextWeekday(now, 1).toISOString();
  } else if (timeStr < MORNING_SESSION.start) {
    nextEvent = "上午开盘 09:30";
    const [y, m, d] = dateStr.split("-").map(Number);
    nextEventTime = new Date(y, m - 1, d, 9, 30, 0).toISOString();
  } else if (timeStr > MORNING_SESSION.end && timeStr < AFTERNOON_SESSION.start) {
    nextEvent = "下午开盘 13:00";
    const [y, m, d] = dateStr.split("-").map(Number);
    nextEventTime = new Date(y, m - 1, d, 13, 0, 0).toISOString();
  } else if (timeStr > AFTERNOON_SESSION.end) {
    nextEvent = "明日开盘";
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    nextEventTime = getNextWeekday(tomorrow, 1).toISOString();
  }

  return NextResponse.json({
    date: dateStr,
    time: now.toISOString(),
    isWeekend,
    isOpen,
    isTrading: isOpen,
    session: isOpen ? (inMorning ? "MORNING" : inAfternoon ? "AFTERNOON" : "CLOSED") : "CLOSED",
    tradingHours: {
      morning: MORNING_SESSION,
      afternoon: AFTERNOON_SESSION,
    },
    nextEvent,
    nextEventTime,
    timestamp: now.getTime(),
  });
}

function getNextWeekday(from: Date, dayOfWeek: number): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + 1);
  while (d.getDay() !== dayOfWeek) d.setDate(d.getDate() + 1);
  return d;
}
