import { Text, Stack } from "@chakra-ui/react";
import CreatePost from "../../features/CreatePost";
import Threads from "./components/Threads";

const Home = () => {
  const token = sessionStorage.getItem("token");

  return (
    <Stack p="4" pb="0" color="white" h={{ base: "82vh", md: "100vh" }}>
      <Text
        py="4"
        fontSize="2xl"
        fontWeight="semibold"
        display={{ base: "none", md: "block" }}
      >
        Home
      </Text>

      {token && <CreatePost type="threads" />}

      <Threads />
    </Stack>
  );
};

export default Home;
