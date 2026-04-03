import { parse } from 'csv-parse/sync';

export const readCsvText = (contents: string) =>
  parse(contents, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Array<Record<string, string>>;
