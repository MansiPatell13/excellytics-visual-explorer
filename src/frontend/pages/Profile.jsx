import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('githubUser'));
  const navigate = useNavigate();
  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Not logged in.</div>;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-white px-4">
      <Button
        variant="default"
        size="lg"
        className="mb-8 w-full max-w-md flex items-center justify-center gap-2 shadow-lg bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 transition-all duration-200"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Dashboard
      </Button>
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="flex flex-col items-center pb-0">
          <Avatar className="w-28 h-28 mb-4 shadow-lg">
            <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
            <AvatarFallback className="text-4xl bg-gray-200">{(user.name || user.login || 'U')[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold text-center mb-1">{user.name || user.login}</CardTitle>
          <div className="text-gray-500 text-center text-base">@{user.login}</div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 mt-4">
          {user.html_url !== '#' && (
            <div className="text-gray-700 text-sm">GitHub ID: <span className="font-mono">{user.id}</span></div>
          )}
          {user.email && <div className="text-gray-700 text-sm">Email: <span className="font-mono">{user.email}</span></div>}
          {user.bio && <div className="text-gray-700 text-sm text-center">{user.bio}</div>}
          <Button
            asChild
            className="mt-4 w-full bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow"
          >
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile; 