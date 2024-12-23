import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaEdit, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const ProfileWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: "0 auto",
  marginBottom: theme.spacing(2),
  border: "4px solid white",
  boxShadow: theme.shadows[3],
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ProfileComponent = ({name,email,phone,role,logout}) => {
  const [expanded, setExpanded] = useState(false);
  const isDarkMode= useSelector(state=>state?.auth?.isDarkMode)

  const userData = {
    name: name,
    tagline: "Senior Software Developer",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    email: email,
    phone: `+91 ${phone}`,
    role: role,
    dob: "January 15, 1990",
    interests: ["Photography", "Traveling", "Reading", "Hiking"],
    skills: ["React", "Node.js", "Python", "AWS", "Docker"],
    hobbies: ["Playing Guitar", "Cooking", "Gaming"],
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ProfileWrapper sx={{background:isDarkMode?"#121212":'dark'}}>
      <Container  maxWidth="md">
        <ProfileHeader>
          <LargeAvatar src={userData.avatar} alt={userData.name} />
          <Typography variant="h4" gutterBottom>
            {userData.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {userData.tagline}
          </Typography>
        </ProfileHeader>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <FaEnvelope size={20} style={{ marginRight: "8px" }} />
                  <Typography variant="subtitle2">Email</Typography>
                </Box>
                <Typography variant="body2">{userData.email}</Typography>
              </CardContent>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <FaPhone size={20} style={{ marginRight: "8px" }} />
                  <Typography variant="subtitle2">Phone</Typography>
                </Box>
                <Typography variant="body2">{userData.phone}</Typography>
              </CardContent>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <FaMapMarkerAlt size={20} style={{ marginRight: "8px" }} />
                  <Typography variant="subtitle2">Role</Typography>
                </Box>
                <Typography variant="body2">{userData.role}</Typography>
              </CardContent>
            </InfoCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoCard>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <FaBirthdayCake size={20} style={{ marginRight: "8px" }} />
                  <Typography variant="subtitle2">Birthday</Typography>
                </Box>
                <Typography variant="body2">{userData.dob}</Typography>
              </CardContent>
            </InfoCard>
          </Grid>
        </Grid>

        <Box mb={4}>
          <Accordion
            expanded={expanded === "interests"}
            onChange={handleChange("interests")}
          >
            <AccordionSummary>
              <Typography variant="h6">Interests</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {userData.interests.map((interest) => (
                  <Chip key={interest} label={interest} variant="outlined" />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "skills"}
            onChange={handleChange("skills")}
          >
            <AccordionSummary>
              <Typography variant="h6">Skills</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {userData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "hobbies"}
            onChange={handleChange("hobbies")}
          >
            <AccordionSummary>
              <Typography variant="h6">Hobbies</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {userData.hobbies.map((hobby) => (
                  <Chip key={hobby} label={hobby} variant="outlined" />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box display="flex" justifyContent="center">
          <ActionButton
            variant="contained"
            color="primary"
            startIcon={<FaEdit />}
          >
            Edit Profile
          </ActionButton>
          <ActionButton
            variant="outlined"
            color="primary"
            startIcon={<FaCog />}
          >
            Settings
          </ActionButton>
          <ActionButton
            variant="outlined"
            color="error"
            onClick={logout}
            startIcon={<FaSignOutAlt />}
          >
            Logout
          </ActionButton>
        </Box>
      </Container>
    </ProfileWrapper>
  );
};

export default ProfileComponent;
