import React, { useState } from 'react';
import { Phone, Sparkles, User, Users, Building, Mail, Calendar, DollarSign, Tag, Filter, Search, Plus, Edit, Trash2, Eye, PhoneCall, MessageCircle, Clock as ClockIcon, TrendingUp, Target, CheckCircle, XCircle, AlertCircle, MoreVertical, Send, Download, Upload, FileText, Activity, BarChart3, Globe, MapPin, Briefcase, Star, ChevronDown, ChevronRight, Settings, LogOut, Brain, Volume2, Mic, Menu, X } from 'lucide-react';
import Clock from './Clock';

const OnitCRM = ({ onViewChange, onLogout }) => {
    const [activeView, setActiveView] = useState('batches');
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [showAICallModal, setShowAICallModal] = useState(false);
    const [showNewBatchModal, setShowNewBatchModal] = useState(false);
    const [selectedForCall, setSelectedForCall] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [batchFilter, setBatchFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState(null);

    const [newBatch, setNewBatch] = useState({
        description: '',
        status: 'Backlog',
        leads: '',
        manager: 'H M Ahnaf Rafid'
    });

    const salesRep = {
        name: 'Sarah Johnson',
        email: 'sarah.j@company.com',
        avatar: 'SJ'
    };

    const [batches, setBatches] = useState([
        { id: '00091', description: 'Sep 9 Morning', status: 'Paused', leads: '(469) 583-2961, (214) 484-8770, (214) 765...', manager: 'H M Ahnaf Rafid', totalLeads: 206, totalCalls: 77 },
        { id: '00092', description: 'Sep 9 Late Morning', status: 'Paused', leads: '(469) 287-8599, (214) 309-9301, (214) 305...', manager: 'H M Ahnaf Rafid', totalLeads: 240, totalCalls: 159 },
        { id: '00093', description: 'Afternoon', status: 'Paused', leads: '(214) 391-0416, (214) 371-3461, (214) 797...', manager: 'H M Ahnaf Rafid', totalLeads: 592, totalCalls: 230 },
        { id: '00094', description: 'Early Morning Sep 11', status: 'Paused', leads: '--', manager: 'H M Ahnaf Rafid', totalLeads: 0, totalCalls: 137 },
        { id: '00095', description: 'Late Morning Sep 11', status: 'Paused', leads: '--', manager: 'H M Ahnaf Rafid', totalLeads: 0, totalCalls: 36 },
        { id: '00096', description: 'Afternoon - Sep 11', status: 'Paused', leads: '--', manager: 'H M Ahnaf Rafid', totalLeads: 0, totalCalls: 180 },
        { id: '00097', description: 'Sep 12 - Afternoon', status: 'Completed', leads: '--', manager: 'H M Ahnaf Rafid', totalLeads: 0, totalCalls: 257 },
        { id: '00098', description: 'All Day - Sept 15', status: 'Completed', leads: '(214) 484-8080, (214) 680-3747, (214) 985...', manager: 'H M Ahnaf Rafid', totalLeads: 446, totalCalls: 388 },
        { id: '00099', description: 'Sept 17 - All Day', status: 'Completed', leads: '--', manager: 'H M Ahnaf Rafid', totalLeads: 0, totalCalls: 175 },
        { id: '00100', description: 'Bakery/Cafe - Dallas -...', status: 'Paused', leads: '(469) 802-6652, (463) 466-2253, 323 8965...', manager: 'H M Ahnaf Rafid', totalLeads: 204, totalCalls: 387 },
        { id: '00101', description: 'Dallas Laundry - Sep 19', status: 'Completed', leads: '(214) 744-0330, (469) 677-0227, (414) 945...', manager: 'H M Ahnaf Rafid', totalLeads: 143, totalCalls: 171 },
        { id: '00102', description: 'Dallas Restaurants - Sep 19', status: 'Paused', leads: '(469) 792-4690, (469) 965-2105, (945) 268...', manager: 'H M Ahnaf Rafid', totalLeads: 544, totalCalls: 362 }
    ]);

    const [leads, setLeads] = useState([
        { id: 1, phone: '(817) 862-7337', company: 'FunkyTown Donuts and D...', city: 'Fort Worth', contact: 'Brandon Moore', country: 'USA', dmReached: false, systemStatus: 'Call Back Later', callBackTime: '2025-10-08 11:00am', agentStatus: 'Corporate', insideNotes: '---', aiCalls: 3, zip: '76116', location: '132 E 4th St, Fort W...', list: 'Derek - Fort Worth...', lastContacted: 'October ... 2...', agentUsed: 'Sarah AI Assistant' },
        { id: 2, phone: '(817) 923-6732', company: 'Cowboy Cleaners & Laun...', city: '', contact: 'Tiffany', country: 'USA', dmReached: false, systemStatus: 'Call Back Later', callBackTime: '2025-10-07 2:30pm', agentStatus: 'No Answer', insideNotes: '---', aiCalls: 3, zip: '', location: '1120 E Berry St, For...', list: 'Derek - Fort Worth...', lastContacted: 'October ... 2...', agentUsed: 'Sarah AI Assistant' },
        { id: 3, phone: '(817) 737-2008', company: 'Woody Creek Bar-B-Q', city: 'Fort Worth', contact: 'Tiffany', country: 'USA', dmReached: false, systemStatus: 'Call Back Later', callBackTime: '2025-10-07 12:00pm', agentStatus: 'Followup', insideNotes: '---', aiCalls: 1, zip: '76116', location: '1776 Mall St, Fort W...', list: 'Derek - Fort Worth...', lastContacted: 'October ... 3...', agentUsed: 'Sarah AI Assistant' },
        { id: 4, phone: '(817) 238-7797', company: 'New Saldinan Wok', city: 'Fort Worth', contact: 'Lauren', country: 'USA', dmReached: false, systemStatus: 'Call Back Later', callBackTime: '2025-10-06 6:30pm', agentStatus: 'No Answer', insideNotes: '---', aiCalls: 1, zip: '76135', location: '6324 Lake Worth Bl...', list: 'Derek - Fort Worth West...', lastContacted: 'October ... 2...', agentUsed: 'Mike AI Pro' },
        { id: 5, phone: '(817) 737-9226', company: 'Quick Pick', city: 'Fort Worth', contact: 'Bridney', country: 'USA', dmReached: false, systemStatus: 'Call Back Later', callBackTime: '2025-10-06 4:00pm', agentStatus: 'Followup', insideNotes: '---', aiCalls: 1, zip: '76107', location: '1604 Montgomery ...', list: 'Derek - City - Central For...', lastContacted: 'October ... 10...', agentUsed: 'Sarah AI Assistant' }
    ]);

    const handleCreateBatch = () => {
        if (!newBatch.description) {
            alert('Please enter a batch description');
            return;
        }

        const leadsArray = newBatch.leads.split(',').map(l => l.trim()).filter(l => l);
        const newBatchData = {
            id: `00${batches.length + 91}`,
            description: newBatch.description,
            status: newBatch.status,
            leads: leadsArray.slice(0, 3).join(', ') + (leadsArray.length > 3 ? '...' : ''),
            manager: newBatch.manager,
            totalLeads: leadsArray.length,
            totalCalls: 0
        };

        setBatches([newBatchData, ...batches]);
        setShowNewBatchModal(false);
        setNewBatch({
            description: '',
            status: 'Backlog',
            leads: '',
            manager: 'H M Ahnaf Rafid'
        });
        alert('Batch created successfully!');
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
        }
    };

    const handleUploadLeads = () => {
        if (!uploadFile) {
            alert('Please select a file to upload');
            return;
        }

        // Simulate file upload
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const lines = text.split('\n').filter(line => line.trim());

            // Skip header row if exists
            const dataLines = lines[0].includes('phone') || lines[0].includes('Phone') ? lines.slice(1) : lines;

            const newLeads = dataLines.slice(0, 10).map((line, idx) => {
                const parts = line.split(',').map(p => p.trim());
                return {
                    id: leads.length + idx + 1,
                    phone: parts[0] || `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                    company: parts[1] || 'Uploaded Company',
                    city: parts[2] || 'Fort Worth',
                    contact: parts[3] || 'Contact',
                    country: parts[4] || 'USA',
                    dmReached: false,
                    systemStatus: 'Call Back Later',
                    callBackTime: '2025-10-10 10:00am',
                    agentStatus: 'No Answer',
                    insideNotes: '---',
                    aiCalls: 0,
                    zip: parts[5] || '76107',
                    location: parts[6] || 'Uploaded Location',
                    list: 'Uploaded List',
                    lastContacted: 'Just now'
                };
            });

            setLeads([...newLeads, ...leads]);
            alert(`Successfully uploaded ${newLeads.length} leads!`);
            setShowUploadModal(false);
            setUploadFile(null);
        };

        reader.readAsText(uploadFile);
    };

    const handleAICall = (lead) => {
        setSelectedForCall(lead);
        setShowAICallModal(true);
    };

    const initiateAICall = () => {
        alert(`Initiating AI call to ${selectedForCall.contact || selectedForCall.description}...`);
        setShowAICallModal(false);
    };

    const handleBatchClick = (batch) => {
        setSelectedBatch(batch);
    };

    const handleStartCalls = () => {
        if (selectedBatch) {
            alert(`Starting AI calls for batch ${selectedBatch.id} - ${selectedBatch.description}. ${selectedBatch.totalLeads} leads will be called.`);
        }
    };

    const handleBackToBatches = () => {
        setSelectedBatch(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Call Back Later': return 'bg-blue-600';
            case 'Voicemail': return 'bg-purple-600';
            case 'Completed': return 'bg-green-600';
            case 'Paused': return 'bg-purple-400';
            case 'Backlog': return 'bg-blue-500';
            case 'In-progress': return 'bg-yellow-500';
            default: return 'bg-gray-600';
        }
    };

    const getAgentStatusColor = (status) => {
        switch (status) {
            case 'Corporate': return 'bg-red-500';
            case 'No Answer': return 'bg-blue-500';
            case 'Not Interested': return 'bg-yellow-500';
            case 'Followup': return 'bg-cyan-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Upload Leads Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Upload Leads</h3>
                            <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                                <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                                <p className="text-sm text-gray-500 mb-4">CSV or Excel file (MAX. 10MB)</p>
                                <input
                                    type="file"
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block"
                                >
                                    Choose File
                                </label>
                                {uploadFile && (
                                    <div className="mt-4 text-sm text-gray-700">
                                        <p className="font-medium">Selected: {uploadFile.name}</p>
                                        <p className="text-gray-500">{(uploadFile.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                )}
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm font-medium text-blue-900 mb-2">CSV Format Example:</p>
                                <div className="bg-white rounded p-2 text-xs font-mono text-gray-700">
                                    phone, company, city, contact, zip<br />
                                    (817) 555-1234, ABC Corp, Dallas, John, 75001<br />
                                    (214) 555-5678, XYZ Inc, Fort Worth, Jane, 76107
                                </div>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-start space-x-2">
                                    <AlertCircle className="text-yellow-600 mt-0.5" size={18} />
                                    <div className="text-sm text-gray-700">
                                        <p className="font-medium text-yellow-900 mb-1">Important:</p>
                                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                                            <li>First row should contain column headers</li>
                                            <li>Phone numbers can be in any format</li>
                                            <li>Duplicate numbers will be automatically filtered</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button onClick={() => setShowUploadModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg">
                                Cancel
                            </button>
                            <button onClick={handleUploadLeads} disabled={!uploadFile} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                Upload Leads
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Batch Modal */}
            {showNewBatchModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Create New Batch</h3>
                            <button onClick={() => setShowNewBatchModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Batch Description *</label>
                                <input
                                    type="text"
                                    value={newBatch.description}
                                    onChange={(e) => setNewBatch({ ...newBatch, description: e.target.value })}
                                    placeholder="e.g., Dallas Restaurants - Oct 2025"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select value={newBatch.status} onChange={(e) => setNewBatch({ ...newBatch, status: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                        <option value="Backlog">Backlog</option>
                                        <option value="In-progress">In-progress</option>
                                        <option value="Paused">Paused</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                                    <select value={newBatch.manager} onChange={(e) => setNewBatch({ ...newBatch, manager: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                        <option value="H M Ahnaf Rafid">H M Ahnaf Rafid</option>
                                        <option value="Daniel Pessoa">Daniel Pessoa</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Leads (Phone Numbers)</label>
                                <textarea
                                    value={newBatch.leads}
                                    onChange={(e) => setNewBatch({ ...newBatch, leads: e.target.value })}
                                    placeholder="Enter phone numbers separated by commas&#10;e.g., (469) 583-2961, (214) 484-8770, (214) 765-1234"
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                />
                                <p className="text-xs text-gray-500 mt-1">Separate multiple phone numbers with commas</p>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start space-x-2">
                                    <Brain className="text-blue-600 mt-0.5" size={18} />
                                    <div className="text-sm text-gray-700">
                                        <p className="font-medium text-blue-900 mb-1">AI Calling Ready</p>
                                        <p>Once created, your AI agent can start calling leads in this batch automatically.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button onClick={() => setShowNewBatchModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg">
                                Cancel
                            </button>
                            <button onClick={handleCreateBatch} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg">
                                Create Batch
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Call Modal */}
            {showAICallModal && selectedForCall && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
                        <div className="flex items-center space-x-3 mb-4">
                            <Phone className="text-blue-600" size={24} />
                            <h3 className="text-xl font-semibold text-gray-800">Initiate AI Call</h3>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="font-medium text-gray-800">{selectedForCall.contact || selectedForCall.description}</p>
                            <p className="text-sm text-gray-600">{selectedForCall.company || 'Batch Call'}</p>
                            {selectedForCall.phone && <p className="text-sm text-gray-600 mt-2">📞 {selectedForCall.phone}</p>}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                                <Brain className="text-blue-600" size={18} />
                                <p className="font-medium text-gray-800">AI Agent: Sarah AI Assistant</p>
                            </div>
                            <p className="text-sm text-gray-600">Your AI agent will make the call.</p>
                        </div>

                        <div className="flex space-x-3">
                            <button onClick={() => setShowAICallModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg">
                                Cancel
                            </button>
                            <button onClick={initiateAICall} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center space-x-2">
                                <PhoneCall size={18} />
                                <span>Start Call</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-gray-800 shadow-sm border-b border-gray-700">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-700 rounded-lg p-2 flex items-center space-x-2">
                                <Phone className="text-gray-300" size={20} />
                                <Sparkles className="text-gray-300" size={16} />
                            </div>
                            <h1 className="text-xl font-bold text-gray-100">SSAI • Mission Control</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            {onViewChange && (
                                <button onClick={() => onViewChange('agent')} className="text-gray-300 hover:text-gray-100">← Back to Agent</button>
                            )}
                            <Clock />
                            <button onClick={() => alert('Share')} className="text-gray-300 hover:text-gray-100">Share</button>
                            <button onClick={() => alert('Export')} className="text-gray-300 hover:text-gray-100"><Download size={18} /></button>
                            <button onClick={() => alert('Settings')} className="text-gray-300 hover:text-gray-100"><Settings size={18} /></button>
                            <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-gray-300 text-xs font-semibold">
                                {salesRep.avatar}
                            </div>
                            {onLogout && (
                                <button onClick={onLogout} className="text-gray-300 hover:text-red-400">
                                    <LogOut size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800 min-h-screen text-white border-r border-gray-700">
                    <div className="p-4 space-y-1">
                        <button onClick={() => setActiveView('funnel')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 text-left ${activeView === 'funnel' ? 'bg-gray-700' : ''}`}>
                            <Target size={18} />
                            <span>Funnel</span>
                        </button>
                        <button onClick={() => setActiveView('batches')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 text-left ${activeView === 'batches' ? 'bg-gray-700' : ''}`}>
                            <FileText size={18} />
                            <span>Batches</span>
                        </button>
                        <button onClick={() => setActiveView('leads')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 text-left ${activeView === 'leads' ? 'bg-gray-700' : ''}`}>
                            <Users size={18} />
                            <span>Leads</span>
                        </button>
                        <button onClick={() => setActiveView('calls')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 text-left ${activeView === 'calls' ? 'bg-gray-700' : ''}`}>
                            <PhoneCall size={18} />
                            <span>Calls</span>
                        </button>
                        <button onClick={() => setActiveView('docs')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-700 text-left ${activeView === 'docs' ? 'bg-gray-700' : ''}`}>
                            <FileText size={18} />
                            <span>Docs</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6">
                    <div className="flex gap-4">
                        {/* Main Batches Table */}
                        <div className={`${selectedBatch ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
                            {activeView === 'batches' && (
                                <div>
                                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
                                        <span>Batches</span>
                                        <ChevronRight size={16} />
                                        <span className="text-gray-200 font-medium">All Batches</span>
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            {['All', 'Backlog', 'Redial', 'In-progress', 'Completed', 'Paused'].map(filter => (
                                                <button
                                                    key={filter}
                                                    onClick={() => setBatchFilter(filter)}
                                                    className={`px-3 py-1 rounded ${batchFilter === filter ? 'bg-gray-700 text-white font-medium' : 'text-gray-400 hover:bg-gray-800'}`}
                                                >
                                                    {filter}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <button className="text-sm text-gray-400">Filter</button>
                                            <button className="text-gray-400"><Search size={18} /></button>
                                            <button className="text-gray-400"><MoreVertical size={18} /></button>
                                            <button onClick={() => setShowNewBatchModal(true)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm">
                                                New Batch
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-750 border-b border-gray-700">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Batch ID</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Description</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Status</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Leads</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Manager</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Total Leads</th>
                                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Total Calls</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-700">
                                                {batches.filter(b => batchFilter === 'All' || b.status === batchFilter).map(batch => (
                                                    <tr
                                                        key={batch.id}
                                                        onClick={() => handleBatchClick(batch)}
                                                        className="hover:bg-gray-750 cursor-pointer transition-colors"
                                                    >
                                                        <td className="px-4 py-3 text-gray-300">{batch.id}</td>
                                                        <td className="px-4 py-3 text-gray-300">{batch.description}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(batch.status)}`}>
                                                                {batch.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-400 text-xs max-w-xs truncate">{batch.leads}</td>
                                                        <td className="px-4 py-3">
                                                            <div className="flex items-center space-x-2">
                                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${batch.manager === 'H M Ahnaf Rafid' ? 'bg-gray-600' : 'bg-purple-500'}`}>
                                                                    {batch.manager.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                                </div>
                                                                <span className="text-gray-300">{batch.manager}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-300 text-center">{batch.totalLeads}</td>
                                                        <td className="px-4 py-3 text-gray-300 text-center">{batch.totalCalls}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}


                        </div>

                        {/* Right Side Panel - Batch Details */}
                        {selectedBatch && activeView === 'batches' && (
                            <div className="w-1/3 transition-all duration-300">
                                <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 sticky top-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-100">Batch Details</h3>
                                        <button
                                            onClick={handleBackToBatches}
                                            className="text-gray-400 hover:text-gray-200"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-xl font-semibold text-gray-100 mb-1">{selectedBatch.description}</h4>
                                            <p className="text-sm text-gray-400">Batch ID: {selectedBatch.id}</p>
                                        </div>

                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(selectedBatch.status)}`}>
                                                {selectedBatch.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-gray-750 rounded-lg p-3">
                                                <p className="text-gray-400 text-xs mb-1">Total Leads</p>
                                                <p className="text-xl font-bold text-gray-100">{selectedBatch.totalLeads}</p>
                                            </div>
                                            <div className="bg-gray-750 rounded-lg p-3">
                                                <p className="text-gray-400 text-xs mb-1">Calls Made</p>
                                                <p className="text-xl font-bold text-blue-400">{selectedBatch.totalCalls}</p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-750 rounded-lg p-3">
                                            <p className="text-gray-400 text-xs mb-2">Manager</p>
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${selectedBatch.manager === 'H M Ahnaf Rafid' ? 'bg-gray-600' : 'bg-purple-500'}`}>
                                                    {selectedBatch.manager.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                                <span className="text-gray-200 text-sm">{selectedBatch.manager}</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-700 space-y-3">
                                            <button
                                                onClick={() => setShowUploadModal(true)}
                                                className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                            >
                                                <Plus size={18} />
                                                <span>Add Leads</span>
                                            </button>
                                            <button
                                                onClick={handleStartCalls}
                                                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                            >
                                                <PhoneCall size={18} />
                                                <span>Start Calls</span>
                                            </button>
                                            <button
                                                onClick={() => alert(`Pausing batch ${selectedBatch.id} - ${selectedBatch.description}`)}
                                                className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                            >
                                                <XCircle size={18} />
                                                <span>Pause Batch</span>
                                            </button>
                                        </div>

                                        <div className="pt-4 border-t border-gray-700">
                                            <h5 className="text-sm font-medium text-gray-300 mb-3">Recent Activity</h5>
                                            <div className="space-y-2 text-xs text-gray-400">
                                                <div className="flex items-center space-x-2">
                                                    <ClockIcon size={12} />
                                                    <span>Last updated: Today at 2:45 PM</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <PhoneCall size={12} />
                                                    <span>{selectedBatch.totalCalls} calls completed</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Users size={12} />
                                                    <span>{selectedBatch.totalLeads - selectedBatch.totalCalls} leads remaining</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Other sections outside the flex container */}
                    <div>
                        {activeView === 'leads' && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-semibold text-gray-200">Leads</h2>
                                    <div className="flex items-center space-x-3">
                                        <button onClick={() => setShowUploadModal(true)} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                                            <Upload size={16} />
                                            <span>Upload Leads</span>
                                        </button>
                                        <button className="flex items-center space-x-2 border border-gray-600 text-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-800">
                                            <Download size={16} />
                                            <span>Export</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-750 border-b border-gray-700">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Phone Number</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Company</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Contact</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Country</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Location</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Status</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {leads.map(lead => (
                                                <tr key={lead.id} className="hover:bg-gray-750">
                                                    <td className="px-4 py-3 text-gray-300">{lead.phone}</td>
                                                    <td className="px-4 py-3 text-gray-300">{lead.company}</td>
                                                    <td className="px-4 py-3 text-gray-300">{lead.contact}</td>
                                                    <td className="px-4 py-3 text-gray-300">{lead.country}</td>
                                                    <td className="px-4 py-3 text-gray-300">{lead.location}</td>
                                                    <td className="px-4 py-3">
                                                        <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(lead.systemStatus)}`}>
                                                            {lead.systemStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <button onClick={() => handleAICall(lead)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center space-x-1">
                                                            <Phone size={12} />
                                                            <span>AI Call</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {(activeView === 'funnel' || activeView === 'calls' || activeView === 'docs') && (
                            <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-12 text-center">
                                <Activity className="text-gray-500 mx-auto mb-4" size={48} />
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h3>
                                <p className="text-gray-400">This section is coming soon</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnitCRM;
