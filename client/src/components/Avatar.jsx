/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
    Avatar as MuiAvatar,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import {
    Logout,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import HistoryIcon from '@mui/icons-material/History';
import { jwtDecode } from "jwt-decode";

const Avatar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const decoded = jwtDecode(localStorage.getItem("token"));
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        localStorage.removeItem("token");
        navigate("/auth/login");
    };

    return (
        <div className="ml-auto md:ml-0">
            <Tooltip title="Account settings">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    <MuiAvatar
                        alt={decoded?.name}
                        sx={{ width: 34, height: 34 }}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem>
                    <Link
                        to={`/profile/${decoded.userId}`}
                        className="flex items-center"
                    >
                        <MuiAvatar
                            alt={decoded?.name}
                            src={decoded?.profileImage}
                            sx={{ width: 32, height: 32, mr: 2 }}
                        />{" "}
                        Profile
                    </Link>
                </MenuItem>
                {
                    <MenuItem>
                        <Link
                            to="/history"
                            className="flex items-center"
                        >
                            <ListItemIcon>
                                <HistoryIcon fontSize="small" />
                            </ListItemIcon>
                            History
                        </Link>
                    </MenuItem>
                }

                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

export default Avatar;
