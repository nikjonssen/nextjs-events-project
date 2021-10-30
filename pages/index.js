import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Find Next Event to Attend!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// SERVER SIDE: code from getStaticProps/getStaticPaths/getServerSideProps runs ONLY on server side

export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://jason:jasonbase@nodeexpressapi.5xkbz.mongodb.net/events?retryWrites=true&w=majority"
  );
  const db = client.db();
  const eventsColletion = db.collection("meetups");
  const events = await eventsColletion.find().toArray();
  client.close();

  return {
    props: {
      // these props will be delivered to HomePage component
      meetups: events.map((x) => ({
        id: x._id.toString(),
        title: x.title,
        image: x.image,
        address: x.address,
      })),
    },
    revalidate: 1, // this page will be regenerated every 1s if there are request of it (i.e. data on that page is never older than 1s)
  };
}

// export async function getServerSideProps(context) {
//   // is used for data that changes frequently (every 1s or less) / have access to req/res objects
//   // runs on the server for any incoming request (no need to use revalidate)
//   // not recomended to use unnecessarily
//   const req = context.req;
//   const res = context.res;
//   // fetch data from API
//   return {
//     props: {
//       // these props will be delivered to HomePage component
//       meetups: DUMMY_MEETAUPS,
//     },
//   };
// }

export default HomePage;
