import React, { useState } from 'react';
import { Server, Activity, Database, Cloud, Zap, CheckCircle, XCircle, AlertCircle, Clock, Cpu, HardDrive, Network, Settings, RefreshCw } from 'lucide-react';

const Microservices = ({ onViewChange, onLogout }) => {
    const [services] = useState([
        {
            id: 1,
            name: 'API Gateway',
            status: 'running',
            uptime: '99.9%',
            requests: '2.4M/day',
            latency: '45ms',
            cpu: '23%',
            memory: '512MB',
            instances: 3
        },
        {
            id: 2,
            name: 'Auth Service',
            status: 'running',
            uptime: '99.8%',
            requests: '1.2M/day',
            latency: '32ms',
            cpu: '18%',
            memory: '256MB',
            instances: 2
        },
        {
            id: 3,
            name: 'AI Model Service',
            status: 'running',
            uptime: '99.5%',
            requests: '850K/day',
            latency: '120ms',
            cpu: '67%',
            memory: '2GB',
            instances: 5
        },
        {
            id: 4,
            name: 'Database Service',
            status: 'running',
            uptime: '99.9%',
            requests: '3.1M/day',
            latency: '15ms',
            cpu: '34%',
            memory: '1GB',
            instances: 3
        },
        {
            id: 5,
            name: 'Cache Service',
            status: 'running',
            uptime: '99.7%',
            requests: '5.2M/day',
            latency: '8ms',
            cpu: '12%',
            memory: '512MB',
            instances: 2
        },
        {
            id: 6,
            name: 'Notification Service',
            status: 'degraded',
            uptime: '98.2%',
            requests: '450K/day',
            latency: '95ms',
            cpu: '28%',
            memory: '384MB',
            instances: 2
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'running':
                return 'bg-green-600';
            case 'degraded':
                return 'bg-yellow-600';
            case 'down':
                return 'bg-red-600';
            default:
                return 'bg-gray-600';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'running':
                return <CheckCircle className="text-green-400" size={20} />;
            case 'degraded':
                return <AlertCircle className="text-yellow-400" size={20} />;
            case 'down':
                return <XCircle className="text-red-400" size={20} />;
            default:
                return <Clock className="text-gray-400" size={20} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">Microservices Dashboard</h1>
                            <p className="text-gray-400">Monitor and manage your distributed services</p>
                        </div>
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

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Total Services</p>
                                <p className="text-3xl font-bold text-white">6</p>
                            </div>
                            <Server className="text-green-400" size={32} />
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Running</p>
                                <p className="text-3xl font-bold text-white">5</p>
                            </div>
                            <CheckCircle className="text-blue-400" size={32} />
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Degraded</p>
                                <p className="text-3xl font-bold text-white">1</p>
                            </div>
                            <AlertCircle className="text-yellow-400" size={32} />
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Avg Uptime</p>
                                <p className="text-3xl font-bold text-white">99.5%</p>
                            </div>
                            <Activity className="text-purple-400" size={32} />
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map(service => (
                        <div key={service.id} className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    {getStatusIcon(service.status)}
                                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(service.status)}`}>
                                    {service.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Uptime</p>
                                    <p className="text-sm font-semibold text-gray-200">{service.uptime}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Requests</p>
                                    <p className="text-sm font-semibold text-gray-200">{service.requests}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Latency</p>
                                    <p className="text-sm font-semibold text-gray-200">{service.latency}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Instances</p>
                                    <p className="text-sm font-semibold text-gray-200">{service.instances}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-400">CPU Usage</span>
                                        <span className="text-xs text-gray-300">{service.cpu}</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 h-2 rounded-full transition-all"
                                            style={{ width: service.cpu }}
                                        ></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-gray-400">Memory</span>
                                        <span className="text-xs text-gray-300">{service.memory}</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="bg-purple-500 h-2 rounded-full transition-all"
                                            style={{ width: `${parseInt(service.cpu) * 0.8}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 mt-4">
                                <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-2 rounded-lg transition-colors text-sm">
                                    <RefreshCw size={14} />
                                    <span>Restart</span>
                                </button>
                                <button className="flex-1 flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-2 rounded-lg transition-colors text-sm">
                                    <Settings size={14} />
                                    <span>Configure</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Microservices;
