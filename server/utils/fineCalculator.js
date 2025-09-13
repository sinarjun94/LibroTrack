export const calculateFine = (dueDate) => { 
    const finePerDay = 0.1; // 10 cent
    const today = new Date();
    if( today > dueDate) {
        const lateHours = Math.ceil((today - dueDate) / (1000 * 60 * 60));
        const fine = lateHours * finePerDay;
        return fine;
    }
    return 0; // No fine if not late
}