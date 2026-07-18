const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
require("dotenv").config()
const path = require("path")
const config = {
    user: process.env.SERVER_USER,
    // Password optional, prompted if none given
    password: process.env.PASSWORD,
    host: process.env.SERVER_HOST,
    port: 21,
    localRoot: path.resolve(".", "./build/").toString(),
    remoteRoot: "/4/",
    "log-level": "verbose",
    include: ["*", "**/*"], // this would upload everything except dot files
    // include: ["*.php", "dist/*", ".*"],
    // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [
        "build/**.pdf",
        "build/**/*.map",
        "static/media/**/*.jpg",
        "static/www/**",
        "static/works/**",
        "node_modules/**",
        "node_modules/**/.*",
        ".git/**",
    ],
    stateName: path.resolve(".", "./.ftp-deploy-sync-state.json").toString(),
    // delete ALL existing files at destination before uploading, if true
    deleteRemote: false,
    // Passive mode is forced (EPSV command is not sent)
    forcePasv: true,
    // use sftp or ftp
    sftp: false,
};
//console.log(config)
ftpDeploy
    .deploy(config)
    .then((res) => console.log("finished:", res))
    .catch((err) => console.log(err));