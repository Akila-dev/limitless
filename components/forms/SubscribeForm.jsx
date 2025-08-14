"use client";

import { useState } from "react";
import { Button } from "@/components";

const SubscribeForm = ({ filledStyle }) => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribed");
  };

  return (
    <div className="flex gap-1 mt-2">
      <input
        type="email"
        placeholder="mail@mail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-b border-fg/50 p-0.5"
      />
      <Button text="Subscribe" onClick={() => handleSubscribe()} />
    </div>
  );
};

export default SubscribeForm;
