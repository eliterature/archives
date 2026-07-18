// import { createBrowserHistory } from "history"
import { useNavigate } from "react-router"
// import magnifyingGlass from "../images/magnifying-glass.png"
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import { useCallback, useContext } from "react"
import { TagifySettings } from "@yaireo/tagify"
import { AppContext, IContext, prefixSets, searchCategories } from "../screens/HomeScreen"
import { Container, Nav, Navbar } from "react-bootstrap"
// export async function filterWorks(filters: any) {
//   console.log(filters)
// }

let lastValue = ""
//console.log(Tags)
export default function NavigationBar({
  currentScreen,
  search,
  setSearch,
  curWorks,
  showSearch = true,
  tagifyRef }: {
    currentScreen?: any,
    showSearch?: boolean,
    search?: any,
    setSearch?: any,
    curWorks?: any,
    tagifyRef?: any
  }) {
  let navigate = useNavigate()
  // tagifyRef.current.value=search
  // let history = createBrowserHistory()
  let searchBar: any = undefined
  let aContext = useContext(AppContext)
  // let [dropdown, setDropdown] = useState(false)
  let dropdown = false
  lastValue = search
  const onChange = useCallback((e: any) => {
    if (Array.isArray(e.detail.tagify.value) && (e.type === "add" || e.type === "remove" || e.type === "change") && e.detail.value !== lastValue) {
      // console.log(e.detail.tagify.value)
      lastValue = e.detail.value
      /*console.log("CHANGED:"
        , e.detail.tagify.value // Array where each tag includes tagify's (needed) extra properties
        , e.detail.tagify.getCleanValue() // Same as above, without the extra properties
        , e.detail.value // a string representing the tags
      )*/
      // .concat() to not mutate arguments
      setSearch((_arr1: any[]) => {
        //console.log("Setting search...")
        const arr1 = _arr1.concat().sort()
        //console.log(arr1)
        const arr2 = e.detail.tagify.getCleanValue().concat().sort()
        //console.log("Cleaned")
        //console.log(arr2)
        if (arr1.length === arr2.length) {
          for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].value !== arr2[i].value) {
              return (e.detail.tagify.getCleanValue())
            }
          }
        } else {
          return (e.detail.tagify.getCleanValue())

        }
        return _arr1
      })
    }
  }, [setSearch])
  // tagifyRef.addEventListener("onChange", onChange)
  // useEffect(() => {
  //   tagifyRef.current.addEventListener("change")
  // })
  if (aContext !== undefined) {
    let { searchSets }: IContext = aContext
    // console.log(Array.from(searchSets["authorDisplayName"]))
    const tagifySettings: TagifySettings = {
      id: "tag",
      dropdown: {
        enabled: 1,
        accentedSearch: true,
        fuzzySearch: true,
        maxItems: 10,
        position: "text",
        closeOnSelect: true,
        highlightFirst: true
      }
    }
    let tags = []
    let tagSet = new Set<{ value: string, color: string, }>()
    for (let i of searchCategories) {
      if (searchSets[i.id] !== undefined) {
        for (let j of searchSets[i.id]) {
          let newTag = { value: j, term: j, color: "blue", tag: i.prefix + "_" + j, category: i.id }
          if (prefixSets[i.id].has(j)) {
            newTag.value = `${j}` + (i.label !== undefined ? ` (${i.label})` : "")
          }
          // switch (i.id) {
          //   case 
          // }
          tagSet.add(newTag)
        }
      }
    }
    tags = Array.from(tagSet)
    // console.log(tags)
    searchBar = <>
      <div className="searchbar" style={{
        display: showSearch ? "initial" : "none", position: "relative", textAlign: "left", height: "50px", width: currentScreen === "filters" ? "70%" : undefined
      }}>
        <button
          style={{
            position: "absolute",
            zIndex: 100,
            textAlign: "left",
            height: 20,
            fontSize: "10px",
            top: 11,
            right: 10,
            maxWidth: 40,
            borderRadius: "10px",
            borderWidth: ".5px"
          }}
          onClick={() => {
            setSearch([])
            tagifyRef.current.value = []
            tagifyRef.current.clearPersistedData()
            tagifyRef.current.removeAllTags()
            // setCurWorks(works)
          }}
        >Clear</button>
        <Tags
          value={search}
          settings={tagifySettings}
          tagifyRef={tagifyRef}
          showDropdown={dropdown}
          autoFocus={true}
          // onFocus={() => { console.log("OnFocus"); }}
          // onClick={() => console.log("Clicked")}
          onChange={(e: any) => {
            onChange(e)
          }}
          whitelist={tags}
          placeholder="Filter works..."
        />
      </div>
    </>
  }
  return (
    <>
      <div className={`navGroup${currentScreen === undefined ? " home" : ""}`}>
        <span>
          {currentScreen === undefined ?
            <span className="selected">Exhibition</span> :
            <a className={currentScreen === undefined ? "selected" : undefined} href={currentScreen === undefined ? "" : "/"} onClick={(e) => {
              e.preventDefault(); navigate(currentScreen === "home" ? `/` : `/`)
            }}>
              <span className="navLink" style={{
                position: "relative",
                // fontSize: "36px",
                paddingLeft: "5px",
                // alignContent: "end",
              }}>Exhibition</span></a>}
          <a className={currentScreen === "filters" ? "selected" : undefined} href={currentScreen === "filters" ? "" : "filters"} onClick={(e) => {
            e.preventDefault(); navigate(currentScreen === "filters" ? `/` : `/filters`)
          }}><span className="navLink" >
              {currentScreen === "filters" ? <>Works</> : "Filters"}
            </span></a>
          {/* {currentScreen === "glossary" ?
            <span className="selected">glossary</span> :
            <a href="glossary" onClick={async (e) => {
              e.preventDefault(); await setSearch([]); navigate(`/glossary`)
            }
            }><span>Glossary</span></a>} */}
          {currentScreen === "index" ?
            <span className="selected">index</span> :

            <a href="index" className={currentScreen === "index" ? "selected" : undefined} onClick={async (e) => {
              e.preventDefault(); await setSearch([]); navigate(`/index`)
            }
            }><span>Index</span></a>
          }
          {currentScreen === "about" ?
            <span className="selected">about</span> :
            <a href="about" style={{ borderRight: !showSearch ? "0px" : undefined }} onClick={(e) => { e.preventDefault(); setSearch([]); navigate(`/about`) }
            }><span>About</span></a>}
        </span>
        {currentScreen !== "filters" ? searchBar : undefined}
      </div>
      {currentScreen === "filters" ? <Navbar sticky="top" bg="light" expand="lg" style={{ margin: "px", borderRadius: "5px" }}>
        <Container>
          <Nav.Link onClick={(e) => { e.preventDefault(); navigate(currentScreen === "filters" ? `/` : `/filters`) }}>{curWorks.length} Works Matched</Nav.Link>
          {searchBar}
        </Container>
      </Navbar> : undefined}
    </>)
}