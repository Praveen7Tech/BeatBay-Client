import toast, { ToastOptions } from 'react-hot-toast';

const baseStyle: ToastOptions = {
  position: 'top-center',
  duration: 4000,
  style: {
    minWidth: '340px',
    minHeight: '80px',
    borderRadius: '16px',
    padding: '20px 24px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    transition: 'all 0.3s ease',
  },
};

export const showSuccess = (message: string) => {
  toast.success(message, {
    ...baseStyle,
    style: {
      ...baseStyle.style,
      background: 'rgba(46, 204, 113, 0.2)',
      color: '#e8f5e9',
      border: '1px solid rgba(76, 175, 80, 0.4)',
      boxShadow: '0 4px 30px rgba(76, 175, 80, 0.6)',
    },
    icon: '✅',
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    ...baseStyle,
    style: {
      ...baseStyle.style,
      background: 'rgba(231, 76, 60, 0.25)',
      color: '#ffebee',
      border: '1px solid rgba(244, 67, 54, 0.4)',
      boxShadow: '0 4px 30px rgba(244, 67, 54, 0.6)',
    },
    icon: '❌',
  });
};

export const showInfo = (message: string) => {
  toast(message, {
    ...baseStyle,
    style: {
      ...baseStyle.style,
      background: 'rgba(52, 152, 219, 0.25)',
      color: '#e3f2fd',
      border: '1px solid rgba(33, 150, 243, 0.4)',
      boxShadow: '0 4px 30px rgba(33, 150, 243, 0.6)',
    },
    icon: '💡',
  });
};
