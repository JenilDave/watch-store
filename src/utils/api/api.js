import { api, baseURL } from "./instance";

exports.getAllWatches = (url) =>
  api.get("/watches").then((res) => res.data);

exports.getAllCollections = (url) =>
  api.get("/watch-collections").then((res) => res.data);

exports.addWatch = (url, data) =>
  api.post(url, data).then((res, rej) => {
    if (rej) console.log(rej)
    if (res.status == 201) return true
  }).catch(e => {
    print(e);
  })

exports.editWatch = (url, data) =>
  api.put(url, data).then((res, rej) => {
    if (rej) console.log(rej)
    if (res.status == 201) return true
  })

exports.addFan = (url, data) =>
  api.post(url, data).then((res, rej) => {
    if (rej) console.log(rej)
    return res
  }).catch(e => {
    console.error(e);
    return false;
  })

exports.authFan = (url, data) =>
  api.post(url, data).then((res, rej) => {
    if (rej) console.log(rej)
    return res
  }).catch(e => {
    console.error(e);
    return false;
  })


exports.resetPassword = (url, data) =>
  api.post(url, data).then((res, rej) => {
    if (rej) console.log(rej)
    return res
  }).catch(e => {
    console.error(e);
    return false;
  })

exports.getWatchDetail = (watchId, setCollectionState, setWatchData, collectionFilter) =>
  api.get(`/watch-detail/${watchId}`).then(res => {
    setCollectionState(collectionFilter(res.data))
    setWatchData(res.data)
    return res.data
  }).catch(e => {
    if (e.status === 403) {
      localStorage.removeItem("authKey")
    }
  })

exports.getFavourites = (username) => {
  return api.get(`/favourites/${username}`).then((res) => {
    return res.data
  })
}

exports.addFavourite = (username, favourite) => {
  return api.post(`/add-favourites`, {
    username, favourite
  })
}

exports.removeFavourite = (username, favourite) => {
  return api.post(`/remove-favourites`, {
    username, favourite
  })
}

exports.getWatchImgURL = (watchId) => `${baseURL}/watch-image/${watchId}`
