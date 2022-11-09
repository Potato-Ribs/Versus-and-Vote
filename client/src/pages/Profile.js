import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, storage } from "../fbase";
import Header from "../components/header/Header";
import Input from "../components/Input";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../app/features/currentUserSlice";
import { BtnAccent } from "../components/button/BtnAccent";

const StyledProfile = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};

  .profile-container {
    width: 100%;
    max-width: 40rem;
    display: grid;

    input {
      margin: 40px 0;
    }
  }
  .title {
    font-size: 2rem;
    font-weight: 600;
    margin: 40px 0;
  }
  .name-setting {
    grid-row: 2/3;
    margin-bottom: 100px;
  }
  .avatar-setting {
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    align-self: center;
    justify-self: end;
    grid-row: 2/3;
    grid-column: 2/3;
  }
  .save-profile {
    grid-row: 3/4;
    grid-column: 1/3;
    margin-top: 2rem;
  }
`;

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const [newPhoto, setNewPhoto] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName);
      setPhotoURL(currentUser.photoURL);
      setNewPhoto(currentUser.newPhoto);
    }
  }, [currentUser]);

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    if (newPhoto === photoURL) {
      await updateProfile(auth.currentUser, { displayName });
      dispatch(getCurrentUser({ displayName, photoURL, newPhoto }));
      window.location.reload();
      alert("프로필이 저장되었습니다.");
    } else {
      const photoRef = ref(storage, `${currentUser.uid}/${uuidv4()}`);
      const response = await uploadString(photoRef, newPhoto, "data_url");
      const url = await getDownloadURL(response.ref);
      dispatch(getCurrentUser({ displayName, photoURL, newPhoto }));
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: url,
      });
      window.location.reload();
      alert("프로필이 저장되었습니다.");
    }
  };

  const onFileChange = (e) => {
    const files = e.target.files;
    const chosenImg = files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const result = e.currentTarget.result;
      setNewPhoto(result);
      dispatch(getCurrentUser({ displayName, photoURL, newPhoto }));
    };
    reader.readAsDataURL(chosenImg);
  };

  return (
    <StyledProfile className="Profile">
      <Header />
      <form className="profile-container" onSubmit={onSubmitHandle}>
        <h1 className="title">회원정보</h1>
        <img className="avatar-setting" src={newPhoto} alt="회원 이미지" />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <div className="name-setting">
          <Input
            label="이름"
            inputValue={displayName}
            setInput={setDisplayName}
          />
        </div>
        <BtnAccent className="save-profile">저장</BtnAccent>
      </form>
    </StyledProfile>
  );
};

export default Profile;
