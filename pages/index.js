import EventList from 'components/events/EventList';
import EventItem from 'components/events/EventItem';
import NewsletterRegistration from 'components/input/NewsletterRegistration';
import { getFeaturedEvents } from 'utilities/NextEvents';

export default function Home({ featuredEvents }) {
  return (
    <div>
      <NewsletterRegistration />
      <EventList>
        <EventItem events={featuredEvents} />
      </EventList>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return { props: { featuredEvents }, revalidate: 1800 };
}
