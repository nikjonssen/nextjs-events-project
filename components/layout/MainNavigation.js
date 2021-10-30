import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Next Events</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Events</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
