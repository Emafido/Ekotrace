import React from 'react';
import { ClaimStatus } from '@/types';
import { CheckCircle2, AlertCircle, HelpCircle, ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  status: ClaimStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  let label = '';
  let colorClasses = '';
  let Icon = CheckCircle2;

  switch (status) {
    case 'verified-community':
      label = 'Community verified';
      colorClasses = 'text-[#1E5C3E] bg-[#EEF7F2] border-[#C2E2CE]';
      Icon = CheckCircle2;
      break;
    case 'verified-institution':
      label = 'Institution verified';
      colorClasses = 'text-[#1B4163] bg-[#EEF4F9] border-[#C1D5E5]';
      Icon = ShieldCheck;
      break;
    case 'conflicting':
      label = 'Sources disagree';
      colorClasses = 'text-[#8E361D] bg-[#FDF3EE] border-[#F1D2C6]';
      Icon = AlertCircle;
      break;
    case 'unknown':
      label = 'Not yet confirmed';
      colorClasses = 'text-[#734F18] bg-[#FAF4E7] border-[#E8DCBF]';
      Icon = HelpCircle;
      break;
    case 'unverified':
    default:
      label = 'Unverified claim';
      colorClasses = 'text-[#5A5954] bg-[#F3EFE6] border-[#DDD8CB]';
      Icon = AlertCircle;
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2',
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium border rounded-sm transition-colors ${colorClasses} ${sizeClasses} ${className}`}
      role="status"
    >
      {showIcon && <Icon className={`${iconSizes} shrink-0`} aria-hidden="true" />}
      <span className="tracking-tight">{label}</span>
    </span>
  );
};
