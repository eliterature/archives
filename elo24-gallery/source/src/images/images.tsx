const images: { [index: string]: any } = {
  "default": require("../images/needed.png"),
  }

export const copyrights: { [index: string]: any } = {
  "CC0 (Public Domain)": { image: require('../images/publicdomain.png'), url: "https://creativecommons.org/share-your-work/public-domain/cc0" },
  "CC-BY-NC-ND": { image: require('../images/by-nc-nd.png'), url: "http://creativecommons.org/licenses/by-nc-nd/4.0/" },
  "CC-BY-NC-SA": { image: require('../images/by-nc-sa.png'), url: "https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode" },
  "CC BY-SA 4.0": { image: require('../images/by-sa.png'), url: "http://creativecommons.org/licenses/by-sa/4.0/" },
  "CC-BY-SA": { image: require('../images/by-sa.png'), url: "http://creativecommons.org/licenses/by-sa/4.0/" },
  "CC-BY-NC": { image: require('../images/by-nc.png'), url: "http://creativecommons.org/licenses/by-nc/4.0/"},
  "CC-BY-ND": { image: require('../images/by-nd.png'), url: "http://creativecommons.org/licenses/by-nd/4.0/"},
  "CC-BY": { image: require('../images/by.png'), url: "http://creativecommons.org/licenses/by/4.0/"},
  "Free Art License (v1.3)": { image: require('../images/free-art.png'), url: "http://artlibre.org/licence/lal/en/" },
  "ISC license": { image: require('../images/isc-license.png'), url: "https://opensource.org/licenses/ISC"},
  "All rights reserved": { image: require('../images/all-rights-reserved.png'), url: "" }
};

export default images