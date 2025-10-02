import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface Address {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}


interface UserProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: Address;
}


const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");


  const navigate = useNavigate();


  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
      return;
    }


    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://grp10userservice.azurewebsites.net/api/user/${userId}`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data: UserProfile = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };


    fetchProfile();
  }, [userId, token, navigate]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    const { name, value } = e.target;


    if (["street", "city", "postalCode", "country"].includes(name)) {
      setProfile({
        ...profile,
        address: { ...profile.address, [name]: value } as Address,
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !token) return;


    try {
      const res = await fetch(
        "https://grp10userservice.azurewebsites.net/api/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );


      if (!res.ok) throw new Error("Failed to save profile");


      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      setMessage("❌ Failed to update profile.");
    }
  };


  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found.</p>;


  return (
    <main className="auth-page">
      <div className="container">
        <h2>My Profile</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={profile.email} disabled />
          </div>


          <div className="form-group">
            <label>First Name</label>
            <input name="firstName" value={profile.firstName || ""} onChange={handleChange} />
          </div>


          <div className="form-group">
            <label>Last Name</label>
            <input name="lastName" value={profile.lastName || ""} onChange={handleChange} />
          </div>


          <div className="form-group">
            <label>Phone Number</label>
            <input name="phoneNumber" value={profile.phoneNumber || ""} onChange={handleChange} />
          </div>


          <h3>Address</h3>
          <div className="form-group">
            <label>Street</label>
            <input name="street" value={profile.address?.street || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>City</label>
            <input name="city" value={profile.address?.city || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input name="postalCode" value={profile.address?.postalCode || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input name="country" value={profile.address?.country || ""} onChange={handleChange} />
          </div>


          <button type="submit" className="btn btn-login-register">Save Profile</button>
        </form>


        {message && <p>{message}</p>}
      </div>
    </main>
  );
};


export default ProfilePage;