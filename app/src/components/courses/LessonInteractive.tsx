"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Play, CheckCircle2, Loader2, Terminal, BookOpen } from "lucide-react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Lesson } from "../../types";

interface LessonInteractiveProps {
    lesson: Lesson;
    xpReward: number;
}

export function LessonInteractive({ lesson, xpReward }: LessonInteractiveProps) {
    const [code, setCode] = useState(
        lesson.starterCode ||
        (lesson.isChallenge
            ? "// TODO: starter code for challenge\n"
            : "// Code examples will appear here\n")
    );
    const [output, setOutput] = useState<string>("");
    const [isRunning, setIsRunning] = useState(false);
    const [passed, setPassed] = useState(false);

    const content = lesson.content || `# ${lesson.title}\n\nMagnetic content goes here.`;

    const runTests = async () => {
        setIsRunning(true);
        setPassed(false);
        // Simulate test execution delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simplistic check for demo purposes
        if (lesson.isChallenge && lesson.solution) {
            if (code.includes(lesson.solution.trim()) || code.includes("success")) {
                setOutput("✓ All tests passed!\nGreat job completing the challenge.");
                setPassed(true);
            } else {
                setOutput("✗ Tests failed. Please check your logic and try again.\n(Hint: check the solution or starter code logic)");
                setPassed(false);
            }
        } else {
            setOutput("✓ Code executed successfully.");
            setPassed(true);
        }

        setIsRunning(false);
    };

    return (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)]">
            {/* Content */}
            <section className="prose prose-invert max-w-none text-sm">
                <ReactMarkdown>{content}</ReactMarkdown>
            </section>

            {/* Editor + Output */}
            <section className="flex flex-col gap-3">
                <CodeEditor
                    language={lesson.isChallenge ? "rust" : "ts"}
                    value={code}
                    onChange={setCode}
                    header={
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-medium text-foreground">
                                <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                                {lesson.isChallenge ? "Challenge" : "Playground"}
                            </span>
                            <Button
                                size="sm"
                                onClick={runTests}
                                disabled={isRunning}
                                className="h-7 gap-1.5 text-[11px]"
                            >
                                {isRunning ? (
                                    <>
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <Play className="h-3 w-3" />
                                        Run tests
                                    </>
                                )}
                            </Button>
                        </div>
                    }
                />

                {/* Output */}
                <Card>
                    <CardHeader className="py-2 px-3">
                        <CardTitle className="flex items-center gap-1.5 text-xs">
                            <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                            Output
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-3 pb-3">
                        <pre
                            className={`whitespace-pre-wrap text-[11px] font-mono ${passed
                                ? "text-primary"
                                : output && !passed && output.includes("✗")
                                    ? "text-destructive"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {output || "Run the tests to see results here."}
                        </pre>
                        {passed && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span className="font-medium">+{xpReward} XP</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
