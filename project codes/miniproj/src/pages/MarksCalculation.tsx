import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Upload, Plus, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import ThemeToggle from '../components/ThemeToggle';
import MarksBreakdownModal from '../components/MarksBreakdownModal';
import UserProfileModal from '../components/UserProfileModal';

interface Student {
  id: string;
  name: string;
  marks: number;
  grade: string;
  cgpa: number;
  sgpa: number;
}

interface UserInfo {
  name: string;
  role: string;
  email: string;
  phone: string;
  institution: string;
  accountType: string;
  photoUrl?: string;
}

const MarksCalculation: React.FC = () => {
  const navigate = useNavigate();
  const [classroomNumber, setClassroomNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [students, setStudents] = useState<Student[]>([
    { id: 'S001', name: 'John Doe', marks: 0, grade: '', cgpa: 0, sgpa: 0 },
    { id: 'S002', name: 'Jane Smith', marks: 0, grade: '', cgpa: 0, sgpa: 0 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processedStudents, setProcessedStudents] = useState<Student[]>([]);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success('File uploaded successfully');
    }
  };

  const handleAddStudent = () => {
    const newId = `S${String(students.length + 1).padStart(3, '0')}`;
    setStudents([...students, { id: newId, name: '', marks: 0, grade: '', cgpa: 0, sgpa: 0 }]);
  };

  const handleRemoveStudent = (index: number) => {
    if (students.length > 1) {
      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
    } else {
      toast.error('At least one student is required');
    }
  };

  const handleStudentChange = (index: number, field: keyof Student, value: string | number) => {
    const newStudents = [...students];
    newStudents[index] = { ...newStudents[index], [field]: value };
    setStudents(newStudents);
  };

  const calculateGrade = (marks: number): string => {
    if (marks >= 90) return 'A';
    if (marks >= 80) return 'B';
    if (marks >= 70) return 'C';
    if (marks >= 60) return 'D';
    return 'F';
  };

  const calculateCGPA = (marks: number): number => {
    return marks / 10;
  };

  const calculateSGPA = (marks: number): number => {
    return (marks / 100) * 10;
  };

  const handleCalculate = () => {
    if (!classroomNumber) {
      toast.error('Please enter a classroom number');
      return;
    }

    const hasEmptyFields = students.some(student => !student.name || student.marks === 0);
    if (hasEmptyFields) {
      toast.error('Please fill in all student details');
      return;
    }

    const processed = students.map(student => {
      const grade = calculateGrade(student.marks);
      const cgpa = calculateCGPA(student.marks);
      const sgpa = calculateSGPA(student.marks);
      return { ...student, grade, cgpa, sgpa };
    });

    setProcessedStudents(processed);
    setIsModalOpen(true);
    toast.success('Marks calculated successfully');
  };

  const handleOpenProfile = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Marks Calculation</h1>
          
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">Marks Calculation</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter student details and calculate grades, CGPA, and SGPA
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="classroom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Classroom Number
                  </label>
                  <input
                    type="text"
                    id="classroom"
                    value={classroomNumber}
                    onChange={(e) => setClassroomNumber(e.target.value)}
                    placeholder="e.g., CS-101"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Upload Scanned Answer Book (PDF)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <Upload className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        PDF (MAX. 10MB)
                      </p>
                    </label>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Student Marks
                    </label>
                    <button
                      type="button"
                      onClick={handleAddStudent}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <Plus className="h-4 w-4" />
                      Add Student
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {students.map((student, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={student.id}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                          />
                        </div>
                        <div className="flex-[2]">
                          <input
                            type="text"
                            value={student.name}
                            onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                            placeholder="Student Name"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={student.marks}
                            onChange={(e) => handleStudentChange(index, 'marks', parseInt(e.target.value) || 0)}
                            placeholder="Marks"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStudent(index)}
                          className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCalculate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Calculator className="h-4 w-4" />
                    Calculate Breakdown
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <MarksBreakdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        students={processedStudents}
        classroomNumber={classroomNumber}
      />
      
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

export default MarksCalculation;