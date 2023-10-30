import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import SidebarDrawer from "../../components/SidebarBrawer";
import "./dashbord.css";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "../../app.scss";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArticleIcon from "@mui/icons-material/Article";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LayersIcon from "@mui/icons-material/Layers";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LoanRequests from "../loanRequests/LoanRequests";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 200, md: 400 },
  bgcolor: "background.paper",
  border: "2px solid green",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
function Dashboard() {
  const [state, setState] = useState(true);
  const [navbar, setNavbar] = useState(true);
  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [orderId, setOrderId] = useState();

  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);

  const toggle = () => {
    setState((prev) => !prev);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ background: "white" }}>
      <Navbar
        navbar={navbar}
        setNavbar={setNavbar}
        background="white"
        border={false}
      />
      <Box
        sx={{
          paddingTop: { md: "7vh", xs: "7vh" },
          backgroundColor: "white",
          margin: "0px !important",
        }}
      >
        <Stack
          direction="row"
          sx={{
            height: "100vh",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "20%",
              display: { md: state ? "block" : "none", sm: "none", xs: "none" },
            }}
          >
            <Sidebar />
          </Box>
          <Box
            className="dashboard-main"
            sx={{
              width: "100%",
              overflowY: "scroll",
              paddingRight: "10px",
              background: "#f6f9fd",
            }}
          >
            <Box sx={{ width: "100%", margin: "0", paddingTop: "15px" }}>
              <Box sx={{ padding: { md: "20px", xs: "0px 10px" } }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <IconButton
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                      display: { md: "block", ms: "none", xs: "none" },
                      width: "100%",
                      height: "100%",
                    }}
                    onClick={toggle}
                  >
                    {state ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
                  </IconButton>
                  <IconButton
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                      display: { md: "none", sm: "block", xs: "block" },
                    }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <ArticleIcon sx={{ fontSize: "1.2em" }} />
                  </IconButton>
                </Box>

                <div className="introduction">
                  <p className="welcome-message"> Good evening, Bright</p>
                  <p className="welcome-info">
                    {" "}
                    Your financial dreams are just a click away!
                  </p>
                </div>
                <Box sx={{ marginTop: "20px" }}>
                  <Box className="account-balance">
                    <Box className="ballance-info">
                      <Stack spacing={2} direction="row">
                        <Typography className="balance">
                          Total Balance
                        </Typography>
                        <RemoveRedEyeIcon />
                      </Stack>
                      <Typography className="big-bal" sx={{ fontSize: "28px" }}>
                        &#8358;0<span className="small-span">.00</span>{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  className="grid-container"
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  <div className="grid-item">
                    <div className="active-loan">
                      <CreditScoreIcon sx={{ color: "white" }} />
                    </div>
                    <p>Active loan</p>
                    <p>0</p>
                  </div>
                  <div className="grid-item">
                    <div className="pending-loan">
                      <AccessTimeIcon sx={{ color: "white" }} />
                    </div>
                    <p>Pending Loan Requests</p>
                    <p>0</p>
                  </div>
                  <div className="grid-item">
                    <div className="total-lend">
                      <CreditScoreIcon sx={{ color: "white" }} />
                    </div>
                    <p>Total Lended</p>
                    <Typography className="big-bal" sx={{ fontSize: "28px" }}>
                      &#8358;0<span className="small-span">.00</span>{" "}
                    </Typography>
                  </div>
                  <div className="grid-item">
                    <div className="active-loan">
                      <CreditScoreIcon sx={{ color: "white" }} />
                    </div>
                    <p>Total Earned</p>
                    <Typography className="big-bal" sx={{ fontSize: "28px" }}>
                      &#8358;0<span className="small-span">.00</span>{" "}
                    </Typography>
                  </div>
                </Box>
                <Box sx={{ marginTop: "20px" }}>
                  <LoanRequests />
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
        <SidebarDrawer open={open} close={handleDrawerClose} />
      </Box>
    </Box>
  );
}

export default Dashboard;
