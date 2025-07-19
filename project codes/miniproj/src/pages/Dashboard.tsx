import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calculator, ClipboardCheck, Bell } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardCard from '../components/DashboardCard';
import ThemeToggle from '../components/ThemeToggle';
import UserProfileModal from '../components/UserProfileModal';

interface UserInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  institution: string;
  accountType: string;
  photoUrl?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  
  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem('eduSyncUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // In a real app, you would fetch complete user details from an API
      // For this demo, we'll extend the stored user with mock data
      setUserInfo({
        ...parsedUser,
        email: 'jane.smith@university.edu',
        phone: '+1 (555) 123-4567',
        institution: 'University of Technology',
        accountType: 'Faculty',
        photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      });
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('eduSyncUser');
    navigate('/');
  };

  const recentSubmissions = [
    { id: 1, classroom: 'CS-101', date: '2025-04-15', students: 42 },
    { id: 2, classroom: 'MATH-202', date: '2025-04-14', students: 38 },
    { id: 3, classroom: 'PHY-301', date: '2025-04-12', students: 25 },
  ];

  const handleViewSubmission = (id: number) => {
    navigate(`/marks-submission/${id}`);
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {userInfo && (
              <button 
                onClick={handleOpenProfile}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-1 transition-colors"
              >
                {userInfo.photoUrl ? (
                  <img 
                    src={userInfo.photoUrl} 
                    alt={userInfo.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    {userInfo.name.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {userInfo.name}
                </span>
              </button>
            )}
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome back, {userInfo?.name.split(' ')[0]}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Here's what's happening with your classes today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard 
              title="Total Students" 
              value="248" 
              icon={<Users className="h-5 w-5" />}
              trend={{ value: 12, isPositive: true }}
            />
            <DashboardCard 
              title="Pending Marks Entries" 
              value="3" 
              icon={<Calculator className="h-5 w-5" />}
              trend={{ value: 5, isPositive: false }}
            />
            <DashboardCard 
              title="Recent Submissions" 
              value="8" 
              icon={<ClipboardCheck className="h-5 w-5" />}
              trend={{ value: 20, isPositive: true }}
            />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Recent Marks Submissions
              </h3>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Classroom {submission.classroom}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {submission.students} students • {submission.date}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleViewSubmission(submission.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      {userInfo && (
        <UserProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userInfo={userInfo}
        />
      )}
    </div>
  );
};

export default Dashboard;