const express = require("express");
const app = express();

const authRoutes = require("./auth.route");
const organizationRoutes = require("./organization.route");
const candidateRoutes = require("./candidate.route");
const recruiterRoutes = require("./recruiter.route");
const commonRoutes = require("./common.route");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/candidate", candidateRoutes);
app.use("/api/v1/recruiter", recruiterRoutes);
app.use("/api/v1/common", commonRoutes);

module.exports = app;
