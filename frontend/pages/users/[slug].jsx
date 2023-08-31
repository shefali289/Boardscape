import Link from 'next/link';
import Image from 'next/image';
import userData from 'data/userdata';
import Layout from '../../components/Layout';
import styles from '../../styles/User.module.css';
import LikedGamesItem from '../../components/LikedGamesItem';
import LikedEventsItem from '../../components/LikedEventsItem';

const UserPage = ({ usr }) => (
  <div>
    {usr
      ? (
        <div>
          <Layout>
            <div className={styles.user} style={{ marginLeft: -200, marginTop: -70, width: 350 }}>
              <h1>{usr.name}</h1>
              {usr.image && (
              <div className={styles.image}>
                <Image src={usr.image} width={250} height={250} />
              </div>
              )}

              <h3>Description:</h3>
              <p>{usr.description}</p>

              <Link href="/users">
                <a href="/users" className={styles.back}>
                  {'<'}
                  {' '}
                  Go Back
                </a>
              </Link>
            </div>
          </Layout>
          <LikedGamesItem key={usr.id} games={usr.likedGames} />
          <LikedEventsItem key={usr.id} events={usr.likedEvents} status={usr.eventStatus} />
          {' '}

        </div>
      ) : <h1>User not found</h1>}
  </div>
);

export async function getStaticPaths() {
  const paths = userData.users.map((usr) => ({
    params: { slug: usr.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const users = userData.users.filter((usr) => usr.slug === slug);

  return {
    props: {
      usr: users[0],
    },
  };
}

export default UserPage;
