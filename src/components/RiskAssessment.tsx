import { AlertTriangle, Shield, CheckCircle, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RiskItem {
  id: string;
  type: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location: string;
  recommendation: string;
}

interface RiskAssessmentProps {
  risks: RiskItem[];
}

export const RiskAssessment = ({ risks }: RiskAssessmentProps) => {
  const getRiskIcon = (type: RiskItem['type']) => {
    switch (type) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'medium':
        return <Shield className="h-5 w-5 text-amber-600" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getRiskBadgeVariant = (type: RiskItem['type']) => {
    switch (type) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
    }
  };

  const getRiskCardClass = (type: RiskItem['type']) => {
    switch (type) {
      case 'high':
        return 'border-red-200 bg-gradient-to-r from-red-50 to-red-50/50';
      case 'medium':
        return 'border-amber-200 bg-gradient-to-r from-amber-50 to-amber-50/50';
      case 'low':
        return 'border-green-200 bg-gradient-to-r from-green-50 to-green-50/50';
    }
  };

  if (risks.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No risks identified in this document.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-card-foreground">Risk Assessment</h2>
        <div className="flex space-x-2">
          <Badge variant="destructive" className="text-xs">
            {risks.filter(r => r.type === 'high').length} High
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {risks.filter(r => r.type === 'medium').length} Medium
          </Badge>
          <Badge variant="outline" className="text-xs">
            {risks.filter(r => r.type === 'low').length} Low
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {risks.map((risk) => (
          <Card 
            key={risk.id} 
            className={`p-4 transition-all duration-200 hover:shadow-md ${getRiskCardClass(risk.type)}`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getRiskIcon(risk.type)}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground">{risk.title}</h3>
                  <Badge variant={getRiskBadgeVariant(risk.type)} className="text-xs">
                    {risk.type.toUpperCase()}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">{risk.description}</p>
                
                <div className="text-xs text-muted-foreground bg-background/50 rounded px-2 py-1 inline-block">
                  Found in: {risk.location}
                </div>
                
                <div className="bg-background/70 rounded-md p-3 border-l-2 border-primary">
                  <p className="text-sm font-medium text-card-foreground mb-1">Recommendation:</p>
                  <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};