const Database = require("better-sqlite3");
const db = new Database("prisma/prod.db", { readonly: true });
for (const t of ["Competition", "Agent", "Portfolio", "Position", "Delivery", "DailySettlement", "Price"]) {
  console.log(t, db.prepare(`select count(*) c from ${t}`).get().c);
}
