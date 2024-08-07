export const formatDateWithoutTime = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
  
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };
  