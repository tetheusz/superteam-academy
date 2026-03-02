"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => <div className="flex-1 w-full h-full bg-muted/20 animate-pulse flex items-center justify-center text-xs text-muted-foreground font-mono">Loading Editor...</div>
});
import { rust } from "@codemirror/lang-rust";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { Card } from "@/components/ui/card";

type Language = "rust" | "ts" | "json";

type Props = {
  language: Language;
  value: string;
  onChange: (value: string) => void;
  height?: string;
  header?: ReactNode;
};

const langLabels: Record<Language, string> = {
  rust: "Rust",
  ts: "TypeScript",
  json: "JSON",
};

export function CodeEditor({
  language,
  value,
  onChange,
  height = "400px",
  header,
}: Props) {
  const extensions =
    language === "rust"
      ? [rust()]
      : language === "json"
        ? [json()]
        : [javascript({ jsx: true, typescript: true })];

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {header && (
        <div className="border-b border-border px-3 py-2 text-xs text-muted-foreground">
          {header}
        </div>
      )}
      {/* Language tab indicator */}
      <div className="flex items-center gap-2 border-b border-border/50 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            {langLabels[language]}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={value}
          height={height}
          theme="dark"
          extensions={extensions}
          onChange={onChange}
        />
      </div>
    </Card>
  );
}
