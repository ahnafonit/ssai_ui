import React, { useState } from 'react';
import { Users, TrendingUp, Target, DollarSign, Phone, Award, ChevronDown, ChevronRight, Clock as ClockIcon, Activity, BarChart3, Brain, Volume2, MessageCircle, PhoneCall, CheckCircle, PlayCircle, PauseCircle, Edit, Plus, FileText, Calendar, Cpu, User, LogOut, ArrowLeft } from 'lucide-react';
import Clock from './Clock';

export default function TeamLeadDashboard({ onViewChange }) {
    const [activeView, setActiveView] = useState('team'); // Default to 'team' view to show managers and reps
    const [expandedManagers, setExpandedManagers] = useState([1]); // Expand first manager by default
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);

    const toggleManager = (managerId) => {
        setExpandedManagers(prev =>
            prev.includes(managerId)
                ? prev.filter(id => id !== managerId)
                : [...prev, managerId]
        );
    };

    const teamLead = {
        name: "Michael Rodriguez",
        email: "michael.r@company.com",
        department: "Sales Operations",
        avatar: "MR",
        managers: [
            {
                id: 1,
                name: "Jennifer Wilson",
                email: "jennifer@company.com",
                avatar: "JW",
                department: "Enterprise Sales",
                status: "active",
                stats: { callsToday: 63, conversions: 44, successRate: 70, revenue: "$17,700" },
                quota: { percentage: 125 },
                salesReps: [
                    { id: 1, name: "Alex Martinez", stats: { callsToday: 18, conversions: 12, successRate: 67, revenue: "$4,500" } },
                    { id: 2, name: "Sarah Chen", stats: { callsToday: 22, conversions: 16, successRate: 73, revenue: "$6,200" } },
                    { id: 3, name: "Marcus Johnson", stats: { callsToday: 8, conversions: 5, successRate: 63, revenue: "$2,100" } },
                    { id: 4, name: "Emma Thompson", stats: { callsToday: 15, conversions: 11, successRate: 73, revenue: "$4,900" } }
                ]
            },
            {
                id: 2,
                name: "Robert Chen",
                email: "robert@company.com",
                avatar: "RC",
                department: "SMB Sales",
                status: "active",
                stats: { callsToday: 78, conversions: 51, successRate: 65, revenue: "$15,300" },
                quota: { percentage: 119 },
                salesReps: [
                    { id: 5, name: "David Kim", stats: { callsToday: 20, conversions: 15, successRate: 75, revenue: "$5,200" } },
                    { id: 6, name: "Lisa Wang", stats: { callsToday: 19, conversions: 14, successRate: 74, revenue: "$4,800" } },
                    { id: 7, name: "Tom Harris", stats: { callsToday: 17, conversions: 13, successRate: 76, revenue: "$4,600" } },
                    { id: 8, name: "Nina Patel", stats: { callsToday: 21, conversions: 16, successRate: 76, revenue: "$5,400" } }
                ]
            },
            {
                id: 3,
                name: "Amanda Foster",
                email: "amanda@company.com",
                avatar: "AF",
                department: "Channel Sales",
                status: "active",
                stats: { callsToday: 85, conversions: 63, successRate: 74, revenue: "$19,200" },
                quota: { percentage: 123 },
                salesReps: [
                    { id: 9, name: "Ryan Cooper", stats: { callsToday: 22, conversions: 17, successRate: 77, revenue: "$5,800" } },
                    { id: 10, name: "Jessica Lee", stats: { callsToday: 18, conversions: 13, successRate: 72, revenue: "$4,500" } },
                    { id: 11, name: "Kevin Brown", stats: { callsToday: 20, conversions: 15, successRate: 75, revenue: "$5,200" } },
                    { id: 12, name: "Michelle Green", stats: { callsToday: 25, conversions: 18, successRate: 72, revenue: "$3,700" } }
                ]
            }
        ]
    };

    // Calculate team totals
    const teamStats = {
        totalManagers: teamLead.managers.length,
        totalReps: teamLead.managers.reduce((sum, mgr) => sum + mgr.salesReps.length, 0),
        totalCalls: teamLead.managers.reduce((sum, mgr) => sum + mgr.stats.callsToday, 0),
        totalConversions: teamLead.managers.reduce((sum, mgr) => sum + mgr.stats.conversions, 0),
        totalRevenue: teamLead.managers.reduce((sum, mgr) => sum + parseFloat(mgr.stats.revenue.replace(/[$,]/g, '')), 0),
        avgSuccessRate: Math.round(teamLead.managers.reduce((sum, mgr) => sum + mgr.stats.successRate, 0) / teamLead.managers.length)
    };

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
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2 rounded-lg">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Team Lead Hub</h1>
                            <p className="text-slate-400">Managers & Sales Reps Overview</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Clock />
                    <div className="relative">
                        <button
                            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                            className="flex items-center gap-3 hover:bg-slate-800 rounded-lg p-2 transition-colors"
                        >
                            <div className="text-right">
                                <p className="text-sm text-slate-400">Team Lead</p>
                                <p className="font-semibold">{teamLead.name}</p>
                                <p className="text-xs text-slate-500">{teamLead.email}</p>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                                {teamLead.avatar}
                            </div>
                        </button>

                        {showAccountDropdown && (
                            <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                                <div className="p-3 border-b border-slate-700">
                                    <p className="text-sm font-medium text-slate-200">{teamLead.name}</p>
                                    <p className="text-xs text-slate-400">{teamLead.email}</p>
                                    <p className="text-xs text-slate-500 mt-1">{teamLead.department}</p>
                                </div>
                                <div className="p-2">
                                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                                        <User size={16} />
                                        <span className="text-sm">Profile Settings</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAccountDropdown(false);
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
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span className="text-2xl font-bold">{teamStats.totalManagers}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Managers</p>
                </div>
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
                    <p className="text-slate-400 text-sm">Total Calls</p>
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

            {/* Managers with their Sales Reps */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">My Team - Managers & Sales Representatives</h2>
                {teamLead.managers.map((manager) => (
                    <div key={manager.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        {/* Manager Card */}
                        <div
                            className="p-6 cursor-pointer hover:bg-slate-750 transition-colors"
                            onClick={() => toggleManager(manager.id)}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <button className="p-1 hover:bg-slate-700 rounded">
                                        {expandedManagers.includes(manager.id) ?
                                            <ChevronDown className="w-5 h-5" /> :
                                            <ChevronRight className="w-5 h-5" />
                                        }
                                    </button>
                                    <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg">
                                        {manager.avatar}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{manager.name}</h3>
                                        <p className="text-sm text-slate-400">{manager.email}</p>
                                        <p className="text-xs text-slate-500 mt-1">{manager.department} • {manager.salesReps.length} Sales Reps</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${manager.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                        {manager.status === 'active' ? '● Active' : '❚❚ Paused'}
                                    </span>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-400">Quota</p>
                                        <p className={`text-xl font-bold ${manager.quota.percentage >= 100 ? 'text-green-400' : manager.quota.percentage >= 90 ? 'text-yellow-400' : 'text-red-400'}`}>
                                            {manager.quota.percentage}%
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
                                    <p className="text-xl font-bold">{manager.stats.callsToday}</p>
                                </div>
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        <span className="text-xs text-slate-400">Conversions</span>
                                    </div>
                                    <p className="text-xl font-bold">{manager.stats.conversions}</p>
                                </div>
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4 text-purple-400" />
                                        <span className="text-xs text-slate-400">Success</span>
                                    </div>
                                    <p className="text-xl font-bold">{manager.stats.successRate}%</p>
                                </div>
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4 text-yellow-400" />
                                        <span className="text-xs text-slate-400">Revenue</span>
                                    </div>
                                    <p className="text-xl font-bold">{manager.stats.revenue}</p>
                                </div>
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="w-4 h-4 text-blue-400" />
                                        <span className="text-xs text-slate-400">Team Size</span>
                                    </div>
                                    <p className="text-xl font-bold">{manager.salesReps.length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Sales Reps Section (Expandable) */}
                        {expandedManagers.includes(manager.id) && (
                            <div className="bg-slate-850 border-t border-slate-700 p-6">
                                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-blue-400" />
                                    Sales Representatives ({manager.salesReps.length})
                                </h4>
                                <div className="space-y-3">
                                    {manager.salesReps.map((rep) => (
                                        <div key={rep.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-gradient-to-br from-blue-400 to-cyan-500 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                                                        {rep.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-200">{rep.name}</p>
                                                        <p className="text-xs text-slate-500">Sales Representative</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-4 gap-3">
                                                <div className="bg-slate-750 rounded p-3">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <Phone className="w-3 h-3 text-cyan-400" />
                                                        <span className="text-xs text-slate-400">Calls</span>
                                                    </div>
                                                    <p className="text-lg font-bold">{rep.stats.callsToday}</p>
                                                </div>
                                                <div className="bg-slate-750 rounded p-3">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <TrendingUp className="w-3 h-3 text-green-400" />
                                                        <span className="text-xs text-slate-400">Conv.</span>
                                                    </div>
                                                    <p className="text-lg font-bold">{rep.stats.conversions}</p>
                                                </div>
                                                <div className="bg-slate-750 rounded p-3">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <Target className="w-3 h-3 text-purple-400" />
                                                        <span className="text-xs text-slate-400">Rate</span>
                                                    </div>
                                                    <p className="text-lg font-bold">{rep.stats.successRate}%</p>
                                                </div>
                                                <div className="bg-slate-750 rounded p-3">
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <DollarSign className="w-3 h-3 text-yellow-400" />
                                                        <span className="text-xs text-slate-400">Revenue</span>
                                                    </div>
                                                    <p className="text-lg font-bold">{rep.stats.revenue}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Team Rankings */}
            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        Top Performing Managers
                    </h2>
                    <div className="space-y-3">
                        {[...teamLead.managers].sort((a, b) => b.quota.percentage - a.quota.percentage).map((manager, idx) => (
                            <div key={manager.id} className="flex items-center justify-between bg-slate-750 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-yellow-500 text-slate-900' : idx === 1 ? 'bg-slate-400 text-slate-900' : 'bg-orange-600 text-white'}`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{manager.name}</p>
                                        <p className="text-xs text-slate-400">{manager.salesReps.length} reps • {manager.stats.revenue} revenue</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-green-400">{manager.quota.percentage}%</p>
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
                            <p className="text-sm font-medium text-green-300 mb-1">Overall Performance</p>
                            <p className="text-xs text-green-100">All managers exceeding quota targets this month</p>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                            <p className="text-sm font-medium text-blue-300 mb-1">Today's Activity</p>
                            <p className="text-xs text-blue-100">{teamStats.totalCalls} calls made across {teamStats.totalReps} sales reps</p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700 p-4 rounded-lg">
                            <p className="text-sm font-medium text-purple-300 mb-1">Revenue Performance</p>
                            <p className="text-xs text-purple-100">${(teamStats.totalRevenue / 1000).toFixed(1)}K generated today across all teams</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
