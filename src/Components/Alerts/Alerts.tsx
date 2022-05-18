import { useEffect, useState } from "react";
import "./Alerts.css";
import { MessageProps } from "./../../Interfaces";

export default function Alerts({ message }: MessageProps) {
  const [show, setShow] = useState<boolean>(true);
  const [completed, setCompleted] = useState<"completed" | null>(null);
  useEffect(() => {
    setTimeout(() => {
      setCompleted("completed");
    }, 1000);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [message]);
  return (
    <>
      {show && (
        <div className={`alert ${completed}`}>
          <p>{message}</p>
        </div>
      )}
    </>
  );
}
