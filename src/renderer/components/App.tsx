import { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState<string>();

  return (
    <>
      <button
        onClick={async () => {
          setMessage(await window.api.sendMessage('ping'));
        }}
      >
        ping
      </button>

      {message && <div className='mt'>{message}</div>}
    </>
  );
};

export default App;
