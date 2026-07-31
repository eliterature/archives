import { readFileSync } from "node:fs";

/**
 * Minimal CSV parser (no external deps) that handles double-quoted fields
 * containing commas, since several seed titles/locations contain commas.
 */
export function parseSeedsCsv(csvPath) {
  const text = readFileSync(csvPath, "utf8");
  const lines = text.split(/\r?\n/).filter((line) => line.length > 0);
  const [headerLine, ...rows] = lines;
  const headers = splitCsvLine(headerLine);

  return rows.map((line) => {
    const values = splitCsvLine(line);
    const record = {};
    headers.forEach((header, i) => {
      record[header] = values[i] ?? "";
    });
    return record;
  });
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}
