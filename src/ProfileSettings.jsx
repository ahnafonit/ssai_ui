import React, { useState } from 'react';
import { User, Mail, Phone, Building, Calendar, Shield, Bell, Globe, Palette, Lock, Save, X, Camera, Eye, EyeOff } from 'lucide-react';

export default function ProfileSettings({ user, onClose, onSave }) {
    const [activeSection, setActiveSection] = useState('personal');
    const [showPassword, setShowPassword] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        department: user?.department || '',
        role: user?.role || '',
        timezone: 'America/New_York',
        language: 'English (US)',
        dateFormat: 'MM/DD/YYYY',
        theme: 'dark',
        notifications: {
            email: true,
            push: true,
            sms: false,
            weeklyReport: true
        },
        privacy: {
            profileVisibility: 'team',
            activityStatus: true,
            shareAnalytics: false
        }
    });

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNestedChange = (category, field, value) => {
        setProfileData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        if (onSave) {
            onSave(profileData);
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-700">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">Profile Settings</h2>
                            <p className="text-blue-100 text-sm">Manage your account and preferences</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex h-[calc(90vh-120px)]">
                    {/* Sidebar Navigation */}
                    <div className="w-64 bg-gray-750 border-r border-gray-700 p-4 overflow-y-auto">
                        <nav className="space-y-1">
                            {[
                                { id: 'personal', label: 'Personal Info', icon: User },
                                { id: 'account', label: 'Account Security', icon: Shield },
                                { id: 'preferences', label: 'Preferences', icon: Palette },
                                { id: 'notifications', label: 'Notifications', icon: Bell },
                                { id: 'privacy', label: 'Privacy', icon: Lock }
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeSection === item.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    <item.icon size={18} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeSection === 'personal' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Personal Information</h3>

                                    {/* Profile Photo */}
                                    <div className="mb-6 flex items-center space-x-4">
                                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                                            {profileData.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                                <Camera size={16} />
                                                <span>Change Photo</span>
                                            </button>
                                            <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF. Max size 2MB</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <User size={14} className="inline mr-1" />
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <Mail size={14} className="inline mr-1" />
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <Phone size={14} className="inline mr-1" />
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <Building size={14} className="inline mr-1" />
                                                Department
                                            </label>
                                            <input
                                                type="text"
                                                value={profileData.department}
                                                onChange={(e) => handleInputChange('department', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'account' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Account Security</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Current Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter current password"
                                                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                                                />
                                                <button
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="Confirm new password"
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                            Update Password
                                        </button>
                                    </div>

                                    <div className="mt-8 p-4 bg-gray-750 border border-gray-600 rounded-lg">
                                        <h4 className="font-medium text-gray-200 mb-3">Two-Factor Authentication</h4>
                                        <p className="text-sm text-gray-400 mb-4">
                                            Add an extra layer of security to your account by enabling 2FA.
                                        </p>
                                        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                                            Enable 2FA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'preferences' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Preferences</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <Globe size={14} className="inline mr-1" />
                                                Language
                                            </label>
                                            <select
                                                value={profileData.language}
                                                onChange={(e) => handleInputChange('language', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option>English (US)</option>
                                                <option>English (UK)</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                                <option>German</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <Calendar size={14} className="inline mr-1" />
                                                Timezone
                                            </label>
                                            <select
                                                value={profileData.timezone}
                                                onChange={(e) => handleInputChange('timezone', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="America/New_York">Eastern Time (ET)</option>
                                                <option value="America/Chicago">Central Time (CT)</option>
                                                <option value="America/Denver">Mountain Time (MT)</option>
                                                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                                                <option value="Europe/London">London (GMT)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Date Format
                                            </label>
                                            <select
                                                value={profileData.dateFormat}
                                                onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option>MM/DD/YYYY</option>
                                                <option>DD/MM/YYYY</option>
                                                <option>YYYY-MM-DD</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                <Palette size={14} className="inline mr-1" />
                                                Theme
                                            </label>
                                            <select
                                                value={profileData.theme}
                                                onChange={(e) => handleInputChange('theme', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="dark">Dark</option>
                                                <option value="light">Light</option>
                                                <option value="auto">Auto (System)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'notifications' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Notification Settings</h3>

                                    <div className="space-y-4">
                                        {[
                                            { id: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                                            { id: 'push', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                                            { id: 'sms', label: 'SMS Notifications', description: 'Receive text message notifications' },
                                            { id: 'weeklyReport', label: 'Weekly Reports', description: 'Receive weekly performance reports' }
                                        ].map(item => (
                                            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-600">
                                                <div>
                                                    <p className="font-medium text-gray-200">{item.label}</p>
                                                    <p className="text-sm text-gray-400">{item.description}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={profileData.notifications[item.id]}
                                                        onChange={(e) => handleNestedChange('notifications', item.id, e.target.checked)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'privacy' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-100 mb-4">Privacy Settings</h3>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-gray-750 rounded-lg border border-gray-600">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Profile Visibility
                                            </label>
                                            <select
                                                value={profileData.privacy.profileVisibility}
                                                onChange={(e) => handleNestedChange('privacy', 'profileVisibility', e.target.value)}
                                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="public">Public</option>
                                                <option value="team">Team Only</option>
                                                <option value="private">Private</option>
                                            </select>
                                            <p className="text-xs text-gray-400 mt-2">Control who can see your profile information</p>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-600">
                                            <div>
                                                <p className="font-medium text-gray-200">Activity Status</p>
                                                <p className="text-sm text-gray-400">Show when you're online</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={profileData.privacy.activityStatus}
                                                    onChange={(e) => handleNestedChange('privacy', 'activityStatus', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-750 rounded-lg border border-gray-600">
                                            <div>
                                                <p className="font-medium text-gray-200">Share Analytics</p>
                                                <p className="text-sm text-gray-400">Allow analytics data to be shared with team</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={profileData.privacy.shareAnalytics}
                                                    onChange={(e) => handleNestedChange('privacy', 'shareAnalytics', e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-750 border-t border-gray-700 p-4 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                        <Save size={18} />
                        <span>Save Changes</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
