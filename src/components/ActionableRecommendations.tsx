import { CheckSquare, Clock, AlertCircle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Recommendation {
  id: string;
  priority: 'urgent' | 'important' | 'suggested';
  action: string;
  description: string;
  timeframe: string;
  difficulty: 'easy' | 'moderate' | 'complex';
  resources?: {
    title: string;
    url: string;
  }[];
}

interface ActionableRecommendationsProps {
  recommendations: Recommendation[];
}

export const ActionableRecommendations = ({ recommendations }: ActionableRecommendationsProps) => {
  const getPriorityIcon = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'important':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'suggested':
        return <CheckSquare className="h-5 w-5 text-blue-600" />;
    }
  };

  const getPriorityCardClass = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'border-red-200 bg-gradient-to-r from-red-50 to-red-50/30';
      case 'important':
        return 'border-amber-200 bg-gradient-to-r from-amber-50 to-amber-50/30';
      case 'suggested':
        return 'border-blue-200 bg-gradient-to-r from-blue-50 to-blue-50/30';
    }
  };

  const getDifficultyBadge = (difficulty: Recommendation['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return <Badge className="bg-green-100 text-green-800 text-xs">Easy</Badge>;
      case 'moderate':
        return <Badge className="bg-amber-100 text-amber-800 text-xs">Moderate</Badge>;
      case 'complex':
        return <Badge className="bg-red-100 text-red-800 text-xs">Complex</Badge>;
    }
  };

  if (recommendations.length === 0) {
    return (
      <Card className="p-6 text-center">
        <CheckSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">No specific recommendations available yet.</p>
      </Card>
    );
  }

  // Sort recommendations by priority
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { urgent: 0, important: 1, suggested: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-card-foreground">Action Items</h2>
        <div className="flex space-x-2">
          <Badge variant="destructive" className="text-xs">
            {recommendations.filter(r => r.priority === 'urgent').length} Urgent
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {recommendations.filter(r => r.priority === 'important').length} Important
          </Badge>
          <Badge variant="outline" className="text-xs">
            {recommendations.filter(r => r.priority === 'suggested').length} Suggested
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {sortedRecommendations.map((rec) => (
          <Card 
            key={rec.id} 
            className={`p-5 transition-all duration-200 hover:shadow-md ${getPriorityCardClass(rec.priority)}`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-0.5">
                {getPriorityIcon(rec.priority)}
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground">{rec.action}</h3>
                  <div className="flex items-center space-x-2">
                    {getDifficultyBadge(rec.difficulty)}
                    <Badge 
                      variant={rec.priority === 'urgent' ? 'destructive' : 'secondary'} 
                      className="text-xs"
                    >
                      {rec.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {rec.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground bg-background/50 rounded px-2 py-1">
                    ⏱️ Timeframe: {rec.timeframe}
                  </div>
                </div>

                {rec.resources && rec.resources.length > 0 && (
                  <div className="border-t border-slate-200 pt-3 mt-3">
                    <h4 className="text-sm font-medium text-card-foreground mb-2">Helpful Resources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {rec.resources.map((resource, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {resource.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};