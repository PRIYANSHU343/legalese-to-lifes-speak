import { useState } from 'react';
import { BookOpen, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExplanationSection {
  id: string;
  title: string;
  originalText: string;
  simplifiedText: string;
  keyPoints: string[];
  complexity: 'simple' | 'moderate' | 'complex';
}

interface PlainLanguageExplanationProps {
  sections: ExplanationSection[];
}

export const PlainLanguageExplanation = ({ sections }: PlainLanguageExplanationProps) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (text: string, sectionId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getComplexityColor = (complexity: ExplanationSection['complexity']) => {
    switch (complexity) {
      case 'simple':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-amber-100 text-amber-800';
      case 'complex':
        return 'bg-red-100 text-red-800';
    }
  };

  if (sections.length === 0) {
    return (
      <Card className="p-6 text-center">
        <BookOpen className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">Upload a document to see the plain language explanation.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-card-foreground">Plain Language Breakdown</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowOriginal(!showOriginal)}
          className="flex items-center space-x-2"
        >
          {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span>{showOriginal ? 'Hide' : 'Show'} Original</span>
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id} className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">{section.title}</h3>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs ${getComplexityColor(section.complexity)}`}>
                  {section.complexity}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(section.simplifiedText, section.id)}
                  className="h-8 w-8 p-0"
                >
                  {copiedSection === section.id ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Tabs defaultValue="simplified" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="simplified">Plain English</TabsTrigger>
                <TabsTrigger value="original" disabled={!showOriginal}>
                  Original Text
                </TabsTrigger>
              </TabsList>

              <TabsContent value="simplified" className="mt-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-card-foreground leading-relaxed document-text">
                    {section.simplifiedText}
                  </p>
                </div>

                {section.keyPoints.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-card-foreground mb-2">Key Points:</h4>
                    <ul className="space-y-1">
                      {section.keyPoints.map((point, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </TabsContent>

              {showOriginal && (
                <TabsContent value="original" className="mt-4">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                    <p className="text-muted-foreground text-sm leading-relaxed document-text font-mono">
                      {section.originalText}
                    </p>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </Card>
        ))}
      </div>
    </div>
  );
};