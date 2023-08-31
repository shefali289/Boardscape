import { GET_EVENTS } from 'graphql/query';
import {
  useQuery,
} from '@apollo/client';

import EventLayout from '@/components/events/EventLayout';

const EventsPage = () => {
  const { loading, data, error } = useQuery(GET_EVENTS);
  if (error) {
    throw new Error(error);
  }
  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <div>
          <EventLayout data={data.getEvents} />
        </div>
      )}
    </div>
  );
};

// This gets called on every request
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const client = makeClient();
//   const { loading, data, error } = await client.query({ query: GET_EVENTS });

//   if (error) {
//     throw new Error(error);
//   }
//   // Pass data to the page via props
//   return { props: { loading, data } };
// }

export default EventsPage;
