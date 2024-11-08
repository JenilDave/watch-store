"use client";

import { addFan, authFan } from "@/utils/api/api";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import LoginBox from "../components/loginBox";


function page(props) {
  const router = useRouter();
  const [fanDetails, setFanDetails] = useState({});
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [gender, setGender] = useState("");
  const [tabIndex, setTabIndex] = useState("1");
  const [authKey, setAuthKey] = useLocalStorage("authKey", "")

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleSave = () => {
    addFan('/create-fan', fanDetails).then(resp => {
      if (resp) {
        router.push("/watches");
      }
    })
  }

  const handleLogin = (fanDetails) => {
    authFan('/login', fanDetails).then(resp => {
      setAuthKey(resp.data);
      if (resp) {
        router.push("/watches");
      }
    })
  }

  const genderOptions = ["Male", "Female", "Other"]

  return (
    <div>
      <Box margin={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={(e, newValue) => {
          setTabIndex(newValue)
          setFanDetails({});
        }} aria-label="basic tabs example"
        >
          <Tab label="Login" value="1" />
          <Tab label="Sign-Up" value="2" />
        </Tabs>
      </Box>
      {tabIndex === '2' && (
        <>
          <Typography sx={{ color: 'text.secondary', fontSize: 20 }}>
            Sign Up
          </Typography>
          <Box display={"grid"} alignItems={"center"} width={300}>
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Username"
              variant="outlined"
              margin="normal"
              onChange={(e) => setFanDetails({ ...fanDetails, username: e.target.value })}
            />
            <TextField
              error={emailError}
              required
              fullWidth
              type="email"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              margin="normal"
              onChange={(e) => {
                setEmailError(!validateEmail(e.target.value));
                if (validateEmail(e.target.value)) {
                  setFanDetails({ ...fanDetails, email: e.target.value });
                }
              }}
            />
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              margin="normal"
              onChange={(e) => setFanDetails({ ...fanDetails, firstName: e.target.value })}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              margin="normal"
              onChange={(e) => setFanDetails({ ...fanDetails, lastName: e.target.value })}
            />
            <TextField
              required
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              margin="normal"
              autoComplete="current-password"
              onChange={(e) => setFanDetails({ ...fanDetails, password: e.target.value })}
            />
            <PasswordStrengthBar password={fanDetails.password} />
            <TextField
              required
              error={passError}
              fullWidth
              id="outlined-password-input"
              label="Re-Enter Password"
              type="password"
              margin="normal"
              autoComplete="current-password"
              onChange={(e) => setPassError(fanDetails.password !== e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                value={gender}
                label="Gender"
                onChange={(e) => {
                  setFanDetails({ ...fanDetails, gender: e.target.value })
                  setGender(e.target.value)
                }}
              >
                {genderOptions.map((element, id) => {
                  return (
                    <MenuItem
                      key={`${element}-${id}`}
                      value={element}
                    >
                      {element}
                    </MenuItem>
                  )
                }
                )}
              </Select>
            </FormControl>
            <Button
              disabled={!((!emailError && fanDetails.email) && (!passError && fanDetails.password) && !isEmpty(fanDetails))}
              onClick={handleSave}>
              Submit
            </Button>
          </Box>
        </>
      )}
      {tabIndex === '1' && (
        <>
          <LoginBox onSubmit={({ formData }) => {
            handleLogin(formData);
          }} />
        </>
      )}
    </div>
  );
}

export default page;
