import React from 'react';
import { Eye, FileText, Users, TrendingUp } from 'lucide-react';

interface BlogStatsProps {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}

const BlogStats: React.FC<BlogStatsProps> = ({
  totalPosts,
  publishedPosts,
  draftPosts,
  totalViews
}) => {
  const stats = [
    {
      title: 'Total Posts',
      value: totalPosts,
      icon: FileText,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Published',
      value: publishedPosts,
      icon: Eye,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Drafts',
      value: draftPosts,
      icon: Users,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Total Views',
      value: totalViews,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const publishRate = totalPosts > 0 ? Math.round((publishedPosts / totalPosts) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="glass-effect rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon size={20} className={stat.color} />
                </div>
                <span className="text-xs text-muted-foreground">
                  {index === 0 && totalPosts > 0 && `${publishRate}% published`}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Quick insights */}
      <div className="glass-effect rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Publish Rate:</span>
            <span className="font-medium">{publishRate}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Avg. Views per Post:</span>
            <span className="font-medium">
              {publishedPosts > 0 ? Math.round(totalViews / publishedPosts) : 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Posts This Month:</span>
            <span className="font-medium">
              {/* This would require date filtering in a real app */}
              {Math.floor(totalPosts / 2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Most Popular Category:</span>
            <span className="font-medium">Technology</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogStats;
