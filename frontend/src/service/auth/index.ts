"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const loginUser = async (userData: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await res.json();


    if (result?.data?.token) {
      (await cookies()).set("token", result?.data?.token);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("token")?.value
  console.log("acces=token",accessToken)
  let decodeData = null;

  if (accessToken) {
    decodeData = await jwtDecode(accessToken);
      console.log("decodedData", decodeData)
    return decodeData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("token");
}