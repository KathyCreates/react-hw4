import { use } from "react";

type MessageComponentProps = {
  messagePromise: Promise<string>;
};

export default function MessageComponent({ messagePromise }: MessageComponentProps) {
  const message = use(messagePromise);
  return <p>{message}</p>;
}
