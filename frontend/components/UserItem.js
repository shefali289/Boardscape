import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/UserItem.module.css';

const UserItem = ({ usr }) => (
  <div className={styles.user}>
    <div className={styles.img}>
      <Image
        src={
            usr.image
              ? usr.image
              : '/images/user-default.png'
          }
        width={120}
        height={100}
      />
    </div>

    <div className={styles.info}>
      <h3>{usr.name}</h3>
    </div>

    <div className={styles.link}>
      <Link href={`/users/${usr.slug}`}>
        <a href={`/users/${usr.slug}`} className="btn">Details</a>
      </Link>
    </div>
  </div>
);

export default UserItem;
