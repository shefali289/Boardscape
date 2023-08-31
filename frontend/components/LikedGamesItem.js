import styles from '../styles/LikedGamesItem.module.css';

const LikedGamesItem = ({ games }) => (
  <div style={{
    float: 'right', marginRight: 350, marginTop: -705, padding: 13, boxShadow: '2px 3px 5px rgba(0, 0, 0, 0.1)',
  }}
  >
    <h1>Liked Games</h1>
    {games.map((g) => (
      <div key={g} className={styles.user} style={{ width: 240 }}>
        {/* <div className={styles.img}>
                    <Image
                    src={
                        '/images/user-default.png'
                    }
                    width={170}
                    height={170}
                    />
                </div> */}
        <div className={styles.info}>
          <p>{g}</p>
        </div>
      </div>
    ))}
  </div>
);

export default LikedGamesItem;
