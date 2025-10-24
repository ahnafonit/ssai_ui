import React, { useState } from 'react';
import { Users, TrendingUp, Target, DollarSign, Phone, Award, ChevronDown, ChevronRight, Clock as ClockIcon, Activity, BarChart3, Brain, Volume2, MessageCircle, PhoneCall, CheckCircle, PlayCircle, PauseCircle, Edit, Plus, FileText, Calendar, Cpu, User, LogOut, ArrowLeft } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import Clock from './Clock';

export default function ManagerDashboard({ onViewChange }) {
    const [activeView, setActiveView] = useState('agent'); // 'agent' or 'team'
    const [expandedReps, setExpandedReps] = useState([1]);
    const [agentStatus, setAgentStatus] = useState('active');
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const [showProfileSettings, setShowProfileSettings] = useState(false);
    const [managerData, setManagerData] = useState(null);
    const [dialedNumber, setDialedNumber] = useState('');
    const [callForwardingNumber, setCallForwardingNumber] = useState('');
    const [forwardingEnabled, setForwardingEnabled] = useState(false);

    const toggleRep = (repId) => {
        setExpandedReps(prev =>
            prev.includes(repId)
                ? prev.filter(id => id !== repId)
                : [...prev, repId]
        );
    };

    const toggleAgentStatus = () => {
        setAgentStatus(prev => prev === 'active' ? 'paused' : 'active');
    };

    const manager = {
        name: "Jennifer Wilson",
        email: "jennifer@company.com",
        department: "Enterprise Sales",
        avatar: "JW",
        teamSize: 4,
        agent: {
            name: "Jennifer AI Assistant",
            voice: "Professional Female",
            personality: "Consultative & Strategic",
            performance: {
                today: { calls: 16, conversions: 12, successRate: 75, avgDuration: "5:45", gpuUsage: "52%" },
                thisWeek: { calls: 89, conversions: 65, successRate: 73, gpuUsage: "54%" },
                thisMonth: { calls: 356, conversions: 267, successRate: 75, gpuUsage: "51%" },
                allTime: { calls: 1542, conversions: 1156, successRate: 75, gpuUsage: "52%" }
            },
            recentCalls: [
                { id: 1, contact: 'Michael Roberts', company: 'Enterprise Corp', time: '10:15 AM', duration: '6:32', result: 'Converted', revenue: '$12,500' },
                { id: 2, contact: 'Lisa Anderson', company: 'Global Systems', time: '11:30 AM', duration: '5:18', result: 'Converted', revenue: '$9,800' },
                { id: 3, contact: 'David Chang', company: 'Tech Innovators', time: '1:45 PM', duration: '7:12', result: 'Converted', revenue: '$15,200' },
                { id: 4, contact: 'Sarah Mitchell', company: 'Cloud Services', time: '3:20 PM', duration: '4:55', result: 'Follow-up', revenue: '$0' },
                { id: 5, contact: 'James Wilson', company: 'Data Solutions', time: '4:30 PM', duration: '5:40', result: 'Converted', revenue: '$8,900' }
            ],
            settings: {
                voiceSpeed: 1.0,
                enthusiasm: 7,
                formality: 9,
                workingHours: '8 AM - 7 PM',
                recordCalls: true
            },
            scripts: [
                { id: 1, name: 'Enterprise Strategic Pitch', active: true, lastUpdated: '2024-10-05' },
                { id: 2, name: 'Partnership Proposal', active: true, lastUpdated: '2024-10-01' },
                { id: 3, name: 'C-Level Engagement', active: false, lastUpdated: '2024-09-28' }
            ]
        },
        salesReps: [
            {
                id: 1,
                name: "Alex Martinez",
                email: "alex@company.com",
                avatar: "AM",
                status: "active",
                agentName: "Alex AI Assistant",
                stats: { callsToday: 18, conversions: 12, successRate: 67, avgDuration: "5:15", revenue: "$4,500" },
                performance: {
                    thisWeek: { calls: 89, conversions: 58, revenue: "$21,750" },
                    thisMonth: { calls: 356, conversions: 234, revenue: "$87,000" },
                    quota: { current: 87000, target: 80000, percentage: 109 }
                },
                aiConfig: { voice: "Professional Male", personality: "Consultative & Analytical" }
            },
            {
                id: 2,
                name: "Sarah Chen",
                email: "sarah@company.com",
                avatar: "SC",
                status: "active",
                agentName: "Sarah AI Assistant",
                stats: { callsToday: 22, conversions: 16, successRate: 73, avgDuration: "4:48", revenue: "$6,200" },
                performance: {
                    thisWeek: { calls: 102, conversions: 72, revenue: "$28,400" },
                    thisMonth: { calls: 421, conversions: 298, revenue: "$117,200" },
                    quota: { current: 117200, target: 100000, percentage: 117 }
                },
                aiConfig: { voice: "Professional Female", personality: "Confident & Persuasive" }
            },
            {
                id: 3,
                name: "Marcus Johnson",
                email: "marcus@company.com",
                avatar: "MJ",
                status: "paused",
                agentName: "Marcus AI Assistant",
                stats: { callsToday: 8, conversions: 5, successRate: 63, avgDuration: "6:22", revenue: "$2,100" },
                performance: {
                    thisWeek: { calls: 67, conversions: 41, revenue: "$17,200" },
                    thisMonth: { calls: 278, conversions: 169, revenue: "$70,800" },
                    quota: { current: 70800, target: 80000, percentage: 89 }
                },
                aiConfig: { voice: "Professional Male", personality: "Empathetic & Supportive" }
            },
            {
                id: 4,
                name: "Emma Thompson",
                email: "emma@company.com",
                avatar: "ET",
                status: "active",
                agentName: "Emma AI Assistant",
                stats: { callsToday: 15, conversions: 11, successRate: 73, avgDuration: "4:52", revenue: "$4,900" },
                performance: {
                    thisWeek: { calls: 94, conversions: 67, revenue: "$24,650" },
                    thisMonth: { calls: 389, conversions: 278, revenue: "$101,000" },
                    quota: { current: 101000, target: 100000, percentage: 101 }
                },
                aiConfig: { voice: "Professional Female", personality: "Energetic & Enthusiastic" }
            }
        ]
    };

    const teamStats = {
        totalReps: manager.salesReps.length,
        totalCalls: manager.salesReps.reduce((sum, rep) => sum + rep.stats.callsToday, 0),
        totalConversions: manager.salesReps.reduce((sum, rep) => sum + rep.stats.conversions, 0),
        totalRevenue: manager.salesReps.reduce((sum, rep) => sum + parseFloat(rep.stats.revenue.replace(/[$,]/g, '')), 0),
        avgSuccessRate: Math.round(manager.salesReps.reduce((sum, rep) => sum + rep.stats.successRate, 0) / manager.salesReps.length)
    };

    // Agent View (Manager's Personal AI)
    if (activeView === 'agent') {
        return (
            <div className="min-h-screen bg-gray-900">
                {/* Header */}
                <div className="bg-gray-800 shadow-lg border-b border-gray-700">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => onViewChange && onViewChange('agent')}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="text-sm font-medium">Back to Agent</span>
                                </button>
                                <div className="bg-purple-600 rounded-lg p-2">
                                    <Phone className="text-white" size={24} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Manager Hub</h1>
                                    <p className="text-gray-400 text-sm">AI-Powered Sales Management</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Clock />
                                <button
                                    onClick={() => setActiveView('team')}
                                    className="flex items-center space-x-2 border border-blue-600 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    <Users size={16} />
                                    <span>View My Team</span>
                                </button>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                                        className="flex items-center space-x-3 hover:bg-gray-700 rounded-lg p-2 transition-colors"
                                    >
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-200">{manager.name}</p>
                                            <p className="text-xs text-gray-400">{manager.email}</p>
                                        </div>
                                        <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-semibold">
                                            {manager.avatar}
                                        </div>
                                    </button>

                                    {showAccountDropdown && (
                                        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                                            <div className="p-3 border-b border-gray-700">
                                                <p className="text-sm font-medium text-gray-200">{manager.name}</p>
                                                <p className="text-xs text-gray-400">{manager.email}</p>
                                                <p className="text-xs text-gray-500 mt-1">{manager.department}</p>
                                            </div>
                                            <div className="p-2">
                                                <button className="w-full flex items-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
                                                    <User size={16} />
                                                    <span className="text-sm">Profile Settings</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowAccountDropdown(false);
                                                        // Handle logout
                                                    }}
                                                    className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                                >
                                                    <LogOut size={16} />
                                                    <span className="text-sm">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-6">
                    {/* Agent Status Card */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-700 rounded-xl p-8 mb-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="bg-white rounded-full p-4">
                                    <Brain className="text-purple-600" size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{manager.agent.name}</h2>
                                    <p className="text-purple-100">Your Personal AI Calling Agent</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <div className="flex items-center space-x-2">
                                            <Volume2 size={14} />
                                            <span className="text-sm">{manager.agent.voice}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <MessageCircle size={14} />
                                            <span className="text-sm">{manager.agent.personality}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center space-x-3 mb-3">
                                    <span className={`px-4 py-2 rounded-full font-medium ${agentStatus === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                                        {agentStatus === 'active' ? '🟢 Active' : '⏸️ Paused'}
                                    </span>
                                </div>
                                <button
                                    onClick={toggleAgentStatus}
                                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${agentStatus === 'active' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                                >
                                    {agentStatus === 'active' ? <><PauseCircle size={20} /><span>Pause Agent</span></> : <><PlayCircle size={20} /><span>Start Agent</span></>}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Today's Stats */}
                    <div className="grid grid-cols-5 gap-4 mb-6">
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <PhoneCall className="text-blue-400" size={24} />
                                <span className="text-2xl font-bold text-gray-100">{manager.agent.performance.today.calls}</span>
                            </div>
                            <p className="text-sm text-gray-400">Calls Today</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <CheckCircle className="text-green-400" size={24} />
                                <span className="text-2xl font-bold text-gray-100">{manager.agent.performance.today.conversions}</span>
                            </div>
                            <p className="text-sm text-gray-400">Conversions</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <Target className="text-purple-400" size={24} />
                                <span className="text-2xl font-bold text-gray-100">{manager.agent.performance.today.successRate}%</span>
                            </div>
                            <p className="text-sm text-gray-400">Success Rate</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <ClockIcon className="text-yellow-400" size={24} />
                                <span className="text-2xl font-bold text-gray-100">{manager.agent.performance.today.avgDuration}</span>
                            </div>
                            <p className="text-sm text-gray-400">Avg Duration</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                                <Cpu className="text-orange-400" size={24} />
                                <span className="text-2xl font-bold text-gray-100">{manager.agent.performance.today.gpuUsage}</span>
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
                                        { period: 'Today', data: manager.agent.performance.today },
                                        { period: 'This Week', data: manager.agent.performance.thisWeek },
                                        { period: 'This Month', data: manager.agent.performance.thisMonth },
                                        { period: 'All Time', data: manager.agent.performance.allTime }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-gray-750 rounded-lg p-4">
                                            <p className="text-xs text-gray-400 mb-3 font-medium">{item.period}</p>
                                            <div className="space-y-2">
                                                <div>
                                                    <p className="text-xs text-gray-500">Calls</p>
                                                    <p className="text-lg font-bold text-blue-400">{item.data.calls}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">Success Rate</p>
                                                    <p className="text-sm font-semibold text-green-400">{item.data.successRate}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500">GPU Usage</p>
                                                    <p className="text-sm font-semibold text-orange-400">{item.data.gpuUsage}</p>
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
                                    {manager.agent.recentCalls.map(call => (
                                        <div key={call.id} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center text-white text-sm font-semibold">
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
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${call.result === 'Converted' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'}`}>
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
                                        <select className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                                            <option>{manager.agent.voice}</option>
                                            <option>Professional Male</option>
                                            <option>Executive Female</option>
                                            <option>Warm Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Personality</label>
                                        <select className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500">
                                            <option>{manager.agent.personality}</option>
                                            <option>Confident & Persuasive</option>
                                            <option>Professional & Direct</option>
                                            <option>Empathetic & Patient</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Voice Speed: {manager.agent.settings.voiceSpeed}x</label>
                                        <input type="range" min="0.5" max="2" step="0.1" defaultValue={manager.agent.settings.voiceSpeed} className="w-full accent-purple-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Enthusiasm: {manager.agent.settings.enthusiasm}/10</label>
                                        <input type="range" min="1" max="10" defaultValue={manager.agent.settings.enthusiasm} className="w-full accent-purple-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Formality: {manager.agent.settings.formality}/10</label>
                                        <input type="range" min="1" max="10" defaultValue={manager.agent.settings.formality} className="w-full accent-purple-600" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Working Hours</label>
                                        <input type="text" defaultValue={manager.agent.settings.workingHours} className="w-full bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500" />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                                        <span className="text-sm text-gray-300">Record Calls</span>
                                        <input type="checkbox" defaultChecked={manager.agent.settings.recordCalls} className="rounded bg-gray-700 border-gray-600 text-purple-600" />
                                    </div>
                                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors">Save Settings</button>
                                </div>
                            </div>

                            {/* Call Scripts */}
                            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                                <div className="bg-gray-750 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-100">Call Scripts</h3>
                                    <button className="text-purple-400 hover:text-purple-300"><Plus size={18} /></button>
                                </div>
                                <div className="p-6 space-y-3">
                                    {manager.agent.scripts.map(script => (
                                        <div key={script.id} className="flex items-center justify-between p-3 bg-gray-750 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="text-purple-400" size={16} />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-200">{script.name}</p>
                                                    <p className="text-xs text-gray-500">Updated {script.lastUpdated}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-2 py-1 rounded text-xs ${script.active ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}>
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
                                        <Calendar size={18} className="text-purple-400" />
                                        <span>Scheduled Calls</span>
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-7 gap-1 mb-3">
                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                                            <div key={idx} className="text-center text-xs font-semibold text-gray-400 py-2">{day}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {[...Array(35)].map((_, idx) => {
                                            const day = idx - 2;
                                            const isToday = day === 5;
                                            const hasEvent = [5, 7, 12, 18].includes(day);
                                            if (day < 1 || day > 30) return <div key={idx} className="aspect-square"></div>;
                                            return (
                                                <div key={idx} className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ${isToday ? 'bg-purple-600 text-white font-semibold' : hasEvent ? 'bg-green-900 text-green-200 hover:bg-green-800' : 'text-gray-300 hover:bg-gray-700'}`}>
                                                    {day}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <p className="text-sm font-semibold text-gray-300 mb-3">Today's Schedule</p>
                                        <div className="space-y-2">
                                            {[
                                                { time: '2:00 PM', client: 'Enterprise Corp', type: 'Demo' },
                                                { time: '4:30 PM', client: 'Global Systems', type: 'Follow-up' }
                                            ].map((call, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-2 bg-gray-750 rounded text-xs">
                                                    <div className="flex items-center space-x-2">
                                                        <ClockIcon size={12} className="text-purple-400" />
                                                        <span className="text-gray-200">{call.time}</span>
                                                    </div>
                                                    <span className="text-gray-300">{call.client}</span>
                                                    <span className="px-2 py-0.5 bg-purple-900 text-purple-200 rounded">{call.type}</span>
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
        );
    }

    // Team View
    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <button
                            onClick={() => onViewChange && onViewChange('agent')}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Agent</span>
                        </button>
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">My Team</h1>
                            <p className="text-slate-400">Sales Rep Performance Overview</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Clock />
                    <button
                        onClick={() => setActiveView('agent')}
                        className="flex items-center space-x-2 border border-purple-600 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                    >
                        <Brain size={16} />
                        <span>My AI Agent</span>
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                            className="flex items-center gap-3 hover:bg-slate-800 rounded-lg p-2 transition-colors"
                        >
                            <div className="text-right">
                                <p className="text-sm text-slate-400">Sales Manager</p>
                                <p className="font-semibold">{manager.name}</p>
                                <p className="text-xs text-slate-500">{manager.email}</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                                {manager.avatar}
                            </div>
                        </button>

                        {showAccountDropdown && (
                            <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                                <div className="p-3 border-b border-slate-700">
                                    <p className="text-sm font-medium text-slate-200">{manager.name}</p>
                                    <p className="text-xs text-slate-400">{manager.email}</p>
                                    <p className="text-xs text-slate-500 mt-1">{manager.department}</p>
                                </div>
                                <div className="p-2">
                                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                                        <User size={16} />
                                        <span className="text-sm">Profile Settings</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAccountDropdown(false);
                                            // Handle logout
                                        }}
                                        className="w-full flex items-center space-x-2 px-3 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <LogOut size={16} />
                                        <span className="text-sm">Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Team KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="w-5 h-5 text-blue-400" />
                        <span className="text-2xl font-bold">{teamStats.totalReps}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Sales Reps</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Phone className="w-5 h-5 text-cyan-400" />
                        <span className="text-2xl font-bold">{teamStats.totalCalls}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Calls Today</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-2xl font-bold">{teamStats.totalConversions}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Conversions</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Target className="w-5 h-5 text-orange-400" />
                        <span className="text-2xl font-bold">{teamStats.avgSuccessRate}%</span>
                    </div>
                    <p className="text-slate-400 text-sm">Success Rate</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <DollarSign className="w-5 h-5 text-yellow-400" />
                        <span className="text-2xl font-bold">${(teamStats.totalRevenue / 1000).toFixed(1)}K</span>
                    </div>
                    <p className="text-slate-400 text-sm">Revenue Today</p>
                </div>
            </div>

            {/* Sales Reps - Simplified View */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Sales Representatives</h2>
                {manager.salesReps.map((rep) => (
                    <div key={rep.id} className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg">
                                    {rep.avatar}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{rep.name}</h3>
                                    <p className="text-sm text-slate-400">{rep.email}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-slate-400">
                                            <Activity className="w-3 h-3 inline mr-1" />
                                            {rep.agentName}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${rep.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                    {rep.status === 'active' ? '● Active' : '❚❚ Paused'}
                                </span>
                                <div className="text-right">
                                    <p className="text-sm text-slate-400">Quota</p>
                                    <p className={`text-xl font-bold ${rep.performance.quota.percentage >= 100 ? 'text-green-400' : rep.performance.quota.percentage >= 90 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {rep.performance.quota.percentage}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                            <div className="bg-slate-750 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Phone className="w-4 h-4 text-cyan-400" />
                                    <span className="text-xs text-slate-400">Calls</span>
                                </div>
                                <p className="text-xl font-bold">{rep.stats.callsToday}</p>
                            </div>
                            <div className="bg-slate-750 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                    <span className="text-xs text-slate-400">Conversions</span>
                                </div>
                                <p className="text-xl font-bold">{rep.stats.conversions}</p>
                            </div>
                            <div className="bg-slate-750 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Target className="w-4 h-4 text-purple-400" />
                                    <span className="text-xs text-slate-400">Success</span>
                                </div>
                                <p className="text-xl font-bold">{rep.stats.successRate}%</p>
                            </div>
                            <div className="bg-slate-750 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <ClockIcon className="w-4 h-4 text-orange-400" />
                                    <span className="text-xs text-slate-400">Avg Duration</span>
                                </div>
                                <p className="text-xl font-bold">{rep.stats.avgDuration}</p>
                            </div>
                            <div className="bg-slate-750 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign className="w-4 h-4 text-yellow-400" />
                                    <span className="text-xs text-slate-400">Revenue</span>
                                </div>
                                <p className="text-xl font-bold">{rep.stats.revenue}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Team Rankings */}
            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        Top Performers (This Month)
                    </h2>
                    <div className="space-y-3">
                        {[...manager.salesReps].sort((a, b) => b.performance.quota.percentage - a.performance.quota.percentage).map((rep, idx) => (
                            <div key={rep.id} className="flex items-center justify-between bg-slate-750 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-yellow-500 text-slate-900' : idx === 1 ? 'bg-slate-400 text-slate-900' : 'bg-orange-600 text-white'}`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{rep.name}</p>
                                        <p className="text-xs text-slate-400">{rep.performance.thisMonth.revenue} revenue</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-green-400">{rep.performance.quota.percentage}%</p>
                                    <p className="text-xs text-slate-400">quota</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        Team Insights
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                            <p className="text-sm font-medium text-green-300 mb-1">Team Performance</p>
                            <p className="text-xs text-green-100">75% of team members exceeding quota targets</p>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                            <p className="text-sm font-medium text-blue-300 mb-1">Today's Activity</p>
                            <p className="text-xs text-blue-100">{teamStats.totalCalls} calls made with {teamStats.avgSuccessRate}% success rate</p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700 p-4 rounded-lg">
                            <p className="text-sm font-medium text-purple-300 mb-1">Revenue Generated</p>
                            <p className="text-xs text-purple-100">${(teamStats.totalRevenue / 1000).toFixed(1)}K today across all reps</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
