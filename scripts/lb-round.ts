// Runs one leaderboard round now (build inputs → compute → publish if changed). --fetch first fetches
// every upstream source and the USD/CNY rate, as the scheduled refresh does; --force publishes even
// when the evidence fingerprint matches the latest run.
import { closeDb } from "@rfidhot/backend/db";
import { refreshLeaderboard } from "@rfidhot/backend/leaderboard/fetch/refresh";
import { runLeaderboardRound } from "@rfidhot/backend/leaderboard/method/run";

const result = process.argv.includes("--fetch") ? await refreshLeaderboard() : await runLeaderboardRound({ force: process.argv.includes("--force") });
console.log(JSON.stringify(result, null, 2));
await closeDb();
