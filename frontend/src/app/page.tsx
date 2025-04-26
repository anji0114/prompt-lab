"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Input } from "@/components/ui/Input";

// Mock data for templates
const mockTemplates = [
  {
    id: "1",
    title: "Basic Analysis",
    content:
      "Analyze the following text from the perspective of {{perspective}}:\n\n{{text}}",
  },
  {
    id: "2",
    title: "Email Writer",
    content: "Write a professional email to {{recipient}} about {{subject}}.",
  },
  {
    id: "3",
    title: "Code Explanation",
    content: "Explain the following {{language}} code:\n\n{{code}}",
  },
];

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateVariables, setTemplateVariables] = useState<
    Record<string, string>
  >({});
  const [generatedOutput, setGeneratedOutput] = useState("");

  // Find the selected template
  const template = mockTemplates.find((t) => t.id === selectedTemplate);

  // Extract variable placeholders from template content
  const variables =
    template?.content.match(/{{([^}]+)}}/g)?.map((v) => v.slice(2, -2)) || [];

  // Handle template selection
  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    setTemplateVariables({});
    setGeneratedOutput("");
  };

  // Handle variable input changes
  const handleVariableChange = (variable: string, value: string) => {
    setTemplateVariables((prev) => ({ ...prev, [variable]: value }));
  };

  // Generate prompt with variables filled in
  const handleGenerate = () => {
    if (!template) return;

    let result = template.content;
    Object.entries(templateVariables).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, "g"), value);
    });

    // Simulate LLM response
    setGeneratedOutput(
      `This is a simulated response to your prompt:\n\n${result}\n\nHere would be the actual LLM response based on that prompt.`
    );
  };

  // Save to history
  const handleSave = () => {
    // This would save to history in a real implementation
    alert("Saved to history!");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-medium text-gray-800 mb-6">
            Generate Prompt
          </h1>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Template
            </label>
            <Select
              value={selectedTemplate}
              onValueChange={handleTemplateChange}
            ></Select>
          </div>

          {template && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700 mb-2">
                  Template Variables
                </h2>
                <div className="space-y-4">
                  {variables.map((variable) => (
                    <div key={variable}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {variable}
                      </label>
                      <Input
                        value={templateVariables[variable] || ""}
                        onChange={(e) =>
                          handleVariableChange(variable, e.target.value)
                        }
                        placeholder={`Enter ${variable}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Button onClick={handleGenerate} className="w-full">
                  Generate
                </Button>
              </div>
            </>
          )}

          {generatedOutput && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Output</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <Textarea
                  value={generatedOutput}
                  readOnly
                  rows={8}
                  className="bg-transparent"
                />
              </div>
              <div className="mt-4">
                <Button
                  onClick={handleSave}
                  variant="outline"
                  className="w-full"
                >
                  Save Result
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
