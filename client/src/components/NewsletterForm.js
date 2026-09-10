'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [joined, setJoined] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setJoined(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Email address"
        type="email"
        name="email"
        placeholder="Email address"
        required
      />
      <button type="submit">{joined ? 'Welcome ✓' : 'Join ↗'}</button>
    </form>
  );
}
