import React, { useState, useEffect } from "react";
import ProfileBar from "../../components/Profile/ProfileBar";
import Statistics from "../../components/statistics/Statistics";
import { GetAllGameData } from "../../services/user.service";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [userData, setUserData] = useState("");
  const [gameData, setGameData] = useState("");

  const getGameData = async () => {
    try {
      const response = await GetAllGameData();
      setUserData(response.data.userData);
      setGameData(response.data.gameData);
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error.");
    }
  };

  useEffect(() => {
    getGameData();
  }, []);

  return (
    <>
      <ProfileBar userData={userData} />
      <Statistics gameData={gameData} />
    </>
  );
};

export default ProfilePage;
