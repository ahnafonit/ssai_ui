import React, { useState, useEffect } from 'react';
import { Clock as ClockIcon, Settings, X } from 'lucide-react';

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showSettings, setShowSettings] = useState(false);
    const [clockSettings, setClockSettings] = useState(() => {
        const saved = localStorage.getItem('clockSettings');
        return saved ? JSON.parse(saved) : {
            format: '12', // 12 or 24
            showSeconds: true,
            showDate: true
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('clockSettings', JSON.stringify(clockSettings));
    }, [clockSettings]);

    const formatTime = () => {
        let hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        let ampm = '';

        if (clockSettings.format === '12') {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
        }

        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');

        let timeStr = `${hoursStr}:${minutesStr}`;
        if (clockSettings.showSeconds) {
            timeStr += `:${secondsStr}`;
        }
        timeStr += ampm;

        return timeStr;
    };

    const formatDate = () => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return currentTime.toLocaleDateString('en-US', options);
    };

    const handleSettingChange = (setting, value) => {
        setClockSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    return (
        <div className="relative">
            <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2 text-gray-100">
                <ClockIcon size={16} className="text-gray-300" />
                <div className="flex flex-col text-right">
                    <span className="text-sm font-medium">{formatTime()}</span>
                    {clockSettings.showDate && (
                        <span className="text-xs text-gray-400">{formatDate()}</span>
                    )}
                </div>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="ml-2 text-gray-400 hover:text-gray-200 transition-colors"
                    title="Clock Settings"
                >
                    <Settings size={14} />
                </button>
            </div>

            {showSettings && (
                <div className="absolute right-0 top-full mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4 w-64 z-50">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-100">Clock Settings</h3>
                        <button
                            onClick={() => setShowSettings(false)}
                            className="text-gray-400 hover:text-gray-200"
                        >
                            <X size={16} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-2">
                                Time Format
                            </label>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleSettingChange('format', '12')}
                                    className={`flex-1 px-3 py-2 rounded text-xs font-medium transition-colors ${clockSettings.format === '12'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                >
                                    12 Hour
                                </button>
                                <button
                                    onClick={() => handleSettingChange('format', '24')}
                                    className={`flex-1 px-3 py-2 rounded text-xs font-medium transition-colors ${clockSettings.format === '24'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }`}
                                >
                                    24 Hour
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-gray-300">
                                Show Seconds
                            </label>
                            <button
                                onClick={() => handleSettingChange('showSeconds', !clockSettings.showSeconds)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${clockSettings.showSeconds ? 'bg-blue-600' : 'bg-gray-600'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${clockSettings.showSeconds ? 'translate-x-5' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-gray-300">
                                Show Date
                            </label>
                            <button
                                onClick={() => handleSettingChange('showDate', !clockSettings.showDate)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${clockSettings.showDate ? 'bg-blue-600' : 'bg-gray-600'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${clockSettings.showDate ? 'translate-x-5' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="pt-2 border-t border-gray-700">
                            <p className="text-xs text-gray-400 italic">
                                Settings are saved automatically
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clock;
