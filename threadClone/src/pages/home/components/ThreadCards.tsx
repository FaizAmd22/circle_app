import { useSelector } from "react-redux";
import { selectThread } from "../../../slices/threadSlice";
import { ThreadInterface } from "../../../interfaces/ThreadInterface";
import { useEffect } from "react";
import { useThreadsHooks } from "../../../hooks/threads";
import ThreadCard from "../../../component/ThreadCard";

const ThreadCards = () => {
  const datas = useSelector(selectThread);

  console.log("data di threadCards :", datas)


  return datas.map((thread: ThreadInterface, index: number) => {
    return <ThreadCard key={index} thread={thread} />;
  });
};

export default ThreadCards;
