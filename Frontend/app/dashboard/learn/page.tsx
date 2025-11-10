"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Code,
  Play,
  FileText,
  Award,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  Download,
  PlayCircle,
  Clock,
  Users,
  Star
} from 'lucide-react';

const Learn = () => {
  const [activeTab, setActiveTab] = useState('tutorials');

  const tutorials = [
    {
      title: "Move Language Basics",
      description: "Learn the fundamentals of Move programming language",
      duration: "2 hours",
      level: "Beginner",
      lessons: 8,
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "Smart Contract Development",
      description: "From hello world to complex dApps on Sui",
      duration: "4 hours",
      level: "Intermediate",
      lessons: 12,
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Sui SDK Integration",
      description: "Connect your frontend to Sui blockchain",
      duration: "3 hours",
      level: "Intermediate",
      lessons: 10,
      icon: <Code className="w-6 h-6" />
    },
    {
      title: "DeFi Protocol Building",
      description: "Build yield farming and staking contracts",
      duration: "6 hours",
      level: "Advanced",
      lessons: 15,
      icon: <Award className="w-6 h-6" />
    }
  ];

  const learningPaths = [
    {
      title: "Beginner Track",
      description: "Sui fundamentals, wallet setup, first transaction",
      duration: "8 hours",
      modules: 6,
      level: "Beginner",
      progress: 0,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Developer Track",
      description: "Move programming, contract deployment, testing",
      duration: "20 hours",
      modules: 12,
      level: "Intermediate",
      progress: 0,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Advanced Track",
      description: "Cross-chain bridges, complex DeFi protocols",
      duration: "30 hours",
      modules: 18,
      level: "Advanced",
      progress: 0,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const documentation = [
    {
      title: "Official Sui Documentation",
      description: "Complete guide to Sui blockchain",
      type: "Official",
      link: "https://docs.sui.io"
    },
    {
      title: "Move Language Reference",
      description: "Comprehensive Move programming guide",
      type: "Reference",
      link: "https://docs.sui.io/move"
    },
    {
      title: "Sui RPC API",
      description: "Blockchain interaction endpoints",
      type: "API",
      link: "https://docs.sui.io/sui-api-ref"
    },
    {
      title: "Best Practices",
      description: "Security, optimization, testing guides",
      type: "Guide",
      link: "https://docs.sui.io/best-practices"
    }
  ];

  const codeExamples = [
    {
      title: "Basic Token Contract",
      description: "Create and manage custom tokens on Sui",
      language: "Move",
      difficulty: "Beginner",
      downloads: 1250
    },
    {
      title: "NFT Marketplace",
      description: "Complete NFT trading platform",
      language: "Move + React",
      difficulty: "Advanced",
      downloads: 890
    },
    {
      title: "DeFi Staking Pool",
      description: "Yield farming and staking implementation",
      language: "Move",
      difficulty: "Intermediate",
      downloads: 675
    },
    {
      title: "Cross-chain Bridge",
      description: "Connect Sui with other blockchains",
      language: "Move + TypeScript",
      difficulty: "Advanced",
      downloads: 432
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Learn Sui</h1>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Star className="w-4 h-4 mr-2" />
            My Progress
          </Button>
        </div>
      </div>

      {/* Learning Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Courses Completed</h3>
              <p className="text-slate-400">Track your learning journey</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">2</div>
          <div className="text-sm text-slate-400 mt-2">of 15 available</div>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-green-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Certificates Earned</h3>
              <p className="text-slate-400">Showcase your skills</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">1</div>
          <div className="text-sm text-slate-400 mt-2">Move Basics Certified</div>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Study Time</h3>
              <p className="text-slate-400">Hours invested in learning</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-white">24h</div>
          <div className="text-sm text-slate-400 mt-2">This month</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-700">
        <nav className="flex space-x-8">
          {[
            { id: 'tutorials', label: 'Tutorials', icon: BookOpen },
            { id: 'paths', label: 'Learning Paths', icon: Play },
            { id: 'docs', label: 'Documentation', icon: FileText },
            { id: 'examples', label: 'Code Examples', icon: Code }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-8">
        {activeTab === 'tutorials' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Interactive Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400">
                      {tutorial.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{tutorial.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{tutorial.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {tutorial.duration}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${
                          tutorial.level === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                          tutorial.level === 'Intermediate' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-purple-600/20 text-purple-400'
                        }`}>
                          {tutorial.level}
                        </span>
                        <span>{tutorial.lessons} lessons</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Tutorial
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Learning Paths</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {learningPaths.map((path, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6">
                  <div className={`w-full h-2 bg-gradient-to-r ${path.color} rounded-full mb-4`}></div>
                  <h3 className="text-xl font-bold text-white mb-2">{path.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{path.description}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Duration</span>
                      <span className="text-white">{path.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Modules</span>
                      <span className="text-white">{path.modules}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Level</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        path.level === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                        path.level === 'Intermediate' ? 'bg-blue-600/20 text-blue-400' :
                        'bg-purple-600/20 text-purple-400'
                      }`}>
                        {path.level}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{path.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className={`h-2 bg-gradient-to-r ${path.color} rounded-full`} style={{ width: `${path.progress}%` }}></div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Path
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Documentation Hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documentation.map((doc, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{doc.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{doc.description}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        doc.type === 'Official' ? 'bg-blue-600/20 text-blue-400' :
                        doc.type === 'Reference' ? 'bg-green-600/20 text-green-400' :
                        doc.type === 'API' ? 'bg-purple-600/20 text-purple-400' :
                        'bg-orange-600/20 text-orange-400'
                      }`}>
                        {doc.type}
                      </span>
                    </div>
                    <FileText className="w-6 h-6 text-slate-400" />
                  </div>
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Code Examples & Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {codeExamples.map((example, index) => (
                <div key={index} className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{example.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{example.description}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">{example.language}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          example.difficulty === 'Beginner' ? 'bg-green-600/20 text-green-400' :
                          example.difficulty === 'Intermediate' ? 'bg-blue-600/20 text-blue-400' :
                          'bg-purple-600/20 text-purple-400'
                        }`}>
                          {example.difficulty}
                        </span>
                      </div>
                    </div>
                    <Code className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-400">{example.downloads} downloads</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;