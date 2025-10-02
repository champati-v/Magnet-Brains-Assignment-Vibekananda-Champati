export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const priorityColor = (priority) => {
    switch(priority.toLowerCase()) {
        case 'high':
            return 'bg-red-600 text-white';
        case 'medium':
            return 'bg-yellow-600 text-white';
        case 'low':
            return 'bg-green-600 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
}
