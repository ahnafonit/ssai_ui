import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Users, Zap, Brain, Clock as ClockIcon, DollarSign, AlertCircle, Send, X } from 'lucide-react';
import Clock from './Clock';

const AIDashboard = ({ onViewChange, onLogout }) => {
    const [timeRange, setTimeRange] = useState('7d');
    const [showDeployModal, setShowDeployModal] = useState(false);
    const [deployForm, setDeployForm] = useState({
        modelName: '',
        provider: '',
        purpose: '',
        expectedUsage: '',
        salesRep: '',
        notes: ''
    });

    // Sample data for various charts
    const usageData = [
        { date: 'Mon', requests: 4200, tokens: 850000, cost: 124 },
        { date: 'Tue', requests: 5100, tokens: 1020000, cost: 156 },
        { date: 'Wed', requests: 4800, tokens: 960000, cost: 142 },
        { date: 'Thu', requests: 6200, tokens: 1240000, cost: 189 },
        { date: 'Fri', requests: 7100, tokens: 1420000, cost: 218 },
        { date: 'Sat', requests: 5400, tokens: 1080000, cost: 167 },
        { date: 'Sun', requests: 4600, tokens: 920000, cost: 138 },
    ];

    const modelPerformance = [
        { model: 'Sarah AI', accuracy: 94, latency: 1.2, usage: 45, salesRep: 'Sarah Johnson' },
        { model: 'Racheal AI', accuracy: 96, latency: 0.8, usage: 35, salesRep: 'Michael Chen' },
        { model: 'Nimo AI', accuracy: 91, latency: 1.5, usage: 12, salesRep: 'Emma Davis' },
        { model: 'Gem AI', accuracy: 88, latency: 0.6, usage: 8, salesRep: 'James Wilson' },
    ];

    const deploymentRequests = [
        { id: 1, modelName: 'GPT-4 Turbo', salesRep: 'Sarah Johnson', requestDate: '2024-10-05', status: 'Pending', purpose: 'Customer Support Automation' },
        { id: 2, modelName: 'Claude Opus', salesRep: 'Michael Chen', requestDate: '2024-10-04', status: 'Approved', purpose: 'Content Generation' },
        { id: 3, modelName: 'Gemini Pro', salesRep: 'Emma Davis', requestDate: '2024-10-03', status: 'In Progress', purpose: 'Data Analysis' },
        { id: 4, modelName: 'Custom LLM', salesRep: 'James Wilson', requestDate: '2024-10-02', status: 'Deployed', purpose: 'Legal Document Review' },
        { id: 5, modelName: 'GPT-4 Vision', salesRep: 'Sarah Johnson', requestDate: '2024-10-01', status: 'Pending', purpose: 'Image Recognition' },
    ];

    const errorData = [
        { name: 'Success', value: 94.5, color: '#10b981' },
        { name: 'Rate Limit', value: 2.8, color: '#f59e0b' },
        { name: 'Timeout', value: 1.5, color: '#ef4444' },
        { name: 'Other', value: 1.2, color: '#6b7280' },
    ];

    const responseTimeData = [
        { time: '00:00', p50: 0.8, p95: 2.1, p99: 3.5 },
        { time: '04:00', p50: 0.7, p95: 1.9, p99: 3.2 },
        { time: '08:00', p50: 1.2, p95: 2.8, p99: 4.1 },
        { time: '12:00', p50: 1.5, p95: 3.2, p99: 4.8 },
        { time: '16:00', p50: 1.4, p95: 3.0, p99: 4.5 },
        { time: '20:00', p50: 1.1, p95: 2.5, p99: 3.9 },
    ];

    const handleDeploySubmit = (e) => {
        e.preventDefault();
        console.log('Deploy request submitted:', deployForm);
        alert('AI Model deployment request submitted successfully!');
        setShowDeployModal(false);
        setDeployForm({
            modelName: '',
            provider: '',
            purpose: '',
            expectedUsage: '',
            salesRep: '',
            notes: ''
        });
    };

    const handleDeploy = (requestId, modelName) => {
        alert(`Deploying ${modelName} (Request #${requestId})...`);
        console.log('Deploying request:', requestId);
    };

    const handleFormChange = (e) => {
        setDeployForm({
            ...deployForm,
            [e.target.name]: e.target.value
        });
    };

    const StatCard = ({ icon: Icon, title, value, change, color }) => (
        <div className="bg-gray-800 rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-400 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-white">{value}</p>
                    <p className={`text-sm mt-2 flex items-center ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {change >= 0 ? '+' : ''}{change}% vs last period
                    </p>
                </div>
                <div className="bg-opacity-10 rounded-full p-3" style={{ backgroundColor: color }}>
                    <Icon className="w-8 h-8" style={{ color }} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">AI Analytics Dashboard</h1>
                            <p className="text-gray-400">Monitor your AI model performance and usage in real-time</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Clock />
                            {onViewChange && (
                                <button
                                    onClick={() => onViewChange('agent')}
                                    className="flex items-center space-x-2 border border-blue-600 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                                >
                                    <span>← Back to Agent</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Time Range Selector */}
                <div className="mb-6 flex gap-2">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${timeRange === range
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        icon={Activity}
                        title="Total Requests"
                        value="37.4K"
                        change={12.5}
                        color="#3b82f6"
                    />
                    <StatCard
                        icon={Brain}
                        title="Tokens Processed"
                        value="7.49M"
                        change={8.3}
                        color="#8b5cf6"
                    />
                    <StatCard
                        icon={ClockIcon}
                        title="Avg Response Time"
                        value="1.2s"
                        change={-5.2}
                        color="#10b981"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Usage Trend */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">API Usage Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={usageData}>
                                <defs>
                                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="date" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }} />
                                <Area type="monotone" dataKey="requests" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRequests)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Response Time */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Response Time Percentiles</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={responseTimeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="time" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" label={{ value: 'Seconds', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }} />
                                <Legend />
                                <Line type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={2} name="P50" />
                                <Line type="monotone" dataKey="p95" stroke="#f59e0b" strokeWidth={2} name="P95" />
                                <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} name="P99" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Model Performance */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Model Performance</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={modelPerformance}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="model" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }} />
                                <Legend />
                                <Bar dataKey="accuracy" fill="#8b5cf6" name="Accuracy %" />
                                <Bar dataKey="usage" fill="#3b82f6" name="Usage %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Error Distribution */}
                    <div className="bg-gray-800 rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Request Status Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={errorData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {errorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Model Details Table */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Model Details</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Model</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Accuracy</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Avg Latency</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Usage</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Sales Rep</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modelPerformance.map((model, index) => (
                                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                                        <td className="py-3 px-4 text-sm text-white font-medium">{model.model}</td>
                                        <td className="py-3 px-4 text-sm text-gray-300">{model.accuracy}%</td>
                                        <td className="py-3 px-4 text-sm text-gray-300">{model.latency}s</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full"
                                                        style={{ width: `${model.usage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-300">{model.usage}%</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-300">{model.salesRep}</td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Deployment Requests Table */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 mt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Request to Deploy</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Request ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Model Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Sales Rep</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Purpose</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Request Date</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Status</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deploymentRequests.map((request) => (
                                    <tr key={request.id} className="border-b border-gray-700 hover:bg-gray-700">
                                        <td className="py-3 px-4 text-sm text-white font-medium">#{request.id}</td>
                                        <td className="py-3 px-4 text-sm text-white font-medium">{request.modelName}</td>
                                        <td className="py-3 px-4 text-sm text-gray-300">{request.salesRep}</td>
                                        <td className="py-3 px-4 text-sm text-gray-300">{request.purpose}</td>
                                        <td className="py-3 px-4 text-sm text-gray-300">{request.requestDate}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${request.status === 'Deployed' ? 'bg-green-100 text-green-800' :
                                                request.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                                                    request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleDeploy(request.id, request.modelName)}
                                                disabled={request.status === 'Deployed'}
                                                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${request.status === 'Deployed'
                                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                            >
                                                Deploy
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Deploy Modal */}
                {showDeployModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-white">Request AI Model Deployment</h2>
                                <button
                                    onClick={() => setShowDeployModal(false)}
                                    className="text-gray-400 hover:text-gray-300 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleDeploySubmit} className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Model Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="modelName"
                                            value={deployForm.modelName}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="e.g., GPT-4, Claude, Custom Model"
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Provider *
                                        </label>
                                        <select
                                            name="provider"
                                            value={deployForm.provider}
                                            onChange={handleFormChange}
                                            required
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select Provider</option>
                                            <option value="OpenAI">OpenAI</option>
                                            <option value="Anthropic">Anthropic</option>
                                            <option value="Google">Google</option>
                                            <option value="Meta">Meta</option>
                                            <option value="Custom">Custom</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Purpose *
                                        </label>
                                        <textarea
                                            name="purpose"
                                            value={deployForm.purpose}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="Describe the use case for this AI model"
                                            rows="3"
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Expected Monthly Usage *
                                        </label>
                                        <input
                                            type="text"
                                            name="expectedUsage"
                                            value={deployForm.expectedUsage}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="e.g., 100K requests/month"
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Assigned Sales Rep *
                                        </label>
                                        <input
                                            type="text"
                                            name="salesRep"
                                            value={deployForm.salesRep}
                                            onChange={handleFormChange}
                                            required
                                            placeholder="e.g., Sarah Johnson"
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={deployForm.notes}
                                            onChange={handleFormChange}
                                            placeholder="Any additional information or requirements"
                                            rows="3"
                                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowDeployModal(false)}
                                        className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIDashboard;
