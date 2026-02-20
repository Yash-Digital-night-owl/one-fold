"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { getToken } from "@/utils/auth";

interface UserProfile {
  _id: string;
  userId: string;
  name: string;
  gender: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  education: string;
  religion: string;
  heightCm: number;
  habits: string[];
  interests: string[];
  photos: string[];
  primaryPhoto: string;
  documentUrl: string;
  likeCount: number;
}

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();

  const userId = params.id as string;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch profile
  const fetchUser = async () => {
    try {
      const token = getToken();

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();

      console.log("PROFILE RESPONSE:", data);

      // Your API gives direct object
      setUser(data);

    } catch (err: unknown) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Verify / Reject
  const updateStatus = async (status: "Verified" | "Rejected") => {
    try {
      const token = getToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/verify/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error();

      alert(`User ${status}`);
      router.push("/users");

    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ================= UI =================

  if (loading) {
    return (
      <Layout>
        <p className="p-6">Loading...</p>
      </Layout>
    );
  }

  if (error || !user) {
    return (
      <Layout>
        <p className="p-6 text-red-500">
          {error || "No user found"}
        </p>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="p-6 max-w-6xl mx-auto bg-white shadow rounded">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-6">
          User Profile
        </h1>

        {/* ================= BASIC INFO ================= */}

        <div className="flex flex-col md:flex-row gap-6">

          {/* Primary Photo */}
          <div className="flex justify-center">
            <img
              src={user.primaryPhoto}
              alt="Profile"
              className="w-52 h-52 rounded object-cover border"
            />
          </div>

          {/* Details */}
          <div className="space-y-2">

            <p><b>Name:</b> {user.name}</p>
            <p><b>Gender:</b> {user.gender}</p>
            <p><b>City:</b> {user.city}</p>
            <p><b>State:</b> {user.state}</p>
            <p><b>Country:</b> {user.country}</p>
            <p><b>Education:</b> {user.education}</p>
            <p><b>Religion:</b> {user.religion}</p>
            <p><b>Height:</b> {user.heightCm} cm</p>
            <p><b>Likes:</b> {user.likeCount}</p>

          </div>

        </div>

        {/* ================= BIO ================= */}

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Bio</h2>
          <p className="text-gray-700">{user.bio}</p>
        </div>

        {/* ================= HABITS ================= */}

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Habits</h2>

          <div className="flex gap-2 flex-wrap">
            {user.habits.map((h, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        {/* ================= INTERESTS ================= */}

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Interests</h2>

          <div className="flex gap-2 flex-wrap">
            {user.interests.map((i, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        {/* ================= DOCUMENT PREVIEW ================= */}

        {user.documentUrl && (
          <div className="mt-8">

            <h2 className="font-semibold mb-3">
              Uploaded Document
            </h2>

            <div className="border rounded p-3 w-fit">

              <img
                src={user.documentUrl}
                alt="Document"
                className="max-w-xs rounded"
              />

              <a
                href={user.documentUrl}
                target="_blank"
                className="block mt-2 text-blue-600 underline text-sm"
              >
                Open in New Tab
              </a>

            </div>

          </div>
        )}

        {/* ================= PHOTO GALLERY ================= */}

        {user.photos.length > 0 && (
          <div className="mt-8">

            <h2 className="font-semibold mb-3">
              Photo Gallery
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {user.photos.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="h-32 w-full object-cover rounded border hover:scale-105 transition"
                />
              ))}

            </div>

          </div>
        )}
        <div className="flex justify-center gap-6 mt-10">
          <button onClick={() => updateStatus("Verified")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Accept
          </button>
          <button onClick={() => updateStatus("Rejected")}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
    </Layout>
  );
}
