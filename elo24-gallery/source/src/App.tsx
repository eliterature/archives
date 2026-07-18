import WebApp from './screens/HomeScreen' 
import { Helmet, HelmetProvider } from "react-helmet-async"
export default function App() {
  return ( <HelmetProvider>
    <Helmet>
      <title>ELO 2024 (Un)linked: Exhibition</title>
      <meta name="citation_publication_date" content="2024" />
      <meta name="citation_online_date" content="2024" />
      <meta name="citation_available_date" content="2024" />
      <meta name="citation_editors" content="Salter, A; Murray, John T.; Skains, Lyle; Cox, D." />
      <meta name="citation_publisher" content="Electronic Literature Organization" />
      <meta name="citation_public_url" content={window.location.href} />
      <meta name="citation_language" content="English" />
      <meta name="citation_title" content={"Electronic Literature Organization"} />
      <meta name="DC.Title" content={`ELO 2024 (Un)linked: Exhibition`} />
      <meta name="DC.Date.Created" content="2024" />
      <meta name="DC.Relation.IsPartOf" content="urn:issn:1932-2024" />
      <meta name="DC.Publisher" content="Electronic Literature Organization" />
      <link rel="apple-touch-icon-precomposed" sizes="57x57" href="images/favicons/apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon-precomposed" sizes="60x60" href="images/favicons/apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/favicons/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon-precomposed" sizes="76x76" href="images/favicons/apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/favicons/apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon-precomposed" sizes="120x120" href="images/favicons/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/favicons/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href="images/favicons/apple-touch-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="images/favicons/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="images/favicons/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="images/favicons/favicon-16x16.png"/>
      <meta name="application-name" content="ELO 2024 (Un)linked: Exhibition" />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-square70x70logo" content="images/mstile-70x70.png" />
      <meta name="msapplication-TileImage" content="images/mstile-144x144.png" />
      <meta name="msapplication-square150x150logo" content="images/mstile-150x150.png" />
      <meta name="msapplication-wide310x150logo" content="images/mstile-310x150.png" />
      <meta name="msapplication-square310x310logo" content="images/mstile-310x310.png" />
      <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />
      <meta name="description"
        content="ELO 2024 (Un)linked: Exhibition collects works centered on the web as a contested platform of community and computational creativity with attention to both dystopian shifts and hopeful futures." />
      <meta name="keywords"
        content="e-lit, electronic literature, new media, electronic literature organization, digital media" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
      <meta property="og:url" content={`${process.env.PUBLIC_URL}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="ELO 2024 (Un)linked: Exhibition" />
      <meta property="og:description"
        content="ELO 2024 (Un)linked: Exhibition collects works centered on the web as a contested platform of community and computational creativity with attention to both dystopian shifts and hopeful futures." />
    </Helmet>
    <WebApp />
  </HelmetProvider>)
}
