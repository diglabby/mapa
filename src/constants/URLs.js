import { APP_STAGES } from "./App"

// for Internet Explorer:
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

const API_VERSION = 'v0';

const OFDB_API_LINK = (() => {
  switch (__STAGE__){
    case APP_STAGES.LOCAL:

      console.log('env LOCAL');

      return "https://dev.ofdb.io/";
      // return "https://kartevonmorgen.org/api/";
      // return "https://api.ofdb.io/";
      // return "https://nightly.ofdb.io/";

    case APP_STAGES.NIGHTLY:
      console.log('env NIGHTLY');
      return "https://nightly.ofdb.io/";

    case APP_STAGES.DEV:
      console.log('env DEV');
      return "https://dev.ofdb.io/";

    default:
      // production  // ?? api.ofdb.io ??
      return "https://kartevonmorgen.org/api/";
  }
})() + API_VERSION;

module.exports = {
  CC_LICENSE: {
    by: {
      name: "creativecommons.org/publicdomain/zero/1.0/deed.be",
      link: "https://creativecommons.org/publicdomain/zero/1.0/deed.be"
    },
    en: {
      name: "creativecommons.org/publicdomain/zero/1.0/deed.en",
      link: "https://creativecommons.org/publicdomain/zero/1.0/deed.en"
    }
  },
  ODBL_LICENSE: {
    name: "opendatacommons.org/licenses/odbl/summary/",
    link: "https://opendatacommons.org/licenses/odbl/summary/"
  },
  APP: {
    name: "kartevonmorgen.org",
    link: "https://kartevonmorgen.org"
  },
  PROTOTYPE: {
    name: "prototyp.kartevonmorgen.org",
    link: "https://prototyp.kartevonmorgen.org"
  },
  REPOSITORY: {
    name: "https://github.com/diglabby/mapa",
    link: "https://github.com/diglabby/mapa"
  },
  VK: {
    name: "https://vk.com/falanster_by",
    link: "https://vk.com/falanster_by"
  },
  TELEGRAM: {
    name: "https://t.me/hackmapagithub",
    link: "https://t.me/hackmapagithub"
  },
  FACEBOOK: {
    name: "facebook.com/falanster",
    link: "https://www.facebook.com/falanster.by"
  },
  MAIL: {
    name: "falanster.by@gmail.com",
    link: "mailto:falanster.by@gmail.com"
  },
  OSM_ATTR: {
    name: "OpenStreetMap",
    link: "https://osm.org/copyright"
  },
  TILE_SERVER: {
    link: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
  },
  TILE_SERVER_ATTR: {
    name: "Wikimedia",
    link: "https://wikimediafoundation.org/wiki/Maps_Terms_of_Use"
  },
  OFDB_API: {
    link: OFDB_API_LINK
  },
  TH_GEOCODER: {
    link: "https://geocoder.tilehosting.com/q/<query>.js?key=<key>"
  },
  NOMINATIM: {
    link: "https://nominatim.openstreetmap.org"
  },
  ROUTEPLANNERS: {
    default: {
      name: "Graphhopper Maps",
      link: "https://graphhopper.com/maps/?point=&point={addr}&locale=de-DE&vehicle=bike&weighting=fastest&elevation=false&use_miles=false&layer=Omniscale"
    },
    apple: {
      name: "Apple Maps",
      link: "http://maps.apple.com/?daddr={addr}&dirflg=w"
    },
    android: {
      name: "GeoURI",
      link: "geo:{lat},{lng}"
    }
  },
  DONATE: {
    name: "www.betterplace.org/de/projects/36213",
    link: "https://www.betterplace.org/de/projects/36213"
  },
  JOB_ADS: {
    name: "www.betterplace.org/de/organisations/vonmorgen",
    link: "https://www.betterplace.org/de/organisations/vonmorgen"
  },
  OPEN_API: {
    name: "OpenApi",
    link: "https://raw.githubusercontent.com/kartevonmorgen/openfairdb/master/openapi.yaml"
  }
};
