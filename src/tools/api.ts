import { Game } from "../pages/App";
const api = "http://localhost:3000";
export function patchGameStatus(pg: Partial<Game>) {
    fetch(api + "/games/" + pg.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pg),
    })
        .then((b) => b.json())
        .then((data) => console.log("endgame", data));
}

export function fetchGamesData() {
  return fetch(api + "/games")
    .then(b => b.json())
    //@ts-ignore
    .then(d => d.map(g => ({ ...g, dateTime: new Date(g.dateTime) })));
}

export function fetchTeamsData() {
  return fetch(api + "/teams")
    .then(b => b.json())
    
}

export function patchGameGoals(patch_data: Partial<Game>) {
  return fetch(`http://localHost:3000/games/` + patch_data.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(patch_data),
  });
}