import React from 'react';
import {
  Compass,
  Car,
  Sparkles,
  Flame,
  Wifi,
  CreditCard,
  Train,
  Flag,
  FileText,
  Camera,
  Briefcase,
  Utensils,
  Package,
  ShieldAlert,
  Coffee,
  Mountain,
  MapPin,
  Building,
  HeartPulse,
  Truck,
  HelpCircle,
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function ServiceIcon({ name, className = '', size = 18 }: ServiceIconProps) {
  switch (name) {
    case 'compass':
      return <Compass size={size} className={className} />;
    case 'car':
      return <Car size={size} className={className} />;
    case 'sparkles':
      return <Sparkles size={size} className={className} />;
    case 'flame':
      return <Flame size={size} className={className} />;
    case 'wifi':
      return <Wifi size={size} className={className} />;
    case 'credit-card':
      return <CreditCard size={size} className={className} />;
    case 'train':
      return <Train size={size} className={className} />;
    case 'flag':
      return <Flag size={size} className={className} />;
    case 'file-text':
      return <FileText size={size} className={className} />;
    case 'camera':
      return <Camera size={size} className={className} />;
    case 'briefcase':
      return <Briefcase size={size} className={className} />;
    case 'utensils':
      return <Utensils size={size} className={className} />;
    case 'package':
      return <Package size={size} className={className} />;
    case 'shield-alert':
      return <ShieldAlert size={size} className={className} />;
    case 'coffee':
      return <Coffee size={size} className={className} />;
    case 'mountain':
      return <Mountain size={size} className={className} />;
    case 'map-pin':
      return <MapPin size={size} className={className} />;
    case 'building':
      return <Building size={size} className={className} />;
    case 'heart':
      return <HeartPulse size={size} className={className} />;
    case 'truck':
      return <Truck size={size} className={className} />;
    default:
      return <HelpCircle size={size} className={className} />;
  }
}
