// import ccByNcNd from "../images/cc-by-nc-nd.png"
import { useCallback } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { copyrights } from "../images/images"
const renderTooltip = (props:any) => (
  <Tooltip id="button-tooltip" {...props}>
    Toggle increased contrast mode
  </Tooltip>
)
const Footer = function ({ darkMode, setDarkMode }: { darkMode:boolean, setDarkMode:any }) {
  let handleSwitch = useCallback((e: any) => {
    if (e.target.checked) {
      //console.log("Dark")
      setDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
    else {
      //console.log("Light")
      setDarkMode(false)
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [setDarkMode])

  return (<div id="footer">
    <div id="footer" className="elcCopyright" style={{ width:"100%" }}>
      <div className="elcCard" id="elcCopyrightInfo" style={{ display: "flex", justifyContent: "space-evenly" }}>
        Collection Editorials <br/>and Other Content:
        <a id="elcCopyright" rel="noreferrer" href="http://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank"
        ><img src={copyrights["CC-BY-NC-ND"].image} alt="Work Copyright" /></a> Electronic Literature Organization, 2024. <br /> University of Central Florida, Orlando, FL
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
        <div className="theme-switch-wrapper">
          <img style={{ height: "30px", marginBottom: "-8px", marginTop: "-8px", marginRight: "10px"}} src={require("../images/darkmode_light.png")} alt="Accesibility Mode"></img>
            <label className="theme-switch" htmlFor="checkbox">
            <input type="checkbox" id="checkbox" onChange={handleSwitch} checked={darkMode}/>
            <div className="slider round">
            </div>
            </label>
        </div>
          </OverlayTrigger>
      </div></div>
  </div>)
}

export default Footer