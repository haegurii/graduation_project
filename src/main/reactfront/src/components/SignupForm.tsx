import React, { useState, ChangeEvent, FormEvent } from "react";
import SignUp from "../views/Athentication/SignUp";
function SignupForm() {
  //   const [formData, setFormData] = useState({
  //     username: "",
  //     birthdate: "",
  //     phoneNumber: "",
  //     isDeaf: false,
  //   });

  //   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //     const { name, value, type, checked } = e.target;
  //     setFormData({
  //       ...formData,
  //       [name]: type === "checkbox" ? checked : value,
  //     });
  //   };

  //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     // 여기에서 서버로 데이터를 보내고 저장하는 로직을 추가하세요.
  //     console.log("회원가입 정보:", formData);
  //   };

  return (
    //   <div>
    //     <h2>회원가입</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div>
    //         <label htmlFor="username">사용자 이름</label>
    //         <input
    //           type="text"
    //           id="username"
    //           name="username"
    //           value={formData.username}
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="birthdate">생년월일</label>
    //         <input
    //           type="text"
    //           id="birthdate"
    //           name="birthdate"
    //           value={formData.birthdate}
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="phoneNumber">휴대폰 번호</label>
    //         <input
    //           type="text"
    //           id="phoneNumber"
    //           name="phoneNumber"
    //           value={formData.phoneNumber}
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <div>
    //         <label htmlFor="isDeaf">농인</label>
    //         <input
    //           type="checkbox"
    //           id="isDeaf"
    //           name="isDeaf"
    //           checked={formData.isDeaf}
    //           onChange={handleChange}
    //         />
    //       </div>
    //       <button type="submit">회원가입</button>
    //     </form>
    //   </div>
    // );
    <SignUp />
  );
}

export default SignupForm;
