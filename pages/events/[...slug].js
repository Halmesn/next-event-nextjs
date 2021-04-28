import { getFilteredEvents } from 'utilities/NextEvents';
import EventList from 'components/events/EventList';
import EventItem from 'components/events/EventItem';
import ResultsTitle from 'components/events/ResultsTitle';
import ErrorAlert from 'components/ui/ErrorAlert';
import Button from 'components/ui/Button';

export default function FilteredEvents({
  filteredEvents,
  selectedYear,
  selectedMonth,
  invalidValue = false,
}) {
  if (invalidValue)
    return (
      <div className="center">
        <ErrorAlert>
          <p>Invalid value, please try again!</p>
        </ErrorAlert>
        <Button href="/events">Show all events</Button>
      </div>
    );

  if (filteredEvents.length === 0 || !filteredEvents)
    return (
      <div className="center">
        <ErrorAlert>
          <p>No events found</p>
        </ErrorAlert>
        <Button href="/events">Show all events</Button>
      </div>
    );

  const date = new Date(selectedYear, selectedMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList>
        <EventItem events={filteredEvents} />
      </EventList>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const filteredEvents = await getFilteredEvents(params.slug);
  const [selectedYear, selectedMonth] = params.slug;

  if (
    isNaN(+selectedYear) ||
    isNaN(+selectedMonth) ||
    +selectedMonth < 1 ||
    +selectedMonth > 12 ||
    +selectedYear > 2030 ||
    +selectedYear < 2021
  ) {
    return { props: { invalidValue: true } };
  }

  return {
    props: { filteredEvents, selectedYear, selectedMonth },
  };
}
