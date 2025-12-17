import dotenv from "dotenv";
dotenv.config();
import Agenda from "agenda";

export const agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI!,
    collection: "agendaJobs",
  },
  processEvery: "1 minute",
});