import React from 'react';

const HomepageHero = () => (
  <div
    className="hero-conatiner"
    style={{
      background: 'url("https://www.justgamesrochester.com/wp-content/uploads/2020/08/20200821_120004-1200x583.jpg") center ceter/cover no-repeat',
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)',
      objectFit: 'contain',
      zIndex: -2,
    }}
  >
    <img
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 0,
        filter: 'brightness(0.5)',
      }}
      className="heroimg"
      src="https://img.atlasobscura.com/vuUs8XAJ_gNDAb1h_ZTKmYhT8c9BAwZgDmfqPcxCi1g/rt:fit/w:1280/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL2Fzc2V0/cy8wZWVmYzA2Zjhk/MzVmOTEzMTZfR2V0/dHlJbWFnZXMtMTIx/MjIwMTE5NC5qcGc.jpg"
      alt="homepage: person playing Catan"
    />
    <h1
      style={{
        transform: 'scale(2.5)',
        color: 'white',
        zIndex: 1,
        textShadow: '2px 2px #000000',
        margin: '60px',
      }}
    >
      Welcome to Boardscape

    </h1>
    <p
      style={{
        transform: 'scale(2.5)',
        color: 'white',
        zIndex: 1,
        textShadow: '2px 2px #000000',
        margin: '40px',
      }}
    >
      The home of the latest games and the coolest players

    </p>
  </div>
);

export default HomepageHero;
