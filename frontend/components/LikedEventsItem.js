import styles from '../styles/LikedEventsItem.module.css';

const LikedEventsItem = ({ events, status }) => (
  <div style={{
    float: 'right', marginRight: 30, marginTop: -705, padding: 13, boxShadow: '2px 3px 5px rgba(0, 0, 0, 0.1)',
  }}
  >
    <h1>Interested Events</h1>
    {events.map((e, index) => (
      <div key={e} className={styles.user} style={{ width: 240 }}>
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
          <p>{e}</p>
          <p>
            Status:
            {' '}
            {status[index]}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export default LikedEventsItem;
