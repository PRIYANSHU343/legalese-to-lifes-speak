import { useState } from 'react';
import { Scale, FileText, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DocumentUpload } from '@/components/DocumentUpload';
import { PlainLanguageExplanation } from '@/components/PlainLanguageExplanation';
import { RiskAssessment } from '@/components/RiskAssessment';
import { ActionableRecommendations } from '@/components/ActionableRecommendations';

// Mock data for demonstration
const mockExplanations = [
  {
    id: '1',
    title: 'Payment Terms',
    originalText: 'The Lessee shall remit payment in the amount of $1,200.00 monthly, due on the first (1st) day of each calendar month, with a grace period of five (5) days thereafter, subject to a late fee of $50.00 for each day payment is delinquent beyond said grace period.',
    simplifiedText: 'You need to pay $1,200 rent by the 1st of each month. You have until the 5th to pay without penalty. After that, you\'ll be charged $50 for each day you\'re late.',
    keyPoints: [
      'Monthly rent: $1,200',
      'Due date: 1st of each month',
      'Grace period: 5 days',
      'Late fee: $50 per day after grace period'
    ],
    complexity: 'simple' as const
  },
  {
    id: '2',
    title: 'Termination Clause',
    originalText: 'Either party may terminate this agreement with thirty (30) days written notice, provided that Lessee shall forfeit security deposit in the event of early termination without cause prior to completion of the initial term.',
    simplifiedText: 'You or your landlord can end this lease with 30 days written notice. However, if you move out early without a good reason before your lease term ends, you\'ll lose your security deposit.',
    keyPoints: [
      '30 days written notice required',
      'Early termination = losing security deposit',
      'Applies to both tenant and landlord'
    ],
    complexity: 'moderate' as const
  }
];

const mockRisks = [
  {
    id: '1',
    type: 'high' as const,
    title: 'Unlimited Liability for Damages',
    description: 'The contract holds you responsible for all damages with no cap or limit specified.',
    location: 'Section 4.2 - Tenant Responsibilities',
    recommendation: 'Negotiate a reasonable damage cap (e.g., equivalent to 2 months rent) to limit your financial exposure.'
  },
  {
    id: '2',
    type: 'medium' as const,
    title: 'Automatic Renewal Clause',
    description: 'The lease automatically renews for another full term unless you give notice 60 days in advance.',
    location: 'Section 8.1 - Lease Renewal',
    recommendation: 'Set a calendar reminder 70 days before lease expiration to decide if you want to renew or move.'
  }
];

const mockRecommendations = [
  {
    id: '1',
    priority: 'urgent' as const,
    action: 'Review Damage Liability Cap',
    description: 'The contract currently has unlimited damage liability. This could expose you to significant financial risk if major repairs are needed.',
    timeframe: 'Before signing',
    difficulty: 'moderate' as const,
    resources: [
      { title: 'Tenant Rights Guide', url: 'https://example.com/tenant-rights' },
      { title: 'Legal Aid Directory', url: 'https://example.com/legal-aid' }
    ]
  },
  {
    id: '2',
    priority: 'important' as const,
    action: 'Set Renewal Reminder',
    description: 'Create a calendar reminder 70 days before lease expiration to avoid automatic renewal if you plan to move.',
    timeframe: 'Within 1 week',
    difficulty: 'easy' as const
  }
];

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setShowResults(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Scale className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">Legal Plain Talk</h1>
              <p className="text-muted-foreground">Transform complex legal documents into clear, actionable insights</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!showResults ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-card-foreground mb-4">
                Stop Guessing What Your Legal Documents Really Mean
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Upload contracts, insurance policies, or rental agreements and get instant plain-English explanations 
                with highlighted risks and actionable recommendations.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <Card className="p-6 text-center">
                  <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Plain English</h3>
                  <p className="text-sm text-muted-foreground">Complex legalese translated into language you actually understand</p>
                </Card>
                <Card className="p-6 text-center">
                  <Shield className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Risk Analysis</h3>
                  <p className="text-sm text-muted-foreground">Identify potential risks and problematic clauses before you sign</p>
                </Card>
                <Card className="p-6 text-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Action Items</h3>
                  <p className="text-sm text-muted-foreground">Get specific steps to protect yourself and make informed decisions</p>
                </Card>
              </div>
            </div>

            {/* Upload Section */}
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-3">
                  Don't have a legal document handy? Try our demo:
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('/demo-rental-agreement.txt', '_blank')}
                  className="mb-4"
                >
                  Download Demo Rental Agreement
                </Button>
              </div>
              
              <DocumentUpload 
                onFileSelect={handleFileSelect}
                isProcessing={isProcessing}
              />
              
              {isProcessing && (
                <Card className="mt-6 p-6 text-center animate-fade-in">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <h3 className="font-semibold mb-2">Analyzing Your Document</h3>
                  <p className="text-muted-foreground">
                    Reading through the legal language and identifying key terms, risks, and recommendations...
                  </p>
                </Card>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">Document Analysis</h2>
                  <p className="text-muted-foreground">{selectedFile?.name}</p>
                </div>
              </div>
              <Button variant="outline" onClick={resetAnalysis}>
                Analyze New Document
              </Button>
            </div>

            {/* Results Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <PlainLanguageExplanation sections={mockExplanations} />
              </div>
              
              <div className="space-y-8">
                <RiskAssessment risks={mockRisks} />
                <ActionableRecommendations recommendations={mockRecommendations} />
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            <strong>Disclaimer:</strong> This tool provides general information and should not replace professional legal advice. 
            Always consult with a qualified attorney for specific legal matters.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;