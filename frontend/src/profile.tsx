import React, { useState } from "react";
import { Button, Stack, Group, Text, Box, Input, Avatar } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ backgroundColor: "#E0F7FA", minHeight: "100vh" }}>
      {/* Top Bar */}
      <Box
        style={{
          width: "100%",
          backgroundColor: "#0097A7",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: "20px",
            fontFamily: "Holtwood One SC, serif",
          }}
        >
          PassTime
        </Text>
        <Group style={{ gap: "16px" }}>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button variant="subtle" style={{ color: "white" }}>
              Home
            </Button>
          </Link>

          <Link to="/settings" style={{ textDecoration: "none" }}>
            <Button variant="subtle" style={{ color: "white" }}>
              Settings
            </Button>
          </Link>

          <Button
            variant="subtle"
            style={{ color: "white" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Group>
      </Box>

      {/* Profile Content */}
      <Stack
        justify="flex-start"
        align="flex-start"
        style={{ width: "100%", paddingTop: "80px", paddingLeft: "20px" }}
      >
        <Avatar
          src={previewImage}
          alt="Profile"
          size={120}
          radius={60}
          style={{ border: "2px solid #0097A7", marginBottom: "20px" }}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            backgroundColor: "#ffffff",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            backgroundColor: "#ffffff",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            width: "300px",
          }}
        />
        
      </Stack>
    </div>
  );
}
