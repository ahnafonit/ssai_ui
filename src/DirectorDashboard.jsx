import React, { useState } from 'react';
import { Users, TrendingUp, Target, DollarSign, BarChart3, Globe, Phone, Award, Building2, ChevronDown, ChevronRight, Mail, Clock as ClockIcon, ArrowLeft } from 'lucide-react';
import Clock from './Clock';

export default function DirectorDashboard({ onViewChange }) {
    const [expandedOrgs, setExpandedOrgs] = useState([1]); // Default first org expanded
    const [viewingManager, setViewingManager] = useState(null);

    const toggleOrg = (orgId) => {
        setExpandedOrgs(prev =>
            prev.includes(orgId)
                ? prev.filter(id => id !== orgId)
                : [...prev, orgId]
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'exceeding': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'on-track': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'at-risk': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const organizations = [
        {
            id: 1,
            name: "AWE",
            location: "USA & Canada",
            stats: { callsToday: 287, conversions: 189, successRate: 66, revenue: "$71,200", quota: 100 },
            managers: [
                {
                    id: 1,
                    name: "Jennifer Wilson",
                    email: "jennifer@company.com",
                    department: "Enterprise Sales",
                    teamSize: 4,
                    status: "exceeding",
                    stats: { callsToday: 63, conversions: 44, successRate: 70, revenue: "$17,700" },
                    team: ["Alex Martinez", "Sarah Chen", "Marcus Johnson", "Emma Thompson"]
                },
                {
                    id: 2,
                    name: "Michael Rodriguez",
                    email: "michael@company.com",
                    department: "SMB Sales",
                    teamSize: 5,
                    status: "on-track",
                    stats: { callsToday: 78, conversions: 51, successRate: 65, revenue: "$15,300" },
                    team: ["David Kim", "Lisa Wang", "Tom Harris", "Nina Patel", "Chris Anderson"]
                }
            ]
        },
        {
            id: 2,
            name: "OWE",
            location: "UK, Germany, France",
            stats: { callsToday: 198, conversions: 127, successRate: 64, revenue: "$52,400", quota: 100 },
            managers: [
                {
                    id: 3,
                    name: "Oliver Bennett",
                    email: "oliver@company.com",
                    department: "UK Enterprise",
                    teamSize: 4,
                    status: "exceeding",
                    stats: { callsToday: 71, conversions: 48, successRate: 68, revenue: "$19,200" },
                    team: ["James Wilson", "Emily Davies", "George Brown", "Charlotte Taylor"]
                },
                {
                    id: 4,
                    name: "Sophie Müller",
                    email: "sophie@company.com",
                    department: "DACH Sales",
                    teamSize: 5,
                    status: "on-track",
                    stats: { callsToday: 83, conversions: 52, successRate: 63, revenue: "$21,100" },
                    team: ["Hans Schmidt", "Anna Weber", "Klaus Fischer", "Petra Meyer", "Stefan Wagner"]
                }
            ]
        },
        {
            id: 3,
            name: "CWS",
            location: "Singapore, Australia, Japan",
            stats: { callsToday: 156, conversions: 94, successRate: 60, revenue: "$38,700", quota: 96 },
            managers: [
                {
                    id: 5,
                    name: "Kenji Tanaka",
                    email: "kenji@company.com",
                    department: "APAC Enterprise",
                    teamSize: 6,
                    status: "on-track",
                    stats: { callsToday: 94, conversions: 56, successRate: 60, revenue: "$23,400" },
                    team: ["Yuki Sato", "Hiroshi Yamamoto", "Akiko Watanabe", "Takeshi Nakamura", "Sakura Ito", "Ryu Kobayashi"]
                }
            ]
        },
        {
            id: 4,
            name: "AWS",
            location: "Latin America, Middle East",
            stats: { callsToday: 134, conversions: 81, successRate: 60, revenue: "$32,100", quota: 102 },
            managers: [
                {
                    id: 6,
                    name: "Carlos Rodriguez",
                    email: "carlos@company.com",
                    department: "LATAM Sales",
                    teamSize: 5,
                    status: "exceeding",
                    stats: { callsToday: 82, conversions: 53, successRate: 65, revenue: "$19,800" },
                    team: ["Maria Santos", "Diego Fernandez", "Isabella Gomez", "Lucas Silva", "Sofia Morales"]
                }
            ]
        }
    ];

    const globalStats = {
        totalOrgs: organizations.length,
        totalManagers: 11,
        totalReps: 48,
        totalCalls: organizations.reduce((sum, org) => sum + org.stats.callsToday, 0),
        totalConversions: organizations.reduce((sum, org) => sum + org.stats.conversions, 0),
        totalRevenue: organizations.reduce((sum, org) => sum + parseFloat(org.stats.revenue.replace(/[$,]/g, '')), 0),
        avgSuccessRate: Math.round(organizations.reduce((sum, org) => sum + org.stats.successRate, 0) / organizations.length)
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
                        <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Director Dashboard</h1>
                            <p className="text-slate-400">Global Sales Operations Overview</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Clock />
                    <div className="text-right">
                        <p className="text-sm text-slate-400">Sales Director</p>
                        <p className="font-semibold">Patricia Anderson</p>
                        <p className="text-xs text-slate-500">patricia@company.com</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                        PA
                    </div>
                </div>
            </div>

            {/* Global KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8">
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Globe className="w-5 h-5 text-indigo-400" />
                        <span className="text-2xl font-bold">{globalStats.totalOrgs}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Regions</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span className="text-2xl font-bold">{globalStats.totalManagers}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Managers</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Building2 className="w-5 h-5 text-blue-400" />
                        <span className="text-2xl font-bold">{globalStats.totalReps}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Sales Reps</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Phone className="w-5 h-5 text-cyan-400" />
                        <span className="text-2xl font-bold">{globalStats.totalCalls}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Total Calls</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-2xl font-bold">{globalStats.totalConversions}</span>
                    </div>
                    <p className="text-slate-400 text-sm">Conversions</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <Target className="w-5 h-5 text-orange-400" />
                        <span className="text-2xl font-bold">{globalStats.avgSuccessRate}%</span>
                    </div>
                    <p className="text-slate-400 text-sm">Success Rate</p>
                </div>
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                        <DollarSign className="w-5 h-5 text-yellow-400" />
                        <span className="text-2xl font-bold">${(globalStats.totalRevenue / 1000).toFixed(1)}K</span>
                    </div>
                    <p className="text-slate-400 text-sm">Revenue Today</p>
                </div>
            </div>

            {/* Organizations */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Regional Performance</h2>
                {organizations.map((org) => (
                    <div key={org.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                        <div
                            className="p-6 cursor-pointer hover:bg-slate-750 transition-colors"
                            onClick={() => toggleOrg(org.id)}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <button className="p-1 hover:bg-slate-700 rounded">
                                        {expandedOrgs.includes(org.id) ?
                                            <ChevronDown className="w-5 h-5" /> :
                                            <ChevronRight className="w-5 h-5" />
                                        }
                                    </button>
                                    <div>
                                        <h3 className="text-xl font-bold">{org.name}</h3>
                                        <p className="text-slate-400 text-sm">{org.location} • {org.managers?.length || 0} Managers</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-400">Quota Attainment</p>
                                    <p className={`text-2xl font-bold ${org.stats.quota >= 100 ? 'text-green-400' :
                                        org.stats.quota >= 95 ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                        {org.stats.quota}%
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 gap-4">
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="w-4 h-4 text-cyan-400" />
                                        <span className="text-xs text-slate-400">Calls</span>
                                    </div>
                                    <p className="text-xl font-bold">{org.stats.callsToday}</p>
                                </div>
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        <span className="text-xs text-slate-400">Conversions</span>
                                    </div>
                                    <p className="text-xl font-bold">{org.stats.conversions}</p>
                                </div>
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4 text-purple-400" />
                                        <span className="text-xs text-slate-400">Success</span>
                                    </div>
                                    <p className="text-xl font-bold">{org.stats.successRate}%</p>
                                </div>
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4 text-yellow-400" />
                                        <span className="text-xs text-slate-400">Revenue</span>
                                    </div>
                                    <p className="text-xl font-bold">{org.stats.revenue}</p>
                                </div>
                                <div className="bg-slate-750 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="w-4 h-4 text-orange-400" />
                                        <span className="text-xs text-slate-400">Quota</span>
                                    </div>
                                    <p className="text-xl font-bold">{org.stats.quota}%</p>
                                </div>
                            </div>
                        </div>

                        {/* Managers Section */}
                        {expandedOrgs.includes(org.id) && org.managers && (
                            <div className="bg-slate-850 p-6 border-t border-slate-700">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Sales Managers ({org.managers.length})
                                </h3>
                                <div className="space-y-4">
                                    {org.managers.map((manager) => (
                                        <div key={manager.id} className="bg-slate-800 border border-slate-700 rounded-lg p-5">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold">
                                                        {manager.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-bold">{manager.name}</h4>
                                                        <p className="text-sm text-slate-400">{manager.email}</p>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-sm text-slate-400">
                                                                <Building2 className="w-4 h-4 inline mr-1" />
                                                                {manager.department}
                                                            </span>
                                                            <span className="text-sm text-slate-400">
                                                                <Users className="w-4 h-4 inline mr-1" />
                                                                {manager.teamSize} Reps
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(manager.status)}`}>
                                                    {manager.status === 'exceeding' && '🚀 Exceeding'}
                                                    {manager.status === 'on-track' && '✓ On Track'}
                                                    {manager.status === 'at-risk' && '⚠ At Risk'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-4 gap-3 mb-4">
                                                <div className="bg-slate-750 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Phone className="w-3 h-3 text-cyan-400" />
                                                        <span className="text-xs text-slate-400">Calls</span>
                                                    </div>
                                                    <p className="text-xl font-bold">{manager.stats.callsToday}</p>
                                                </div>
                                                <div className="bg-slate-750 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <TrendingUp className="w-3 h-3 text-green-400" />
                                                        <span className="text-xs text-slate-400">Conversions</span>
                                                    </div>
                                                    <p className="text-xl font-bold">{manager.stats.conversions}</p>
                                                </div>
                                                <div className="bg-slate-750 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Target className="w-3 h-3 text-purple-400" />
                                                        <span className="text-xs text-slate-400">Success</span>
                                                    </div>
                                                    <p className="text-xl font-bold">{manager.stats.successRate}%</p>
                                                </div>
                                                <div className="bg-slate-750 rounded-lg p-3">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <DollarSign className="w-3 h-3 text-yellow-400" />
                                                        <span className="text-xs text-slate-400">Revenue</span>
                                                    </div>
                                                    <p className="text-xl font-bold">{manager.stats.revenue}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {manager.team.slice(0, 3).map((rep, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-slate-700 rounded-full text-xs text-slate-300">
                                                            {rep}
                                                        </span>
                                                    ))}
                                                    {manager.team.length > 3 && (
                                                        <span className="px-2 py-1 bg-slate-700 rounded-full text-xs text-slate-400">
                                                            +{manager.team.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setViewingManager(manager);
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-semibold transition-colors"
                                                >
                                                    View Team
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Team Modal */}
            {viewingManager && (
                <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6"
                    onClick={() => setViewingManager(null)}
                >
                    <div
                        className="bg-slate-800 rounded-xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl">
                                    {viewingManager.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{viewingManager.name}'s Team</h2>
                                    <p className="text-slate-400">{viewingManager.department} • {viewingManager.teamSize} Sales Representatives</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingManager(null)}
                                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                <ChevronRight className="w-6 h-6 rotate-90" />
                            </button>
                        </div>

                        {/* Team Stats */}
                        <div className="p-6 border-b border-slate-700 bg-slate-750">
                            <h3 className="text-lg font-bold mb-4">Team Performance Today</h3>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="bg-slate-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="w-4 h-4 text-cyan-400" />
                                        <span className="text-xs text-slate-400">Total Calls</span>
                                    </div>
                                    <p className="text-2xl font-bold">{viewingManager.stats.callsToday}</p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-green-400" />
                                        <span className="text-xs text-slate-400">Conversions</span>
                                    </div>
                                    <p className="text-2xl font-bold">{viewingManager.stats.conversions}</p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="w-4 h-4 text-purple-400" />
                                        <span className="text-xs text-slate-400">Success Rate</span>
                                    </div>
                                    <p className="text-2xl font-bold">{viewingManager.stats.successRate}%</p>
                                </div>
                                <div className="bg-slate-800 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="w-4 h-4 text-yellow-400" />
                                        <span className="text-xs text-slate-400">Team Revenue</span>
                                    </div>
                                    <p className="text-2xl font-bold">{viewingManager.stats.revenue}</p>
                                </div>
                            </div>
                        </div>

                        {/* Team Members */}
                        <div className="p-6">
                            <h3 className="text-lg font-bold mb-4">Team Members</h3>
                            <div className="space-y-3">
                                {viewingManager.team.map((rep, idx) => (
                                    <div key={idx} className="bg-slate-750 border border-slate-700 rounded-lg p-4 hover:border-purple-500 transition-all">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                                                    {rep.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold">{rep}</h4>
                                                    <p className="text-sm text-slate-400">Sales Representative</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Rankings */}
            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-400" />
                        Top Performing Regions
                    </h2>
                    <div className="space-y-3">
                        {[...organizations].sort((a, b) => b.stats.quota - a.stats.quota).map((org, idx) => (
                            <div key={org.id} className="flex items-center justify-between bg-slate-750 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-yellow-500 text-slate-900' :
                                        idx === 1 ? 'bg-slate-400 text-slate-900' :
                                            'bg-orange-600 text-white'
                                        }`}>
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{org.name}</p>
                                        <p className="text-xs text-slate-400">{org.location}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-green-400">{org.stats.quota}%</p>
                                    <p className="text-xs text-slate-400">{org.stats.revenue} today</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        Performance Insights
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-green-900/20 border border-green-700 p-4 rounded-lg">
                            <p className="text-sm font-medium text-green-300 mb-1">Overall Performance</p>
                            <p className="text-xs text-green-100">All regions meeting or exceeding quota targets</p>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-700 p-4 rounded-lg">
                            <p className="text-sm font-medium text-blue-300 mb-1">Today's Highlights</p>
                            <p className="text-xs text-blue-100">{globalStats.totalCalls} calls made with {globalStats.avgSuccessRate}% success rate</p>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700 p-4 rounded-lg">
                            <p className="text-sm font-medium text-purple-300 mb-1">Revenue Performance</p>
                            <p className="text-xs text-purple-100">${(globalStats.totalRevenue / 1000).toFixed(1)}K generated today across all regions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
