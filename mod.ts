import type {
  NewNotebook,
  TextCell,
  Formatting,
  CodeCell,
  ProviderCell,
} from "./types.ts";

function generateCellId() {
  return Math.random().toString(36).substring(7);
}

export function Notebook({
  title,
  frontMatter = {},
  frontMatterSchema = [],
  frontMatterCollections = [],
  labels = [],
  timeRange = {
    minutes: 60,
  },
  selectedDataSources = {},
  cells = [],
}: Partial<NewNotebook> & { title: string }): NewNotebook {
  return {
    title,
    frontMatterSchema,
    frontMatter,
    frontMatterCollections,
    labels,
    selectedDataSources,
    timeRange,
    cells,
  };
}

export function TextCell(
  content?: string,
  formatting?: Formatting,
  locked?: boolean,
): { type: "text" } & TextCell {
  return {
    id: generateCellId(),
		type: "text",
    content: content || "",
    formatting,
    readOnly: locked || false,
  };
}

export function CodeCell(
  syntax?: string,
  content?: string,
  locked?: boolean,
): { type: "code" } & CodeCell {
  return {
    id: generateCellId(),
    type: "code",
    content: content || "",
    syntax: syntax || "text",
    readOnly: locked || false,
  };
}

export function PrometheusCell(
  query: string,
): { type: "provider" } & ProviderCell {
  return {
    id: generateCellId(),
    type: "provider",
    intent: "prometheus,timeseries",
    queryData:
      "application/x-www-form-urlencoded,query=" + encodeURIComponent(query),
  };
}

