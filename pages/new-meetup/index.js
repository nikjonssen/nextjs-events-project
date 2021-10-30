// domain.com/new-meetup
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetup() {
  const router = useRouter();
  async function meetupHandler(enteredData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Set a New Event</title>
        <meta
          name="description"
          content="Create an Event for everyone to Attend!"
        />
      </Head>
      <NewMeetupForm onAddMeetup={meetupHandler} />
    </>
  );
}

export default NewMeetup;
