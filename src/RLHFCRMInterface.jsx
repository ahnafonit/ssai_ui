import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star, Download, Zap, RefreshCw, MessageCircle, Clock, CheckCircle, Flag } from 'lucide-react';

const RLHFCRMInterface = ({ onLogout, onViewChange }) => {
    const [selectedModel, setSelectedModel] = useState('model-v2.1');
    const [isTraining, setIsTraining] = useState(false);

    const [feedbackData] = useState([
        {
            id: 1,
            customerName: "John Smith",
            query: "I need help with my billing issue. My account was charged twice.",
            aiResponse: "I understand your concern about the duplicate charge. Let me help you resolve this. I can see your account and will process a refund for the duplicate charge within 2-3 business days.",
            humanFeedback: "positive",
            rating: 4,
            timestamp: "2024-09-29 14:30",
            category: "billing",
            status: "reviewed"
        },
        {
            id: 2,
            customerName: "Sarah Johnson",
            query: "Can you upgrade my plan to premium?",
            aiResponse: "I'd be happy to help you upgrade to premium. The premium plan includes advanced analytics, priority support, and additional storage. Would you like me to process this upgrade now?",
            humanFeedback: "negative",
            rating: 2,
            timestamp: "2024-09-29 13:15",
            category: "sales",
            status: "pending"
        },
        {
            id: 3,
            customerName: "Mike Davis",
            query: "How do I integrate your API with my website?",
            aiResponse: "To integrate our API, you'll need to obtain your API key from the developer dashboard, then use our REST endpoints.",
            humanFeedback: "positive",
            rating: 5,
            timestamp: "2024-09-29 12:45",
            category: "technical",
            status: "approved"
        }
    ]);

    const models = [
        { id: 'model-v2.1', name: 'CRM Assistant v2.1', accuracy: 85.2 },
        { id: 'model-v2.0', name: 'CRM Assistant v2.0', accuracy: 82.7 },
        { id: 'model-experimental', name: 'Experimental v3.0', accuracy: 87.1 }
    ];

    const startTraining = () => {
        setIsTraining(true);
        setTimeout(() => {
            setIsTraining(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="bg-gray-800 shadow-lg border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">RLHF Training Center</h1>
                            <p className="text-gray-400">Reinforce AI learning through human feedback</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 border border-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 text-gray-300">
                                <Download size={16} />
                                <span>Export</span>
                            </button>
                            <select
                                value={selectedModel}
                                onChange={(e) => setSelectedModel(e.target.value)}
                                className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                            >
                                {models.map(model => (
                                    <option key={model.id} value={model.id}>
                                        {model.name} ({model.accuracy}%)
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={startTraining}
                                disabled={isTraining}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isTraining ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} />}
                                <span>{isTraining ? 'Training...' : 'Start Training'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center space-x-2 mb-2">
                            <MessageCircle className="text-blue-400" size={20} />
                            <span className="text-sm font-medium text-gray-300">Total Feedback</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-400">1,247</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center space-x-2 mb-2">
                            <ThumbsUp className="text-green-400" size={20} />
                            <span className="text-sm font-medium text-gray-300">Positive Rate</span>
                        </div>
                        <p className="text-2xl font-bold text-green-400">78%</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center space-x-2 mb-2">
                            <Clock className="text-yellow-400" size={20} />
                            <span className="text-sm font-medium text-gray-300">Avg Response</span>
                        </div>
                        <p className="text-2xl font-bold text-yellow-400">2.1s</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="text-purple-400" size={20} />
                            <span className="text-sm font-medium text-gray-300">Accuracy</span>
                        </div>
                        <p className="text-2xl font-bold text-purple-400">85.2%</p>
                    </div>
                </div>

                {/* Feedback List */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-gray-100 mb-4">Recent Feedback</h2>
                    <div className="space-y-4">
                        {feedbackData.map(item => (
                            <div key={item.id} className="bg-gray-750 rounded-lg p-4 border border-gray-700">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold text-gray-100">{item.customerName}</h3>
                                        <p className="text-sm text-gray-400">{item.timestamp}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'approved' ? 'bg-green-900 text-green-200' :
                                                item.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                                                    'bg-blue-900 text-blue-200'
                                            }`}>
                                            {item.status}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.category === 'billing' ? 'bg-purple-900 text-purple-200' :
                                                item.category === 'sales' ? 'bg-green-900 text-green-200' :
                                                    'bg-blue-900 text-blue-200'
                                            }`}>
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm font-medium text-gray-300 mb-1">Query:</p>
                                        <p className="text-gray-400 text-sm">{item.query}</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-300 mb-1">AI Response:</p>
                                        <p className="text-gray-400 text-sm bg-gray-800 p-3 rounded">{item.aiResponse}</p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center space-x-2">
                                            <button className={`p-2 rounded-lg ${item.humanFeedback === 'positive'
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-700 text-gray-400'
                                                }`}>
                                                <ThumbsUp size={16} />
                                            </button>
                                            <button className={`p-2 rounded-lg ${item.humanFeedback === 'negative'
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-gray-700 text-gray-400'
                                                }`}>
                                                <ThumbsDown size={16} />
                                            </button>
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star
                                                    key={star}
                                                    size={16}
                                                    className={star <= (item.rating || 0) ? 'text-yellow-400' : 'text-gray-600'}
                                                    fill={star <= (item.rating || 0) ? 'currentColor' : 'none'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RLHFCRMInterface;
