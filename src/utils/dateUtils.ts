export function parseFormatTimePT(formatPT: string | null | undefined): string {
    if (!formatPT || typeof formatPT !== 'string' || !formatPT.startsWith('PT')) {
      return '0 : 0 mins';
    }
    const splitTime = formatPT.substring(2);
  
    const matchHours = splitTime.match(/(\d+)H/);
    const matchMinutes = splitTime.match(/(\d+)M/);
  
    const totalHours = matchHours ? parseInt(matchHours[1], 10) : 0;
    const totalMinutes = matchMinutes ? parseInt(matchMinutes[1], 10) : 0;
  
    return `${totalHours} : ${totalMinutes} mins`;
  }