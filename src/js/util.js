import axios from "axios";

export function buildDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

function alphabetPosition(text) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
      var code = text.toUpperCase().charCodeAt(i)
      if (code > 64 && code < 91) result += (code - 64) + " ";
    }
  
    return result.slice(0, result.length - 1);
}

export function generateStringId(s) {
    let id = ''
    for (let i = 0; i < s.length; i++) {
        id += alphabetPosition(s.charAt(i))
    }
    return id
}

export function validDateRange(from, to) {
    return !(from === to || new Date(from).getTime() - new Date(to).getTime() > 0)
}

export async function getMetaData() {
    const { data } = await axios.get('https://api.yogsstats.com/stats/ttt/meta')
    return data
}

export async function getTeams() {
    const { data } = await axios.get('https://api.yogsstats.com/stats/ttt/teams?canWin=true')
    return data
}

export async function getRoles() {
    const { data } = await axios.get('https://api.yogsstats.com/stats/ttt/roles?canWin=true')
    return data
}

export async function getPlayers() {
    const { data } = await axios.get('https://api.yogsstats.com/stats/ttt/players')
    return data
}

export const barOptions = {
    responsive: true,
    scales: {
        x: {
            grid: {
              color: "rgba(255, 255, 255, 0.08)"
            }
          },
          y: {
            max: 100,
            grid: {
              color: "rgba(255, 255, 255, 0.08)"
            }
        }
    }
}