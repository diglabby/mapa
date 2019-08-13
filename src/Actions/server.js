import T                          from "../constants/ActionTypes";
import { NUM_ENTRIES_TO_FETCH }   from "../constants/Search";
import WebAPI                     from "../WebAPI";
import { EDIT, RATING, LOGIN, REGISTER } from "../constants/Form";
import { NEW_ENTRY_LICENSE }      from "../constants/App";
import { initialize, stopSubmit } from "redux-form";
import mapConst                   from "../constants/Map";
import appConst                   from "../constants/App";
import { notificationSettings }   from "../constants/view";
import LICENSES                   from "../constants/Licenses";
import { MAIN_IDS, IDS }          from "../constants/Categories";
import i18n                       from "../i18n";
import { getMidnightUnixtime }    from "../util/datetime";
import { notify }                 from "reapop";

const flatten = nestedArray => nestedArray.reduce(
  (a, next) => a.concat(Array.isArray(next) ? flatten(next) : next), []
);

const getLicenseForEntry = currentLicense => {
  if (currentLicense && currentLicense == LICENSES.ODBL) {
    return currentLicense;
  } else {
    return NEW_ENTRY_LICENSE;
  }
};

const Actions = {

  setSearchTime: (time) => ({
    type: T.SET_SEARCH_TIME,
    payload: time
  }),

  search: () =>
    (dispatch, getState) => {

      dispatch(Actions.setSearchTime(Date.now()));

      const searchFn = () => {
        dispatch(Actions.setSearchTime(null));
        console.log("SEARCH\n");
        const { search, map } = getState();
        var cats = search.categories;
        const sw = map.bbox._southWest;
        const ne = map.bbox._northEast;
        const bbox = [sw.lat, sw.lng, ne.lat, ne.lng];

        if (search.text == null || !search.text.trim().endsWith("#")) {

          if(!cats.includes(IDS.INITIATIVE) && !cats.includes(IDS.EVENT) && !cats.includes(IDS.COMPANY)){
            dispatch({
              type: T.NO_SEARCH_RESULTS
            });
          } else {
            if(cats.includes(IDS.INITIATIVE) || cats.includes(IDS.COMPANY)){
              WebAPI.searchEntries(search.text, cats, bbox, (err, res) => {
                dispatch({
                  type: T.SEARCH_RESULT_ENTRIES,
                  payload: err || res,
                  error: err != null,
                  noList: search.text == null
                });
                const entries =
                  Array.isArray(res != null ? res.visible : void 0)
                    ? Array.isArray(res.invisible)
                      ? res.visible.concat(res.invisible)
                      : res.visible
                    : res != null
                      ? res.invisible
                      : void 0;

                const ids = entries ? entries.map(e => e.id) : null;
                if (ids && (Array.isArray(ids)) && ids.length > 0) {
                  dispatch(Actions.getEntries(ids));
                } else {
                  dispatch({
                    type: T.NO_SEARCH_RESULTS
                  });
                }
              });
            }

            if(cats.includes(IDS.EVENT)){
              const tags = search.text.replace(/#/g, '');
              WebAPI.searchEvents(tags, bbox, getMidnightUnixtime(Date.now()/1000), null, (err, res) => {
                dispatch({
                  type: T.SEARCH_RESULT_EVENTS,
                  payload: err || res,
                  error: err != null
                });
              });

              // search events without place:
              WebAPI.searchEvents(tags, null, getMidnightUnixtime(Date.now()/1000), null, (err, res) => {
                dispatch({
                  type: T.SEARCH_RESULT_EVENTS_WITHOUT_PLACE,
                  payload: err || res,
                  error: err != null
                });
              });
            }
          }

          if (search.text != null) {
            const address = search.text.replace(/#/g, "");
            WebAPI.searchAddressNominatim(address, (err, res) => {
              dispatch({
                type: T.SEARCH_ADDRESS_RESULT,
                payload: err || res,
                error: err != null
              });
            });
          }
        }
      };

      const triggerSearch = () => {
        const { timedActions } = getState();
        const lastTriggered = timedActions.searchLastTriggered;

        if (lastTriggered != null) {
          const duration = Date.now() - lastTriggered;
          if (duration > appConst.SEARCH_DELAY) {
            searchFn();
          } else {
            setTimeout(triggerSearch, appConst.SEARCH_DELAY);
          }
        }
      };

      setTimeout(triggerSearch, appConst.SEARCH_DELAY+5);

    },

  searchCity: () =>
    (dispatch, getState) => {
      dispatch(Actions.setSearchTime(Date.now()));
      const s = getState().search;
      const searchFn = () => {
        dispatch(Actions.setSearchTime(null));
        WebAPI.searchAddressNominatim(s.city, (err, res) => {
          dispatch({
            type: T.SEARCH_ADDRESS_RESULT,
            payload: err || res,
            error: err != null
          });
        });
      };

      const triggerSearch = () => {
        const { timedActions } = getState();
        const lastTriggered = timedActions.searchLastTriggered;

        if (lastTriggered != null) {
          const duration = Date.now() - lastTriggered;
          if (duration > appConst.SEARCH_DELAY) {
            searchFn();
          } else {
            setTimeout(triggerSearch, appConst.SEARCH_DELAY);
          }
        }
      };

      setTimeout(triggerSearch, appConst.SEARCH_DELAY+5);
    },

  getEntries: (ids = []) =>
    (dispatch, getState) => {
      let {
        fetchedAllEntries,
        moreEntriesAvailable
      } = getState().search;
      dispatch({
        type: T.SET_MORE_ENTRIES_AVAILABLE,
        payload: !fetchedAllEntries && (ids.length > NUM_ENTRIES_TO_FETCH)
      });
      ids = ids.slice(0, NUM_ENTRIES_TO_FETCH);

      const entries = getState().server.entries;
      const fetch_ids_entries = ids.filter((x) => entries[x] == null);
      if (fetch_ids_entries.length > 0) {
        WebAPI.getEntries(ids, (err, res) => {
          dispatch({
            type: T.ENTRIES_RESULT,
            payload: err || res,
            error: err != null
          });
          if (!err) {
            const {
              ratings
            } = getState().server;
            const ids = flatten(res.map(e => e.ratings));
            const fetch_ids_ratings = ids.filter((x) => ratings[x] == null);
            if (fetch_ids_ratings.length > 0) {
              dispatch(Actions.getRatings(fetch_ids_ratings));
            }
          }
        });
      } else {
        const entr = Object.keys(entries).map((key) => entries[key])
        dispatch({
          type: T.ENTRIES_RESULT,
          payload: entr.filter((e) => ids.includes(e.id)),
          error: false
        })
      }
    },

  getEvent: (id) =>
    (dispatch) => {
      WebAPI.getEvent(id, (err, res) => {
        dispatch({
          type: T.SEARCH_RESULT_EVENTS,
          payload: err || [ res ],
          error: err != null
        });
      });
    },

  getRatings: (ids = []) =>
    (dispatch) => {
      WebAPI.getRatings(ids, (err, res) => {
        dispatch({
          type: T.RATINGS_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  getAllCategories: () =>
    (dispatch) => {
      WebAPI.getAllCategories((err, res) => {
        dispatch({
          type: T.CATEGORIES_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  getServerInfo: () =>
    (dispatch) => {
      WebAPI.getServerInfo((err, res) => {
        dispatch({
          type: T.SERVER_INFO_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  subscribeToBbox: (bbox, changeExistingBbox) =>
    (dispatch) => {
      WebAPI.subscribeToBbox(bbox, (err, res) => {
        if (err) {
          dispatch({
            type: T.SUBSCRIBE_TO_BBOX_RESULT,
            payload: err
          });


          dispatch(notify({
            ...notificationSettings,
            message: i18n.t("growler.genericError"),
            status: "error"
          }));
        } else {
          dispatch({
            type: T.SUBSCRIBE_TO_BBOX_RESULT,
            payload: res
          });
          dispatch(notify({
            ...notificationSettings,
            message: changeExistingBbox ? i18n.t("growler.subscriptionChanged") : i18n.t("growler.subscriptionAdded"),
            status: "success"
          }));
          dispatch({
            type: 'UPDATE_SUBSCRIPTION_INFO',
            subscriptionExists: true
          })
        }
      })
    },

  unsubscribeFromBboxes: (username) =>
    (dispatch, getState) => {
      WebAPI.unsubscribeFromBboxes((err, res) => {
        if (err) {
          dispatch(notify({
            ...notificationSettings,
            message: i18n.t("growler.genericError"),
            status: "error"
          }));
        } else {
          dispatch(notify({
            ...notificationSettings,
            message: i18n.t("growler.unsubscribingSuccessfull"),
            status: "success"
          }));
          dispatch({
            type: 'UPDATE_SUBSCRIPTION_INFO',
            subscriptionExists: false
          })
        }
      })
    },

  saveEntry: (entry) =>
    (dispatch, getState) => {
      const entryExists = (entry != null ? entry.id : void 0);
      let saveFunc = new Function();

      console.log(entry.categories);
      console.log(IDS.EVENT);

      // if (entry.categories[0] === IDS.EVENT) {
      if (entry.categories) {
        saveFunc = WebAPI.createNewEvent;
      } else {
        saveFunc = entryExists ? WebAPI.saveEntry : WebAPI.saveNewEntry;
      }

      entry.license = getLicenseForEntry(entry.license);

      // todo test solution
      entry.start = 1565719410166;

      saveFunc(entry, (err, res) => {
        if (err) {
          dispatch(stopSubmit(EDIT.id, {
            _error: err
          }));
          dispatch(notify({
            ...notificationSettings,
            message: i18n.t("growler.genericError"),
            status: "error"
          }));
        } else {
          const id = (entry != null ? entry.id : void 0) || res;

          WebAPI.getEntries([id], (err, res) => {
            dispatch(initialize(EDIT.id, {}, EDIT.fields));
            if (!err) {
              dispatch(notify({
                ...notificationSettings,
                message: i18n.t("growler.entrySaved"),
                status: "success"
              }));

              dispatch({
                type: T.SET_CURRENT_ENTRY,
                payload: id,
              });

              if(!entryExists){
                dispatch({
                  type: T.NEW_ENTRY_RESULT,
                  payload: res[0]
                });
              } else {
                dispatch({
                  type: T.SAVED_ENTRY_RESULT,
                  payload: res[0]
                });
              }
            }
          });
        }
      });
    },

  createRating: (rating) =>
    (dispatch, getState) => {
      const r = {
        ...rating,
        value: Number.parseInt(rating.value)
      };
      WebAPI.createRating(r, (err, res) => {
        if (err) {
          dispatch(stopSubmit(RATING.id, {
            _error: err
          }));
        } else {
          WebAPI.getEntries([r.entry], (err, res) => {
            dispatch({
              type: T.ENTRIES_RESULT,
              payload: err || res,
              error: err != null
            });
            if (!err && res && res.length == 1) {
              dispatch({
                type: T.SET_CURRENT_ENTRY,
                payload: res[0].id,
              });
              dispatch(Actions.getRatings(res[0].ratings));
              dispatch(notify({
                ...notificationSettings,
                message: i18n.t("growler.ratingSaved"),
                status: "success"
              }));
              dispatch(initialize(RATING.id, {}, RATING.fields));
            }
          });
        }
      });
    },

  setMarker: (latlng) =>
    (dispatch, getState) => {
      dispatch({
        type: T.SET_MARKER,
        payload: latlng,
        manual: true
      });
      WebAPI.searchGeolocation(latlng, (err, res) => {
        dispatch({
          type: T.MARKER_ADDRESS_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  geocodeAndSetMarker: (address) =>
    (dispatch, getState) => {
      if (!getState().form.edit.kvm_flag_markerWasEnteredManually) {
        WebAPI.searchAddressNominatim(address, (err, res) => {
          if (!(err || getState().form.edit.kvm_flag_markerWasEnteredManually)) {
            if (res && res.length && res[0] && res[0].lat && res[0].lon) {
              dispatch({
                type: T.SET_MARKER,
                payload: {
                  lat: parseFloat(res[0].lat),
                  lng: parseFloat(res[0].lon)
                },
                manual: false,
                error: err != null
              });
              dispatch({
                type: T.SET_ZOOM,
                payload: parseFloat(mapConst.ENTRY_DEFAULT_ZOOM)
              });
            }
          }
        });
      }
    },

  login: (username, password) =>
    (dispatch, getState) => {
      dispatch({
        type: T.LOGIN_SUBMITTING
      });
      WebAPI.login({
        username,
        password
      }, (err, res) => {
        if (err) {
          dispatch(stopSubmit(LOGIN.id, {
            _error: err
          }));
        } else {
          WebAPI.getUser(username, (err, res) => {
            dispatch({
              type: T.LOGIN_RESULT,
              payload: err || res,
              error: err != null
            });
          });
          WebAPI.getBboxSubscriptions((err, res) => {
            if (!err) {
              dispatch({
                type: T.UPDATE_SUBSCRIPTION_INFO,
                subscriptionExists: res.body.length > 0
              })
            }
          });
        }
      });
    },

  register: (username, password, email) =>
    (dispatch, getState) => {
      dispatch({
        type: T.REGISTER_SUBMITTING
      });
      WebAPI.register({
        username,
        password,
        email
      }, (err, res) => {
        if (err) {
          dispatch(stopSubmit(REGISTER.id, {
            _error: err
          }));
        } else {
          dispatch({
            type: T.REGISTER_RESULT,
            result: res,
            email: email
          });
        }
      });
    },

  confirmEmail: (user_id) =>
    (dispatch, getState) => {
      WebAPI.confirmEmail(user_id, (err, res) => {
        if (err) {
          dispatch({
            type: T.EMAIL_CONFIRMATION_RESULT,
            error: true
          })
        } else {
          dispatch({
            type: T.EMAIL_CONFIRMATION_RESULT,
            error: false
          })
        }
      })
    },

  deleteAccount: () =>
    (dispatch, getState) => {
      WebAPI.deleteAccount(getState().user.username, (err, res) => {
        if (!err) {
          dispatch({
            type: T.LOGOUT
          });
        }
      });
    },

  highlight: (id) => {
    if (id == null) {
      id = [];
    }
    if (!Array.isArray(id)) {
      id = [id];
    }
    return {
      type: T.HIGHLIGHT_ENTRIES,
      payload: id
    };
  }
}

module.exports = {
  Actions: Actions,
  getLicenseForEntry: getLicenseForEntry
};
