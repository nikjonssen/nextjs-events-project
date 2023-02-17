import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

// SERVER SIDE in dynamic pages this function MUST be exported with getStaticProps()

export async function getStaticPaths(context) {
  // get data
  const client = await MongoClient.connect(process.env.DB_URI);
  const db = client.db();
  const eventsColletion = db.collection("meetups");
  const events = await eventsColletion.find({}, { _id: 1 }).toArray(); // gets only ids of data
  client.close();

  return {
    fallback: "blocking", // only page FULLY populated with fetched data will show up (true: first may be empty page, then gradually populated with data/ false: only pregenerated page will be shown (newly added will generate 404))
    paths: events.map((x) => ({
      params: {
        meetupId: x._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // get data for single event
  const meetupId = context.params.meetupId; // get dynamic event id from URL
  const client = await MongoClient.connect(process.env.DB_URI);
  const db = client.db();
  const eventsColletion = db.collection("meetups");
  const selectedEvent = await eventsColletion.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedEvent._id.toString(),
        title: selectedEvent.title,
        image: selectedEvent.image,
        address: selectedEvent.address,
        description: selectedEvent.description,
      },
    },
  };
}

export default MeetupDetails;
