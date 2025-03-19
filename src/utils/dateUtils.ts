// src/utils/dateUtils.ts

// Format date to YYYY-MM-DD for input fields
export const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };
  
  // Format date to a more readable format for display
  export const formatDateForDisplay = (date: Date | string | undefined): string => {
    if (!date) return 'N/A';
    
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format date with time for detailed views
  export const formatDateTime = (date: Date | string | undefined): string => {
    if (!date) return 'N/A';
    
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Check if a date is past due
  export const isPastDue = (date: Date | string | undefined): boolean => {
    if (!date) return false;
    
    const dueDate = new Date(date);
    const today = new Date();
    
    // Remove time component for comparison
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  };
  
  // Get relative time (today, tomorrow, yesterday, or date)
  export const getRelativeTime = (date: Date | string | undefined): string => {
    if (!date) return 'No date';
    
    const dueDate = new Date(date);
    const today = new Date();
    
    // Remove time component for comparison
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    
    return formatDateForDisplay(date);
  };