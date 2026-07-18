import { TagData } from "@yaireo/tagify"
import { useCallback, useContext, useRef, useState } from "react"
import NavigationBar from "../components/Navigation"
import { AppContext, IContext, Layout } from "./HomeScreen"
// import html from "../json/collective.json"
import { Button, Modal, OverlayTrigger, Popover } from "react-bootstrap"
import { CitationWidget } from "../components/cards/MetaDataCard"
export default function AboutScreen() {

  let citation = `@incollection{ELOGallery2024,
  author = {Salter, A; Murray, John T.; Skains, Lyle; Cox, D.},
  title = {Editorial Statement},
  booktitle = {ELO 2024 (Un)linked: Exhibition},
  editor = {Salter, Anastasia and Murray, John T. and Skains, Lyle and Cox, Daniel},
  volume = {1},
  year = {2024},
  publisher = {Electronic Literature Organization},
  address = {Washington State University, Vancouver, WA, USA},
  langid = {english},
  url = {${window.location.href}}
}`
  let popover = <Popover>
    <Popover.Header as="h3">Cite this Editorial Statement</Popover.Header>
    <Popover.Body>
      <CitationWidget citeKey={`editorialStatement2024`} citation={citation} />
    </Popover.Body>
  </Popover>

  let tagifyRef = useRef() as React.MutableRefObject<Tagify<TagData> | undefined>;
  // let texts = html.html.split(/<h2>.*<\/h2>/ig).slice(1)
  // let headers = html.html.matchAll(/<h2>(.+)<\/h2>/ig)
  // let cards = [...headers].map((match:any, index:number) => 
  //   <div key={index} className="elcContainer"><div className="aboutSubHeader" dangerouslySetInnerHTML={{ __html: match[1] }}></div>
  //     <div id="editorialStatement" dangerouslySetInnerHTML={{ __html: texts[index] }}>
  //     </div>
  //     {match[1].includes("Statement") ? 
  //     <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true}>
  //       <Button style={{marginLeft:"2em", marginBottom:"1em"}} size="lg">Cite this Statement</Button>
  //     </OverlayTrigger>
  //     : undefined }
  //   </div>
  // )
  let aContext = useContext(AppContext)
  let [show, setShow] = useState(false)
  let handleClose = useCallback(() => {
    setShow(false)
  }, [])
  if (aContext !== undefined) {
    let { search, setSearch, darkMode, setDarkMode }: IContext = aContext

    return (
      <Layout setSearch={setSearch} sticky={false} darkMode={darkMode} setDarkMode={setDarkMode} >
        <Layout.Slot name="Header">
          <center id="headerBanner">
            <a href="https://stars.library.ucf.edu/elo2024/" target="_blank" rel="noreferrer" style={{margin:"auto"}}>
              <span style={{
                height: 178, width: 495, display: "inline-block", flexShrink: 1.2,
                backgroundPosition: "left", backgroundRepeat: "no-repeat", backgroundSize: "cover",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/HeaderLeft.png'}`
              }}>
              </span>
              <span style={{
                height: 178, width: 560, display: "inline-block",
                backgroundPosition: "right", backgroundRepeat: "no-repeat", backgroundSize: "cover",
                backgroundImage: `url(${process.env.PUBLIC_URL + '/images/HeaderRight.png'}`
              }}>
              </span>
            </a>
          </center>
          <NavigationBar currentScreen="about" tagifyRef={tagifyRef} search={search} setSearch={setSearch} showSearch={false} />
        </Layout.Slot>
        <Layout.Slot name="Body">
          <Modal size="lg" show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>ELO 2024 (Un)linked: Exhibition Usage</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             
            </Modal.Body>
            <Modal.Footer><button onClick={handleClose}>close</button></Modal.Footer>
          </Modal>

          <div id="aboutContainer">
            <div className="elcContainer">
              <div className="aboutSubHeader">Exhibition Organizers</div>
              <div style={{"display": "flex"}}>
                <div style={{"flex": "1", paddingRight: "10px"}}>
                  <p><strong>Exhibition Chair</strong>:<br /> Lyle Skains</p>
                  <p><strong>ELO 2024 Co-Chairs</strong>:<br /> Anastasia Salter & John T. Murray</p>
                </div>
                <div style={{flex: 1, paddingLeft: "10px"}}>
                  <p><b>Exhibition Team</b>:</p>
                  <ul>
                    <li>Daniel Cox</li>
                    <li>PD Edgar</li>
                    <li>Ricky Finch</li>
                    <li>Mike Shier</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/*cards*/}
          <div className="elcContainer">
          <div className="aboutSubHeader">Exhibition Statement</div>
            <p>This year's conference and media festival theme, "(Un)linked," delves into the web as a contested platform of community and computational creativity, juxtaposing dystopian shifts with hopeful futures.</p>
            <p>At the heart of the Media Festival is a profound engagement with <strong>interactivity and user participation</strong>. Works like <em>What did the line that you last drew, ask you?</em> and <em>ThinkingDaughters</em> invite participants to navigate digital spaces, interact in real-time, and engage with the works' code. This active involvement not only enhances the user experience but also blurs the lines between creator and audience, fostering a collaborative exploration of the narratives.</p>
            <p>The <strong>blend of media</strong> in other works moves us closer to imagined futures of immersive experiences. Pieces such as <em>A Condensed History of Australian Camels</em> and <em>Crawl It's Image</em> merge text, sound, visuals, and augmented reality, creating rich, multi-sensory environments. This fusion of different forms draws the audience deeper into the works and their underlying themes, even while occasionally questioning the ethics and accessibility of such media.</p>
            <p><strong>Exploration of identity and societal issues</strong> features heavily in this Festival; unsurprising given sociopolitical trends in recent years. <em>Run: a Sci-Fi Apocalypse Adventure</em> and <em>BⱯBEL RËVOLUㅏION</em> address themes of race, gender, and social justice, highlighting how digital narratives can reflect and interrogate complex societal dynamics. These pieces offer a platform for marginalized voices, using electronic literature to challenge and redefine traditional representations. The use of Twine, a focus of the conference, is also a strong component of this year's exhibition; its history as a channel for the expression of identity and personal issues as they relate to wider society comes to the fore as works dance over the line between interior experiences and culturally-relevant issues.</p>
            <p><strong>Historical and cultural contexts</strong> are woven throughout the exhibition, offering another perspective on identity and society. <em>Mutiny on the</em> Batavia and <em>Palimpsest</em> draw from historical events and literary traditions, while <em>Dim Sum 點心</em> and <em>Are You There/Kya Tum Ho Waha?</em> reflect personal and cultural histories. By connecting past and present, these works provide a reflective lens through which audiences can consider contemporary issues</p>
            <p>The <strong>innovative use of technology</strong> is always a hallmark of the ELO Media Festival. Works such as <em>A Fibonacci Conundrum</em> and <em>An Experiment in Yellow</em> exemplify the creative potential of AI and computational logic, exploring how these technologies can generate new forms of poetic and narrative expression. The integration of AI, hypertext, and other digital tools not only enhances the storytelling but also raises questions about the future of art and authorship in a digital age.</p>
            <p>ELOnline 2024's <em>(Un)linked</em> Media Festival offers a compelling exploration of the web as a dynamic and contested space for electronic literature. Through interactivity, blending of media, exploration of identity and society, historical contexts, and technological innovation, these works invite audiences to engage deeply with the narratives and reflect on the evolving landscape of digital creativity in our current rollercoaster of dystopic and utopic life.</p>
            <OverlayTrigger trigger="click" placement="right" overlay={popover} rootClose={true}>
            <Button style={{marginLeft:"2em", marginBottom:"1em"}} size="lg">Cite this Statement</Button>
            </OverlayTrigger>

          </div>
          <div className="elcContainer">
            <div className="aboutSubHeader">Licenses and Software</div>
            <p>tagify: <a href="https://github.com/yairEO/tagify/blob/master/LICENSE">License</a></p>
            <p>This website was produced using <a href="https://reactjs.org">React</a>.</p>
            <p>React version and additional features developed by John T. Murray as part of Electronic Literature Collection, Volume 4, used with permission and with some adaptations.</p>
            <p>Original HTML and CSS based on design from Jacob Garbe. Used with permission.</p>
          </div>
          <div className="elcContainer versionHistory">
            <div className="aboutSubHeader">Version History</div>
            <p>1.0 - 10 July 2024. Original web publishing</p>
          </div>
          
        </Layout.Slot>
      </Layout>
    )
  } else {
    return <></>
  }
}