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

const AUTO_REDIRECT_ON_UNAUTH = false; 

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [debug, setDebug] = useState<string>(""); 
  const [isNewProfile, setIsNewProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      try {
        setDebug("Calling /api/Account/me ...");
        const meRes = await fetch(
          "https://grp10authserviceapp.azurewebsites.net/api/Account/me",
          {
            method: "GET",
            credentials: "include", 
          }
        );

        const meText = await meRes.text();
        console.log("Account/me status:", meRes.status, meText);
        setDebug((d) => d + `\nAccount/me -> ${meRes.status}: ${meText}`);

        if (!meRes.ok) {
       
          setMessage(
            `Inte inloggad eller server svarade med fel: ${meRes.status}. Se debug nedan.`
          );
          if (AUTO_REDIRECT_ON_UNAUTH) {
            navigate("/login");
            return;
          } else {
            setLoading(false);
            return;
          }
        }

        
        let user;
        try {
          user = JSON.parse(meText);
        } catch {
          user = {};
        }

      
        const userId =
          (user && (user.id || user.userId || user.userID)) ||
          localStorage.getItem("userId");

        if (!userId) {
          setMessage("Kunde inte läsa userId från /Account/me.");
          setLoading(false);
          return;
        }

        setDebug((d) => d + `\nFetching UserService for id ${userId} ...`);
        const profileRes = await fetch(
          `https://grp10userservice.azurewebsites.net/api/user/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const profileText = await profileRes.text();
        console.log("UserService status:", profileRes.status, profileText);
        setDebug((d) => d + `\nUserService -> ${profileRes.status}: ${profileText}`);

        if (profileRes.status === 404) {
          setProfile({
            id: userId,
            email: user.email || "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: { street: "", city: "", postalCode: "", country: "" },
          });
          setIsNewProfile(true);
        } else if (!profileRes.ok) {
          setMessage(`Fel vid hämtning av profil: ${profileRes.status}`);
        } else {
          const data: UserProfile = JSON.parse(profileText);
          if (!data.address) {
            data.address = { street: "", city: "", postalCode: "", country: "" };
          }
          setProfile(data);
          setIsNewProfile(false);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setMessage("Nätverks- eller CORS-fel. Kolla konsolen & network tab.");
        setDebug((d) => d + `\nFetch error: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProfile();
  }, [navigate]);

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
    if (!profile) return;

    try {
      const res = await fetch("https://grp10userserviceapp.azurewebsites.net/api/User", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      });

      const text = await res.text();
      console.log("Save profile status:", res.status, text);
      setDebug((d) => d + `\nSave -> ${res.status}: ${text}`);

      if (!res.ok) throw new Error(`Save failed: ${res.status}`);
      setMessage(isNewProfile ? "Profil skapad!" : "Profil uppdaterad!");
      setIsNewProfile(false);
    } catch (err) {
      console.error(err);
      setMessage("Kunde inte spara profil. Se console/network.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return (
    <div>
      <p>{message || "Ingen profil att visa."}</p>
      <button onClick={() => navigate("/login")}>Gå till login</button>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: 10 }}>
        {debug}
      </pre>
    </div>
  );

  return (
    <main className="auth-page">
      <div className="container">
        <h2>{isNewProfile ? "Create Your Profile" : "My Profile"}</h2>

        {message && <p>{message}</p>}

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

          <button type="submit" className="btn btn-login-register">
            {isNewProfile ? "Create Profile" : "Save Profile"}
          </button>
        </form>

        <button style={{ marginTop: 12 }} onClick={() => navigate("/login")}>
          Gå till login
        </button>

        <h4>Diagnostik</h4>
        <pre style={{ whiteSpace: "pre-wrap", background: "#f6f6f6", padding: 10 }}>
          {debug}
        </pre>
      </div>
    </main>
  );
};

export default ProfilePage;
