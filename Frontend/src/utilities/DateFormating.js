export const formatDate = async (dateToBeformated) => {
    const dateStr = dateToBeformated;
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    console.log(formattedDate); // December 2, 6666
    return formattedDate;

}