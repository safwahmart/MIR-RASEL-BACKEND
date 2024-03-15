import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export default function formatDate(date, template = 'dd MMM, yyyy - hh:mm a') {
  return format(parseISO(new Date(date).toISOString()), template);
}
