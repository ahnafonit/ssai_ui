import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Phone, Clock, TrendingUp, TrendingDown, Users, PhoneCall, PhoneIncoming, PhoneMissed, PhoneForwarded, Voicemail, ArrowLeft } from 'lucide-react';

const CallAnalysis = ({ onViewChange }) => {
    const [timeRange, setTimeRange] = useState('week');
    const [activeTab, setActiveTab] = useState('overview');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Call success rate by agent
    const agentSuccessData = [
        { agent: 'agent_c8a6d5c', calls: 485 },
        { agent: 'Maureen (Trans...)', calls: 320 },
        { agent: 'Derek (Transfer...)', calls: 215 },
        { agent: 'Estns', calls: 145 },
        { agent: 'Sam (Transfer) s...', calls: 98 },
        { agent: 'agent_a6cf3ea8', calls: 76 }
    ];

    // Call picked up rate by agent
    const agentPickupData = [
        { agent: 'Maureen (Trans...)', rate: 96 },
        { agent: 'agent_6728845', rate: 94 },
        { agent: 'Estns', rate: 92 },
        { agent: 'agent_3127a04', rate: 91 },
        { agent: 'agent_5efda61', rate: 89 },
        { agent: 'agent_c8c6d5c', rate: 88 }
    ];

    // Call transfer rate by agent
    const agentTransferData = [
        { agent: 'Maureen (Trans...)', rate: 45 },
        { agent: 'Derek (Transfer...)', rate: 15 },
        { agent: 'Sam (Transfer) s...', rate: 12 }
    ];

    // Time series data for rates
    const rateTimeSeriesData = [
        { date: 'Aug 11', pickup: 85, success: 75, transfer: 18, voicemail: 8 },
        { date: 'Aug 18', pickup: 88, success: 82, transfer: 15, voicemail: 12 },
        { date: 'Aug 25', pickup: 90, success: 88, transfer: 12, voicemail: 10 },
        { date: 'Sep 01', pickup: 87, success: 85, transfer: 16, voicemail: 13 },
        { date: 'Sep 08', pickup: 92, success: 90, transfer: 14, voicemail: 8 },
        { date: 'Sep 15', pickup: 89, success: 87, transfer: 17, voicemail: 11 },
        { date: 'Sep 22', pickup: 93, success: 91, transfer: 13, voicemail: 7 },
        { date: 'Oct 06', pickup: 91, success: 89, transfer: 15, voicemail: 9 }
    ];

    // Call duration and latency over time
    const performanceData = [
        { date: 'Aug 11', duration: 180, latency: 1200 },
        { date: 'Aug 18', duration: 195, latency: 1450 },
        { date: 'Aug 25', duration: 210, latency: 1680 },
        { date: 'Sep 01', duration: 205, latency: 1520 },
        { date: 'Sep 08', duration: 198, latency: 1380 },
        { date: 'Sep 15', duration: 215, latency: 1620 },
        { date: 'Sep 22', duration: 208, latency: 1480 },
        { date: 'Oct 06', duration: 202, latency: 1550 }
    ];

    // Call disposition over time
    const dispositionData = [
        { date: 'Jul 28', successful: 145, unknown: 23, unsuccessful: 12 },
        { date: 'Aug 11', successful: 168, unknown: 28, unsuccessful: 15 },
        { date: 'Aug 18', successful: 189, unknown: 31, unsuccessful: 18 },
        { date: 'Aug 25', successful: 195, unknown: 25, unsuccessful: 14 },
        { date: 'Sep 01', successful: 178, unknown: 29, unsuccessful: 16 },
        { date: 'Sep 08', successful: 203, unknown: 33, unsuccessful: 19 },
        { date: 'Sep 15', successful: 212, unknown: 27, unsuccessful: 13 },
        { date: 'Sep 22', successful: 198, unknown: 30, unsuccessful: 17 },
        { date: 'Sep 28', successful: 225, unknown: 35, unsuccessful: 22 },
        { date: 'Oct 06', successful: 210, unknown: 28, unsuccessful: 15 }
    ];

    // Disconnection reason
    const disconnectionData = [
        { date: 'Jul 28', agentHangup: 45, callTransfer: 23, other: 18 },
        { date: 'Aug 11', agentHangup: 52, callTransfer: 28, other: 22 },
        { date: 'Aug 18', agentHangup: 48, callTransfer: 31, other: 25 },
        { date: 'Aug 25', agentHangup: 59, callTransfer: 35, other: 28 },
        { date: 'Sep 01', agentHangup: 55, callTransfer: 29, other: 24 },
        { date: 'Sep 08', agentHangup: 63, callTransfer: 38, other: 31 },
        { date: 'Sep 15', agentHangup: 58, callTransfer: 33, other: 27 },
        { date: 'Sep 22', agentHangup: 67, callTransfer: 41, other: 34 },
        { date: 'Sep 28', agentHangup: 71, callTransfer: 45, other: 38 },
        { date: 'Oct 06', agentHangup: 62, callTransfer: 36, other: 29 }
    ];

    // User sentiment
    const sentimentData = [
        { date: 'Jul 28', negative: 15, neutral: 45, positive: 28 },
        { date: 'Aug 11', negative: 18, neutral: 52, positive: 35 },
        { date: 'Aug 18', negative: 22, neutral: 58, positive: 42 },
        { date: 'Aug 25', negative: 19, neutral: 63, positive: 48 },
        { date: 'Sep 01', negative: 25, neutral: 55, positive: 38 },
        { date: 'Sep 08', negative: 21, neutral: 68, positive: 52 },
        { date: 'Sep 15', negative: 28, neutral: 72, positive: 58 },
        { date: 'Sep 22', negative: 24, neutral: 65, positive: 55 },
        { date: 'Sep 28', negative: 31, neutral: 78, positive: 65 },
        { date: 'Oct 06', negative: 26, neutral: 61, positive: 48 }
    ];

    // Donut chart data
    const callSuccessDonut = [
        { name: 'Inbound', value: 68, color: '#3b82f6' },
        { name: 'Outbound', value: 22, color: '#f97316' },
        { name: 'Successful', value: 10, color: '#10b981' }
    ];

    const disconnectionDonut = [
        { name: 'Unknown', value: 42, color: '#8b5cf6' },
        { name: 'Negative', value: 35, color: '#ef4444' },
        { name: 'More', value: 23, color: '#06b6d4' }
    ];

    const sentimentDonut = [
        { name: 'Inbound', value: 45, color: '#3b82f6' },
        { name: 'Outbound', value: 35, color: '#f97316' },
        { name: 'Unknown', value: 20, color: '#6b7280' }
    ];

    // Call counts over time
    const callCountsData = [
        { date: 'Aug 12', calls: 145 },
        { date: 'Aug 19', calls: 168 },
        { date: 'Aug 26', calls: 189 },
        { date: 'Sep 02', calls: 195 },
        { date: 'Sep 09', calls: 212 },
        { date: 'Sep 16', calls: 198 },
        { date: 'Sep 23', calls: 225 },
        { date: 'Sep 30', calls: 245 },
        { date: 'Oct 07', calls: 210 }
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800 border border-gray-700 p-3 rounded shadow-lg">
                    {payload.map((entry, index) => (
                        <div key={index} className="text-sm">
                            <span style={{ color: entry.color }}>{entry.name}: </span>
                            <span className="text-white font-semibold">{entry.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onViewChange && onViewChange('agent')}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Back to Agent</span>
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Call Analytics</h1>
                            <p className="text-gray-400 mt-2">Comprehensive call center metrics and insights</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-white">
                            {currentTime.toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-400">
                            {currentTime.toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 flex gap-2 overflow-x-auto">
                    {['overview', 'agents', 'performance', 'sentiment'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === tab
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Time Range Filter */}
                <div className="mb-6 flex gap-2">
                    {['day', 'week', 'month', 'quarter'].map(range => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${timeRange === range
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Top Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <p className="text-sm font-medium text-gray-400 mb-2">Call Counts</p>
                                <p className="text-4xl font-bold text-white">16,530</p>
                                <div className="flex items-center mt-2 text-sm text-green-400">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    <span>+8.2% vs last period</span>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <p className="text-sm font-medium text-gray-400 mb-2">Call Duration</p>
                                <p className="text-4xl font-bold text-white">32s</p>
                                <p className="text-sm text-gray-500 mt-2">Average per call</p>
                            </div>

                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <p className="text-sm font-medium text-gray-400 mb-2">Call Latency</p>
                                <p className="text-4xl font-bold text-white">2058ms</p>
                                <div className="flex items-center mt-2 text-sm text-red-400">
                                    <TrendingDown className="w-4 h-4 mr-1 rotate-180" />
                                    <span>+12% vs last period</span>
                                </div>
                            </div>
                        </div>

                        {/* Call Counts Chart */}
                        <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 mb-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Call Counts Over Time</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <AreaChart data={callCountsData}>
                                    <defs>
                                        <linearGradient id="callGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="date" stroke="#9ca3af" />
                                    <YAxis stroke="#9ca3af" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="calls" stroke="#3b82f6" fillOpacity={1} fill="url(#callGradient)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Donut Charts Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Call Success/Fail</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={callSuccessDonut}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {callSuccessDonut.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex justify-center gap-4 mt-4">
                                    {callSuccessDonut.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-xs text-gray-400">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Disconnection Reason</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={disconnectionDonut}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {disconnectionDonut.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex justify-center gap-4 mt-4">
                                    {disconnectionDonut.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-xs text-gray-400">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">User Sentiment</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={sentimentDonut}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {sentimentDonut.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex justify-center gap-4 mt-4">
                                    {sentimentDonut.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-xs text-gray-400">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Agents Tab */}
                {activeTab === 'agents' && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            {/* Call Successful by Agent */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Call Successful</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={agentSuccessData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis type="number" stroke="#9ca3af" />
                                        <YAxis dataKey="agent" type="category" width={120} stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="calls" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Call Picked Up Rate by Agent */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Call Picked Up Rate</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={agentPickupData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis type="number" stroke="#9ca3af" />
                                        <YAxis dataKey="agent" type="category" width={120} stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="rate" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Call Transfer Rate by Agent */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Call Transfer Rate</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={agentTransferData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis type="number" stroke="#9ca3af" />
                                        <YAxis dataKey="agent" type="category" width={120} stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="rate" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            {/* Call Picked Up Rate Over Time */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Call Picked Up Rate</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={rateTimeSeriesData}>
                                        <defs>
                                            <linearGradient id="pickupGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="pickup" stroke="#60a5fa" fillOpacity={1} fill="url(#pickupGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Call Successful Rate Over Time */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Call Successful Rate</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={rateTimeSeriesData}>
                                        <defs>
                                            <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="success" stroke="#60a5fa" fillOpacity={1} fill="url(#successGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Call Transfer Rate Over Time */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Call Transfer Rate</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={rateTimeSeriesData}>
                                        <defs>
                                            <linearGradient id="transferGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="transfer" stroke="#60a5fa" fillOpacity={1} fill="url(#transferGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Voicemail Rate Over Time */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Voicemail Rate</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={rateTimeSeriesData}>
                                        <defs>
                                            <linearGradient id="voicemailGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="voicemail" stroke="#60a5fa" fillOpacity={1} fill="url(#voicemailGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Average Call Duration Over Time */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Average Call Duration</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={performanceData}>
                                        <defs>
                                            <linearGradient id="durationGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="duration" stroke="#60a5fa" fillOpacity={1} fill="url(#durationGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Average Latency Over Time */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Average Latency</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={performanceData}>
                                        <defs>
                                            <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="latency" stroke="#60a5fa" fillOpacity={1} fill="url(#latencyGradient)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                )}

                {/* Sentiment Tab */}
                {activeTab === 'sentiment' && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Call Disposition */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Call Successful</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={dispositionData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="successful" stackId="a" fill="#06b6d4" />
                                        <Bar dataKey="unknown" stackId="a" fill="#f97316" />
                                        <Bar dataKey="unsuccessful" stackId="a" fill="#ef4444" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Disconnection Reason */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Disconnection Reason</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={disconnectionData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="agentHangup" stackId="a" fill="#8b5cf6" />
                                        <Bar dataKey="callTransfer" stackId="a" fill="#3b82f6" />
                                        <Bar dataKey="other" stackId="a" fill="#10b981" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {/* User Sentiment */}
                            <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">User Sentiment</h3>
                                <p className="text-xs text-gray-400 mb-4">All agents</p>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={sentimentData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="negative" stackId="a" fill="#ef4444" />
                                        <Bar dataKey="neutral" stackId="a" fill="#f97316" />
                                        <Bar dataKey="positive" stackId="a" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CallAnalysis;
