import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star, Download, Zap, MessageCircle, Clock, TrendingUp, BarChart, Database, Lightbulb, FlaskConical, GitCompare, History, Target, Search, Trash2, Copy, Edit, ChevronDown, Upload, Folder, Eye, Archive, Info, AlertTriangle, CheckCircle, AlertCircle, Sparkles, Play, RotateCcw } from 'lucide-react';

const RLHFCRMInterface = ({ onLogout, onViewChange }) => {
    const [selectedModel, setSelectedModel] = useState('CRM Assistant v2.1 (85.2%)');
    const [selectedView, setSelectedView] = useState('feedback-review');
    const [isTraining, setIsTraining] = useState(false);

    const [trainingHistory] = useState([
        {
            id: 1,
            date: "2024-09-28 10:00",
            accuracy: 85.2,
            feedbackItems: 243,
            improvement: 2.1,
            isCurrent: true
        },
        {
            id: 2,
            date: "2024-09-25 09:30",
            accuracy: 83.1,
            feedbackItems: 198,
            improvement: 1.8
        },
        {
            id: 3,
            date: "2024-09-22 14:15",
            accuracy: 81.3,
            feedbackItems: 312,
            improvement: 3.2
        },
        {
            id: 4,
            date: "2024-09-19 11:45",
            accuracy: 78.1,
            feedbackItems: 276,
            improvement: 2.7
        }
    ]);

    const [insights] = useState([
        {
            id: 1,
            type: 'warning',
            title: 'Sales category responses have 15% lower ratings than average',
            suggestion: 'Review sales training data',
            color: 'yellow'
        },
        {
            id: 2,
            type: 'success',
            title: 'Technical responses improved 8% after last training',
            suggestion: 'Continue current approach',
            color: 'green'
        },
        {
            id: 3,
            type: 'info',
            title: '32 responses flagged for review in the past week',
            suggestion: 'Schedule review session',
            color: 'blue'
        },
        {
            id: 4,
            type: 'insight',
            title: 'Responses with specific timelines receive 23% higher ratings',
            suggestion: 'Update response templates',
            color: 'purple'
        }
    ]);

    const [datasets] = useState([
        {
            id: 1,
            name: "Customer Support Q3 2024",
            description: "Customer support interactions from July-September 2024",
            tags: ["billing", "technical", "sales"],
            items: 1247,
            size: "2.4 MB",
            created: "2024-07-01",
            modified: "2024-09-29",
            status: "active"
        },
        {
            id: 2,
            name: "Technical Support Dataset",
            description: "Technical troubleshooting conversations",
            tags: ["technical"],
            items: 523,
            size: "1.1 MB",
            created: "2024-08-15",
            modified: "2024-09-28",
            status: "active"
        },
        {
            id: 3,
            name: "Sales Training Data",
            description: "Sales and upgrade conversation examples",
            tags: ["sales"],
            items: 342,
            size: "850 KB",
            created: "2024-09-01",
            modified: "2024-09-25",
            status: "archived"
        },
        {
            id: 4,
            name: "Billing Support Archive",
            description: "Historical billing support data",
            tags: ["billing"],
            items: 891,
            size: "1.8 MB",
            created: "2024-06-01",
            modified: "2024-08-30",
            status: "archived"
        }
    ]);

    const [feedbackData] = useState([
        {
            id: 1,
            customerName: "John Smith",
            timestamp: "2024-09-29 14:30",
            sentiment: "neutral",
            rating: 4,
            status: "reviewed",
            tags: ["#refund", "#duplicate-charge"],
            query: "I need help with my billing issue. My account was charged twice.",
            aiResponse: "I understand your concern about the duplicate charge. Let me help you resolve this. I can see your account and will process a refund for the duplicate charge within 2-3 business days.",
            humanFeedback: "positive"
        },
        {
            id: 2,
            customerName: "Sarah Johnson",
            timestamp: "2024-09-29 13:15",
            sentiment: "positive",
            rating: 2,
            status: "pending",
            tags: ["#upgrade", "#pricing"],
            query: "Can you upgrade my plan to premium?",
            aiResponse: "I'd be happy to help you upgrade to premium. The premium plan includes advanced analytics, priority support, and additional storage. Would you like me to process this upgrade now?",
            humanFeedback: "negative"
        }
    ]);

    const menuItems = [
        { id: 'feedback-review', icon: MessageCircle, label: 'Feedback Review' },
        { id: 'datasets', icon: Database, label: 'Datasets' },
        { id: 'ai-insights', icon: Lightbulb, label: 'AI Insights' },
        { id: 'ab-testing', icon: FlaskConical, label: 'A/B Testing' },
        { id: 'training-metrics', icon: BarChart, label: 'Training Metrics' },
        { id: 'model-comparison', icon: GitCompare, label: 'Model Comparison' },
        { id: 'training-history', icon: History, label: 'Training History' },
        { id: 'performance-goals', icon: Target, label: 'Performance Goals' }
    ];

    const startTraining = () => {
        setIsTraining(true);
        setTimeout(() => {
            setIsTraining(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#1a1d29] flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#2a2d3a] border-r border-gray-700 flex-shrink-0">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-white mb-1">RLHF Training Center</h1>
                    <p className="text-xs text-gray-400">Reinforce AI learning through human feedback</p>
                </div>

                <nav className="px-3">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = selectedView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelectedView(item.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Header */}
                <div className="bg-[#2a2d3a] border-b border-gray-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            {selectedView === 'feedback-review' ? 'Human Feedback Review' :
                                selectedView === 'datasets' ? 'Training Datasets' :
                                    selectedView === 'ai-insights' ? 'AI-Powered Insights' :
                                        selectedView === 'training-metrics' ? 'Training Metrics' :
                                            selectedView === 'ab-testing' ? 'A/B Testing Results' :
                                                selectedView === 'training-history' ? 'Training History' :
                                                    selectedView === 'performance-goals' ? 'Performance Goals' :
                                                        selectedView === 'model-comparison' ? 'Model Comparison' :
                                                            'RLHF Training Center'}
                        </h2>
                        <div className="flex items-center space-x-3">
                            {selectedView === 'training-history' && (
                                <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-sm">
                                    <RotateCcw size={16} />
                                    <span>Click revert to restore a previous model</span>
                                </button>
                            )}
                            {selectedView === 'ab-testing' && (
                                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                                    <Play size={16} />
                                    <span>Start New Test</span>
                                </button>
                            )}
                            {selectedView === 'datasets' && (
                                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                                    <Upload size={16} />
                                    <span>Upload Dataset</span>
                                </button>
                            )}
                            {selectedView === 'feedback-review' && (
                                <>
                                    <button className="flex items-center space-x-2 border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-300 text-sm">
                                        <Download size={16} />
                                        <span>Export</span>
                                    </button>
                                    <select
                                        value={selectedModel}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                        className="bg-[#1a1d29] border border-gray-600 text-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    >
                                        <option>CRM Assistant v2.1 (85.2%)</option>
                                        <option>CRM Assistant v2.0 (82.7%)</option>
                                        <option>Experimental v3.0 (87.1%)</option>
                                    </select>
                                    <button
                                        onClick={startTraining}
                                        disabled={isTraining}
                                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
                                    >
                                        <Zap size={16} />
                                        <span>{isTraining ? 'Training...' : 'Start Training'}</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Controls Bar - Only show for Feedback Review */}
                {selectedView === 'feedback-review' && (
                    <div className="bg-[#2a2d3a] border-b border-gray-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search feedback..."
                                        className="w-full bg-[#1a1d29] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <select className="bg-[#1a1d29] border border-gray-600 text-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                    <option>All Feedback</option>
                                    <option>Positive</option>
                                    <option>Negative</option>
                                    <option>Neutral</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className="flex items-center space-x-2 bg-[#1a1d29] border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-300 text-sm">
                                    <Trash2 size={16} />
                                    <span>Bulk Delete</span>
                                </button>
                                <button className="flex items-center space-x-2 bg-[#1a1d29] border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-300 text-sm">
                                    <GitCompare size={16} />
                                    <span>Compare</span>
                                </button>
                                <button
                                    onClick={() => setSelectedView('ab-testing')}
                                    className="flex items-center space-x-2 bg-[#1a1d29] border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-300 text-sm"
                                >
                                    <FlaskConical size={16} />
                                    <span>A/B Mode</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <div className="px-6 py-6">
                    {selectedView === 'model-comparison' ? (
                        /* Model Comparison View */
                        <>
                            {/* Comparison Table */}
                            <div className="bg-[#2a2d3a] rounded-lg border border-gray-700 overflow-hidden mb-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left p-4 text-sm font-medium text-gray-400">Metric</th>
                                                <th className="text-center p-4 text-sm font-medium text-blue-400">
                                                    <div>CRM Assistant v2.1</div>
                                                    <div className="text-xs text-gray-400 font-normal mt-1">(Current)</div>
                                                </th>
                                                <th className="text-center p-4 text-sm font-medium text-green-400">
                                                    <div>Experimental v3.0</div>
                                                    <div className="text-xs text-gray-400 font-normal mt-1">(Testing)</div>
                                                </th>
                                                <th className="text-center p-4 text-sm font-medium text-gray-400">
                                                    <div>CRM Assistant v2.0</div>
                                                    <div className="text-xs text-gray-400 font-normal mt-1">(Previous)</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 text-sm text-gray-300">Overall Accuracy</td>
                                                <td className="p-4 text-center">
                                                    <span className="text-blue-400 font-semibold">85.2%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-green-400 font-semibold">87.1%</span>
                                                    <span className="text-xs text-green-400 ml-2">↑ 1.9%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-gray-400 font-semibold">82.7%</span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 text-sm text-gray-300">Positive Feedback Rate</td>
                                                <td className="p-4 text-center">
                                                    <span className="text-blue-400 font-semibold">78%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-green-400 font-semibold">82%</span>
                                                    <span className="text-xs text-green-400 ml-2">↑ 4%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-gray-400 font-semibold">75%</span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 text-sm text-gray-300">Average Response Time</td>
                                                <td className="p-4 text-center">
                                                    <span className="text-blue-400 font-semibold">2.1s</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-green-400 font-semibold">1.8s</span>
                                                    <span className="text-xs text-green-400 ml-2">↓ 0.3s</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-gray-400 font-semibold">2.4s</span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 text-sm text-gray-300">Escalation Rate</td>
                                                <td className="p-4 text-center">
                                                    <span className="text-blue-400 font-semibold">8.5%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-green-400 font-semibold">6.2%</span>
                                                    <span className="text-xs text-green-400 ml-2">↓ 2.3%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-gray-400 font-semibold">9.8%</span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 text-sm text-gray-300">Technical Help Accuracy</td>
                                                <td className="p-4 text-center">
                                                    <span className="text-blue-400 font-semibold">92%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-green-400 font-semibold">94%</span>
                                                    <span className="text-xs text-green-400 ml-2">↑ 2%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-gray-400 font-semibold">89%</span>
                                                </td>
                                            </tr>
                                            <tr className="border-b border-gray-700">
                                                <td className="p-4 text-sm text-gray-300">Billing Support Accuracy</td>
                                                <td className="p-4 text-center">
                                                    <span className="text-blue-400 font-semibold">85%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-green-400 font-semibold">88%</span>
                                                    <span className="text-xs text-green-400 ml-2">↑ 3%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-gray-400 font-semibold">83%</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-sm text-gray-300">Sales Query Accuracy</td>
                                                <td className="p-4 text-center">
                                                    <span className="text-blue-400 font-semibold">78%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-green-400 font-semibold">81%</span>
                                                    <span className="text-xs text-green-400 ml-2">↑ 3%</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className="text-gray-400 font-semibold">76%</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Summary Cards */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-[#2a2d3a] rounded-lg p-6 border border-blue-700/50">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <h3 className="font-semibold text-white">CRM Assistant v2.1</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Status:</span>
                                            <span className="text-blue-400 font-medium">Production</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Trained:</span>
                                            <span className="text-gray-200">Sep 28, 2024</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Training Data:</span>
                                            <span className="text-gray-200">1,247 items</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#2a2d3a] rounded-lg p-6 border border-green-700/50">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <h3 className="font-semibold text-white">Experimental v3.0</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Status:</span>
                                            <span className="text-green-400 font-medium">A/B Testing</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Trained:</span>
                                            <span className="text-gray-200">Oct 5, 2024</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Training Data:</span>
                                            <span className="text-gray-200">1,870 items</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#2a2d3a] rounded-lg p-6 border border-gray-700">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                        <h3 className="font-semibold text-white">CRM Assistant v2.0</h3>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Status:</span>
                                            <span className="text-gray-400 font-medium">Archived</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Trained:</span>
                                            <span className="text-gray-200">Sep 15, 2024</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Training Data:</span>
                                            <span className="text-gray-200">1,053 items</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : selectedView === 'performance-goals' ? (
                        /* Performance Goals View */
                        <>
                            {/* Goals Progress */}
                            <div className="space-y-6 mb-6">
                                {/* Overall Accuracy Target */}
                                <div className="bg-[#2a2d3a] rounded-lg p-5 border border-gray-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-base font-medium text-white">Overall Accuracy Target</h3>
                                        <span className="text-sm text-gray-400">85.2% / 90%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '94.7%' }}></div>
                                    </div>
                                    <p className="text-xs text-blue-400">4.8% to goal</p>
                                </div>

                                {/* Positive Feedback Rate */}
                                <div className="bg-[#2a2d3a] rounded-lg p-5 border border-gray-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-base font-medium text-white">Positive Feedback Rate</h3>
                                        <span className="text-sm text-gray-400">78% / 85%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '91.8%' }}></div>
                                    </div>
                                    <p className="text-xs text-green-400">7% to goal</p>
                                </div>

                                {/* Escalation Rate */}
                                <div className="bg-[#2a2d3a] rounded-lg p-5 border border-gray-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-base font-medium text-white">Escalation Rate (Lower is better)</h3>
                                        <span className="text-sm text-gray-400">8.5% / 5%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                                        <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '58.8%' }}></div>
                                    </div>
                                    <p className="text-xs text-yellow-400">Need to reduce by 3.5%</p>
                                </div>

                                {/* Average Response Time */}
                                <div className="bg-[#2a2d3a] rounded-lg p-5 border border-gray-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-base font-medium text-white">Average Response Time</h3>
                                        <span className="text-sm text-gray-400">2.1s / 1.5s</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '71.4%' }}></div>
                                    </div>
                                    <p className="text-xs text-purple-400">0.6s improvement needed</p>
                                </div>
                            </div>

                            {/* Projected Timeline */}
                            <div className="bg-[#2a2d3a] rounded-lg p-6 border border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4">Projected Timeline</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-4 bg-[#1a1d29] rounded-lg border border-blue-700/50">
                                        <span className="text-sm text-blue-100">Accuracy Goal (90%)</span>
                                        <span className="text-sm text-blue-400">~3 training cycles (3 weeks)</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-[#1a1d29] rounded-lg border border-green-700/50">
                                        <span className="text-sm text-green-100">Positive Rate Goal (85%)</span>
                                        <span className="text-sm text-green-400">~4 training cycles (4 weeks)</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-[#1a1d29] rounded-lg border border-orange-700/50">
                                        <span className="text-sm text-orange-100">Escalation Goal (5%)</span>
                                        <span className="text-sm text-orange-400">~6 training cycles (6 weeks)</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : selectedView === 'training-history' ? (
                        /* Training History View */
                        <>
                            {/* History Entries */}
                            <div className="space-y-4 mb-6">
                                {trainingHistory.map(entry => (
                                    <div key={entry.id} className="bg-[#2a2d3a] rounded-lg p-5 border border-blue-700/50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <h3 className="text-base font-semibold text-white">{entry.date}</h3>
                                                    {entry.isCurrent && (
                                                        <span className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">
                                                            Current Model
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                    <span>Final Accuracy: <span className="text-white font-medium">{entry.accuracy}%</span></span>
                                                    <span>Feedback: <span className="text-white font-medium">{entry.feedbackItems} items</span></span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className="text-green-400 font-semibold text-sm">+{entry.improvement}%</span>
                                                <CheckCircle className="text-green-400" size={20} />
                                                {!entry.isCurrent && (
                                                    <button className="flex items-center space-x-2 bg-[#1a1d29] border border-gray-600 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 text-sm">
                                                        <RotateCcw size={14} />
                                                        <span>Revert</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-5 flex items-start space-x-3">
                                <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h3 className="text-sm font-semibold text-blue-100 mb-2">About Model Reverting</h3>
                                    <p className="text-sm text-gray-300">
                                        Reverting allows you to rollback to a previous training checkpoint if the latest model isn't performing as expected. This is useful for maintaining service quality while you investigate issues with newer versions.
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : selectedView === 'ab-testing' ? (
                        /* A/B Testing View */
                        <>
                            {/* Comparison Cards */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                {/* Current Model - Model A */}
                                <div className="bg-[#2a2d3a] rounded-lg p-6 border border-blue-700/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-gray-400">Current Model</h3>
                                        <span className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium">Model A</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-xs text-gray-400 block mb-1">Win Rate</span>
                                            <span className="text-4xl font-bold text-blue-400">45%</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400 block mb-1">Average Rating</span>
                                            <span className="text-2xl font-bold text-gray-200">3.8/5</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400 block mb-1">Sample Size</span>
                                            <span className="text-lg font-medium text-gray-300">500</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Experimental Model - Model B */}
                                <div className="bg-[#2a2d3a] rounded-lg p-6 border border-green-700/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-gray-400">Experimental v3</h3>
                                        <span className="px-3 py-1 bg-green-600 text-white rounded text-xs font-medium">Model B</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-xs text-gray-400 block mb-1">Win Rate</span>
                                            <span className="text-4xl font-bold text-green-400">55%</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400 block mb-1">Average Rating</span>
                                            <span className="text-2xl font-bold text-gray-200">4.2/5</span>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-400 block mb-1">Sample Size</span>
                                            <span className="text-lg font-medium text-gray-300">500</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Statistical Significance */}
                            <div className="bg-[#2a2d3a] rounded-lg p-6 border border-purple-700/50 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-purple-300 mb-1">Statistical Significance</h3>
                                        <p className="text-xs text-gray-400">Confidence level in results</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-4xl font-bold text-purple-400">95%</div>
                                        <div className="text-xs text-purple-300 font-medium">Significant</div>
                                    </div>
                                </div>
                            </div>

                            {/* Recommendation */}
                            <div className="bg-green-900/20 rounded-lg p-5 border border-green-700/50 flex items-start space-x-3">
                                <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h3 className="text-sm font-semibold text-green-100 mb-2">Recommendation</h3>
                                    <p className="text-sm text-gray-300">
                                        Model B (Experimental v3) shows statistically significant improvement with a 10% higher win rate and 0.4 point improvement in average ratings. Consider promoting to production.
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : selectedView === 'training-metrics' ? (
                        /* Training Metrics View */
                        <div className="grid grid-cols-2 gap-6">
                            {/* Model Accuracy */}
                            <div className="bg-[#2a2d3a] rounded-lg p-6 border border-blue-700/50">
                                <h3 className="text-sm font-medium text-gray-400 mb-2">Model Accuracy</h3>
                                <div className="flex items-end space-x-2 mb-3">
                                    <span className="text-4xl font-bold text-blue-400">85.2%</span>
                                    <span className="text-sm text-green-400 font-medium mb-2">+12.4%</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85.2%' }}></div>
                                </div>
                            </div>

                            {/* Training Status */}
                            <div className="bg-[#2a2d3a] rounded-lg p-6 border border-orange-700/50">
                                <h3 className="text-sm font-medium text-gray-400 mb-4">Training Status</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Last Training:</span>
                                        <span className="text-gray-200">2024-09-28 10:00</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Next Scheduled:</span>
                                        <span className="text-gray-200">2024-09-30 08:00</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Status:</span>
                                        <span className="px-3 py-1 bg-green-600 text-white rounded text-xs font-medium">Ready</span>
                                    </div>
                                </div>
                            </div>

                            {/* Response Quality */}
                            <div className="bg-[#2a2d3a] rounded-lg p-6 border border-green-700/50">
                                <h3 className="text-sm font-medium text-gray-400 mb-4">Response Quality</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Helpful Responses</span>
                                        <span className="text-green-400 font-medium">82%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Accurate Information</span>
                                        <span className="text-green-400 font-medium">91%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Appropriate Tone</span>
                                        <span className="text-green-400 font-medium">88%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Category Performance */}
                            <div className="bg-[#2a2d3a] rounded-lg p-6 border border-purple-700/50">
                                <h3 className="text-sm font-medium text-gray-400 mb-4">Category Performance</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Billing Support</span>
                                        <span className="text-purple-400 font-medium">85%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Technical Help</span>
                                        <span className="text-purple-400 font-medium">92%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">Sales Queries</span>
                                        <span className="text-purple-400 font-medium">78%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : selectedView === 'ai-insights' ? (
                        /* AI Insights View */
                        <>
                            {/* Insights Cards */}
                            <div className="space-y-4 mb-6">
                                {insights.map(insight => (
                                    <div key={insight.id} className={`bg-[#2a2d3a] rounded-lg p-5 border-l-4 ${insight.color === 'yellow' ? 'border-yellow-500 bg-yellow-900/10' :
                                        insight.color === 'green' ? 'border-green-500 bg-green-900/10' :
                                            insight.color === 'blue' ? 'border-blue-500 bg-blue-900/10' :
                                                'border-purple-500 bg-purple-900/10'
                                        }`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3 flex-1">
                                                {insight.color === 'yellow' && <AlertTriangle className="text-yellow-400 flex-shrink-0 mt-1" size={20} />}
                                                {insight.color === 'green' && <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />}
                                                {insight.color === 'blue' && <AlertCircle className="text-blue-400 flex-shrink-0 mt-1" size={20} />}
                                                {insight.color === 'purple' && <Sparkles className="text-purple-400 flex-shrink-0 mt-1" size={20} />}
                                                <div className="flex-1">
                                                    <h3 className={`font-semibold text-base mb-2 ${insight.color === 'yellow' ? 'text-yellow-100' :
                                                        insight.color === 'green' ? 'text-green-100' :
                                                            insight.color === 'blue' ? 'text-blue-100' :
                                                                'text-purple-100'
                                                        }`}>
                                                        {insight.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-400">
                                                        Suggested action: {insight.suggestion}
                                                    </p>
                                                </div>
                                            </div>
                                            <button className={`text-sm font-medium hover:underline flex-shrink-0 ml-4 ${insight.color === 'yellow' ? 'text-yellow-400' :
                                                insight.color === 'green' ? 'text-green-400' :
                                                    insight.color === 'blue' ? 'text-blue-400' :
                                                        'text-purple-400'
                                                }`}>
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pattern Recognition */}
                            <div className="bg-[#2a2d3a] rounded-lg border border-gray-700 p-6">
                                <h3 className="text-lg font-semibold text-white mb-6">Pattern Recognition</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {/* Success Patterns */}
                                    <div className="bg-blue-900/20 rounded-lg p-5 border border-blue-700/50">
                                        <h4 className="font-semibold text-blue-100 mb-4">Common Success Patterns</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start space-x-2">
                                                <span className="text-blue-400 mt-1">•</span>
                                                <span className="text-gray-300">
                                                    Responses with specific timelines <span className="text-blue-400 font-medium">(92% positive)</span>
                                                </span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-blue-400 mt-1">•</span>
                                                <span className="text-gray-300">
                                                    Proactive troubleshooting steps <span className="text-blue-400 font-medium">(88% positive)</span>
                                                </span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-blue-400 mt-1">•</span>
                                                <span className="text-gray-300">
                                                    Empathetic acknowledgment <span className="text-blue-400 font-medium">(85% positive)</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Failure Patterns */}
                                    <div className="bg-red-900/20 rounded-lg p-5 border border-red-700/50">
                                        <h4 className="font-semibold text-red-100 mb-4">Common Failure Patterns</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start space-x-2">
                                                <span className="text-red-400 mt-1">•</span>
                                                <span className="text-gray-300">
                                                    Missing pricing information <span className="text-red-400 font-medium">(68% negative)</span>
                                                </span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-red-400 mt-1">•</span>
                                                <span className="text-gray-300">
                                                    Vague next steps <span className="text-red-400 font-medium">(71% negative)</span>
                                                </span>
                                            </li>
                                            <li className="flex items-start space-x-2">
                                                <span className="text-red-400 mt-1">•</span>
                                                <span className="text-gray-300">
                                                    Generic responses <span className="text-red-400 font-medium">(65% negative)</span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : selectedView === 'datasets' ? (
                        /* Datasets View */
                        <>
                            {/* Info Message */}
                            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 mb-6 flex items-start space-x-3">
                                <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-sm text-blue-200">
                                    Manage your training datasets. You can archive unused datasets or permanently delete them to free up space.
                                </p>
                            </div>

                            {/* Dataset Cards */}
                            <div className="space-y-4 mb-6">
                                {datasets.map(dataset => (
                                    <div key={dataset.id} className="bg-[#2a2d3a] rounded-lg p-5 border border-gray-700">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-start space-x-3 flex-1">
                                                <Folder className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="font-semibold text-white text-base">{dataset.name}</h3>
                                                        <span className={`px-2.5 py-0.5 rounded text-xs font-medium ${dataset.status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'
                                                            }`}>
                                                            {dataset.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-400 mb-3">{dataset.description}</p>
                                                    <div className="flex items-center space-x-2">
                                                        {dataset.tags.map((tag, idx) => (
                                                            <span key={idx} className={`px-2.5 py-0.5 rounded text-xs font-medium ${tag === 'billing' ? 'bg-purple-600 text-white' :
                                                                tag === 'technical' ? 'bg-blue-600 text-white' :
                                                                    'bg-green-600 text-white'
                                                                }`}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                                            <div>
                                                <span className="text-gray-400 block mb-1">Items:</span>
                                                <span className="text-white font-medium">{dataset.items.toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block mb-1">Size:</span>
                                                <span className="text-white font-medium">{dataset.size}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block mb-1">Created:</span>
                                                <span className="text-white font-medium">{dataset.created}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-400 block mb-1">Modified:</span>
                                                <span className="text-white font-medium">{dataset.modified}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 pt-4 border-t border-gray-700">
                                            <button className="flex items-center space-x-2 bg-[#1a1d29] border border-gray-600 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 text-sm">
                                                <Archive size={14} />
                                                <span>{dataset.status === 'active' ? 'Archive' : 'Activate'}</span>
                                            </button>
                                            <button className="flex items-center space-x-2 bg-[#1a1d29] border border-gray-600 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 text-sm">
                                                <Download size={14} />
                                                <span>Export</span>
                                            </button>
                                            <button className="flex items-center space-x-2 bg-[#1a1d29] border border-gray-600 px-3 py-2 rounded-lg hover:bg-gray-700 text-gray-300 text-sm">
                                                <Eye size={14} />
                                                <span>View Items</span>
                                            </button>
                                            <button className="flex items-center space-x-2 bg-red-600/20 border border-red-600 px-3 py-2 rounded-lg hover:bg-red-600/30 text-red-400 text-sm ml-auto">
                                                <Trash2 size={14} />
                                                <span>Delete Dataset</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Summary Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-[#2a2d3a] rounded-lg p-4 border border-blue-500/30">
                                    <span className="text-sm text-gray-400 block mb-2">Total Datasets</span>
                                    <p className="text-3xl font-bold text-blue-400">{datasets.length}</p>
                                </div>
                                <div className="bg-[#2a2d3a] rounded-lg p-4 border border-green-500/30">
                                    <span className="text-sm text-gray-400 block mb-2">Active Datasets</span>
                                    <p className="text-3xl font-bold text-green-400">
                                        {datasets.filter(d => d.status === 'active').length}
                                    </p>
                                </div>
                                <div className="bg-[#2a2d3a] rounded-lg p-4 border border-purple-500/30">
                                    <span className="text-sm text-gray-400 block mb-2">Total Items</span>
                                    <p className="text-3xl font-bold text-purple-400">
                                        {datasets.reduce((sum, d) => sum + d.items, 0).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Feedback Review View */
                        <>
                            {/* Stats */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="bg-[#2a2d3a] rounded-lg p-4 border border-blue-500/30">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <MessageCircle className="text-blue-400" size={20} />
                                        <span className="text-xs font-medium text-gray-400">Total Feedback</span>
                                    </div>
                                    <p className="text-3xl font-bold text-blue-400">1247</p>
                                </div>
                                <div className="bg-[#2a2d3a] rounded-lg p-4 border border-green-500/30">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <ThumbsUp className="text-green-400" size={20} />
                                        <span className="text-xs font-medium text-gray-400">Positive Rate</span>
                                    </div>
                                    <p className="text-3xl font-bold text-green-400">78%</p>
                                </div>
                                <div className="bg-[#2a2d3a] rounded-lg p-4 border border-yellow-500/30">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Clock className="text-yellow-400" size={20} />
                                        <span className="text-xs font-medium text-gray-400">Avg Response</span>
                                    </div>
                                    <p className="text-3xl font-bold text-yellow-400">2.1s</p>
                                </div>
                                <div className="bg-[#2a2d3a] rounded-lg p-4 border border-red-500/30">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <TrendingUp className="text-red-400" size={20} />
                                        <span className="text-xs font-medium text-gray-400">Escalation Rate</span>
                                    </div>
                                    <p className="text-3xl font-bold text-red-400">8.5%</p>
                                </div>
                            </div>

                            {/* Feedback List */}
                            <div className="space-y-4">
                                {feedbackData.map(item => (
                                    <div key={item.id} className="bg-[#2a2d3a] rounded-lg p-5 border border-gray-700">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <h3 className="font-semibold text-white text-base">{item.customerName}</h3>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${item.sentiment === 'neutral' ? 'bg-gray-600 text-gray-200' :
                                                        item.sentiment === 'positive' ? 'bg-green-600 text-green-100' :
                                                            'bg-red-600 text-red-100'
                                                        }`}>
                                                        {item.sentiment}
                                                    </span>
                                                    <span className="text-gray-500 text-xs">{item.rating}/5</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-400 text-xs">{item.timestamp}</span>
                                                    {item.tags.map((tag, idx) => (
                                                        <span key={idx} className="text-gray-400 text-xs">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-3 py-1 rounded text-xs font-medium ${item.status === 'reviewed' ? 'bg-blue-600 text-white' :
                                                    item.status === 'pending' ? 'bg-orange-600 text-white' :
                                                        'bg-green-600 text-white'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                                <span className={`px-3 py-1 rounded text-xs font-medium ${item.tags.includes('#refund') ? 'bg-purple-600 text-white' :
                                                    'bg-green-600 text-white'
                                                    }`}>
                                                    {item.tags.includes('#refund') ? 'billing' : 'sales'}
                                                </span>
                                                <button className="p-1 hover:bg-gray-600 rounded">
                                                    <Trash2 size={16} className="text-gray-400" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm font-medium text-gray-300 mb-2">Customer Query:</p>
                                            <p className="text-sm text-gray-400 bg-[#1a1d29] p-3 rounded-lg">{item.query}</p>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="text-sm font-medium text-gray-300">AI Response:</p>
                                                <button className="flex items-center space-x-1 text-gray-400 hover:text-gray-300 text-xs">
                                                    <Copy size={14} />
                                                    <span>Copy</span>
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-400 bg-[#1a1d29] p-3 rounded-lg">{item.aiResponse}</p>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                                            <div className="flex items-center space-x-2">
                                                <button className={`p-2 rounded-lg ${item.humanFeedback === 'positive'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-[#1a1d29] text-gray-400 hover:bg-gray-700'
                                                    }`}>
                                                    <ThumbsUp size={16} />
                                                </button>
                                                <button className={`p-2 rounded-lg ${item.humanFeedback === 'negative'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-[#1a1d29] text-gray-400 hover:bg-gray-700'
                                                    }`}>
                                                    <ThumbsDown size={16} />
                                                </button>
                                                <div className="flex items-center space-x-1 ml-4">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <Star
                                                            key={star}
                                                            size={16}
                                                            className={star <= item.rating ? 'text-yellow-400' : 'text-gray-600'}
                                                            fill={star <= item.rating ? 'currentColor' : 'none'}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <button className="text-gray-400 hover:text-gray-300 text-sm">
                                                    ? Annotate
                                                </button>
                                                <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm">
                                                    <Edit size={14} />
                                                    <span>Edit</span>
                                                    <ChevronDown size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RLHFCRMInterface;
