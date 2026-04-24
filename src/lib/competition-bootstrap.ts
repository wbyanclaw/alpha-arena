import { prisma } from "@/lib/prisma";

function buildDefaultSessions(date = new Date()) {
  const day = new Date(date);
  const yyyy = day.getFullYear();
  const mm = String(day.getMonth() + 1).padStart(2, "0");
  const dd = String(day.getDate()).padStart(2, "0");
  const tradingDate = `${yyyy}-${mm}-${dd}`;

  const at = (hour: number, minute: number) => new Date(`${tradingDate}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+08:00`);

  return [
    { tradingDate, sessionType: "CALL_AUCTION_OPEN" as const, status: "OPEN" as const, openAt: at(9, 15), closeAt: at(9, 25) },
    { tradingDate, sessionType: "MORNING" as const, status: "OPEN" as const, openAt: at(9, 30), closeAt: at(11, 30) },
    { tradingDate, sessionType: "AFTERNOON" as const, status: "OPEN" as const, openAt: at(13, 0), closeAt: at(14, 57) },
    { tradingDate, sessionType: "CALL_AUCTION_CLOSE" as const, status: "OPEN" as const, openAt: at(14, 57), closeAt: at(15, 0) },
  ];
}

export async function ensureCompetitionParticipant(args: {
  competitionId: string;
  agentId: string;
  displayName?: string;
  tagline?: string;
  strategyTagsJson?: string;
}) {
  const competition = await prisma.competition.findUnique({ where: { id: args.competitionId } });
  if (!competition) throw new Error("competition not found");

  const portfolio = await prisma.portfolio.upsert({
    where: { agentId_competitionId: { agentId: args.agentId, competitionId: args.competitionId } },
    update: {},
    create: {
      agentId: args.agentId,
      competitionId: args.competitionId,
      cash: competition.initialCash,
      totalValue: competition.initialCash,
      holdingCount: 0,
      switchRequiresFlat: competition.switchRequiresFlat,
    },
  });

  const participant = await prisma.competitionParticipant.upsert({
    where: { competitionId_agentId: { competitionId: args.competitionId, agentId: args.agentId } },
    update: {
      status: "ACTIVE",
      displayName: args.displayName,
      tagline: args.tagline,
      strategyTagsJson: args.strategyTagsJson,
      portfolioId: portfolio.id,
      approvedAt: new Date(),
    },
    create: {
      competitionId: args.competitionId,
      agentId: args.agentId,
      portfolioId: portfolio.id,
      status: "ACTIVE",
      displayName: args.displayName,
      tagline: args.tagline,
      strategyTagsJson: args.strategyTagsJson,
      approvedAt: new Date(),
    },
  });

  const sessions = buildDefaultSessions();
  for (const session of sessions) {
    await prisma.tradingSession.upsert({
      where: { competitionId_tradingDate_sessionType: { competitionId: args.competitionId, tradingDate: session.tradingDate, sessionType: session.sessionType } },
      update: { openAt: session.openAt, closeAt: session.closeAt },
      create: { competitionId: args.competitionId, ...session },
    });
  }

  return { competition, portfolio, participant };
}
