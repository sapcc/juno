export const fakeData = () => { const regex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  const data = {
    zh: {
      name: "China",
      continent: "Asia",
      flagColors: ["red", "yellow"],
      leader: { name: "习 近平-习", title: "President", term: 137 },
      population: 1434440076830,
    },
    in: {
      name: "India",
      continent: "",
      a: true,
      b: false,
      c: null,
      emptyArray: [],
      emptyObject: {},
      flagColors: ["orange", "white", "green"],
      leader: { name: "Narendra\nModi.", title: "Prime Minister", term: 119 },
      population: 1.19e9,
      nan: NaN,
      infi: Infinity,
      neginf: -Infinity,
      nul: null,
      regex: regex,
    },
    array: ["asdf", [3, undefined, 4, -1, 123.45678, -123.45678]],
  }}