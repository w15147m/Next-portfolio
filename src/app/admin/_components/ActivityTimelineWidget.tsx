import React from 'react';

export default function ActivityTimelineWidget() {
  return (
    <div className="rounded-2xl bg-[#091515] border border-[#163533] p-5 h-full flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-medium text-teal-100 tracking-wide">Activity Timeline</h3>
        <span className="text-teal-600 font-bold tracking-widest">...</span>
      </div>
      <div className="flex-1 flex flex-col gap-6 relative ml-3 mt-2">
        <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-[#163533]"></div>
        
        <div className="relative pl-6">
          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]"></div>
          <h4 className="text-sm font-semibold text-white mb-0.5">Active</h4>
          <p className="text-[11px] text-teal-600">Montime - 2h ago</p>
        </div>
        
        <div className="relative pl-6">
          <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full border-2 border-[#163533] bg-[#091515]"></div>
          <h4 className="text-sm font-medium text-teal-50/80 mb-0.5">Notifications</h4>
          <p className="text-[11px] text-teal-600">Updated - 2h ago</p>
        </div>
      </div>
    </div>
  );
}
