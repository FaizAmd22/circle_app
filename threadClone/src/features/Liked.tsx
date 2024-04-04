import { Flex, Text, Center, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { API } from "../libs/axios";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useThreadsHooks } from "../hooks/threads";
import { useProfileThreadHooks } from "../hooks/profileThread";
import { setIsFetchDetail } from "../slices/detailThreadSlice";
import { LikesInterface } from "../interfaces/LikesInterface";
import { useDetailThreadHooks } from "../hooks/detailThread";

const Liked = (likes: LikesInterface) => {
  const [isClicked, setIsClicked] = useState(likes.isLiked);
  // const [likedCount, setLikedCount] = useState(likes.liked);
  const userId = sessionStorage.getItem("id");
  const { fetchThreadAuth, fetchThread } = useThreadsHooks();
  const { fetchDetailAuth, fetchDetail } = useDetailThreadHooks();
  const { fetchProfileThread, fetchProfileThreadAuth } =
    useProfileThreadHooks();
  const currentUrl = window.location.href;
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = likes.id;
  const test = "";
  console.log("isLiked :", likes.likedPerson);

  const fetchLike = async () => {
    if (likes.type == "threads") {
      const tes = await API.post(`/thread/${id}/like`, test, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("tes", tes);
    } else {
      await API.post(`/reply/${id}/like`, test, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };
  // console.log("liked :", likes);
  const handleLiked = async () => {
    if (!token) {
      Swal.fire({
        title: "You need to login first!",
        text: "Do you wanna login?",
        background: "#2b2b2b",
        color: "white",
        showCancelButton: true,
        confirmButtonText: "Yes",
        reverseButtons: true,
      }).then((result: any) => {
        if (result.isConfirmed) {
          // window.location.replace("/login");
          navigate("/login");
        }
      });
    } else {
      await fetchLike();
      await fetchThread();
      await fetchThreadAuth();
      await fetchProfileThread();
      await fetchProfileThreadAuth();
      if (currentUrl.includes("details")) {
        await fetchDetailAuth();
      }
      // console.log("thread Id :", likes);
      setIsClicked(!isClicked);

      dispatch(setIsFetchDetail(true));

      // if (!isClicked) {
      //   setLikedCount(likedCount + 1);
      // } else {
      //   setLikedCount(likedCount - 1);
      // }
    }
  };

  return (
    <Flex gap="2">
      <Link
        px="0"
        bg="none"
        text="start"
        fontSize="2xl"
        color="gray.500"
        _hover={{ color: "gray.200" }}
        onClick={handleLiked}
      >
        {likes.isLiked ? (
          <Text color="red.500">
            <FaHeart />
          </Text>
        ) : (
          <FaRegHeart />
        )}
      </Link>

      <Text color="gray.500" fontSize="md">
        {likes.liked}
      </Text>
    </Flex>
  );
};

export default Liked;
