import React, { useState } from 'react';
import { Phone, Sparkles, User, Settings, BarChart3, TrendingUp, Clock as ClockIcon, Calendar, Target, Volume2, Mic, PhoneCall, PhoneOff, Edit, Save, X, Plus, Trash2, Award, Brain, Zap, Users, MessageCircle, CheckCircle, XCircle, PlayCircle, PauseCircle, RefreshCw, Download, Upload, Eye, AlertCircle, Activity, Headphones, FileText, ChevronRight, LogOut, Cpu, HardDrive, Server, LineChart, Sun, Moon, PhoneForwarded, Shield } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import Clock from './Clock';

const AIAgentManagement = ({ onLogout, onViewChange, darkMode, onToggleDarkMode }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [editMode, setEditMode] = useState(false);
    const [agentStatus, setAgentStatus] = useState('active');
    const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'dialing', 'connected', 'transferring', 'transferred'
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const [showDialpad, setShowDialpad] = useState(false);
    const [showCallForwarding, setShowCallForwarding] = useState(false);
    const [dialedNumber, setDialedNumber] = useState('');
    const [callForwardingNumber, setCallForwardingNumber] = useState('');
    const [forwardingEnabled, setForwardingEnabled] = useState(false);

    // Single sales rep account with ONE AI agent
    const [salesRepAccount, setSalesRepAccount] = useState({
        rep: {
            id: 1,
            name: 'Sarah Johnson',
            email: 'sarah.j@company.com',
            department: 'Enterprise Sales',
            avatar: 'SJ',
            phone: '+1 (555) 123-4567',
            joinedDate: 'Jan 15, 2024'
        },
        agent: {
            id: 'agent-001',
            name: 'Sarah AI Assistant',
            voice: 'Professional Female',
            language: 'English (US)',
            personality: 'Confident & Persuasive',
            status: 'active',
            createdDate: 'Jan 16, 2024',
            models: {
                tts: {
                    provider: 'ElevenLabs',
                    model: 'eleven_turbo_v2',
                    voice_id: 'Rachel - Professional',
                    stability: 0.75,
                    similarity: 0.85
                },
                stt: {
                    provider: 'Deepgram',
                    model: 'nova-2',
                    language: 'en-US',
                    punctuate: true,
                    diarize: false
                },
                llm: {
                    provider: 'OpenAI',
                    model: 'gpt-4-turbo',
                    temperature: 0.7,
                    max_tokens: 500,
                    top_p: 0.9
                }
            },
            settings: {
                maxCallDuration: 15,
                workingHours: '9 AM - 6 PM',
                timezone: 'EST',
                voiceSpeed: 1.0,
                enthusiasm: 7,
                formality: 8,
                callRetryAttempts: 3,
                recordCalls: true
            },
            scripts: [
                { id: 1, name: 'Enterprise Pitch', active: true, lastUpdated: '2024-10-01' },
                { id: 2, name: 'Follow-up Script', active: true, lastUpdated: '2024-09-28' },
                { id: 3, name: 'Demo Booking', active: false, lastUpdated: '2024-09-25' }
            ],
            performance: {
                today: {
                    calls: 12,
                    conversions: 8,
                    gpuUsage: '45%',
                    computePower: '2.4 TFLOPS',
                    avgDuration: '4:32',
                    successRate: 67
                },
                thisWeek: {
                    calls: 68,
                    conversions: 42,
                    gpuUsage: '52%',
                    computePower: '12.8 TFLOPS',
                    avgDuration: '4:28',
                    successRate: 62
                },
                thisMonth: {
                    calls: 247,
                    conversions: 168,
                    gpuUsage: '48%',
                    computePower: '58.4 TFLOPS',
                    avgDuration: '4:35',
                    successRate: 68
                },
                allTime: {
                    calls: 1247,
                    conversions: 841,
                    gpuUsage: '47%',
                    computePower: '247.2 TFLOPS',
                    avgDuration: '4:32',
                    successRate: 67
                }
            },
            recentCalls: [
                { id: 1, contact: 'John Smith', company: 'TechCorp', time: '10:30 AM', duration: '5:23', result: 'Converted', revenue: '$5,200' },
                { id: 2, contact: 'Mary Johnson', company: 'DataFlow Inc', time: '11:15 AM', duration: '3:45', result: 'Follow-up', revenue: '$0' },
                { id: 3, contact: 'Robert Chen', company: 'CloudBase', time: '2:20 PM', duration: '6:12', result: 'Converted', revenue: '$8,500' },
                { id: 4, contact: 'Lisa Park', company: 'AI Solutions', time: '3:45 PM', duration: '2:18', result: 'No Answer', revenue: '$0' },
                { id: 5, contact: 'David Kim', company: 'StartupX', time: '4:30 PM', duration: '4:55', result: 'Converted', revenue: '$3,200' }
            ]
        }
    });

    const toggleAgentStatus = () => {
        setAgentStatus(prev => prev === 'active' ? 'paused' : 'active');
        setSalesRepAccount(prev => ({
            ...prev,
            agent: { ...prev.agent, status: agentStatus === 'active' ? 'paused' : 'active' }
        }));
    };

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            {/* Left Sidebar Navigation */}
            {onViewChange && (
                <div className="w-52 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
                        <div className="bg-blue-600 rounded-lg p-2.5 flex items-center justify-center">
                            <Phone className="text-white" size={20} />
                        </div>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        <button
                            onClick={() => onViewChange('crm')}
                            className="w-full flex items-center justify-start space-x-3 border border-blue-600 text-blue-400 px-4 py-2.5 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-sm font-medium"
                        >
                            <Users size={18} className="flex-shrink-0" />
                            <span>CRM</span>
                        </button>
                        <button
                            onClick={() => onViewChange('analytics')}
                            className="w-full flex items-center justify-start space-x-3 border border-purple-600 text-purple-400 px-4 py-2.5 rounded-lg hover:bg-purple-600 hover:text-white transition-colors text-sm font-medium"
                        >
                            <BarChart3 size={18} className="flex-shrink-0" />
                            <span>AI Analytics</span>
                        </button>
                        <button
                            onClick={() => onViewChange('rlhf')}
                            className="w-full flex items-center justify-start space-x-3 border border-green-600 text-green-400 px-4 py-2.5 rounded-lg hover:bg-green-600 hover:text-white transition-colors text-sm font-medium"
                        >
                            <Brain size={18} className="flex-shrink-0" />
                            <span>RLHF</span>
                        </button>
                        <button
                            onClick={() => onViewChange('microservices')}
                            className="w-full flex items-center justify-start space-x-3 border border-cyan-600 text-cyan-400 px-4 py-2.5 rounded-lg hover:bg-cyan-600 hover:text-white transition-colors text-sm font-medium"
                        >
                            <Server size={18} className="flex-shrink-0" />
                            <span>Microservices</span>
                        </button>
                        <button
                            onClick={() => onViewChange('director')}
                            className="w-full flex items-center justify-start space-x-3 border border-pink-600 text-pink-400 px-4 py-2.5 rounded-lg hover:bg-pink-600 hover:text-white transition-colors text-sm font-medium"
                        >
                            <TrendingUp size={18} className="flex-shrink-0" />
                            <span>Director</span>
                        </button>
                        <button
                            onClick={() => onViewChange('manager')}
                            className="w-full flex items-center justify-start space-x-3 border border-indigo-600 text-indigo-400 px-4 py-2.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-sm font-medium"
                        >
                            <Users size={18} className="flex-shrink-0" />
                            <span>Manager</span>
                        </button>
                        <button
                            onClick={() => onViewChange('teamlead')}
                            className="w-full flex items-center justify-start space-x-3 border border-yellow-600 text-yellow-400 px-4 py-2.5 rounded-lg hover:bg-yellow-600 hover:text-white transition-colors text-sm font-medium"
                        >
                            <Shield size={18} className="flex-shrink-0" />
                            <span>Team Lead Hub</span>
                        </button>
                        <button
                            onClick={() => onViewChange('callanalysis')}
                            className="w-full flex items-center justify-start space-x-3 border border-orange-600 text-orange-400 px-4 py-2.5 rounded-lg hover:bg-orange-600 hover:text-white transition-colors text-sm font-medium"
                        >
                            <Activity size={18} className="flex-shrink-0" />
                            <span>Call Analysis</span>
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ONIT SMART HUB</h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">AI-Powered Call Center Agent</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {/* Dark/Light Mode Toggle */}
                                {onToggleDarkMode && (
                                    <button
                                        onClick={onToggleDarkMode}
                                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                                    >
                                        {darkMode ? (
                                            <Sun className="text-yellow-400" size={20} />
                                        ) : (
                                            <Moon className="text-blue-400" size={20} />
                                        )}
                                    </button>
                                )}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                                        className="flex items-center space-x-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
                                    >
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{salesRepAccount.rep.name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{salesRepAccount.rep.email}</p>
                                        </div>
                                        <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold">
                                            {salesRepAccount.rep.avatar}
                                        </div>
                                    </button>

                                    {showAccountDropdown && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                                            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{salesRepAccount.rep.name}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{salesRepAccount.rep.email}</p>
                                                <p className="text-xs text-gray-500 mt-1">{salesRepAccount.rep.department}</p>
                                            </div>
                                            <div className="p-2">
                                                <button
                                                    onClick={() => {
                                                        setShowAccountDropdown(false);
                                                        setShowProfileSettings(true);
                                                    }}
                                                    className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <User size={16} />
                                                    <span className="text-sm">Profile Settings</span>
                                                </button>
                                                {onLogout && (
                                                    <button
                                                        onClick={() => {
                                                            setShowAccountDropdown(false);
                                                            handleLogout();
                                                        }}
                                                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                                    >
                                                        <LogOut size={16} />
                                                        <span className="text-sm">Logout</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-auto">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        {/* Agent Status Card */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 mb-6 text-white shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white rounded-full p-4">
                                        <Brain className="text-blue-600" size={32} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">{salesRepAccount.agent.name}</h2>
                                        <p className="text-blue-100">Your Personal AI Calling Agent</p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <div className="flex items-center space-x-2">
                                                <Volume2 size={14} />
                                                <span className="text-sm">{salesRepAccount.agent.voice}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MessageCircle size={14} />
                                                <span className="text-sm">{salesRepAccount.agent.personality}</span>
                                            </div>
                                        </div>
                                        {/* Call Status Display */}
                                        <div className="mt-3">
                                            <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm ${callStatus === 'idle' ? 'bg-gray-600 text-gray-200' :
                                                callStatus === 'dialing' ? 'bg-yellow-600 text-white animate-pulse' :
                                                    callStatus === 'connected' ? 'bg-green-600 text-white' :
                                                        callStatus === 'transferring' ? 'bg-blue-600 text-white animate-pulse' :
                                                            'bg-purple-600 text-white'
                                                }`}>
                                                {callStatus === 'idle' && <><Phone size={16} /><span>Idle</span></>}
                                                {callStatus === 'dialing' && <><PhoneCall size={16} /><span>Dialing...</span></>}
                                                {callStatus === 'connected' && <><Phone size={16} /><span>Connected</span></>}
                                                {callStatus === 'transferring' && <><RefreshCw size={16} className="animate-spin" /><span>Transferring...</span></>}
                                                {callStatus === 'transferred' && <><PhoneForwarded size={16} /><span>Transferred</span></>}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <span className={`px-4 py-2 rounded-full font-medium ${agentStatus === 'active'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-500 text-white'
                                            }`}>
                                            {agentStatus === 'active' ? '🟢 Active' : 'Paused'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={toggleAgentStatus}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${agentStatus === 'active'
                                            ? 'bg-red-500 hover:bg-red-600 text-white'
                                            : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                    >
                                        {agentStatus === 'active' ? (
                                            <>
                                                <PauseCircle size={20} />
                                                <span>Pause Agent</span>
                                            </>
                                        ) : (
                                            <>
                                                <PlayCircle size={20} />
                                                <span>Start Agent</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Clock Display */}
                        <div className="mb-6">
                            <Clock />
                        </div>

                        {/* Today's Stats */}
                        <div className="grid grid-cols-5 gap-4 mb-6">
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                    <PhoneCall className="text-blue-400" size={24} />
                                    <span className="text-2xl font-bold text-gray-100">{salesRepAccount.agent.performance.today.calls}</span>
                                </div>
                                <p className="text-sm text-gray-400">Calls Today</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                    <CheckCircle className="text-green-400" size={24} />
                                    <span className="text-2xl font-bold text-gray-100">{salesRepAccount.agent.performance.today.conversions}</span>
                                </div>
                                <p className="text-sm text-gray-400">Conversions</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                    <Target className="text-purple-400" size={24} />
                                    <span className="text-2xl font-bold text-gray-100">{salesRepAccount.agent.performance.today.successRate}%</span>
                                </div>
                                <p className="text-sm text-gray-400">Success Rate</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                    <ClockIcon className="text-yellow-400" size={24} />
                                    <span className="text-2xl font-bold text-gray-100">{salesRepAccount.agent.performance.today.avgDuration}</span>
                                </div>
                                <p className="text-sm text-gray-400">Avg Duration</p>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-2">
                                    <Cpu className="text-orange-400" size={24} />
                                    <span className="text-2xl font-bold text-gray-100">{salesRepAccount.agent.performance.today.gpuUsage}</span>
                                </div>
                                <p className="text-sm text-gray-400">GPU Usage</p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-3 gap-6">
                            {/* Left Panel - Performance & Calls */}
                            <div className="col-span-2 space-y-6">
                                {/* Performance Overview */}
                                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Performance Overview</h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        {[
                                            { period: 'Today', data: salesRepAccount.agent.performance.today },
                                            { period: 'This Week', data: salesRepAccount.agent.performance.thisWeek },
                                            { period: 'This Month', data: salesRepAccount.agent.performance.thisMonth },
                                            { period: 'All Time', data: salesRepAccount.agent.performance.allTime }
                                        ].map((item, idx) => (
                                            <div key={idx} className="bg-gray-750 rounded-lg p-4">
                                                <p className="text-xs text-gray-400 mb-3 font-medium">{item.period}</p>
                                                <div className="space-y-2">
                                                    <div>
                                                        <p className="text-xs text-gray-500">Calls</p>
                                                        <p className="text-lg font-bold text-blue-400">{item.data.calls}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">GPU Usage</p>
                                                        <p className="text-sm font-semibold text-orange-400">{item.data.gpuUsage}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">Compute</p>
                                                        <p className="text-sm font-semibold text-cyan-400">{item.data.computePower}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Calls */}
                                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-100">Recent Calls</h3>
                                        <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                                    </div>
                                    <div className="space-y-3">
                                        {salesRepAccount.agent.recentCalls.map(call => (
                                            <div key={call.id} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center text-white text-sm font-semibold">
                                                        {call.contact.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-200">{call.contact}</p>
                                                        <p className="text-sm text-gray-400">{call.company}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-6">
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-400">{call.time}</p>
                                                        <p className="text-xs text-gray-500">{call.duration}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${call.result === 'Converted' ? 'bg-green-600 text-white' :
                                                            call.result === 'Follow-up' ? 'bg-yellow-600 text-white' :
                                                                'bg-gray-600 text-gray-200'
                                                            }`}>
                                                            {call.result}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - Agent Settings & Scripts */}
                            <div className="col-span-1 space-y-6">
                                {/* Quick Actions - Dialpad & Call Forwarding */}
                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="bg-gray-750 px-6 py-4 border-b border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-100">Quick Actions</h3>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        {/* Dialpad Section */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                                                <Phone className="text-green-400" size={16} />
                                                <span>Dialpad</span>
                                            </h4>

                                            {/* Number Display */}
                                            <div className="bg-gray-700 rounded-lg p-3 mb-3">
                                                <input
                                                    type="text"
                                                    value={dialedNumber}
                                                    onChange={(e) => setDialedNumber(e.target.value)}
                                                    placeholder="Enter phone number"
                                                    className="w-full bg-transparent text-lg font-semibold text-gray-100 text-center outline-none"
                                                />
                                            </div>

                                            {/* Dialpad Buttons */}
                                            <div className="grid grid-cols-3 gap-2 mb-3">
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((btn) => (
                                                    <button
                                                        key={btn}
                                                        onClick={() => setDialedNumber(prev => prev + btn)}
                                                        className="bg-gray-700 hover:bg-gray-600 text-white text-lg font-semibold py-3 rounded-lg transition-colors"
                                                    >
                                                        {btn}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => setDialedNumber(dialedNumber.slice(0, -1))}
                                                    className="flex-1 flex items-center justify-center space-x-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <span>←</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (dialedNumber) {
                                                            alert(`Calling ${dialedNumber} using AI Agent...`);
                                                            setDialedNumber('');
                                                        }
                                                    }}
                                                    disabled={!dialedNumber}
                                                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <Phone size={16} />
                                                    <span>Call</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Call Forwarding Section */}
                                        <div className="pt-6 border-t border-gray-700">
                                            <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center space-x-2">
                                                <PhoneCall className="text-purple-400" size={16} />
                                                <span>Call Forwarding</span>
                                            </h4>

                                            {/* Enable/Disable Toggle */}
                                            <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg mb-3">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-200">Enable</p>
                                                    <p className="text-xs text-gray-400">Forward to your number</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={forwardingEnabled}
                                                        onChange={(e) => setForwardingEnabled(e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                                </label>
                                            </div>

                                            {/* Forwarding Number Input */}
                                            <div className="mb-3">
                                                <label className="block text-xs font-medium text-gray-400 mb-2">
                                                    Forwarding Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={callForwardingNumber}
                                                    onChange={(e) => setCallForwardingNumber(e.target.value)}
                                                    placeholder="+1 (555) 123-4567"
                                                    disabled={!forwardingEnabled}
                                                    className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                />
                                            </div>

                                            <button
                                                onClick={() => {
                                                    if (forwardingEnabled && !callForwardingNumber) {
                                                        alert('Please enter a forwarding number');
                                                        return;
                                                    }
                                                    alert(`Call forwarding ${forwardingEnabled ? 'enabled' : 'disabled'}${forwardingEnabled ? ` to ${callForwardingNumber}` : ''}`);
                                                }}
                                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Save Settings
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Agent Settings */}
                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="bg-gray-750 px-6 py-4 border-b border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-100">Agent Settings</h3>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Voice Type</label>
                                            <select className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                                <option>{salesRepAccount.agent.voice}</option>
                                                <option>Professional Male</option>
                                                <option>Warm Female</option>
                                                <option>Executive Male</option>
                                                <option>Friendly Female</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Personality</label>
                                            <select className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                                                <option>{salesRepAccount.agent.personality}</option>
                                                <option>Friendly & Helpful</option>
                                                <option>Professional & Direct</option>
                                                <option>Empathetic & Patient</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Voice Speed: {salesRepAccount.agent.settings.voiceSpeed}x
                                            </label>
                                            <input
                                                type="range"
                                                min="0.5"
                                                max="2"
                                                step="0.1"
                                                defaultValue={salesRepAccount.agent.settings.voiceSpeed}
                                                className="w-full accent-blue-600"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Enthusiasm: {salesRepAccount.agent.settings.enthusiasm}/10
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                defaultValue={salesRepAccount.agent.settings.enthusiasm}
                                                className="w-full accent-blue-600"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Formality: {salesRepAccount.agent.settings.formality}/10
                                            </label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="10"
                                                defaultValue={salesRepAccount.agent.settings.formality}
                                                className="w-full accent-blue-600"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Working Hours</label>
                                            <input
                                                type="text"
                                                defaultValue={salesRepAccount.agent.settings.workingHours}
                                                className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                                            <span className="text-sm text-gray-300">Record Calls</span>
                                            <input
                                                type="checkbox"
                                                defaultChecked={salesRepAccount.agent.settings.recordCalls}
                                                className="rounded bg-gray-700 border-gray-600 text-blue-600"
                                            />
                                        </div>

                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                                            Save Settings
                                        </button>
                                    </div>
                                </div>

                                {/* Call Scripts */}
                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="bg-gray-750 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-100">Call Scripts</h3>
                                        <button className="text-blue-400 hover:text-blue-300">
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        {salesRepAccount.agent.scripts.map(script => (
                                            <div key={script.id} className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <FileText className="text-blue-400" size={16} />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-200">{script.name}</p>
                                                        <p className="text-xs text-gray-500">Updated {script.lastUpdated}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-2 py-1 rounded text-xs ${script.active ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                                                        }`}>
                                                        {script.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                    <button className="p-1 hover:bg-gray-600 rounded">
                                                        <Edit size={14} className="text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Calendar */}
                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="bg-gray-750 px-6 py-4 border-b border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-100 flex items-center space-x-2">
                                            <Calendar size={18} className="text-blue-400" />
                                            <span>Scheduled Calls</span>
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        {/* Calendar Days */}
                                        <div className="grid grid-cols-7 gap-1 mb-3">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                                                <div key={idx} className="text-center text-xs font-semibold text-gray-400 py-2">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Calendar Grid */}
                                        <div className="grid grid-cols-7 gap-1">
                                            {[...Array(35)].map((_, idx) => {
                                                const day = idx - 2;
                                                const isToday = day === 5;
                                                const hasEvent = [5, 7, 12, 18].includes(day);

                                                if (day < 1 || day > 30) {
                                                    return <div key={idx} className="aspect-square"></div>;
                                                }

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${isToday
                                                            ? 'bg-blue-600 text-white font-semibold'
                                                            : hasEvent
                                                                ? 'bg-green-900 text-green-200 hover:bg-green-800'
                                                                : 'text-gray-300 hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {day}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Upcoming Calls */}
                                        <div className="mt-4 pt-4 border-t border-gray-700">
                                            <p className="text-sm font-semibold text-gray-300 mb-3">Today's Schedule</p>
                                            <div className="space-y-2">
                                                {[
                                                    { time: '2:00 PM', client: 'ABC Corp', type: 'Demo' },
                                                    { time: '4:30 PM', client: 'XYZ Ltd', type: 'Follow-up' }
                                                ].map((call, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-750 rounded text-xs">
                                                        <div className="flex items-center space-x-2">
                                                            <ClockIcon size={12} className="text-blue-400" />
                                                            <span className="text-gray-200">{call.time}</span>
                                                        </div>
                                                        <span className="text-gray-300">{call.client}</span>
                                                        <span className="px-2 py-0.5 bg-blue-900 text-blue-200 rounded">
                                                            {call.type}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Appointments Calendar */}
                                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                    <div className="bg-gray-750 px-6 py-4 border-b border-gray-700">
                                        <h3 className="text-lg font-semibold text-gray-100 flex items-center space-x-2">
                                            <Calendar size={18} className="text-purple-400" />
                                            <span>Appointments</span>
                                        </h3>
                                    </div>
                                    <div className="p-6">
                                        {/* Calendar Days */}
                                        <div className="grid grid-cols-7 gap-1 mb-3">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                                                <div key={idx} className="text-center text-xs font-semibold text-gray-400 py-2">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Calendar Grid */}
                                        <div className="grid grid-cols-7 gap-1">
                                            {[...Array(35)].map((_, idx) => {
                                                const day = idx - 2;
                                                const isToday = day === 5;
                                                const hasAppointment = [5, 8, 10, 15, 20, 25].includes(day);

                                                if (day < 1 || day > 30) {
                                                    return <div key={idx} className="aspect-square"></div>;
                                                }

                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${isToday
                                                            ? 'bg-purple-600 text-white font-semibold'
                                                            : hasAppointment
                                                                ? 'bg-purple-900 text-purple-200 hover:bg-purple-800'
                                                                : 'text-gray-300 hover:bg-gray-700'
                                                            }`}
                                                    >
                                                        {day}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Upcoming Appointments */}
                                        <div className="mt-4 pt-4 border-t border-gray-700">
                                            <p className="text-sm font-semibold text-gray-300 mb-3">Upcoming Appointments</p>
                                            <div className="space-y-2">
                                                {[
                                                    { time: '10:00 AM', title: 'Team Meeting', type: 'Meeting' },
                                                    { time: '3:00 PM', title: 'Client Demo', type: 'Presentation' },
                                                    { time: '5:00 PM', title: 'Strategy Review', type: 'Review' }
                                                ].map((appointment, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-750 rounded text-xs">
                                                        <div className="flex items-center space-x-2">
                                                            <ClockIcon size={12} className="text-purple-400" />
                                                            <span className="text-gray-200">{appointment.time}</span>
                                                        </div>
                                                        <span className="text-gray-300 flex-1 mx-2 truncate">{appointment.title}</span>
                                                        <span className="px-2 py-0.5 bg-purple-900 text-purple-200 rounded">
                                                            {appointment.type}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Settings Modal */}
                {showProfileSettings && (
                    <ProfileSettings
                        user={salesRepAccount.rep}
                        onClose={() => setShowProfileSettings(false)}
                        onSave={(updatedProfile) => {
                            setSalesRepAccount(prev => ({
                                ...prev,
                                rep: { ...prev.rep, ...updatedProfile }
                            }));
                            setShowProfileSettings(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default AIAgentManagement;
